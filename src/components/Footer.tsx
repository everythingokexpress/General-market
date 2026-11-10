import React from 'react';
import {
  Store,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Smartphone,
  HelpCircle,
  FileText,
  Lock,
  MessageSquare
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export const Footer: React.FC = () => {
  const { setSelectedLocation, setIsSafetyModalOpen, setCurrentView } = useMarketplace();

  const nigerianCities = [
    { name: 'Lagos', state: 'Lagos' },
    { name: 'Abuja (FCT)', state: 'Abuja (FCT)' },
    { name: 'Port Harcourt', state: 'Rivers' },
    { name: 'Ibadan', state: 'Oyo' },
    { name: 'Kano', state: 'Kano' },
    { name: 'Benin City', state: 'Edo' },
    { name: 'Enugu', state: 'Enugu' },
    { name: 'Abeokuta', state: 'Ogun' },
    { name: 'Kaduna', state: 'Kaduna' },
    { name: 'Asaba', state: 'Delta' }
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-24 md:pb-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-black text-white tracking-tight">General Market</span>
                <span className="text-[10px] text-emerald-400 font-bold block -mt-1 tracking-wider uppercase">
                  Nigeria's Trusted Marketplace
                </span>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs pr-4">
              Nigeria’s fastest growing online marketplace. Buy, sell, advertise, and discover verified cars, phones, real estate, electronics, fashion, and home appliances safely across all 36 states and FCT.
            </p>
            <div className="pt-2 text-slate-400 space-y-1 text-[11px]">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Plot 12, Commercial Avenue, Ikeja, Lagos, Nigeria</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Support: +234 800-GENERAL-MKT (0800 436 3725)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>help@generalmarket.ng</span>
              </p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2.5">
            <h4 className="font-extrabold text-sm text-white">Popular Departments</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button
                  onClick={() => setCurrentView('cars')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Cars & Vehicles (Tokunbo)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('categories')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Phones & Tablets
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('categories')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Property & Shortlets
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('categories')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Computers & Laptops
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('categories')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Solar & Generators
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Trust & Safety */}
          <div className="space-y-2.5">
            <h4 className="font-extrabold text-sm text-white">Trust & Safety</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button
                  onClick={() => setIsSafetyModalOpen(true)}
                  className="text-amber-300 font-bold hover:underline flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Safe Shopping Rules</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsSafetyModalOpen(true)}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Fraud & Scam Alerts
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('account')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  NIN & CAC Seller Verification
                </button>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Mobile App */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-white">Mobile Marketplace</h4>
            <p className="text-[11px] text-slate-400">
              Buy and sell on the go with real-time push alerts on your phone.
            </p>
            <div className="space-y-2">
              <div className="bg-slate-800 hover:bg-slate-700/80 p-2.5 rounded-xl border border-slate-700 cursor-pointer flex items-center gap-2.5">
                <Smartphone className="w-5 h-5 text-emerald-400" />
                <div>
                  <span className="text-[9px] text-slate-400 block uppercase font-bold">Download on</span>
                  <span className="text-xs font-bold text-white">Google Play Store</span>
                </div>
              </div>
              <div className="bg-slate-800 hover:bg-slate-700/80 p-2.5 rounded-xl border border-slate-700 cursor-pointer flex items-center gap-2.5">
                <Smartphone className="w-5 h-5 text-emerald-400" />
                <div>
                  <span className="text-[9px] text-slate-400 block uppercase font-bold">Download on</span>
                  <span className="text-xs font-bold text-white">Apple App Store</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Popular Nigerian Cities Row */}
        <div className="pt-6 border-t border-slate-800">
          <h4 className="text-xs font-bold text-slate-400 mb-2">
            Popular Marketplace Cities in Nigeria:
          </h4>
          <div className="flex flex-wrap gap-2">
            {nigerianCities.map(city => (
              <button
                key={city.name}
                onClick={() => {
                  setSelectedLocation({
                    state: city.state,
                    city: city.name,
                    area: ''
                  });
                  setCurrentView('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-[11px] bg-slate-800 hover:bg-emerald-800 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg transition-colors"
              >
                {city.name}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} General Market Nigeria. All rights reserved. Built for fast, trusted commerce.</p>
          <div className="flex items-center gap-4">
            <span>Secured with 256-bit SSL</span>
            <span>•</span>
            <span>Made in Nigeria 🇳🇬</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
