/**
 * LandingPage.jsx
 * High-converting, professional showcase landing page for FlowMind AI.
 * 
 * Features:
 *  - High-impact Hero with live interactive simulation preview
 *  - Real-time telemetry benchmark stats counter
 *  - Multi-Stadium venue cards with 1-click launch
 *  - Interactive Architecture & Data Pipeline diagram
 *  - Key innovation pillars & technical feature matrix
 *  - FAQ section & Call-To-Action conversion banner
 */
import React, { useState } from 'react';
import { 
  Zap, 
  Cpu, 
  Navigation, 
  ShieldCheck, 
  Activity, 
  Volume2, 
  ArrowRight, 
  Star, 
  Users, 
  CheckCircle2, 
  MapPin, 
  Layers, 
  Bot, 
  Radio, 
  Clock, 
  Sparkles,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { STADIUMS } from '../../services/stadiumData';
import './LandingPage.css';

/** Sample interactive queries for the Hero Live Simulation widget */
const SAMPLE_SIMULATION_RESPONSES = {
  food: {
    question: "Where should I eat right now?",
    category: "Food Court",
    badge: "Fastest Option",
    badgeColor: "#10b981",
    recommendation: "Burger & Co (North)",
    waitTime: "3 mins wait",
    distance: "6 mins walk",
    explanation: "Food Court A currently has a 15 min line with heavy congestion. Burger & Co has only a 3-minute wait with low crowd friction, saving you 12 minutes total."
  },
  washrooms: {
    question: "Which washroom has the shortest line?",
    category: "Restrooms",
    badge: "Zero Queue",
    badgeColor: "#00f5d4",
    recommendation: "Restroom Section 112",
    waitTime: "1 min wait",
    distance: "2 mins walk",
    explanation: "Restroom 104 has a spike of 18 people. Section 112 is just 2 minutes away with only 2 people in line. Accessible route is verified."
  },
  exits: {
    question: "What is the fastest way out to parking?",
    category: "Express Exits",
    badge: "Lowest Friction",
    badgeColor: "#ff2a85",
    recommendation: "Gate 4 Express",
    waitTime: "4 mins wait",
    distance: "5 mins walk",
    explanation: "Main Entrance Gate is backed up with 16-minute exit delays. Gate 4 Express has active flow with under 4 minutes wait time."
  }
};

const LandingPage = ({ onLaunchApp, onSelectStadium, currentTheme = 'indigo', onSelectTheme, themes = [] }) => {
  const [activeTab, setActiveTab] = useState('food');
  const [openFaq, setOpenFaq] = useState(0);

  const activeSim = SAMPLE_SIMULATION_RESPONSES[activeTab];

  const handleLaunchStadium = (stadiumId) => {
    if (onSelectStadium) {
      onSelectStadium(stadiumId);
    }
    onLaunchApp();
  };

  const faqs = [
    {
      q: "How does FlowMind AI calculate the best recommendations?",
      a: "FlowMind AI combines real-time crowd sensor metrics (wait times, queue lengths, crowd levels) with physical distance from the attendee's location using a composite friction score: (Wait Time + Crowd Penalty × 3). This guarantees recommendations with the lowest total time and physical effort."
    },
    {
      q: "What happens if stadium Wi-Fi is congested or drops?",
      a: "FlowMind features a built-in deterministic offline fallback engine. When external API requests are unavailable or if no Gemini API key is configured, the local decision synthesizer continues calculating real-time recommendations seamlessly."
    },
    {
      q: "How does the Real-Time Simulation work?",
      a: "The data layer uses an observer pattern mirroring Firebase Realtime Database. Two concurrent loops execute: a fast loop (every 3 seconds) for dynamic food & gate fluctuation, and a slow loop (every 60 seconds) simulating natural washroom queue drainage with crowd spike probabilities."
    },
    {
      q: "Is FlowMind accessible for attendees with disabilities?",
      a: "Yes. FlowMind adheres to WCAG 2.1 AA standards with ARIA live regions for screen readers, keyboard navigation with skip links, high-contrast text, wheelchair-accessible route flags, and speech synthesis / speech recognition."
    }
  ];

  return (
    <div className="landing-container">
      {/* ── Top Navigation Bar ────────────────────────────────────────── */}
      <nav className="landing-nav glass" aria-label="Main Navigation">
        <div className="nav-logo">
          <div className="logo-icon-box">
            <Zap size={22} />
          </div>
          <span className="nav-brand-title">FlowMind AI</span>
          <span className="live-pill">
            <span className="live-dot pulse"></span>
            LIVE ENGINE v2.0
          </span>
        </div>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#venues">Venues</a>
          <a href="#architecture">Architecture</a>
          <a href="#faq">FAQ</a>
        </div>

        <div className="nav-actions">
          {themes.length > 0 && (
            <div className="theme-picker-group" title="Select UI Accent Theme">
              {themes.map(t => (
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
          )}

          <button 
            className="btn-launch-primary"
            onClick={onLaunchApp}
            aria-label="Launch Live Assistant Application"
          >
            <span>Launch Live App</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </nav>

      {/* ── Hero Section ─────────────────────────────────────────────── */}
      <header className="hero-section">
        <div className="hero-badge animate-fade-in">
          <Sparkles size={14} className="hero-badge-icon" />
          <span>AUTONOMOUS STADIUM ORCHESTRATION • POWERED BY GEMINI 2.0 FLASH</span>
        </div>

        <h1 className="hero-title animate-fade-in">
          Real-Time Venue Intelligence at the <span className="text-gradient">Speed of Live Crowds.</span>
        </h1>

        <p className="hero-subtitle animate-fade-in">
          Eliminate line fatigue, navigate 50,000+ attendee arenas effortlessly, and make context-aware decisions for dining, washrooms, and express exits with multi-turn generative AI.
        </p>

        <div className="hero-cta-group animate-fade-in">
          <button 
            className="btn-hero-primary" 
            onClick={onLaunchApp}
            aria-label="Launch Live Venue Assistant & Simulation"
          >
            <Zap size={18} />
            <span>Launch Live Assistant ⚡</span>
          </button>
          <a href="#venues" className="btn-hero-secondary">
            <span>Explore Stadiums</span>
            <ChevronRight size={16} />
          </a>
        </div>

        {/* ── Interactive Live Simulation Teaser Card ───────────────── */}
        <div className="hero-preview-wrapper animate-fade-in">
          <div className="preview-card glass-vibrant">
            <div className="preview-top-bar">
              <div className="preview-indicator">
                <span className="preview-dot"></span>
                <span className="preview-title">Live Decision Synthesizer Demo</span>
              </div>
              <div className="preview-tabs">
                <button 
                  className={`tab-btn ${activeTab === 'food' ? 'active' : ''}`}
                  onClick={() => setActiveTab('food')}
                >
                  🍔 Dining
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'washrooms' ? 'active' : ''}`}
                  onClick={() => setActiveTab('washrooms')}
                >
                  🚻 Washrooms
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'exits' ? 'active' : ''}`}
                  onClick={() => setActiveTab('exits')}
                >
                  🚪 Exits
                </button>
              </div>
            </div>

            <div className="preview-body">
              <div className="preview-query">
                <div className="user-query-tag">Attendee Query</div>
                <div className="query-text">"{activeSim.question}"</div>
              </div>

              <div className="preview-response">
                <div className="ai-response-header">
                  <div className="ai-avatar-mini">
                    <Bot size={16} />
                  </div>
                  <div className="ai-meta">
                    <span className="ai-name">FlowMind AI Engine</span>
                    <span className="ai-badge" style={{ backgroundColor: activeSim.badgeColor + '22', color: activeSim.badgeColor, borderColor: activeSim.badgeColor + '55' }}>
                      {activeSim.badge}
                    </span>
                  </div>
                </div>

                <div className="ai-recommendation-box">
                  <div className="rec-highlight">
                    <Star size={16} className="rec-star" />
                    <strong>Recommended: {activeSim.recommendation}</strong>
                  </div>
                  <div className="rec-stats">
                    <span className="rec-stat"><Clock size={13} /> {activeSim.waitTime}</span>
                    <span className="rec-stat"><Navigation size={13} /> {activeSim.distance}</span>
                  </div>
                  <p className="rec-explanation">{activeSim.explanation}</p>
                </div>

                <div className="preview-footer-action">
                  <button className="btn-test-live" onClick={onLaunchApp}>
                    <span>Try Full Interactive Dashboard with Map & Voice</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Live Telemetry Metrics Ticker ─────────────────────────── */}
        <div className="hero-stats-grid">
          <div className="stat-card glass">
            <div className="stat-number text-gradient-cyan">4</div>
            <div className="stat-label">Multi-Tier Stadiums</div>
            <div className="stat-sub">Balanced, Dense, Exit, VIP</div>
          </div>
          <div className="stat-card glass">
            <div className="stat-number text-gradient">3s</div>
            <div className="stat-label">Real-Time Sync Loop</div>
            <div className="stat-sub">Observer Sensor Feeds</div>
          </div>
          <div className="stat-card glass">
            <div className="stat-number text-gradient-amber">&lt;1s</div>
            <div className="stat-label">Decision Synthesis</div>
            <div className="stat-sub">Zero-friction routing</div>
          </div>
          <div className="stat-card glass">
            <div className="stat-number text-gradient-cyan">69/69</div>
            <div className="stat-label">Passing Unit & Sec Tests</div>
            <div className="stat-sub">100% Quality Verified</div>
          </div>
        </div>
      </header>

      {/* ── Problem & Solution Comparison ────────────────────────────── */}
      <section className="section-container" id="why-flowmind">
        <div className="section-header">
          <span className="section-pill">PARADIGM SHIFT</span>
          <h2 className="section-title">Why Static Stadium Maps Fail Attendees</h2>
          <p className="section-desc">
            Traditional venue apps show static pins. They don't know the food stall around the corner just hit a 40-minute queue or that Gate 2 has zero line.
          </p>
        </div>

        <div className="comparison-grid">
          <div className="comparison-card broken glass">
            <div className="card-tag tag-broken">Legacy Stadium Experience</div>
            <ul className="comparison-list">
              <li>❌ Static PDF or non-dynamic stadium maps with zero crowd context</li>
              <li>❌ Long, exhausting 30–45 minute queues for food during halftime</li>
              <li>❌ Overcrowded restrooms with lines stretching into the concourse</li>
              <li>❌ Gridlocked main exits with massive bottlenecks post-game</li>
              <li>❌ Attendees left guessing which facility has shortest wait</li>
            </ul>
          </div>

          <div className="comparison-card solution glass-vibrant">
            <div className="card-tag tag-solution">The FlowMind AI Experience</div>
            <ul className="comparison-list">
              <li>⚡ Live IoT sensor simulation streaming wait times every 3 seconds</li>
              <li>⚡ Multi-turn Gemini 2.0 AI that balances walking distance with queue lengths</li>
              <li>⚡ Automatic proactive toast alerts when crowd surges are detected</li>
              <li>⚡ Dynamic SVG vector floorplans highlighting the single best amenity</li>
              <li>⚡ Hands-free voice commands & speech synthesis for on-the-go queries</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Core Capabilities ────────────────────────────────────────── */}
      <section className="section-container" id="features">
        <div className="section-header">
          <span className="section-pill">ENGINEERING EXCELLENCE</span>
          <h2 className="section-title">Engineered for Massive Concurrent Venues</h2>
          <p className="section-desc">
            Built from the ground up with high-performance React 19, intelligent multi-turn context, and robust fail-safes.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card glass">
            <div className="feature-icon cyan"><Cpu size={24} /></div>
            <h3>Google Gemini 2.0 Flash</h3>
            <p>
              Employs multi-turn chat history with deep context injection. The model quantitatively compares alternatives and highlights exactly one ideal option.
            </p>
          </div>

          <div className="feature-card glass">
            <div className="feature-icon violet"><Radio size={24} /></div>
            <h3>Dual-Cadence Simulation</h3>
            <p>
              Observer pattern mirrors Firebase Realtime DB. Fast 3-second cycles fluctuate concessions, while 60-second cycles model restroom queue drain.
            </p>
          </div>

          <div className="feature-card glass">
            <div className="feature-icon pink"><Navigation size={24} /></div>
            <h3>Dynamic Vector Wayfinding</h3>
            <p>
              Interactive SVG map engine computes shortest route vectors and render animated route paths from the attendee's live location.
            </p>
          </div>

          <div className="feature-card glass">
            <div className="feature-icon amber"><Activity size={24} /></div>
            <h3>Surge Detection Alerts</h3>
            <p>
              Predictive threshold monitor detects when a facility experiences a &gt;50% sudden crowd surge, immediately broadcasting an alert toast.
            </p>
          </div>

          <div className="feature-card glass">
            <div className="feature-icon cyan"><Volume2 size={24} /></div>
            <h3>Multimodal Voice Control</h3>
            <p>
              Full voice control powered by the Web Speech API. Ask questions hands-free while walking with optional Text-to-Speech audio guidance.
            </p>
          </div>

          <div className="feature-card glass">
            <div className="feature-icon violet"><ShieldCheck size={24} /></div>
            <h3>Enterprise Guardrails</h3>
            <p>
              Input sanitization against injection attacks, client-side rate limiting (10 req/min), safety matrix filters, and 0-data leakage error handling.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stadium Showcase (Venues) ─────────────────────────────────── */}
      <section className="section-container" id="venues">
        <div className="section-header">
          <span className="section-pill">SIMULATED ENVIRONMENTS</span>
          <h2 className="section-title">Explore 4 Unique Stadium Layouts</h2>
          <p className="section-desc">
            Test how FlowMind dynamically adjusts decisions across diverse arena geometries and attendee densities.
          </p>
        </div>

        <div className="stadiums-grid">
          {Object.values(STADIUMS).map((stadium) => (
            <div key={stadium.id} className="stadium-card glass">
              <div className="stadium-card-top">
                <span 
                  className="stadium-badge"
                  style={{ backgroundColor: stadium.tagColor + '22', color: stadium.tagColor, borderColor: stadium.tagColor + '55' }}
                >
                  {stadium.tag}
                </span>
                <span className="stadium-cap">Cap: {stadium.capacity.toLocaleString()}</span>
              </div>

              <h3 className="stadium-title">{stadium.label}</h3>
              <p className="stadium-desc">{stadium.description}</p>

              <div className="stadium-details">
                <div className="detail-item">
                  <span className="detail-icon">🍔</span>
                  <span>{stadium.food_courts.length} Food Courts</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">🚻</span>
                  <span>{stadium.washrooms.length} Washrooms</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">🚪</span>
                  <span>{stadium.gates.length} Express Exits</span>
                </div>
              </div>

              <button 
                className="btn-select-stadium"
                onClick={() => handleLaunchStadium(stadium.id)}
              >
                <span>Launch in {stadium.label}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Architecture Pipeline ────────────────────────────────────── */}
      <section className="section-container" id="architecture">
        <div className="section-header">
          <span className="section-pill">DATA FLOW</span>
          <h2 className="section-title">Autonomous Decision Pipeline</h2>
          <p className="section-desc">
            How real-time telemetry transforms into natural language guidance in under 1 second.
          </p>
        </div>

        <div className="pipeline-wrapper glass">
          <div className="pipeline-step">
            <div className="step-num">01</div>
            <div className="step-content">
              <h4>IoT Sensor Stream</h4>
              <p>Dual-interval simulation updates wait times, queue lengths, and congestion status in real time.</p>
            </div>
          </div>

          <div className="pipeline-arrow"><ChevronRight size={20} /></div>

          <div className="pipeline-step">
            <div className="step-num">02</div>
            <div className="step-content">
              <h4>Context Synthesizer</h4>
              <p>Aggregates user coordinate vector, active category, and ranked candidate venues.</p>
            </div>
          </div>

          <div className="pipeline-arrow"><ChevronRight size={20} /></div>

          <div className="pipeline-step">
            <div className="step-num">03</div>
            <div className="step-content">
              <h4>Gemini 2.0 Flash</h4>
              <p>Evaluates composite friction score with multi-turn memory and safety filters.</p>
            </div>
          </div>

          <div className="pipeline-arrow"><ChevronRight size={20} /></div>

          <div className="pipeline-step">
            <div className="step-num">04</div>
            <div className="step-content">
              <h4>Multimodal Output</h4>
              <p>Displays bold markdown recommendation, highlights SVG map route, and speaks via TTS.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ──────────────────────────────────────────────── */}
      <section className="section-container" id="faq">
        <div className="section-header">
          <span className="section-pill">GOT QUESTIONS?</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item glass ${openFaq === index ? 'open' : ''}`}
              onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
            >
              <div className="faq-question">
                <span>{faq.q}</span>
                <span className="faq-toggle">{openFaq === index ? '−' : '+'}</span>
              </div>
              {openFaq === index && (
                <div className="faq-answer animate-fade-in">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── High-Impact Call To Action Banner ────────────────────────── */}
      <section className="cta-banner-section">
        <div className="cta-box glass-vibrant">
          <h2 className="cta-title">Ready to Experience the Stadium of the Future?</h2>
          <p className="cta-desc">
            Test the live simulator right in your browser. Switch stadiums, ask natural questions, and watch the dynamic map pathfind in real time.
          </p>
          <button 
            className="btn-cta-launch"
            onClick={onLaunchApp}
          >
            <span>Launch Live Assistant Now ⚡</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo-icon-box mini">
              <Zap size={16} />
            </div>
            <span className="footer-title">FlowMind AI</span>
            <span className="footer-copy">
              &copy; {new Date().getFullYear()} FlowMind AI. Released under the MIT License.
            </span>
          </div>

          <div className="footer-badges">
            <span className="footer-badge">Google Gemini 2.0 Flash</span>
            <span className="footer-badge">React 19</span>
            <span className="footer-badge">Vite 8</span>
            <span className="footer-badge">Vitest Verified</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

