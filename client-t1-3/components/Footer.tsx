import React from 'react';
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin, Globe, Music, ArrowRight } from 'lucide-react';
import { useData } from '../services/dataContext';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const { data } = useData();

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-brand-red">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Brand Info */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                <Globe size={20} className="text-brand-red"/> 
                {data.companyName}
            </h3>
            <p className="text-sm mb-6 leading-relaxed text-stone-400">
              {data.tagline}
              <br/>
              Guiding individuals <span className="text-brand-red font-bold">ON</span> to the world with confidence, clarity, and reliability.
            </p>
            <div className="flex space-x-3">
              {data.contact.socials.facebook && <a href={data.contact.socials.facebook} target="_blank" rel="noreferrer" className="bg-stone-800 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-all"><Facebook size={18} /></a>}
              {data.contact.socials.instagram && <a href={data.contact.socials.instagram} target="_blank" rel="noreferrer" className="bg-stone-800 p-2 rounded-full hover:bg-pink-600 hover:text-white transition-all"><Instagram size={18} /></a>}
              {data.contact.socials.tiktok && <a href={data.contact.socials.tiktok} target="_blank" rel="noreferrer" className="bg-stone-800 p-2 rounded-full hover:bg-black hover:text-white transition-all"><Music size={18} /></a>}
              {data.contact.socials.youtube && <a href={data.contact.socials.youtube} target="_blank" rel="noreferrer" className="bg-stone-800 p-2 rounded-full hover:bg-red-600 hover:text-white transition-all"><Youtube size={18} /></a>}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4 border-b border-stone-800 pb-2 w-fit">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-brand-red flex items-center gap-2"><ArrowRight size={12} /> Home</Link></li>
              <li><Link to="/services" className="hover:text-brand-red flex items-center gap-2"><ArrowRight size={12} /> Services</Link></li>
              <li><Link to="/packages" className="hover:text-brand-red flex items-center gap-2"><ArrowRight size={12} /> Packages</Link></li>
              <li><Link to="/universities" className="hover:text-brand-red flex items-center gap-2"><ArrowRight size={12} /> Universities</Link></li>
              <li><Link to="/scholarships" className="hover:text-brand-red flex items-center gap-2"><ArrowRight size={12} /> Scholarships</Link></li>
              <li><Link to="/team" className="hover:text-brand-red flex items-center gap-2"><ArrowRight size={12} /> Our Team</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4 border-b border-stone-800 pb-2 w-fit">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-red mt-0.5 flex-shrink-0" />
                <span className="text-stone-400">{data.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-red flex-shrink-0" />
                <a href={`mailto:${data.contact.email}`} className="hover:text-white transition-colors">{data.contact.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-brand-red mt-0.5 flex-shrink-0" />
                <div className="flex flex-col">
                  {data.contact.phone.map((p, i) => <span key={i} className="text-stone-400 hover:text-white">{p}</span>)}
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Disclaimer */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4 border-b border-stone-800 pb-2 w-fit">Important Disclaimer</h3>
            <div className="text-xs text-stone-500 bg-stone-950 p-4 rounded-lg border border-stone-800 leading-relaxed">
              <p>{data.disclaimer}</p>
            </div>
            <div className="mt-4">
                <Link to="/policy" className="text-xs text-brand-red hover:underline">Read full Service Policy</Link>
            </div>
            <div className="mt-2">
               <Link to="/admin" className="text-[10px] text-stone-700 hover:text-stone-500">Admin Login</Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-stone-950 py-4 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-stone-600">
          &copy; {new Date().getFullYear()} {data.companyName}. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};