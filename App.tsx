/**
 * Lamsat Sabah | لمسات صباح - Master Application Entry Point
 */

import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { NaturalMasksPage } from './pages/NaturalMasksPage';
import { SerumsPage } from './pages/SerumsPage';
import { IngredientsPage } from './pages/IngredientsPage';
import { DailyTipsPage } from './pages/DailyTipsPage';
import { EncyclopediaPage } from './pages/EncyclopediaPage';
import { RoutinesPage } from './pages/RoutinesPage';
import { JournalPage } from './pages/JournalPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AdminPage } from './pages/AdminPage';
import { LegalPage } from './pages/LegalPage';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';

// Modals
import { AIModal } from './components/AIModal';
import { QuizModal } from './components/QuizModal';
import { SearchModal } from './components/SearchModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { MessagingModal } from './components/MessagingModal';
import { AuthModal } from './components/AuthModal';
import { MaskModal } from './components/MaskModal';

const MainAppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedMaskId, setSelectedMaskId] = useState<string | null>(null);

  // Modals visibility states
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isNotifDrawerOpen, setIsNotifDrawerOpen] = useState(false);
  const [isMessagingModalOpen, setIsMessagingModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectMask = (maskId: string) => {
    setSelectedMaskId(maskId);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenAI={() => setIsAIModalOpen(true)}
            onOpenQuiz={() => setIsQuizModalOpen(true)}
            onSelectMask={handleSelectMask}
          />
        );

      case 'skin-care':
      case 'hair-care':
      case 'body-care':
      case 'hand-care':
      case 'foot-care':
        return <CategoryPage categoryId={currentPage} onSelectMask={handleSelectMask} />;

      case 'natural-masks':
        return <NaturalMasksPage onSelectMask={handleSelectMask} />;

      case 'serums':
        return <SerumsPage />;

      case 'ingredients':
        return <IngredientsPage />;

      case 'daily-tips':
        return <DailyTipsPage />;

      case 'encyclopedia':
        return <EncyclopediaPage />;

      case 'routines':
        return <RoutinesPage />;

      case 'beauty-journal':
      case 'before-after':
        return <JournalPage />;

      case 'favorites':
        return <FavoritesPage onSelectMask={handleSelectMask} />;

      case 'admin':
      case 'secret-admin-portal':
      case 'admin-portal':
      case 'secret-admin':
        return <AdminPage />;

      case 'privacy-policy':
        return <LegalPage section="privacy" />;

      case 'terms-of-service':
        return <LegalPage section="terms" />;

      case 'cookie-policy':
        return <LegalPage section="cookie" />;

      case 'disclaimer':
        return <LegalPage section="disclaimer" />;

      case 'copyright-notice':
        return <LegalPage section="copyright" />;

      case 'contact':
        return <ContactPage />;

      case 'about':
        return <AboutPage />;

      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenAI={() => setIsAIModalOpen(true)}
            onOpenQuiz={() => setIsQuizModalOpen(true)}
            onSelectMask={handleSelectMask}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* Navigation Header */}
      <Header
        onNavigate={handleNavigate}
        activePage={currentPage}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenAI={() => setIsAIModalOpen(true)}
        onOpenQuiz={() => setIsQuizModalOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenNotifications={() => setIsNotifDrawerOpen(true)}
        onOpenMessaging={() => setIsMessagingModalOpen(true)}
      />

      {/* Main Page Body Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} onOpenMessaging={() => setIsMessagingModalOpen(true)} />

      {/* Global Modals & Drawers */}
      <AIModal isOpen={isAIModalOpen} onClose={() => setIsAIModalOpen(false)} />
      <QuizModal isOpen={isQuizModalOpen} onClose={() => setIsQuizModalOpen(false)} />
      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
        onNavigate={handleNavigate}
        onSelectMask={handleSelectMask}
      />
      <NotificationDrawer isOpen={isNotifDrawerOpen} onClose={() => setIsNotifDrawerOpen(false)} />
      <MessagingModal isOpen={isMessagingModalOpen} onClose={() => setIsMessagingModalOpen(false)} />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <MaskModal maskId={selectedMaskId} onClose={() => setSelectedMaskId(null)} />

    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppProvider>
            <MainAppContent />
          </AppProvider>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
