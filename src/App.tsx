import React from 'react';
import { MarketplaceProvider, useMarketplace } from './context/MarketplaceContext';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { SearchHero } from './components/SearchHero';
import { CategoryPills } from './components/CategoryPills';
import { HomeSections } from './components/HomeSections';
import { CarMarketplace } from './components/CarMarketplace';
import { CategoriesView } from './components/CategoriesView';
import { ChatDrawer } from './components/ChatDrawer';
import { UserDashboard } from './components/UserDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SellModal } from './components/SellModal';
import { SafetyGuideModal } from './components/SafetyGuideModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';

const MarketplaceApp: React.FC = () => {
  const {
    currentView,
    activeListingDetail,
    setActiveListingDetail,
    isSellModalOpen,
    setIsSellModalOpen,
    isSafetyModalOpen,
    setIsSafetyModalOpen,
    isAuthModalOpen,
    setIsAuthModalOpen
  } = useMarketplace();

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans antialiased selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content View Switcher */}
      <main className="flex-1 pb-16 md:pb-0">
        {currentView === 'home' && (
          <>
            <SearchHero />
            <CategoryPills />
            <HomeSections />
          </>
        )}

        {currentView === 'cars' && <CarMarketplace />}

        {currentView === 'categories' && <CategoriesView />}

        {currentView === 'chat' && <ChatDrawer />}

        {currentView === 'account' && <UserDashboard />}

        {currentView === 'admin' && <AdminDashboard />}
      </main>

      {/* Bottom Footer */}
      <Footer />

      {/* Mobile Sticky Navigation */}
      <MobileBottomNav />

      {/* Modals & Overlays */}
      {activeListingDetail && (
        <ProductDetailModal
          listing={activeListingDetail}
          onClose={() => setActiveListingDetail(null)}
        />
      )}

      <SellModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
      />

      <SafetyGuideModal
        isOpen={isSafetyModalOpen}
        onClose={() => setIsSafetyModalOpen(false)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <MarketplaceProvider>
      <MarketplaceApp />
    </MarketplaceProvider>
  );
}
