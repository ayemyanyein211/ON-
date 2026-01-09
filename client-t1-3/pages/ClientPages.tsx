import React, { useState } from 'react';
import { useData } from '../services/dataContext';
import { Search, MapPin, CheckCircle, User, BookOpen, GraduationCap, Plane, FileText, Mail, Phone, Globe, Shield, ArrowRight, Star, Quote, MessageSquarePlus, X } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Shared Components ---
const PageHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="bg-brand-brown text-white py-20 text-center relative overflow-hidden">
    <div className="absolute inset-0 bg-black opacity-30"></div>
    {/* Decorative Circles */}
    <div className="absolute top-0 left-0 w-64 h-64 bg-brand-red rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
    <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>
    
    <div className="relative z-10 max-w-4xl mx-auto px-4 animate-fadeIn">
      <h1 className="text-5xl font-bold mb-4 tracking-tight">{title}</h1>
      {subtitle && <p className="text-xl text-stone-200 font-light">{subtitle}</p>}
    </div>
  </div>
);

const SearchBar: React.FC<{ placeholder: string; value: string; onChange: (v: string) => void }> = ({ placeholder, value, onChange }) => (
  <div className="relative max-w-lg mx-auto mb-10 group">
    <input
      type="text"
      className="w-full pl-12 pr-4 py-4 border border-stone-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <Search className="absolute left-4 top-4 text-stone-400 h-6 w-6 group-focus-within:text-brand-red transition-colors" />
  </div>
);

// --- Pages ---

