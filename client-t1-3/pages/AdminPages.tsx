import React, { useState, useMemo } from 'react';
import { useData } from '../services/dataContext';
import { useNavigate } from 'react-router-dom';
import { Save, Plus, Trash, Edit, X, Check, Globe, Briefcase, GraduationCap, Users, FileText, Lock, ShieldCheck, Mail, Smartphone, Image as ImageIcon, Upload, Loader2, AlertTriangle, Key, Shield, Clock, Eye, EyeOff, Star, MessageSquare } from 'lucide-react';

// --- Helper Components ---

const AdminSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-stone-100 mb-6 transition-all hover:shadow-lg">
    <h2 className="text-xl font-bold text-stone-800 mb-6 border-b pb-2 flex items-center">
      {title}
    </h2>
    {children}
  </div>
);

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  list?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, type = "text", placeholder, list }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-stone-700 mb-1">{label}</label>
    {type === "textarea" ? (
      <textarea 
        className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition-all"
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    ) : (
      <input 
        type={type}
        list={list}
        className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition-all"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    )}
  </div>
);

// --- Image Upload Component ---
const ImageUploadField: React.FC<{ label: string; value?: string; onChange: (val: string) => void }> = ({ label, value, onChange }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File is too large. Please choose an image under 2MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-stone-700 mb-1">{label}</label>
      <div className="flex items-start gap-4 p-4 border border-stone-200 border-dashed rounded-lg bg-stone-50">
        <div className="flex-1">
          <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors w-fit shadow-sm">
            <Upload size={16} className="text-brand-red" />
            <span className="text-sm font-medium text-stone-700">Choose Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <p className="text-xs text-stone-500 mt-2">Supported formats: JPG, PNG. Max size: 2MB.</p>
        </div>
        
        {value ? (
          <div className="w-24 h-24 border border-stone-300 rounded-lg overflow-hidden relative group bg-white shadow-sm flex-shrink-0">
             <img src={value} alt="Preview" className="w-full h-full object-cover" />
             <button
               onClick={() => onChange('')}
               className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
               title="Remove Image"
             >
               <X size={12} />
             </button>
          </div>
        ) : (
          <div className="w-24 h-24 border border-stone-200 rounded-lg bg-stone-100 flex items-center justify-center text-stone-300">
             <ImageIcon size={32} />
          </div>
        )}
      </div>
    </div>
  );
};

