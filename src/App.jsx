/**
 * App.jsx
 * Root application component for FlowMind AI.
 *
 * Integrates:
 *  - LandingPage: Comprehensive showcase, feature highlights, interactive demo, architecture
 *  - Live Application: Real-time Venue Status, Dynamic SVG Vector Map, and Multi-turn Gemini AI Chat
 *  - VenueProvider for global stadium/category state
 *  - ErrorBoundary around each major section
 *  - AlertBanner for real-time congestion notifications
 *  - Accessible landmarks and skip links
 */
import React, { useState } from 'react';
import VenueStatus from './components/Dashboard/VenueStatus';
import AIChat from './components/AIChat/AIChat';
import MapSimulation from './components/Map/MapSimulation';
import StadiumSelector from './components/StadiumSelector/StadiumSelector';
import AlertBanner from './components/AlertBanner/AlertBanner';
import LandingPage from './components/LandingPage/LandingPage';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { VenueProvider } from './context/VenueContext';
import { useVenueContext } from './context/useVenueContext';
import { Zap, LayoutDashboard, Globe, ArrowLeft, Radio } from 'lucide-react';
import './App.css';

/**
 * Main Content Shell for the Live Assistant & Map
 */
const THEMES = [
  { id: 'indigo', label: 'Indigo (Default)', color: '#6366f1' },
  { id: 'emerald', label: 'Emerald', color: '#10b981' },
  { id: 'cobalt', label: 'Cobalt', color: '#3b82f6' },
  { id: 'sunset', label: 'Sunset', color: '#f97316' },
];

function LiveDashboardShell({ onBackToLanding, currentTheme, onSelectTheme }) {
  const { selectedStadium } = useVenueContext();

  return (
    <>
      {/* Skip-to-content link for keyboard & screen reader users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Real-time alert toasts — rendered at root so they float above all content */}
      <ErrorBoundary>
        <AlertBanner />
      </ErrorBoundary>

      <div className="app-layout">

        {/* ── Live App Header ─────────────────────────────────────────── */}
        <header className="app-header" role="banner">
          <div className="logo-area">
            <button 
              className="logo-btn" 
              onClick={onBackToLanding}
              title="Return to FlowMind Showcase Landing Page"
            >
              <div className="logo-icon-box">
                <Zap size={22} />
              </div>
              <div>
                <h1>FlowMind AI</h1>
                <p className="subtitle">
                  <span className="logo-dot" />
                  Real-time Decision Intelligence
                </p>
              </div>
            </button>
          </div>

          {/* View Switcher Tabs */}
          <div className="header-nav">
            <button 
              className="nav-tab-btn" 
              onClick={onBackToLanding}
            >
              <Globe size={14} />
              <span>Showcase &amp; Docs</span>
            </button>
            <button 
              className="nav-tab-btn active"
            >
              <LayoutDashboard size={14} />
              <span>Live Decision App</span>
            </button>
          </div>

          <div className="header-right">
            {/* Theme switcher */}
            <div className="theme-picker-group" title="Select UI Accent Theme">
              {THEMES.map(t => (
                <button
                  key={t.id}
                  className={`theme-dot-btn ${currentTheme === t.id ? 'active' : ''}`}
                  style={{ backgroundColor: t.color }}
                  onClick={() => onSelectTheme(t.id)}
                  title={t.label}
                  aria-label={`Select ${t.label} theme`}
                />
              ))}
            </div>

            <ErrorBoundary>
              <StadiumSelector />
            </ErrorBoundary>
            <span className="badge badge-low" aria-live="polite" aria-label="Status: Live Connected">
              <Radio size={12} className="pulse" /> Live Telemetry
            </span>
          </div>
        </header>

        {/* ── Main Content Grid ──────────────────────────────────────── */}
        <main id="main-content" className="app-main" role="main" aria-label="FlowMind AI dashboard">

          {/* Left Column: Dashboard & Map */}
          <div className="col-left">
            <ErrorBoundary>
              <VenueStatus />
            </ErrorBoundary>
            <ErrorBoundary>
              <MapSimulation />
            </ErrorBoundary>
          </div>

          {/* Right Column: AI Concierge Chat */}
          <div className="col-right">
            <ErrorBoundary>
              {/* key={selectedStadium} resets state cleanly per React rules */}
              <AIChat key={selectedStadium} />
            </ErrorBoundary>
          </div>

        </main>

        {/* ── Live App Footer ────────────────────────────────────────── */}
        <footer className="app-footer" role="contentinfo" aria-label="Application footer">
          <div className="footer-left">
            <span>FlowMind AI &copy; {new Date().getFullYear()} &mdash; Powered by Google Gemini 2.0 Flash</span>
          </div>
          <div className="footer-right">
            <button className="nav-tab-btn" onClick={onBackToLanding}>
              <ArrowLeft size={13} />
              <span>Back to Showcase Landing Page</span>
            </button>
          </div>
        </footer>

      </div>
    </>
  );
}

/**
 * Controller Component with VenueProvider scope
 */
function AppContent() {
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('view') === 'app' || window.location.hash === '#app') {
        return 'app';
      }
    }
    return 'landing';
  });
  const [currentTheme, setCurrentTheme] = useState('indigo');
  const { setSelectedStadium } = useVenueContext();

  const handleSelectTheme = (themeId) => {
    setCurrentTheme(themeId);
    if (themeId === 'indigo') {
      document.body.removeAttribute('data-theme');
    } else {
      document.body.setAttribute('data-theme', themeId);
    }
  };

  const handleLaunchApp = () => {
    setCurrentView('app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectStadium = (stadiumId) => {
    setSelectedStadium(stadiumId);
  };

  if (currentView === 'landing') {
    return (
      <LandingPage 
        onLaunchApp={handleLaunchApp} 
        onSelectStadium={handleSelectStadium}
        currentTheme={currentTheme}
        onSelectTheme={handleSelectTheme}
        themes={THEMES}
      />
    );
  }

  return (
    <LiveDashboardShell 
      onBackToLanding={handleBackToLanding}
      currentTheme={currentTheme}
      onSelectTheme={handleSelectTheme}
    />
  );
}

/**
 * Root App component — wraps all with global Context
 */
function App() {
  return (
    <VenueProvider>
      <AppContent />
    </VenueProvider>
  );
}

export default App;