export const Home: React.FC = () => {
  const { data, packages } = useData();
  return (
    <div>
      {/* Hero */}
      <div className="relative bg-stone-900 h-[650px] flex items-center justify-center text-center px-4 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?auto=format&fit=crop&q=80&w=2000" 
          alt="International Education" 
          className="absolute inset-0 w-full h-full object-cover opacity-30 scale-105 animate-pulse-slow" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-stone-900/50"></div>
        
        <div className="relative z-10 max-w-5xl animate-slideUp">
          <div className="inline-block px-4 py-1 border border-brand-red/50 rounded-full bg-brand-red/10 text-brand-red font-bold text-sm mb-6 tracking-widest uppercase backdrop-blur-sm">
            One-Stop International Services
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            <span className="text-brand-red">ON</span> TO THE WORLD
          </h1>
          <p className="text-xl md:text-2xl text-stone-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Your global connection, opportunity, and seamless international support.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/services" className="bg-brand-red hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-red-900/50">
              Explore Services
            </Link>
            <Link to="/contact" className="bg-white hover:bg-stone-100 text-brand-brown px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Brand Meaning Section */}
      <div className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-brown mb-4">Brand Meaning</h2>
            <div className="w-24 h-1 bg-brand-red mx-auto"></div>
            <p className="mt-4 text-stone-500 max-w-2xl mx-auto">
              Omnoria Nexus represents global connection, opportunity, and seamless international support.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 text-center hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-brand-red text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform">ON</div>
              <h3 className="text-xl font-bold text-brand-brown mb-3">"On to the World"</h3>
              <p className="text-stone-600">Symbolizes forward movement, global access, and new international opportunities.</p>
            </div>
            <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 text-center hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-brand-brown text-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Globe size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-brown mb-3">Omnoria</h3>
              <p className="text-stone-600">From "Omni", meaning all or universal, reflecting worldwide reach.</p>
            </div>
            <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 text-center hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-stone-800 text-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-brown mb-3">Nexus</h3>
              <p className="text-stone-600">Meaning connection or link, highlighting our role as a bridge between students, institutions, and countries.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Company Profile & Vision */}
      <div className="py-24 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Company Profile</h2>
            <p className="text-stone-400 mb-6 leading-relaxed">
              <strong>Omnoria Nexus</strong> is an international education and travel support consultancy providing information, guidance, and administrative services for international students and global travelers.
            </p>
            <p className="text-stone-400 mb-6 leading-relaxed">
              We assist clients with education consultation, admissions, scholarship and exchange program information, visa support, travel planning, accommodation, documentation, and post-arrival services.
            </p>
            <div className="bg-stone-800 p-6 rounded-lg border-l-4 border-brand-red">
              <h4 className="font-bold text-white mb-2">Our Vision</h4>
              <p className="text-stone-400 italic">"{data.vision}"</p>
            </div>
          </div>
          <div className="bg-white text-brand-brown p-10 rounded-2xl shadow-2xl relative">
             <div className="absolute -top-4 -right-4 w-20 h-20 bg-brand-red rounded-full opacity-20 blur-xl"></div>
             <h3 className="text-2xl font-bold mb-6 border-b border-stone-200 pb-4">Our Mission</h3>
             <ul className="space-y-4">
               {data.mission.map((m, i) => (
                 <li key={i} className="flex items-start">
                   <CheckCircle className="text-brand-red w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                   <span className="text-stone-700 text-sm font-medium">{m}</span>
                 </li>
               ))}
             </ul>
          </div>
        </div>
      </div>

      {/* Featured Packages */}
      <div className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-brown mb-4">Featured Packages</h2>
            <p className="text-stone-500">Choose from our tailored service bundles</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Show Package 1, 3, and 6 as featured */}
            {packages.filter(p => p.id === 'p1' || p.id === 'p3' || p.id === 'p6').map(pkg => (
              <div key={pkg.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col border border-stone-100 overflow-hidden group">
                <div className="p-8 flex-1">
                  <h3 className="text-xl font-bold text-brand-brown mb-2 group-hover:text-brand-red transition-colors">{pkg.title}</h3>
                  <div className="text-3xl font-extrabold text-brand-red mb-6">{pkg.price}</div>
                  <ul className="space-y-3 mb-6">
                    {pkg.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="text-sm text-stone-600 flex items-start">
                        <div className="w-1.5 h-1.5 bg-brand-brown rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                        {f}
                      </li>
                    ))}
                    {pkg.features.length > 4 && <li className="text-xs text-stone-400 italic">+ {pkg.features.length - 4} more features</li>}
                  </ul>
                </div>
                <div className="p-4 bg-stone-50 border-t border-stone-100 text-center">
                  <Link to="/packages" className="text-brand-brown font-bold text-sm flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                    View Full Details <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/packages" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-brown hover:bg-stone-800 md:py-4 md:text-lg md:px-10 shadow-md">
              View All Packages
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Team: React.FC = () => {
  const { team, updateTeam } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, text: '' });

  const handleOpenModal = (memberId: string) => {
    setSelectedMemberId(memberId);
    setReviewForm({ name: '', rating: 5, text: '' });
    setIsModalOpen(true);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMemberId) return;

    const updatedTeam = team.map(member => {
      if (member.id === selectedMemberId) {
        return {
          ...member,
          reviews: [
            ...(member.reviews || []),
            {
              id: `r${Date.now()}`,
              clientName: reviewForm.name,
              rating: reviewForm.rating,
              text: reviewForm.text
            }
          ]
        };
      }
      return member;
    });

    updateTeam(updatedTeam);
    setIsModalOpen(false);
    alert("Thank you for your review!");
  };

  return (
    <div>
      <PageHeader title="Meet Our Team" subtitle="Dedicated professionals guiding your journey" />
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="space-y-16">
          {team.map(member => (
            <div key={member.id} className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-lg overflow-hidden border border-stone-100">
              {/* Member Profile Image */}
              <div className="lg:w-1/3 bg-stone-200 relative h-96 lg:h-auto">
                <img 
                  src={member.photoUrl || `https://picsum.photos/seed/${member.id}/400/500`} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                   <div className="text-white">
                     <h3 className="text-2xl font-bold">{member.name}</h3>
                     <p className="text-brand-red font-bold uppercase tracking-wide text-sm">{member.position}</p>
                   </div>
                </div>
              </div>
              
              {/* Member Info & Reviews */}
              <div className="lg:w-2/3 p-8 lg:p-12 flex flex-col">
                <div className="mb-8">
                    <h4 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                        <User size={20} className="text-brand-brown"/> About {member.name.split(' ')[0]}
                    </h4>
                    <p className="text-stone-600 leading-relaxed mb-6">{member.bio}</p>
                    <div className="flex items-center gap-2 text-sm text-stone-500 bg-stone-50 w-fit px-4 py-2 rounded-lg border border-stone-200">
                        <Mail size={16} /> <a href={`mailto:${member.email}`} className="hover:text-brand-red">{member.email}</a>
                    </div>
                </div>

                {/* Client Reviews Section */}
                <div className="mt-auto pt-8 border-t border-stone-100">
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="text-lg font-bold text-stone-800 flex items-center gap-2">
                            <Quote size={20} className="text-brand-red"/> Client Testimonials
                        </h4>
                        <button 
                            onClick={() => handleOpenModal(member.id)}
                            className="text-sm flex items-center gap-2 bg-brand-brown text-white px-4 py-2 rounded-lg hover:bg-stone-800 transition-colors shadow-sm"
                        >
                            <MessageSquarePlus size={16}/> Write a Review
                        </button>
                    </div>

                    {member.reviews && member.reviews.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-4">
                            {member.reviews.map(review => (
                                <div key={review.id} className="bg-stone-50 p-5 rounded-xl border border-stone-100 relative group hover:shadow-md transition-all">
                                    <div className="flex gap-1 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={12} className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-stone-300"} />
                                        ))}
                                    </div>
                                    <p className="text-stone-600 text-sm italic mb-3">"{review.text}"</p>
                                    <p className="text-xs font-bold text-brand-brown uppercase tracking-wide">— {review.clientName}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-stone-400 italic text-sm">No reviews yet. Be the first to review {member.name.split(' ')[0]}!</p>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-slideUp">
                <button 
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 transition-colors"
                >
                    <X size={24} />
                </button>
                
                <h3 className="text-xl font-bold text-brand-brown mb-1">Write a Review</h3>
                <p className="text-sm text-stone-500 mb-6">Share your experience with us</p>
                
                <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-1">Your Name</label>
                        <input 
                            required
                            type="text" 
                            className="w-full p-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
                            placeholder="John Doe"
                            value={reviewForm.name}
                            onChange={e => setReviewForm({...reviewForm, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-1">Rating</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setReviewForm({...reviewForm, rating: star})}
                                    className="focus:outline-none transition-transform hover:scale-110"
                                >
                                    <Star 
                                        size={28} 
                                        className={`${star <= reviewForm.rating ? "fill-yellow-400 text-yellow-400" : "text-stone-300"}`} 
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-1">Review</label>
                        <textarea 
                            required
                            rows={4}
                            className="w-full p-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
                            placeholder="Great service! Highly recommended."
                            value={reviewForm.text}
                            onChange={e => setReviewForm({...reviewForm, text: e.target.value})}
                        ></textarea>
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-brand-red text-white py-3 rounded-lg font-bold hover:bg-red-800 transition-all shadow-md active:scale-95"
                    >
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export const Services: React.FC = () => {
  const { services } = useData();
  const [search, setSearch] = useState("");

  const filtered = services.filter(s => 
    s.availableCountries.some(c => c.toLowerCase().includes(search.toLowerCase())) ||
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-stone-50 min-h-screen">
      <PageHeader title="Individual Services" subtitle="Select specific services according to your needs" />
      <div className="max-w-5xl mx-auto px-4 py-16">
        <SearchBar placeholder="Search by service name or country..." value={search} onChange={setSearch} />
        
        <div className="grid gap-6">
          {filtered.map(service => (
            <div key={service.id} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md border border-stone-200 flex flex-col md:flex-row justify-between items-center transition-all group">
              <div className="flex-1 mb-4 md:mb-0">
                <h3 className="text-xl font-bold text-brand-brown group-hover:text-brand-red transition-colors">{service.name}</h3>
                <p className="text-stone-600 text-base mt-2 mb-3">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.availableCountries.map(c => (
                    <span key={c} className="text-xs font-semibold bg-stone-100 text-stone-600 px-3 py-1 rounded-full border border-stone-200 flex items-center">
                        <Globe size={10} className="mr-1"/> {c}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right min-w-[150px] pl-6 border-l border-stone-100">
                <span className="block text-2xl font-extrabold text-brand-red">{service.price}</span>
                <Link to="/contact" className="inline-block mt-2 text-sm font-semibold text-brand-brown underline hover:text-stone-600">
                    Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Packages: React.FC = () => {
  const { packages } = useData();
  const [search, setSearch] = useState("");

  const filtered = packages.filter(p => 
    p.availableCountries.some(c => c.toLowerCase().includes(search.toLowerCase())) ||
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-stone-50 min-h-screen">
      <PageHeader title="Service Packages" subtitle="Comprehensive solutions for your journey" />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <SearchBar placeholder="Search packages by country..." value={search} onChange={setSearch} />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(pkg => (
            <div key={pkg.id} className="bg-white rounded-2xl shadow-lg border border-stone-100 overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300">
              <div className="bg-brand-brown p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>
                <h3 className="text-xl font-bold relative z-10">{pkg.title}</h3>
                <div className="mt-4 text-2xl font-bold text-brand-red bg-white inline-block px-4 py-1.5 rounded-lg shadow-sm">
                  {pkg.price}
                </div>
              </div>
              <div className="p-8 flex-1">
                <h4 className="font-bold text-stone-800 mb-4 uppercase text-xs tracking-wider">Services Included</h4>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-start text-sm text-stone-600">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="leading-tight">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-6 border-t border-stone-100">
                  <p className="text-xs text-stone-400 font-bold uppercase mb-2">Available for</p>
                  <div className="flex flex-wrap gap-2">
                    {pkg.availableCountries.map(c => (
                      <span key={c} className="text-xs font-semibold bg-brand-light text-brand-brown px-2.5 py-1 rounded border border-stone-200">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-4 bg-stone-50 border-t border-stone-200">
                <Link to="/contact" className="block w-full text-center bg-brand-brown text-white py-3 rounded-lg font-bold hover:bg-stone-800 transition-colors shadow-sm">
                  Inquire Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Universities: React.FC = () => {
  const { universities } = useData();
  const [search, setSearch] = useState("");
  const filtered = universities.filter(u => 
    u.countries.some(c => c.toLowerCase().includes(search.toLowerCase())) || 
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-stone-50 min-h-screen">
      <PageHeader title="Partner Universities" subtitle="Explore educational institutions worldwide" />
      <div className="max-w-6xl mx-auto px-4 py-16">
        <SearchBar placeholder="Search by country or university name..." value={search} onChange={setSearch} />
        <div className="grid gap-6">
          {filtered.map(uni => (
            <div key={uni.id} className="bg-white p-8 rounded-xl shadow-sm border border-stone-200 flex flex-col md:flex-row gap-8 items-start hover:shadow-md transition-shadow">
               <div className="w-full md:w-48 h-32 bg-stone-100 rounded-xl flex items-center justify-center overflow-hidden border border-stone-200 flex-shrink-0">
                 <GraduationCap className="w-16 h-16 text-stone-300" />
               </div>
               <div className="flex-1">
                 <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-brand-brown">{uni.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {uni.countries.map(c => (
                        <span key={c} className="text-xs font-bold bg-brand-red text-white px-3 py-1 rounded-full uppercase tracking-wide">{c}</span>
                      ))}
                    </div>
                 </div>
                 <p className="text-stone-600 leading-relaxed mb-4">{uni.description}</p>
                 <Link to="/contact" className="text-brand-brown font-bold text-sm hover:underline flex items-center gap-1">
                    Request Admission Info <ArrowRight size={14}/>
                 </Link>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Scholarships: React.FC = () => {
  const { scholarships } = useData();
  const [search, setSearch] = useState("");
  const filtered = scholarships.filter(s => 
    s.countries.some(c => c.toLowerCase().includes(search.toLowerCase())) || 
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-stone-50 min-h-screen">
      <PageHeader title="Scholarships" subtitle="Financial aid and exchange opportunities" />
      <div className="max-w-6xl mx-auto px-4 py-16">
        <SearchBar placeholder="Search by country..." value={search} onChange={setSearch} />
        <div className="grid md:grid-cols-2 gap-8">
          {filtered.map(item => (
            <div key={item.id} className="bg-white border-l-8 border-yellow-500 p-8 rounded-lg shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between mb-4">
                <span className="text-xs font-bold text-yellow-600 uppercase tracking-widest bg-yellow-50 px-2 py-1 rounded">Scholarship Opportunity</span>
                <div className="flex flex-wrap gap-1">
                  {item.countries.map(c => (
                    <span key={c} className="text-xs font-bold bg-stone-800 text-white px-2 py-1 rounded">{c}</span>
                  ))}
                </div>
              </div>
              <h3 className="text-xl font-bold text-brand-brown mb-3">{item.name}</h3>
              <div className="bg-stone-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-stone-700"><strong>Coverage:</strong> {item.amount}</p>
              </div>
              <div className="flex justify-between items-center text-sm border-t border-stone-100 pt-4">
                <span className="text-red-600 font-semibold flex items-center gap-1"><BookOpen size={14}/> Deadline: {item.deadline}</span>
                <Link to="/contact" className="bg-brand-brown text-white px-4 py-2 rounded text-xs font-bold hover:bg-stone-800 transition-colors">Apply Support</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Blog: React.FC = () => {
  const { blog } = useData();
  return (
    <div className="bg-stone-50 min-h-screen">
      <PageHeader title="Latest News & Blog" />
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">
        {blog.map(post => (
          <article key={post.id} className="bg-white p-0 rounded-2xl shadow-sm border border-stone-100 overflow-hidden hover:shadow-lg transition-shadow">
            {post.imageUrl && (
                <div className="h-72 overflow-hidden">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
            )}
            <div className="p-10">
                <div className="flex items-center gap-2 text-xs text-stone-400 mb-4">
                    <FileText size={14} />
                    <span>{post.date}</span>
                </div>
                <h2 className="text-3xl font-bold text-brand-brown mb-6">{post.title}</h2>
                <p className="text-stone-600 leading-relaxed text-lg mb-8">{post.content}</p>
                <button className="text-brand-red font-bold hover:underline flex items-center gap-2">Read Full Article <ArrowRight size={16}/></button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export const Policy: React.FC = () => {
  const { data } = useData();
  return (
    <div className="bg-stone-50 min-h-screen">
      <PageHeader title="Service Policy" />
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-16">
        <section className="bg-white p-10 rounded-2xl shadow-sm border border-stone-100">
          <h2 className="text-2xl font-bold text-brand-brown mb-6 border-b border-stone-100 pb-4">1. Nature of Services</h2>
          <p className="text-stone-700 whitespace-pre-line leading-relaxed">{data.policy.servicePolicy}</p>
        </section>
        <section className="bg-white p-10 rounded-2xl shadow-sm border border-stone-100">
          <h2 className="text-2xl font-bold text-brand-brown mb-6 border-b border-stone-100 pb-4">2. Refund Policy</h2>
          <p className="text-stone-700 whitespace-pre-line leading-relaxed">{data.policy.refundPolicy}</p>
        </section>
        <section className="bg-white p-10 rounded-2xl shadow-sm border border-stone-100">
          <h2 className="text-2xl font-bold text-brand-brown mb-6 border-b border-stone-100 pb-4">3. Limitation of Liability</h2>
          <p className="text-stone-700 whitespace-pre-line leading-relaxed">{data.policy.liability}</p>
        </section>
      </div>
    </div>
  );
};

export const Contact: React.FC = () => {
  const { data } = useData();
  return (
    <div>
      <PageHeader title="Contact Us" subtitle="Get in touch with our expert team" />
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold text-brand-brown mb-8">Get in Touch</h2>
            <div className="space-y-8">
              <div className="flex items-start group">
                <div className="bg-brand-red/10 p-3 rounded-lg group-hover:bg-brand-red transition-colors mr-6">
                    <MapPin className="w-6 h-6 text-brand-red group-hover:text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-800 text-lg">Visit Us</h3>
                  <p className="text-stone-600 mt-1">{data.contact.address}</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="bg-brand-red/10 p-3 rounded-lg group-hover:bg-brand-red transition-colors mr-6">
                    <Phone className="w-6 h-6 text-brand-red group-hover:text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-800 text-lg">Call Us</h3>
                  {data.contact.phone.map((p, i) => (
                    <p key={i} className="text-stone-600 mt-1">{p}</p>
                  ))}
                </div>
              </div>

              <div className="flex items-start group">
                <div className="bg-brand-red/10 p-3 rounded-lg group-hover:bg-brand-red transition-colors mr-6">
                    <Mail className="w-6 h-6 text-brand-red group-hover:text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-800 text-lg">Email Us</h3>
                  <a href={`mailto:${data.contact.email}`} className="text-stone-600 hover:text-brand-red mt-1 block">{data.contact.email}</a>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="font-bold text-stone-800 mb-6 text-lg">Connect on Social Media</h3>
              <div className="flex gap-4">
                 {Object.entries(data.contact.socials).map(([key, url]) => (
                    url ? (
                        <a key={key} href={url} target="_blank" rel="noreferrer" className="bg-stone-100 text-stone-600 p-3 rounded-full hover:bg-brand-brown hover:text-white transition-all capitalize shadow-sm border border-stone-200">
                            {key}
                        </a>
                    ) : null
                 ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-10 rounded-2xl shadow-xl border border-stone-100">
             <h2 className="text-2xl font-bold text-brand-brown mb-8">Send us a message</h2>
             <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Thank you! We will contact you shortly."); }}>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-2">First Name</label>
                        <input type="text" className="w-full p-4 rounded-lg border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-brand-red outline-none transition-all" placeholder="John" required/>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-2">Last Name</label>
                        <input type="text" className="w-full p-4 rounded-lg border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-brand-red outline-none transition-all" placeholder="Doe" required/>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">Email Address</label>
                    <input type="email" className="w-full p-4 rounded-lg border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-brand-red outline-none transition-all" placeholder="john@example.com" required/>
                </div>
                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">Message</label>
                    <textarea className="w-full p-4 rounded-lg border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-brand-red outline-none transition-all" rows={4} placeholder="How can we help you?" required></textarea>
                </div>
                <button className="w-full bg-brand-red text-white py-4 rounded-lg font-bold hover:bg-red-800 transition-colors shadow-lg mt-2">Send Message</button>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
};