// --- Smart Country Tag Input ---
const CountryTagInput: React.FC<{ value: string[]; onChange: (v: string[]) => void; list?: string }> = ({ value = [], onChange, list }) => {
  const [input, setInput] = useState('');

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInput('');
    } else {
      setInput(''); // Clear if duplicate or empty
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input);
    } else if (e.key === 'Backspace' && !input && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const handleBlur = () => {
    if (input) addTag(input);
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-stone-700 mb-1">
        Available Countries <span className="text-stone-400 font-normal text-xs ml-1">(Type and press Enter)</span>
      </label>
      <div 
        className="flex flex-wrap gap-2 p-2 border border-stone-300 rounded-lg focus-within:ring-2 focus-within:ring-brand-red bg-white min-h-[50px] items-center"
      >
        {value.map(tag => (
          <span key={tag} className="flex items-center bg-stone-100 text-brand-brown px-3 py-1 rounded-full text-sm border border-stone-200 shadow-sm animate-fadeIn">
            <Globe size={12} className="mr-2 text-brand-red" />
            {tag}
            <button onClick={() => removeTag(tag)} className="ml-2 text-stone-400 hover:text-red-600 transition-colors">
              <X size={14} />
            </button>
          </span>
        ))}
        <input
          type="text"
          list={list}
          className="flex-1 outline-none bg-transparent min-w-[150px] text-sm py-1 ml-1"
          placeholder={value.length === 0 ? "e.g. Romania, Thailand..." : ""}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
};

// --- Shared Data Hook for Autocomplete ---
const useCountryList = () => {
    const { services, packages, universities, scholarships } = useData();
    
    return useMemo(() => {
        const all = new Set([
            ...services.flatMap(s => s.availableCountries || []),
            ...packages.flatMap(p => p.availableCountries || []),
            ...universities.flatMap(u => u.countries || []),
            ...scholarships.flatMap(s => s.countries || [])
        ]);
        return Array.from(all).sort();
    }, [services, packages, universities, scholarships]);
};

const CountryDatalist = ({ countries }: { countries: string[] }) => (
    <datalist id="global-country-list">
        {countries.map(c => <option key={c} value={c} />)}
    </datalist>
);

// --- Admin Login Page (2FA Enhanced & Secured) ---

export const AdminLogin: React.FC = () => {
  const { auth } = useData();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  
  // Step 1 State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Step 2 State
  const [code, setCode] = useState('');
  
  const [error, setError] = useState('');

  const handleStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    await new Promise(r => setTimeout(r, 800));

    try {
        const result = await auth.loginStep1(email, password);
        if (result.success) {
            setStep(2);
        } else {
            setError(result.error || 'Authentication failed.');
        }
    } catch (err) {
        setError("An unexpected error occurred.");
    } finally {
        setLoading(false);
    }
  };

  const handleStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    await new Promise(r => setTimeout(r, 600));

    try {
        const result = await auth.loginStep2(code);
        if (result.success) {
            navigate('/admin');
        } else {
            setError(result.error || 'Verification failed.');
        }
    } catch (err) {
        setError("An unexpected error occurred.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 p-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-brand-red rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-brand-brown rounded-full filter blur-3xl"></div>
        </div>

      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-stone-200 relative z-10 transition-all">
        
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-brand-brown rounded-full mb-4 shadow-lg">
            {step === 1 ? <Lock className="w-8 h-8 text-white" /> : <ShieldCheck className="w-8 h-8 text-white" />}
          </div>
          <h1 className="text-2xl font-bold text-stone-800">Admin Portal</h1>
          <p className="text-stone-500 text-sm mt-2">
            {step === 1 ? "Secure Login Required" : "Two-Factor Authentication"}
          </p>
        </div>
        
        {step === 1 && (
            <form onSubmit={handleStep1} className="space-y-5">
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-stone-400 w-5 h-5" />
                <input 
                  type="email"
                  placeholder="Admin Email"
                  className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all disabled:bg-stone-50"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(''); }}
                  required
                  disabled={loading}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-stone-400 w-5 h-5" />
                <input 
                  type="password"
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all disabled:bg-stone-50"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  required
                  disabled={loading}
                />
              </div>
              
              {error && (
                  <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg flex items-center animate-fadeIn">
                      <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0"/>
                      {error}
                  </div>
              )}
              
              <button 
                type="submit" 
                className="w-full bg-brand-red text-white py-3 rounded-lg font-bold hover:bg-red-800 transition-all shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Continue"}
              </button>
            </form>
        )}

        {step === 2 && (
            <form onSubmit={handleStep2} className="space-y-5 animate-fadeIn">
              <div className="text-center mb-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-xs text-blue-800">
                      We've sent a verification code to <strong>{email}</strong>. 
                      <br/>(Demo Code: 123456)
                  </p>
              </div>

              <div className="relative">
                <Smartphone className="absolute left-3 top-3.5 text-stone-400 w-5 h-5" />
                <input 
                  type="text"
                  placeholder="Enter 6-digit Code"
                  className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent tracking-widest text-lg font-mono disabled:bg-stone-50"
                  value={code}
                  maxLength={6}
                  onChange={e => { setCode(e.target.value); setError(''); }}
                  autoFocus
                  required
                  disabled={loading}
                />
              </div>

              {error && (
                  <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg flex items-center animate-fadeIn">
                      <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0"/>
                      {error}
                  </div>
              )}

              <button 
                type="submit" 
                className="w-full bg-brand-brown text-white py-3 rounded-lg font-bold hover:bg-stone-800 transition-all shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Verify & Login"}
              </button>
              
              <button 
                type="button"
                onClick={() => { setStep(1); setCode(''); setError(''); }} 
                className="w-full text-sm text-stone-500 hover:text-stone-700 mt-2"
                disabled={loading}
              >
                Back to Login
              </button>
            </form>
        )}

        <div className="mt-8 text-center border-t border-stone-100 pt-4">
            <a href="/" className="text-sm text-stone-400 hover:text-stone-600 flex items-center justify-center gap-1">
                <Globe size={14} /> Back to Omnoria Nexus
            </a>
        </div>
      </div>
    </div>
  );
};

// --- Pages ---

