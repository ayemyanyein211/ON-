import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppContextType, SiteData, TeamMember, ServiceItem, PackageItem, University, Scholarship, BlogPost, LoginResult, AdminSettings, SecurityLog } from '../types';
import { INITIAL_DATA, INITIAL_TEAM, INITIAL_SERVICES, INITIAL_PACKAGES, INITIAL_UNIVERSITIES, INITIAL_SCHOLARSHIPS, INITIAL_BLOG, ADMIN_CREDENTIALS } from '../constants';

const DataContext = createContext<AppContextType | undefined>(undefined);

// --- Cryptography Helper ---
async function hashString(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// --- Constants ---
const MAX_ATTEMPTS = 3;
const LOCKOUT_DURATION = 5 * 60 * 1000; // 5 minutes
const SESSION_DURATION = 60 * 60 * 1000; // 60 minutes

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Helper to load from localStorage or fall back to initial
  const loadState = <T,>(key: string, fallback: T): T => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  };

  const [data, setData] = useState<SiteData>(() => loadState('omnoria_data', INITIAL_DATA));
  const [team, setTeam] = useState<TeamMember[]>(() => loadState('omnoria_team', INITIAL_TEAM));
  const [services, setServices] = useState<ServiceItem[]>(() => loadState('omnoria_services', INITIAL_SERVICES));
  const [packages, setPackages] = useState<PackageItem[]>(() => loadState('omnoria_packages', INITIAL_PACKAGES));
  const [universities, setUniversities] = useState<University[]>(() => loadState('omnoria_universities', INITIAL_UNIVERSITIES));
  const [scholarships, setScholarships] = useState<Scholarship[]>(() => loadState('omnoria_scholarships', INITIAL_SCHOLARSHIPS));
  const [blog, setBlog] = useState<BlogPost[]>(() => loadState('omnoria_blog', INITIAL_BLOG));

  // --- Auth State ---
  const [adminSettings, setAdminSettings] = useState<AdminSettings>(() => loadState('omnoria_admin_settings', ADMIN_CREDENTIALS));
  const [securityLogs, setSecurityLogs] = useState<SecurityLog[]>(() => loadState('omnoria_security_logs', []));
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [is2FAPending, setIs2FAPending] = useState<boolean>(false);
  
  // Rate Limiting State
  const [loginAttempts, setLoginAttempts] = useState<number>(0);
  const [lockoutUntil, setLockoutUntil] = useState<number>(0);

  // Persistence Effects
  useEffect(() => localStorage.setItem('omnoria_data', JSON.stringify(data)), [data]);
  useEffect(() => localStorage.setItem('omnoria_team', JSON.stringify(team)), [team]);
  useEffect(() => localStorage.setItem('omnoria_services', JSON.stringify(services)), [services]);
  useEffect(() => localStorage.setItem('omnoria_packages', JSON.stringify(packages)), [packages]);
  useEffect(() => localStorage.setItem('omnoria_universities', JSON.stringify(universities)), [universities]);
  useEffect(() => localStorage.setItem('omnoria_scholarships', JSON.stringify(scholarships)), [scholarships]);
  useEffect(() => localStorage.setItem('omnoria_blog', JSON.stringify(blog)), [blog]);
  useEffect(() => localStorage.setItem('omnoria_admin_settings', JSON.stringify(adminSettings)), [adminSettings]);
  useEffect(() => localStorage.setItem('omnoria_security_logs', JSON.stringify(securityLogs)), [securityLogs]);

  // Helper to add logs
  const addLog = (event: string, status: 'success' | 'failure' | 'warning', details?: string) => {
    const newLog: SecurityLog = {
      id: Date.now().toString() + Math.random().toString().slice(2, 5),
      timestamp: Date.now(),
      event,
      status,
      details
    };
    setSecurityLogs(prev => [newLog, ...prev].slice(0, 50)); // Keep last 50 logs
  };

  // Initialize Auth from Session
  useEffect(() => {
    const storedToken = sessionStorage.getItem('omnoria_auth_token');
    const storedExpiry = sessionStorage.getItem('omnoria_session_expiry');

    if (storedToken === 'valid' && storedExpiry) {
      const expiryTime = parseInt(storedExpiry, 10);
      if (Date.now() < expiryTime) {
        setIsAuthenticated(true);
      } else {
        // Session expired
        sessionStorage.removeItem('omnoria_auth_token');
        sessionStorage.removeItem('omnoria_session_expiry');
        addLog('Session Expired', 'warning');
      }
    }
  }, []);

  // Step 1: Check credentials with Rate Limiting and Hashing
  const loginStep1 = async (email: string, password: string): Promise<LoginResult> => {
    // Check Rate Limit
    if (Date.now() < lockoutUntil) {
      const remaining = Math.ceil((lockoutUntil - Date.now()) / 1000 / 60);
      addLog('Login Blocked', 'failure', `Attempt while locked out (${remaining}m left)`);
      return { success: false, error: `Too many attempts. Try again in ${remaining} minutes.` };
    }

    const hashedInput = await hashString(password);

    if (email === adminSettings.email && hashedInput === adminSettings.passwordHash) {
      // Success: Reset attempts, move to step 2
      setLoginAttempts(0);
      setLockoutUntil(0);
      setIs2FAPending(true);
      addLog('Login Step 1 Success', 'success', 'Credentials verified');
      return { success: true };
    } else {
      // Failure: Increment attempts
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      
      addLog('Login Failed', 'failure', `Invalid credentials attempt ${newAttempts}/${MAX_ATTEMPTS}`);

      if (newAttempts >= MAX_ATTEMPTS) {
        setLockoutUntil(Date.now() + LOCKOUT_DURATION);
        addLog('System Lockdown', 'warning', 'Max attempts exceeded');
        return { success: false, error: "Maximum attempts exceeded. Locked out for 5 minutes." };
      }
      
      return { success: false, error: "Invalid email or password." };
    }
  };

  // Step 2: Check 2FA Code with Hashing
  const loginStep2 = async (code: string): Promise<LoginResult> => {
    const hashedCode = await hashString(code);
    
    if (hashedCode === adminSettings.twoFactorHash) {
      setIsAuthenticated(true);
      setIs2FAPending(false);
      
      // Set Session
      sessionStorage.setItem('omnoria_auth_token', 'valid');
      sessionStorage.setItem('omnoria_session_expiry', (Date.now() + SESSION_DURATION).toString());
      
      addLog('Login Complete', 'success', '2FA verified');
      return { success: true };
    }
    
    addLog('2FA Failed', 'failure', 'Invalid code provided');
    return { success: false, error: "Invalid 2FA code." };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIs2FAPending(false);
    sessionStorage.removeItem('omnoria_auth_token');
    sessionStorage.removeItem('omnoria_session_expiry');
    addLog('Logout', 'success', 'User logged out manually');
  };

  const updateCredentials = async (currentPassword: string, newSettings: Partial<{ email: string; password: string; code2FA: string }>): Promise<LoginResult> => {
      // 1. Verify Current Password
      const hashedCurrent = await hashString(currentPassword);
      if (hashedCurrent !== adminSettings.passwordHash) {
          addLog('Credential Update Failed', 'failure', 'Wrong current password');
          return { success: false, error: "Current password incorrect." };
      }

      const updated = { ...adminSettings };
      let changes = [];

      // 2. Update Email
      if (newSettings.email) {
          updated.email = newSettings.email;
          changes.push('Email');
      }

      // 3. Update Password
      if (newSettings.password) {
          updated.passwordHash = await hashString(newSettings.password);
          changes.push('Password');
      }

      // 4. Update 2FA
      if (newSettings.code2FA) {
          updated.twoFactorHash = await hashString(newSettings.code2FA);
          changes.push('2FA Code');
      }

      setAdminSettings(updated);
      addLog('Credentials Updated', 'success', `Changed: ${changes.join(', ')}`);
      return { success: true };
  };

  const updateData = (newData: Partial<SiteData>) => setData(prev => ({ ...prev, ...newData }));
  const updateTeam = (newTeam: TeamMember[]) => setTeam(newTeam);
  const updateServices = (newServices: ServiceItem[]) => setServices(newServices);
  const updatePackages = (newPackages: PackageItem[]) => setPackages(newPackages);
  const updateUniversities = (newUnis: University[]) => setUniversities(newUnis);
  const updateScholarships = (newScholarships: Scholarship[]) => setScholarships(newScholarships);
  const updateBlog = (newBlog: BlogPost[]) => setBlog(newBlog);

  return (
    <DataContext.Provider value={{
      data, team, services, packages, universities, scholarships, blog,
      auth: { 
          isAuthenticated, 
          is2FAPending, 
          loginStep1, 
          loginStep2, 
          logout, 
          updateCredentials, 
          logs: securityLogs,
          adminEmail: adminSettings.email 
      },
      updateData, updateTeam, updateServices, updatePackages, updateUniversities, updateScholarships, updateBlog
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within DataProvider");
  return context;
};