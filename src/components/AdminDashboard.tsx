import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Users,
  Store,
  DollarSign,
  TrendingUp,
  Award,
  Sparkles,
  Search,
  Check,
  Ban,
  Filter,
  Eye
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { CATEGORIES } from '../data/categories';

export const AdminDashboard: React.FC = () => {
  const {
    listings,
    reportedListings,
    adminApproveListing,
    adminRejectListing,
    adminToggleVerifySeller,
    adminDismissReport,
    adminTakeActionReport,
    promoteListing,
    setActiveListingDetail
  } = useMarketplace();

  const [activeTab, setActiveTab] = useState<'stats' | 'listings' | 'reports' | 'sellers' | 'ads'>('stats');
  const [filterListingStatus, setFilterListingStatus] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');

  // Statistics
  const totalMarketValue = listings.reduce((sum, item) => sum + item.price, 0);
  const pendingCount = listings.filter(l => l.status === 'pending').length;
  const activeCount = listings.filter(l => l.status === 'active').length;
  const openReportsCount = reportedListings.filter(r => r.status === 'open').length;

  // Distinct sellers from listings
  const sellerMap = new Map();
  listings.forEach(l => {
    if (!sellerMap.has(l.seller.id)) {
      sellerMap.set(l.seller.id, l.seller);
    }
  });
  const allSellers = Array.from(sellerMap.values());

  const filteredListings = listings.filter(item => {
    if (filterListingStatus !== 'all' && item.status !== filterListingStatus) {
      return false;
    }
    if (searchFilter && !item.title.toLowerCase().includes(searchFilter.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      
      {/* Admin Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>General Market Admin & Trust Control</span>
          </div>
          <h1 className="text-2xl font-black">Marketplace Moderation Panel</h1>
          <p className="text-xs text-slate-400">
            Monitor Nigeria-wide listings, investigate fraud reports, verify car dealers & merchants.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-3 py-1.5 rounded-xl border border-emerald-500/30">
            System Live: Port 3000
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto gap-1 text-xs font-bold text-slate-500">
        <button
          onClick={() => setActiveTab('stats')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'stats' ? 'border-emerald-600 text-emerald-700' : 'border-transparent hover:text-slate-900'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Marketplace Statistics</span>
        </button>

        <button
          onClick={() => setActiveTab('listings')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'listings' ? 'border-emerald-600 text-emerald-700' : 'border-transparent hover:text-slate-900'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>Manage Listings ({listings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'reports' ? 'border-rose-600 text-rose-700 font-extrabold' : 'border-transparent hover:text-slate-900'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-rose-600" />
          <span>Reported Suspicious Ads ({openReportsCount})</span>
        </button>

        <button
          onClick={() => setActiveTab('sellers')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'sellers' ? 'border-emerald-600 text-emerald-700' : 'border-transparent hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Sellers & Dealer Verification</span>
        </button>

        <button
          onClick={() => setActiveTab('ads')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'ads' ? 'border-emerald-600 text-emerald-700' : 'border-transparent hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Advertisements & VIP Placements</span>
        </button>
      </div>

      {/* STATS VIEW */}
      {activeTab === 'stats' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-bold block">Total Active Ads</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">{activeCount}</span>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 block">Live across Nigeria</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-bold block">Total Inventory Value</span>
              <span className="text-2xl font-black text-emerald-700 mt-1 block">
                ₦{(totalMarketValue / 1000000).toFixed(1)}M+
              </span>
              <span className="text-[10px] text-slate-400 font-medium mt-1 block">Vehicles, tech & property</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-bold block">Open Fraud Reports</span>
              <span className="text-2xl font-black text-rose-600 mt-1 block">{openReportsCount}</span>
              <span className="text-[10px] text-rose-700 font-medium mt-1 block">Pending investigation</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-bold block">Verified Merchants</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">
                {allSellers.filter(s => s.verified).length} / {allSellers.length}
              </span>
              <span className="text-[10px] text-emerald-600 font-medium mt-1 block">NIN & CAC checked</span>
            </div>
          </div>

          {/* Categories distribution */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="font-extrabold text-sm text-slate-900 mb-4">
              Marketplace Categories Activity
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {CATEGORIES.slice(0, 8).map(cat => (
                <div key={cat.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate">
                    <span>{cat.emoji}</span>
                    <span className="font-bold truncate">{cat.name}</span>
                  </div>
                  <span className="font-black text-emerald-700">{cat.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MANAGE LISTINGS VIEW */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2 flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search listings by title..."
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                className="w-full text-xs bg-slate-50 p-2 rounded-lg border border-slate-200"
              />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-bold">Status:</span>
              <select
                value={filterListingStatus}
                onChange={e => setFilterListingStatus(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs font-semibold p-2 rounded-lg"
              >
                <option value="all">All Listings</option>
                <option value="active">Active</option>
                <option value="pending">Pending Review</option>
                <option value="rejected">Rejected / Suspended</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100 shadow-xs">
            {filteredListings.map(item => (
              <div key={item.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={item.images[0]} alt="" className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        item.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {item.status}
                      </span>
                      {item.promotionTier === 'vip' && (
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                          VIP Ad
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate mt-0.5">{item.title}</h4>
                    <p className="text-xs font-black text-emerald-700">₦{item.price.toLocaleString()} • {item.seller.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => setActiveListingDetail(item)}
                    className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg text-xs font-bold flex items-center gap-1"
                    title="View Listing"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>

                  {item.status !== 'active' && (
                    <button
                      onClick={() => adminApproveListing(item.id)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Approve
                    </button>
                  )}

                  {item.status !== 'rejected' && (
                    <button
                      onClick={() => adminRejectListing(item.id)}
                      className="bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
                    >
                      <Ban className="w-3.5 h-3.5" />
                      Suspend
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REPORTED SUSPICIOUS ADS VIEW */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs text-rose-950">
            <strong>Trust & Safety Anti-Scam Moderation:</strong> User flagged ads are reviewed here. You can take down fraudulent ads immediately or dismiss false reports.
          </div>

          <div className="space-y-3">
            {reportedListings.map(report => (
              <div key={report.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase bg-rose-100 text-rose-800 px-2 py-0.5 rounded">
                      Reason: {report.reason}
                    </span>
                    <h4 className="font-extrabold text-sm text-slate-900 mt-1">
                      Target: {report.listingTitle}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Reported by {report.reportedBy} • {report.timestamp}
                    </p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    report.status === 'open' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {report.status}
                  </span>
                </div>

                <p className="text-xs bg-slate-50 p-3 rounded-xl border border-slate-100 text-slate-700">
                  <strong>Reporter Details:</strong> "{report.details}"
                </p>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => adminDismissReport(report.id)}
                    className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg"
                  >
                    Dismiss Report
                  </button>
                  <button
                    onClick={() => adminTakeActionReport(report.id)}
                    className="text-xs px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg"
                  >
                    Take Down Ad & Suspend
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SELLERS & DEALERS VERIFICATION VIEW */}
      {activeTab === 'sellers' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100 shadow-xs">
            {allSellers.map(seller => (
              <div key={seller.id} className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={seller.avatar} alt="" className="w-12 h-12 rounded-full object-cover ring-1 ring-slate-200" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-900">{seller.name}</h4>
                      {seller.verified ? (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                          Verified Dealer
                        </span>
                      ) : (
                        <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded">
                          Unverified
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">{seller.location} • {seller.phone}</p>
                  </div>
                </div>

                <button
                  onClick={() => adminToggleVerifySeller(seller.id)}
                  className={`text-xs font-bold px-3 py-2 rounded-xl transition-colors ${
                    seller.verified
                      ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  {seller.verified ? 'Revoke Verified Badge' : 'Grant Verified Badge'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADVERTISEMENTS & VIP VIEW */}
      {activeTab === 'ads' && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="font-extrabold text-sm text-slate-900 mb-2">
              Sponsored Banners & Monetization Placements
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Control top leaderboard banners, category sponsor spots, and paid VIP merchant slots in Nigeria.
            </p>
            <div className="space-y-3">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-emerald-950">Homepage VIP Dealer Carousel</h4>
                  <p className="text-[11px] text-emerald-800">Assigned to: Chukwuma Auto Empire (₦45,000/mo)</p>
                </div>
                <span className="text-xs font-bold text-emerald-700">Active</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Computer Village TechHub Banner</h4>
                  <p className="text-[11px] text-slate-600">Assigned to: TechHub Ikeja (₦15,000/mo)</p>
                </div>
                <span className="text-xs font-bold text-emerald-700">Active</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
