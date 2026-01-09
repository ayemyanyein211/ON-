import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { DataProvider, useData } from './services/dataContext';
import { ClientNavbar } from './components/ClientNavbar';
import { AdminNavbar } from './components/AdminNavbar';
import { Footer } from './components/Footer';

// Pages
import { Home, Team, Services, Packages, Universities, Scholarships, Blog, Contact, Policy } from './pages/ClientPages';
import { AdminDashboard, AdminPages, AdminServices, AdminPackages, AdminTeam, AdminDatabase, AdminBlog, AdminLogin, AdminSecurity } from './pages/AdminPages';

// --- Protected Route Wrapper ---
const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { auth } = useData();
  if (!auth.isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

// --- Layout Wrapper ---
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdminSection = location.pathname.startsWith('/admin');
  const isLoginPage = location.pathname === '/admin/login';

  // Admin Panel Layout
  if (isAdminSection && !isLoginPage) {
    return (
      <div className="flex min-h-screen bg-stone-100">
        <AdminNavbar />
        <main className="ml-64 flex-1 overflow-auto">
          {children}
        </main>
      </div>
    );
  }

  // Standalone Layout (Login Page or others)
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Client Website Layout
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900">
      <ClientNavbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Client Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/services" element={<Services />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/universities" element={<Universities />} />
            <Route path="/scholarships" element={<Scholarships />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/policy" element={<Policy />} />

            {/* Admin Authentication */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/pages" element={<ProtectedRoute><AdminPages /></ProtectedRoute>} />
            <Route path="/admin/services" element={<ProtectedRoute><AdminServices /></ProtectedRoute>} />
            <Route path="/admin/packages" element={<ProtectedRoute><AdminPackages /></ProtectedRoute>} />
            <Route path="/admin/team" element={<ProtectedRoute><AdminTeam /></ProtectedRoute>} />
            <Route path="/admin/database" element={<ProtectedRoute><AdminDatabase /></ProtectedRoute>} />
            <Route path="/admin/blog" element={<ProtectedRoute><AdminBlog /></ProtectedRoute>} />
            <Route path="/admin/security" element={<ProtectedRoute><AdminSecurity /></ProtectedRoute>} />
          </Routes>
        </Layout>
      </Router>
    </DataProvider>
  );
};

export default App;