export const AdminDashboard: React.FC = () => {
  const { services, packages, team, universities, scholarships, blog } = useData();
  
  const StatCard = ({ title, count, icon: Icon, colorClass }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-transparent hover:border-brand-red transition-all group">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-stone-500 text-sm font-medium uppercase tracking-wide">{title}</p>
          <h3 className="text-3xl font-bold text-stone-800 mt-1">{count}</h3>
        </div>
        <div className={`p-3 rounded-lg ${colorClass} text-white shadow-lg group-hover:scale-110 transition-transform`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-800">Dashboard</h1>
        <p className="text-stone-500">Overview of your system contents</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Services & Packages" count={services.length + packages.length} icon={Briefcase} colorClass="bg-brand-red" />
        <StatCard title="Team Members" count={team.length} icon={Users} colorClass="bg-brand-brown" />
        <StatCard title="Database Items" count={universities.length + scholarships.length} icon={GraduationCap} colorClass="bg-yellow-600" />
        <StatCard title="Blog Posts" count={blog.length} icon={FileText} colorClass="bg-blue-600" />
      </div>

      <div className="mt-10 bg-white p-8 rounded-xl shadow-sm border border-stone-100">
        <h3 className="text-xl font-bold text-stone-800 mb-4">Quick Tips</h3>
        <ul className="list-disc list-inside text-stone-600 space-y-2">
          <li>Use <strong>Services</strong> to manage individual offerings.</li>
          <li>Use <strong>Packages</strong> to bundle services for specific countries.</li>
          <li><strong>Database</strong> contains Universities and Scholarships used in search results.</li>
          <li>Changes made here update the client website <strong>immediately</strong>.</li>
        </ul>
      </div>
    </div>
  );
};

export const AdminPages: React.FC = () => {
  const { data, updateData } = useData();
  const [formData, setFormData] = useState(data);

  const handleSave = () => {
    updateData(formData);
    alert('Site content updated successfully!');
  };

  return (
    <div className="p-8 pb-32 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8 sticky top-0 bg-stone-100 py-4 z-10 backdrop-blur-sm bg-opacity-90">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">General Content</h1>
          <p className="text-sm text-stone-500">Edit core website information</p>
        </div>
        <button onClick={handleSave} className="flex items-center bg-brand-red text-white px-6 py-3 rounded-lg hover:bg-red-800 shadow-md transition-all active:scale-95">
          <Save className="w-5 h-5 mr-2" /> Save Changes
        </button>
      </div>

      <AdminSection title="Company Identity">
        <div className="grid md:grid-cols-2 gap-6">
          <InputField label="Company Name" value={formData.companyName} onChange={v => setFormData({...formData, companyName: v})} />
          <InputField label="Tagline" value={formData.tagline} onChange={v => setFormData({...formData, tagline: v})} />
        </div>
        <div className="mt-4">
             <ImageUploadField 
               label="Company Logo" 
               value={formData.logoUrl} 
               onChange={v => setFormData({...formData, logoUrl: v})} 
             />
        </div>
      </AdminSection>

      <AdminSection title="Vision & Mission">
        <InputField type="textarea" label="Vision Statement" value={formData.vision} onChange={v => setFormData({...formData, vision: v})} />
      </AdminSection>

      <AdminSection title="Contact Information">
        <div className="grid md:grid-cols-2 gap-6">
          <InputField label="Email Address" value={formData.contact.email} onChange={v => setFormData({...formData, contact: {...formData.contact, email: v}})} />
          <InputField label="Physical Address" value={formData.contact.address} onChange={v => setFormData({...formData, contact: {...formData.contact, address: v}})} />
        </div>
        <InputField label="Phone Numbers (comma separated)" value={formData.contact.phone.join(', ')} onChange={v => setFormData({...formData, contact: {...formData.contact, phone: v.split(',').map(s => s.trim())}})} />
        <div className="mt-4 border-t pt-4">
             <h3 className="text-sm font-bold text-stone-700 mb-3">Social Media Links</h3>
             <div className="grid md:grid-cols-2 gap-4">
                 <InputField label="Facebook" value={formData.contact.socials.facebook} onChange={v => setFormData({...formData, contact: {...formData.contact, socials: {...formData.contact.socials, facebook: v}}})} />
                 <InputField label="Instagram" value={formData.contact.socials.instagram} onChange={v => setFormData({...formData, contact: {...formData.contact, socials: {...formData.contact.socials, instagram: v}}})} />
                 <InputField label="TikTok" value={formData.contact.socials.tiktok} onChange={v => setFormData({...formData, contact: {...formData.contact, socials: {...formData.contact.socials, tiktok: v}}})} />
                 <InputField label="YouTube" value={formData.contact.socials.youtube} onChange={v => setFormData({...formData, contact: {...formData.contact, socials: {...formData.contact.socials, youtube: v}}})} />
             </div>
        </div>
      </AdminSection>

      <AdminSection title="Legal & Policy">
        <InputField type="textarea" label="Service Policy" value={formData.policy.servicePolicy} onChange={v => setFormData({...formData, policy: {...formData.policy, servicePolicy: v}})} />
        <InputField type="textarea" label="Refund Policy" value={formData.policy.refundPolicy} onChange={v => setFormData({...formData, policy: {...formData.policy, refundPolicy: v}})} />
      </AdminSection>
    </div>
  );
};

export const AdminServices: React.FC = () => {
  const { services, updateServices } = useData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const allCountries = useCountryList();

  const startEdit = (service: any) => { setEditingId(service.id); setEditForm({...service}); };
  const saveEdit = () => { updateServices(services.map(s => s.id === editingId ? editForm : s)); setEditingId(null); };
  const addNew = () => {
    const newItem = { id: `s${Date.now()}`, name: "New Service", price: "0 Euro", description: "Description", availableCountries: ["Global"] };
    updateServices([...services, newItem]);
    startEdit(newItem);
  };
  const remove = (id: string) => { if(window.confirm("Delete?")) updateServices(services.filter(s => s.id !== id)); };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <CountryDatalist countries={allCountries} />
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-2xl font-bold text-stone-800">Services</h1>
            <p className="text-stone-500">Manage individual service offerings</p>
        </div>
        <button onClick={addNew} className="flex items-center bg-brand-brown text-white px-5 py-2.5 rounded-lg hover:bg-stone-800 shadow transition-colors">
          <Plus className="w-5 h-5 mr-2" /> Add Service
        </button>
      </div>

      <div className="space-y-4">
        {services.map(service => (
          <div key={service.id} className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 transition-all hover:shadow-md">
            {editingId === service.id ? (
              <div className="space-y-4 animate-fadeIn">
                <InputField label="Service Name" value={editForm.name} onChange={v => setEditForm({...editForm, name: v})} />
                <div className="grid md:grid-cols-2 gap-6">
                  <InputField label="Price" value={editForm.price} onChange={v => setEditForm({...editForm, price: v})} />
                  <div className="mt-0">
                    <CountryTagInput 
                      value={editForm.availableCountries} 
                      onChange={v => setEditForm({...editForm, availableCountries: v})} 
                      list="global-country-list"
                    />
                  </div>
                </div>
                <InputField label="Description" value={editForm.description} onChange={v => setEditForm({...editForm, description: v})} />
                
                <div className="flex gap-3 pt-4 border-t border-stone-100">
                    <button onClick={saveEdit} className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center hover:bg-green-700 font-medium"><Check className="w-4 h-4 mr-2"/> Save</button>
                    <button onClick={() => setEditingId(null)} className="bg-stone-200 text-stone-700 px-6 py-2 rounded-lg flex items-center hover:bg-stone-300 font-medium"><X className="w-4 h-4 mr-2"/> Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-xl text-brand-brown">{service.name}</h3>
                  <p className="text-brand-red font-bold text-lg mb-2">{service.price}</p>
                  <p className="text-stone-600 mb-3">{service.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {service.availableCountries.map((c: string, i: number) => (
                      <span key={i} className="text-xs font-medium bg-stone-100 text-stone-600 border border-stone-200 px-2.5 py-1 rounded-full flex items-center">
                        <Globe size={10} className="mr-1.5 text-stone-400" />
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button onClick={() => startEdit(service)} className="text-stone-400 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-full transition-all"><Edit size={20}/></button>
                  <button onClick={() => remove(service.id)} className="text-stone-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-all"><Trash size={20}/></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const AdminPackages: React.FC = () => {
  const { packages, updatePackages } = useData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const allCountries = useCountryList();

  const startEdit = (pkg: any) => { setEditingId(pkg.id); setEditForm({...pkg}); };
  const saveEdit = () => { updatePackages(packages.map(p => p.id === editingId ? editForm : p)); setEditingId(null); };
  const addNew = () => {
    const newItem = { id: `p${Date.now()}`, title: "New Package", price: "0 EURO", features: ["Feature 1"], availableCountries: ["Global"] };
    updatePackages([...packages, newItem]);
    startEdit(newItem);
  };
  const remove = (id: string) => { if(window.confirm("Delete?")) updatePackages(packages.filter(p => p.id !== id)); };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <CountryDatalist countries={allCountries} />
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-2xl font-bold text-stone-800">Packages</h1>
            <p className="text-stone-500">Manage bundled service packages</p>
        </div>
        <button onClick={addNew} className="flex items-center bg-brand-brown text-white px-5 py-2.5 rounded-lg hover:bg-stone-800 shadow transition-colors">
          <Plus className="w-5 h-5 mr-2" /> Add Package
        </button>
      </div>

      <div className="grid gap-6">
        {packages.map(pkg => (
          <div key={pkg.id} className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
            {editingId === pkg.id ? (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid md:grid-cols-2 gap-6">
                  <InputField label="Package Title" value={editForm.title} onChange={v => setEditForm({...editForm, title: v})} />
                  <InputField label="Price" value={editForm.price} onChange={v => setEditForm({...editForm, price: v})} />
                </div>
                
                <CountryTagInput 
                  value={editForm.availableCountries} 
                  onChange={v => setEditForm({...editForm, availableCountries: v})} 
                  list="global-country-list"
                />

                <div>
                   <label className="block text-sm font-semibold text-stone-700 mb-1">Features <span className="text-stone-400 font-normal text-xs">(One per line)</span></label>
                   <textarea 
                      className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brand-red outline-none" 
                      rows={5}
                      value={editForm.features.join('\n')}
                      onChange={e => setEditForm({...editForm, features: e.target.value.split('\n')})}
                   />
                </div>

                <div className="flex gap-3 pt-4 border-t border-stone-100">
                    <button onClick={saveEdit} className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center hover:bg-green-700 font-medium"><Check className="w-4 h-4 mr-2"/> Save</button>
                    <button onClick={() => setEditingId(null)} className="bg-stone-200 text-stone-700 px-6 py-2 rounded-lg flex items-center hover:bg-stone-300 font-medium"><X className="w-4 h-4 mr-2"/> Cancel</button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-bold text-xl text-brand-brown">{pkg.title}</h3>
                        <p className="text-brand-red font-bold text-lg">{pkg.price}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                        <button onClick={() => startEdit(pkg)} className="text-stone-400 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-full transition-all"><Edit size={20}/></button>
                        <button onClick={() => remove(pkg.id)} className="text-stone-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-all"><Trash size={20}/></button>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 bg-stone-50 p-4 rounded-lg">
                    <div>
                        <h4 className="font-bold text-xs uppercase text-stone-400 mb-3 tracking-wider">Included Features</h4>
                        <ul className="space-y-1">
                            {pkg.features.map((f: string, i: number) => (
                                <li key={i} className="text-sm text-stone-700 flex items-start">
                                    <span className="w-1.5 h-1.5 bg-brand-red rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-xs uppercase text-stone-400 mb-3 tracking-wider">Availability</h4>
                        <div className="flex flex-wrap gap-2">
                             {pkg.availableCountries.map((c: string, i: number) => (
                                <span key={i} className="text-xs bg-white text-stone-600 border border-stone-200 px-2.5 py-1 rounded-full flex items-center">
                                   <Globe size={10} className="mr-1.5 text-stone-400" />
                                   {c}
                                </span>
                             ))}
                        </div>
                    </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const AdminTeam: React.FC = () => {
    const { team, updateTeam } = useData();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<any>({});
    
    // Review form state
    const [newReview, setNewReview] = useState<{clientName: string, text: string, rating: number}>({clientName: '', text: '', rating: 5});

    const startEdit = (member: any) => { setEditingId(member.id); setEditForm({...member}); setNewReview({clientName: '', text: '', rating: 5}); };
    const saveEdit = () => { updateTeam(team.map(t => t.id === editingId ? editForm : t)); setEditingId(null); };
    const addNew = () => {
        const newItem = { id: `t${Date.now()}`, name: "New Member", position: "Position", bio: "Bio", email: "", linkedin: "", photoUrl: "", reviews: [] };
        updateTeam([...team, newItem]);
        startEdit(newItem);
    };
    const remove = (id: string) => { if(window.confirm("Remove?")) updateTeam(team.filter(t => t.id !== id)); };

    // --- Review Management ---
    const addReview = () => {
        if (!newReview.clientName || !newReview.text) return;
        const review = {
            id: `r${Date.now()}`,
            ...newReview
        };
        setEditForm({
            ...editForm,
            reviews: [...(editForm.reviews || []), review]
        });
        setNewReview({clientName: '', text: '', rating: 5});
    };

    const removeReview = (reviewId: string) => {
        setEditForm({
            ...editForm,
            reviews: (editForm.reviews || []).filter((r: any) => r.id !== reviewId)
        });
    };

    const updateReview = (reviewId: string, field: string, value: any) => {
        setEditForm({
            ...editForm,
            reviews: (editForm.reviews || []).map((r: any) => 
                r.id === reviewId ? { ...r, [field]: value } : r
            )
        });
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-stone-800">Team Management</h1>
                    <p className="text-stone-500">Add or edit team member profiles</p>
                </div>
                <button onClick={addNew} className="flex items-center bg-brand-brown text-white px-5 py-2.5 rounded-lg hover:bg-stone-800 shadow transition-colors">
                    <Plus className="w-5 h-5 mr-2" /> Add Member
                </button>
            </div>
             <div className="grid gap-4">
                {team.map(t => (
                    <div key={t.id} className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                         {editingId === t.id ? (
                            <div className="space-y-4 animate-fadeIn">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <InputField label="Full Name" value={editForm.name} onChange={v => setEditForm({...editForm, name: v})} />
                                    <InputField label="Position / Title" value={editForm.position} onChange={v => setEditForm({...editForm, position: v})} />
                                </div>
                                <InputField label="Email Address" value={editForm.email} onChange={v => setEditForm({...editForm, email: v})} />
                                <ImageUploadField label="Profile Photo" value={editForm.photoUrl} onChange={v => setEditForm({...editForm, photoUrl: v})} />
                                <InputField type="textarea" label="Bio / Description" value={editForm.bio} onChange={v => setEditForm({...editForm, bio: v})} />
                                
                                {/* Client Reviews Section inside Editor */}
                                <div className="mt-6 border-t border-stone-100 pt-6">
                                    <h3 className="font-bold text-stone-800 mb-4 flex items-center">
                                        <MessageSquare size={18} className="mr-2 text-brand-red"/> Client Reviews (Editable)
                                    </h3>
                                    
                                    <div className="space-y-3 mb-6">
                                        {(editForm.reviews || []).length === 0 && <p className="text-sm text-stone-400 italic">No reviews yet.</p>}
                                        {(editForm.reviews || []).map((r: any) => (
                                            <div key={r.id} className="bg-stone-50 p-3 rounded-lg border border-stone-200">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="flex-1 mr-4 space-y-2">
                                                        <div className="flex gap-2">
                                                            <input 
                                                                className="text-sm font-bold text-stone-800 bg-white border border-stone-300 rounded px-2 py-1 w-1/2"
                                                                value={r.clientName}
                                                                onChange={(e) => updateReview(r.id, 'clientName', e.target.value)}
                                                                placeholder="Client Name"
                                                            />
                                                            <div className="flex items-center gap-1">
                                                                <input 
                                                                    type="number"
                                                                    min="1"
                                                                    max="5"
                                                                    className="text-xs bg-white border border-stone-300 rounded px-2 py-1 w-12"
                                                                    value={r.rating}
                                                                    onChange={(e) => updateReview(r.id, 'rating', parseInt(e.target.value))}
                                                                />
                                                                <Star size={12} className="fill-yellow-500 text-yellow-500"/>
                                                            </div>
                                                        </div>
                                                        <textarea 
                                                            className="text-sm text-stone-600 italic bg-white border border-stone-300 rounded px-2 py-1 w-full"
                                                            rows={2}
                                                            value={r.text}
                                                            onChange={(e) => updateReview(r.id, 'text', e.target.value)}
                                                            placeholder="Review Text"
                                                        />
                                                    </div>
                                                    <button onClick={() => removeReview(r.id)} className="text-stone-400 hover:text-red-500 p-1">
                                                        <Trash size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                                        <h4 className="text-sm font-bold text-stone-700 mb-2">Add New Review</h4>
                                        <div className="grid md:grid-cols-3 gap-4 mb-2">
                                            <input 
                                                className="p-2 border border-stone-300 rounded text-sm w-full" 
                                                placeholder="Client Name"
                                                value={newReview.clientName}
                                                onChange={e => setNewReview({...newReview, clientName: e.target.value})}
                                            />
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-stone-500">Rating:</span>
                                                <select 
                                                    className="p-2 border border-stone-300 rounded text-sm flex-1"
                                                    value={newReview.rating}
                                                    onChange={e => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                                                >
                                                    {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <textarea 
                                            className="w-full p-2 border border-stone-300 rounded text-sm mb-2" 
                                            placeholder="Review text..."
                                            rows={2}
                                            value={newReview.text}
                                            onChange={e => setNewReview({...newReview, text: e.target.value})}
                                        />
                                        <button 
                                            type="button" 
                                            onClick={addReview} 
                                            className="text-sm bg-stone-200 hover:bg-stone-300 text-stone-800 px-4 py-2 rounded transition-colors w-full"
                                        >
                                            Add Review
                                        </button>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4 border-t border-stone-200">
                                    <button onClick={saveEdit} className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center hover:bg-green-700 font-medium"><Check className="w-4 h-4 mr-2"/> Save</button>
                                    <button onClick={() => setEditingId(null)} className="bg-stone-200 text-stone-700 px-6 py-2 rounded-lg flex items-center hover:bg-stone-300 font-medium"><X className="w-4 h-4 mr-2"/> Cancel</button>
                                </div>
                            </div>
                         ) : (
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-5">
                                    {t.photoUrl ? (
                                        <img src={t.photoUrl} alt={t.name} className="w-16 h-16 rounded-full object-cover shadow-md" />
                                    ) : (
                                        <div className="w-16 h-16 bg-gradient-to-br from-brand-red to-red-900 text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-md">
                                            {t.name.charAt(0)}
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="font-bold text-lg text-stone-800">{t.name}</h4>
                                        <p className="text-sm text-brand-red font-semibold uppercase tracking-wide">{t.position}</p>
                                        <p className="text-sm text-stone-500 mt-1">{t.email}</p>
                                        {(t.reviews?.length || 0) > 0 && (
                                            <div className="flex items-center gap-1 mt-2 text-xs text-stone-400 bg-stone-50 px-2 py-1 rounded w-fit">
                                                <MessageSquare size={12}/> {t.reviews?.length} Reviews
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => startEdit(t)} className="text-stone-400 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-full transition-all"><Edit size={20}/></button>
                                    <button onClick={() => remove(t.id)} className="text-stone-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-all"><Trash size={20}/></button>
                                </div>
                            </div>
                         )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export const AdminDatabase: React.FC = () => {
  const { universities, updateUniversities, scholarships, updateScholarships } = useData();
  const [activeTab, setActiveTab] = useState<'universities' | 'scholarships'>('universities');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const allCountries = useCountryList();

  const startEdit = (item: any) => { setEditingId(item.id); setEditForm({...item}); };
  const cancelEdit = () => { setEditingId(null); setEditForm({}); };

  const saveUniversity = () => { updateUniversities(universities.map(u => u.id === editingId ? editForm : u)); cancelEdit(); };
  const addUniversity = () => { const newItem = { id: `u${Date.now()}`, name: "New University", countries: ["Romania"], description: "Description" }; updateUniversities([...universities, newItem]); startEdit(newItem); };
  const deleteUniversity = (id: string) => { if(window.confirm("Delete?")) updateUniversities(universities.filter(u => u.id !== id)); };

  const saveScholarship = () => { updateScholarships(scholarships.map(s => s.id === editingId ? editForm : s)); cancelEdit(); };
  const addScholarship = () => { const newItem = { id: `sc${Date.now()}`, name: "New Scholarship", countries: ["Romania"], amount: "Amount", deadline: "Deadline" }; updateScholarships([...scholarships, newItem]); startEdit(newItem); };
  const deleteScholarship = (id: string) => { if(window.confirm("Delete?")) updateScholarships(scholarships.filter(s => s.id !== id)); };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <CountryDatalist countries={allCountries} />
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">Database</h1>
          <p className="text-stone-500">Manage Universities and Scholarships</p>
        </div>
        <div className="flex bg-stone-200 p-1 rounded-lg">
           <button 
             onClick={() => { setActiveTab('universities'); cancelEdit(); }}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'universities' ? 'bg-white text-brand-red shadow-sm' : 'text-stone-600 hover:text-stone-800'}`}
           >
             Universities
           </button>
           <button 
             onClick={() => { setActiveTab('scholarships'); cancelEdit(); }}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'scholarships' ? 'bg-white text-brand-red shadow-sm' : 'text-stone-600 hover:text-stone-800'}`}
           >
             Scholarships
           </button>
        </div>
      </div>

      {activeTab === 'universities' ? (
        <div>
           <button onClick={addUniversity} className="mb-6 flex items-center bg-brand-brown text-white px-5 py-2.5 rounded-lg hover:bg-stone-800 shadow transition-colors">
              <Plus className="w-5 h-5 mr-2" /> Add University
           </button>
           <div className="space-y-4">
             {universities.map(uni => (
               <div key={uni.id} className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                 {editingId === uni.id ? (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="grid md:grid-cols-2 gap-6">
                        <InputField label="University Name" value={editForm.name} onChange={v => setEditForm({...editForm, name: v})} />
                        {/* Enhanced Input with Country Tag Input */}
                        <CountryTagInput 
                            value={editForm.countries || []} 
                            onChange={v => setEditForm({...editForm, countries: v})}
                            list="global-country-list"
                        />
                      </div>
                      <InputField type="textarea" label="Description" value={editForm.description} onChange={v => setEditForm({...editForm, description: v})} />
                      <div className="flex gap-3 pt-2">
                        <button onClick={saveUniversity} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-medium">Save</button>
                        <button onClick={cancelEdit} className="bg-stone-200 text-stone-700 px-6 py-2 rounded-lg hover:bg-stone-300 font-medium">Cancel</button>
                      </div>
                    </div>
                 ) : (
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                             <h3 className="font-bold text-lg text-stone-800">{uni.name}</h3>
                             <div className="flex flex-wrap gap-1">
                                {uni.countries && uni.countries.map((c: string) => (
                                    <span key={c} className="text-xs bg-stone-100 text-stone-600 border border-stone-200 px-2.5 py-0.5 rounded-full flex items-center font-medium">
                                        <Globe size={12} className="mr-1.5 text-brand-red" />
                                        {c}
                                    </span>
                                ))}
                             </div>
                        </div>
                        <p className="text-stone-600">{uni.description}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button onClick={() => startEdit(uni)} className="text-stone-400 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-full transition-all"><Edit size={20}/></button>
                        <button onClick={() => deleteUniversity(uni.id)} className="text-stone-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-all"><Trash size={20}/></button>
                      </div>
                    </div>
                 )}
               </div>
             ))}
           </div>
        </div>
      ) : (
        <div>
           <button onClick={addScholarship} className="mb-6 flex items-center bg-brand-brown text-white px-5 py-2.5 rounded-lg hover:bg-stone-800 shadow transition-colors">
              <Plus className="w-5 h-5 mr-2" /> Add Scholarship
           </button>
           <div className="space-y-4">
             {scholarships.map(sch => (
               <div key={sch.id} className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                 {editingId === sch.id ? (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="grid md:grid-cols-2 gap-6">
                        <InputField label="Scholarship Name" value={editForm.name} onChange={v => setEditForm({...editForm, name: v})} />
                        {/* Enhanced Input with Country Tag Input */}
                        <CountryTagInput 
                            value={editForm.countries || []} 
                            onChange={v => setEditForm({...editForm, countries: v})}
                            list="global-country-list"
                        />
                      </div>
                      <InputField label="Amount/Coverage" value={editForm.amount} onChange={v => setEditForm({...editForm, amount: v})} />
                      <InputField label="Deadline" value={editForm.deadline} onChange={v => setEditForm({...editForm, deadline: v})} />
                      <div className="flex gap-3 pt-2">
                        <button onClick={saveScholarship} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-medium">Save</button>
                        <button onClick={cancelEdit} className="bg-stone-200 text-stone-700 px-6 py-2 rounded-lg hover:bg-stone-300 font-medium">Cancel</button>
                      </div>
                    </div>
                 ) : (
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg text-stone-800">{sch.name}</h3>
                        <div className="flex gap-2 my-2 items-center">
                            <div className="flex flex-wrap gap-1">
                                {sch.countries && sch.countries.map((c: string) => (
                                    <span key={c} className="text-xs bg-stone-100 text-stone-600 border border-stone-200 px-2.5 py-0.5 rounded-full flex items-center font-medium">
                                        <Globe size={12} className="mr-1.5 text-brand-red" />
                                        {c}
                                    </span>
                                ))}
                            </div>
                          <span className="text-xs bg-red-50 text-red-700 px-2.5 py-0.5 rounded border border-red-100">Deadline: {sch.deadline}</span>
                        </div>
                        <p className="text-sm text-stone-600"><strong>Coverage:</strong> {sch.amount}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button onClick={() => startEdit(sch)} className="text-stone-400 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-full transition-all"><Edit size={20}/></button>
                        <button onClick={() => deleteScholarship(sch.id)} className="text-stone-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-all"><Trash size={20}/></button>
                      </div>
                    </div>
                 )}
               </div>
             ))}
           </div>
        </div>
      )}
    </div>
  );
};

export const AdminBlog: React.FC = () => {
    const { blog, updateBlog } = useData();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<any>({});
    
    const startEdit = (post: any) => { setEditingId(post.id); setEditForm({...post}); };
    const cancelEdit = () => { setEditingId(null); setEditForm({}); };

    const savePost = () => { updateBlog(blog.map(b => b.id === editingId ? editForm : b)); cancelEdit(); };
    const addPost = () => { const newItem = { id: `b${Date.now()}`, title: "New Post", date: new Date().toISOString().split('T')[0], content: "Content here...", imageUrl: "" }; updateBlog([...blog, newItem]); startEdit(newItem); };
    const deletePost = (id: string) => { if(window.confirm("Delete?")) updateBlog(blog.filter(b => b.id !== id)); };

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-stone-800">Blog Posts</h1>
                    <p className="text-stone-500">Manage news and articles</p>
                </div>
                <button onClick={addPost} className="flex items-center bg-brand-brown text-white px-5 py-2.5 rounded-lg hover:bg-stone-800 shadow transition-colors">
                  <Plus className="w-5 h-5 mr-2" /> New Post
               </button>
            </div>
           <div className="space-y-6">
                {blog.map(post => (
                    <div key={post.id} className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                        {editingId === post.id ? (
                            <div className="space-y-4 animate-fadeIn">
                                <InputField label="Post Title" value={editForm.title} onChange={v => setEditForm({...editForm, title: v})} />
                                <InputField label="Date (YYYY-MM-DD)" value={editForm.date} onChange={v => setEditForm({...editForm, date: v})} />
                                <ImageUploadField label="Featured Image" value={editForm.imageUrl} onChange={v => setEditForm({...editForm, imageUrl: v})} />
                                <InputField type="textarea" label="Content" value={editForm.content} onChange={v => setEditForm({...editForm, content: v})} />
                                <div className="flex gap-3 pt-2">
                                    <button onClick={savePost} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-medium">Save</button>
                                    <button onClick={cancelEdit} className="bg-stone-200 text-stone-700 px-6 py-2 rounded-lg hover:bg-stone-300 font-medium">Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex gap-4">
                                       {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="w-24 h-24 object-cover rounded-lg" />}
                                       <div>
                                            <h3 className="font-bold text-xl text-stone-800">{post.title}</h3>
                                            <p className="text-sm text-stone-400 mb-2">{post.date}</p>
                                            <p className="text-stone-600 line-clamp-2">{post.content}</p>
                                       </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <button onClick={() => startEdit(post)} className="text-stone-400 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-full transition-all"><Edit size={20}/></button>
                                    <button onClick={() => deletePost(post.id)} className="text-stone-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-all"><Trash size={20}/></button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export const AdminSecurity: React.FC = () => {
  const { auth } = useData();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newCode, setNewCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<{type: 'success'|'error', text: string} | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      setMessage({ type: 'error', text: 'Current password is required to verify identity.' });
      return;
    }
    
    const updates: any = {};
    if (newEmail) updates.email = newEmail;
    if (newPassword) updates.password = newPassword;
    if (newCode) updates.code2FA = newCode;

    if (Object.keys(updates).length === 0) {
       setMessage({ type: 'error', text: 'No changes detected. Please fill at least one field to update.' });
       return;
    }

    const result = await auth.updateCredentials(currentPassword, updates);
    if (result.success) {
      setMessage({ type: 'success', text: 'Admin credentials updated successfully.' });
      setCurrentPassword('');
      setNewEmail('');
      setNewPassword('');
      setNewCode('');
    } else {
      setMessage({ type: 'error', text: result.error || 'Update failed. Check your current password.' });
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-800">Security & Access</h1>
        <p className="text-stone-500">Manage admin credentials and monitor security logs</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Update Credentials Form */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-200">
           <h2 className="text-xl font-bold text-stone-800 mb-6 flex items-center">
             <Key className="mr-2 text-brand-red" /> Update Credentials
           </h2>
           
           <form onSubmit={handleUpdate} className="space-y-5">
             <div className="p-4 bg-stone-50 rounded-lg border border-stone-100 mb-4">
                 <label className="block text-sm font-bold text-stone-700 mb-1">Current Password (Required)</label>
                 <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"}
                      className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brand-red outline-none"
                      placeholder="Enter current password to authorize changes"
                      value={currentPassword}
                      onChange={e => setCurrentPassword(e.target.value)}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-stone-400 hover:text-stone-600">
                        {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                    </button>
                 </div>
             </div>

             <div className="space-y-4">
                 <InputField label="New Email Address" placeholder="Leave blank to keep current" value={newEmail} onChange={setNewEmail} />
                 <div className="relative">
                    <InputField label="New Password" type="password" placeholder="Leave blank to keep current" value={newPassword} onChange={setNewPassword} />
                 </div>
                 <InputField label="New 2FA Code (6-digits)" placeholder="Leave blank to keep current" value={newCode} onChange={setNewCode} />
             </div>

             {message && (
                <div className={`p-3 rounded-lg flex items-center text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {message.type === 'success' ? <Check size={16} className="mr-2"/> : <AlertTriangle size={16} className="mr-2"/>}
                    {message.text}
                </div>
             )}

             <button type="submit" className="w-full bg-brand-brown text-white py-3 rounded-lg font-bold hover:bg-stone-800 transition-all shadow-md mt-2">
                Update Credentials
             </button>
           </form>
        </div>

        {/* Security Board */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-200 flex flex-col h-full">
            <h2 className="text-xl font-bold text-stone-800 mb-6 flex items-center">
                <Shield className="mr-2 text-blue-600" /> Security Board
            </h2>
            
            <div className="flex-1 overflow-auto max-h-[500px] pr-2 custom-scrollbar">
                {auth.logs.length === 0 ? (
                    <div className="text-center py-10 text-stone-400">
                        <ShieldCheck size={48} className="mx-auto mb-3 opacity-50"/>
                        <p>No security events recorded yet.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {auth.logs.map(log => (
                            <div key={log.id} className="flex items-start p-3 rounded-lg border border-stone-100 hover:bg-stone-50 transition-colors">
                                <div className={`mt-1 mr-3 flex-shrink-0 w-2 h-2 rounded-full ${
                                    log.status === 'success' ? 'bg-green-500' : 
                                    log.status === 'failure' ? 'bg-red-500' : 'bg-yellow-500'
                                }`}></div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold text-sm text-stone-800 truncate">{log.event}</h4>
                                        <span className="text-xs text-stone-400 flex items-center flex-shrink-0 ml-2">
                                            <Clock size={10} className="mr-1"/> {new Date(log.timestamp).toLocaleTimeString()}
                                        </span>
                                    </div>
                                    <p className="text-xs text-stone-500 break-words">{log.details}</p>
                                    <p className="text-[10px] text-stone-300 mt-1">{new Date(log.timestamp).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};