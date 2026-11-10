import React from 'react';
import { X, ShieldAlert, CheckCircle2, AlertTriangle, MapPin, Eye, Lock, PhoneCall } from 'lucide-react';

interface SafetyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SafetyGuideModal: React.FC<SafetyGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full my-auto shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="px-5 py-4 bg-emerald-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center text-emerald-300">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base">
                General Market Safety Guide
              </h3>
              <p className="text-[11px] text-emerald-300">
                Safe trading rules for Nigerian buyers and sellers
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-emerald-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs text-slate-700 leading-relaxed">
          
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-950 text-xs mb-1">
                Golden Rule: Never Pay in Advance!
              </h4>
              <p className="text-amber-900 text-[11px]">
                Under no circumstances should you transfer money, "commitment fee", "logistics charge", or upfront deposit before meeting the seller and inspecting the item in person.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">Meet in Public, Safe Locations</strong>
                <span>Always meet in open daylight places such as shopping malls, bank premises, fuel stations, or busy plaza complexes (e.g. Ikeja City Mall, Computer Village plazas, Jabi Lake Mall, Banex).</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Eye className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">Thorough Physical Inspection</strong>
                <span>For cars: check engine, transmission, and verify Nigerian Customs papers at a customs desk. For phones: check IMEI (*#06#), confirm iCloud / Google account is removed.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">Look for Verified Seller Badges</strong>
                <span>Verified sellers have submitted NIN or registered CAC company documents to General Market moderation.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">Secure Payment on Spot</strong>
                <span>Only make payment (instant bank transfer or POS) when you have the item firmly in your hands with receipt and seller contact confirmation.</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <button
              onClick={onClose}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors"
            >
              I Understand & Agree
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
