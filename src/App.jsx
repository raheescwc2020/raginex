import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "About", "Services", "Solutions", "Statistics", "Contact"];

const SERVICES = [
  { icon: "🧠", title: "AI-Powered Decision Support", desc: "Intelligent systems that assist government officials in data-driven policy making and resource allocation." },
  { icon: "🔍", title: "Document Intelligence", desc: "Automated extraction, classification and analysis of government records, applications and legal documents." },
  { icon: "📊", title: "Predictive Analytics", desc: "Forecasting models for public health, infrastructure demands, urban planning and law enforcement." },
  { icon: "🛡️", title: "Compliance & Audit AI", desc: "AI-driven audit tools ensuring transparency, detecting anomalies and preventing fraud in public finances." },
  { icon: "🌐", title: "Smart Citizen Services", desc: "Conversational AI chatbots and portals delivering 24×7 multilingual assistance to citizens." },
  { icon: "🔗", title: "Inter-Department Integration", desc: "Seamless AI-powered data exchange pipelines connecting ministries, departments and municipalities." },
];

const SOLUTIONS = [
  { dept: "Healthcare", icon: "🏥", items: ["Disease outbreak prediction", "Hospital resource optimization", "Medical records digitization"] },
  { dept: "Public Safety", icon: "🚔", items: ["Crime pattern analysis", "Emergency response routing", "CCTV intelligence"] },
  { dept: "Revenue & Tax", icon: "💰", items: ["Tax evasion detection", "Automated assessments", "Grievance AI"] },
  { dept: "Agriculture", icon: "🌾", items: ["Crop yield forecasting", "Drought risk mapping", "Subsidy disbursal AI"] },
];

const STATS = [
  { value: 15, suffix: "+", label: "Government Clients" },
  { value: 98, suffix: "%", label: "Uptime Guarantee" },
  { value: 40, suffix: "+", label: "AI Models Deployed" },
  { value: 5, suffix: "M+", label: "Citizens Served" },
];

const TEAM = [
  { name: "Gireesh Menon", role: "", initials: "GM" },
  { name: "Rahees Mohammed R", role: "", initials: "RM" },
  { name: "Nandu Krishnan", role: "", initials: "NK" },
];

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ value, suffix, label, animate }) {
  const count = useCountUp(value, 1800, animate);
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e2ede8",
        borderRadius: 16,
        padding: "2.5rem 2rem",
        textAlign: "center",
        boxShadow: "0 2px 20px rgba(34,110,72,0.07)",
        transition: "transform 0.3s, box-shadow 0.3s",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 50px rgba(34,110,72,0.14)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 20px rgba(34,110,72,0.07)"; }}
    >
      <div style={{ fontSize: "3.2rem", fontWeight: 800, color: "#1e7d50", fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ marginTop: "0.75rem", fontSize: "0.92rem", color: "#6b9e84", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
        {label}
      </div>
    </div>
  );
}

export default function ReginxPortfolio() {
  const [activeNav, setActiveNav] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", organization: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setStatsVisible(true);
    }, { threshold: 0.3 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
    setMenuOpen(false);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", organization: "", phone: "", message: "" });
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#f8fbf9", color: "#1a2e24", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f0f7f3; }
        ::-webkit-scrollbar-thumb { background: #3a9b6e; border-radius: 3px; }

        @keyframes float { 0%,100%{transform:translateY(0) translateX(0);opacity:0.3} 50%{transform:translateY(-28px) translateX(12px);opacity:0.7} }
        @keyframes pulseRing { 0%{transform:scale(0.8);opacity:0.6} 100%{transform:scale(2.2);opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }

        .hero-title { animation: fadeUp 1s ease 0.2s both; }
        .hero-sub { animation: fadeUp 1s ease 0.5s both; }
        .hero-btns { animation: fadeUp 1s ease 0.8s both; }
        .hero-badge { animation: fadeUp 1s ease 0.1s both; }

        .nav-link {
          position: relative; cursor: pointer; transition: color 0.3s;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: -4px; left: 0;
          width: 0; height: 2px; background: #1e7d50;
          transition: width 0.3s; border-radius: 2px;
        }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }

        .service-card { transition: transform 0.35s, box-shadow 0.35s, border-color 0.35s; cursor: default; }
        .service-card:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0 24px 60px rgba(30,125,80,0.12) !important;
          border-color: rgba(30,125,80,0.3) !important;
        }

        .btn-primary {
          background: linear-gradient(135deg, #1e7d50, #2da06a);
          border: none; color: #fff;
          padding: 1rem 2.2rem; border-radius: 50px;
          font-size: 1rem; font-weight: 600; cursor: pointer;
          transition: transform 0.25s, box-shadow 0.25s;
          letter-spacing: 0.03em; font-family: 'DM Sans', sans-serif;
          box-shadow: 0 4px 20px rgba(30,125,80,0.25);
        }
        .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(30,125,80,0.38); }

        .btn-outline {
          background: transparent;
          border: 1.5px solid #1e7d50;
          color: #1e7d50;
          padding: 1rem 2.2rem; border-radius: 50px;
          font-size: 1rem; font-weight: 500; cursor: pointer;
          transition: all 0.25s; letter-spacing: 0.03em;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-outline:hover { background: #1e7d50; color: #fff; transform: translateY(-3px); box-shadow: 0 10px 30px rgba(30,125,80,0.25); }

        input, textarea { outline: none; font-family: 'DM Sans', sans-serif; }
        input:focus, textarea:focus {
          border-color: #1e7d50 !important;
          box-shadow: 0 0 0 3px rgba(30,125,80,0.1) !important;
        }

        .shimmer-text {
          background: linear-gradient(90deg, #1e7d50, #2da06a, #1e7d50);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        section { scroll-margin-top: 80px; }
      `}</style>

      {/* Subtle floating particles */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: Math.random() * 5 + 2 + "px",
            height: Math.random() * 5 + 2 + "px",
            borderRadius: "50%",
            background: `rgba(30,125,80,${Math.random() * 0.15 + 0.05})`,
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            animation: `float ${Math.random() * 9 + 7}s ease-in-out ${Math.random() * 5}s infinite`,
          }} />
        ))}
      </div>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: "#ffffff",
        borderBottom: "1px solid #e8f0ec",
        boxShadow: scrolled ? "0 2px 24px rgba(30,125,80,0.08)" : "0 1px 0 #e8f0ec",
        transition: "box-shadow 0.4s ease",
        padding: "0 3rem",
        height: 70,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <div style={{ cursor: "pointer", display: "flex", alignItems: "center" }} onClick={() => scrollTo("home")}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 64" width="260" height="64" aria-label="REGINX AI">
            <defs>
              <linearGradient id="navHexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e7d50"/>
                <stop offset="100%" stopColor="#2da06a"/>
              </linearGradient>
              <linearGradient id="navTextGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0f1f17"/>
                <stop offset="100%" stopColor="#1a3d28"/>
              </linearGradient>
              <filter id="navGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="1.5" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            {/* Hexagon icon */}
            <g transform="translate(4, 4)">
              {/* Outer hex border */}
              <polygon points="28,2 50,14 50,42 28,54 6,42 6,14"
                fill="url(#navHexGrad)" opacity="0.12"/>
              <polygon points="28,2 50,14 50,42 28,54 6,42 6,14"
                fill="none" stroke="url(#navHexGrad)" strokeWidth="1.5" filter="url(#navGlow)"/>
              {/* Inner hex */}
              <polygon points="28,10 44,19 44,37 28,46 12,37 12,19"
                fill="none" stroke="#1e7d50" strokeWidth="0.8" opacity="0.35"/>
              {/* Neural connections */}
              <g stroke="#1e7d50" strokeWidth="0.9" opacity="0.5">
                <line x1="28" y1="28" x2="28" y2="14"/>
                <line x1="28" y1="28" x2="28" y2="42"/>
                <line x1="28" y1="28" x2="17" y2="21"/>
                <line x1="28" y1="28" x2="39" y2="21"/>
                <line x1="28" y1="28" x2="17" y2="35"/>
                <line x1="28" y1="28" x2="39" y2="35"/>
              </g>
              {/* Outer nodes */}
              <g fill="#1e7d50" opacity="0.7">
                <circle cx="28" cy="14" r="2"/>
                <circle cx="28" cy="42" r="2"/>
                <circle cx="17" cy="21" r="2"/>
                <circle cx="39" cy="21" r="2"/>
                <circle cx="17" cy="35" r="2"/>
                <circle cx="39" cy="35" r="2"/>
              </g>
              {/* Center node */}
              <circle cx="28" cy="28" r="4.5" fill="#1e7d50" filter="url(#navGlow)"/>
              <circle cx="28" cy="28" r="7" fill="none" stroke="#2da06a" strokeWidth="0.8" opacity="0.4"/>
            </g>

            {/* Divider */}
            <line x1="66" y1="12" x2="66" y2="52" stroke="#dceee4" strokeWidth="1.2"/>

            {/* REGINX wordmark */}
            <text x="78" y="38"
              fontFamily="'Playfair Display', Georgia, serif"
              fontSize="26" fontWeight="800"
              letterSpacing="3"
              fill="url(#navTextGrad)">REGINX</text>

            {/* AI badge */}
            <rect x="80" y="43" width="28" height="13" rx="3" fill="#1e7d50"/>
            <text x="94" y="53"
              fontFamily="'DM Sans', sans-serif"
              fontSize="8" fontWeight="700"
              letterSpacing="1.5"
              textAnchor="middle"
              fill="#ffffff">AI</text>

            {/* Tagline */}
            <text x="114" y="53"
              fontFamily="'DM Sans', sans-serif"
              fontSize="7.5" fontWeight="400"
              letterSpacing="1.8"
              fill="#7aab92">TECHNOLOGIES LLP</text>
          </svg>
        </div>

        {/* Desktop Nav */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {NAV_LINKS.map(link => (
            <span key={link}
              className={`nav-link${activeNav === link ? " active" : ""}`}
              style={{ fontSize: "0.88rem", color: activeNav === link ? "#1e7d50" : "#4a6b57", fontWeight: 500, letterSpacing: "0.03em" }}
              onClick={() => scrollTo(link)}>
              {link}
            </span>
          ))}
          <button className="btn-primary" style={{ padding: "0.6rem 1.4rem", fontSize: "0.88rem" }} onClick={() => scrollTo("Contact")}>
            Get a Demo
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: "70px", background: "#ffffff" }}>
        {/* Subtle background mesh */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 55% at 65% 45%, rgba(30,125,80,0.07) 0%, transparent 65%), radial-gradient(ellipse 45% 45% at 15% 75%, rgba(45,160,106,0.05) 0%, transparent 60%)" }} />
        {/* Grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(30,125,80,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(30,125,80,0.04) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        {/* Pulse rings */}
        <div style={{ position: "absolute", right: "7%", top: "28%", width: 320, height: 320 }}>
          {[0, 0.6, 1.2].map(d => (
            <div key={d} style={{ position: "absolute", inset: 0, border: "1px solid rgba(30,125,80,0.18)", borderRadius: "50%", animation: `pulseRing 3s ease-out ${d}s infinite` }} />
          ))}
          <div style={{ position: "absolute", inset: "35%", background: "radial-gradient(circle, rgba(30,125,80,0.12), transparent)", borderRadius: "50%" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 780, margin: "0 auto", padding: "0 3rem", textAlign: "center" }}>
          <div className="hero-badge" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(30,125,80,0.08)", border: "1px solid rgba(30,125,80,0.2)", borderRadius: 50, padding: "0.45rem 1.3rem", marginBottom: "2rem", fontSize: "0.8rem", color: "#1e7d50", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#1e7d50", display: "inline-block", boxShadow: "0 0 8px rgba(30,125,80,0.6)" }} />
            Trusted by Government Organizations
          </div>

          <h1 className="hero-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.8rem, 5.5vw, 4.8rem)", fontWeight: 800, lineHeight: 1.12, marginBottom: "1.5rem", color: "#0f1f17" }}>
            Powering Governance with{" "}
            <span className="shimmer-text">Intelligent AI</span>
          </h1>

          <p className="hero-sub" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.1rem, 2vw, 1.4rem)", color: "#5a8a6e", lineHeight: 1.75, marginBottom: "2.5rem", fontWeight: 300, fontStyle: "italic", maxWidth: 620, margin: "0 auto 2.5rem" }}>
            REGINX AI Technologies LLP delivers cutting-edge Artificial Intelligence solutions tailored exclusively for Government Organizations — enabling smarter decisions, transparent governance and efficient citizen services.
          </p>

          <div className="hero-btns" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" style={{ fontSize: "1.05rem", padding: "1.1rem 2.5rem" }} onClick={() => scrollTo("Contact")}>
              Request an Enquiry →
            </button>
            <button className="btn-outline" style={{ fontSize: "1.05rem", padding: "1.1rem 2.5rem" }} onClick={() => scrollTo("Services")}>
              Explore Solutions
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", opacity: 0.4 }}>
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "#1e7d50", textTransform: "uppercase" }}>Scroll</div>
          <div style={{ width: 1, height: 40, background: "linear-gradient(#1e7d50, transparent)" }} />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "6rem 3rem", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "0.73rem", color: "#1e7d50", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "1rem", fontWeight: 700 }}>About Us</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "1.5rem", color: "#0f1f17" }}>
              Bridging Governance<br /><em style={{ color: "#1e7d50", fontStyle: "italic" }}>& Artificial Intelligence</em>
            </h2>
            <p style={{ color: "#4a6b57", lineHeight: 1.85, marginBottom: "1.5rem", fontSize: "1rem" }}>
              Founded by a team of AI researchers, policy experts and technology veterans, REGINX AI Technologies LLP was built with a single mission — to transform how governments operate through the responsible deployment of Artificial Intelligence.
            </p>
            <p style={{ color: "#4a6b57", lineHeight: 1.85, marginBottom: "2rem", fontSize: "1rem" }}>
              We specialize in designing AI systems that respect data sovereignty, comply with Indian government standards, and integrate seamlessly with existing e-governance frameworks like NIC, DigiLocker and UMANG.
            </p>
            <div style={{ display: "flex", gap: "2.5rem" }}>
              {[["2022", "Founded"], ["Kerala", "Headquarters"], ["Pan-India", "Operations"]].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: "#1e7d50" }}>{v}</div>
                  <div style={{ fontSize: "0.8rem", color: "#7aab92", letterSpacing: "0.08em", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Values panel */}
          <div style={{ background: "linear-gradient(135deg,rgba(30,125,80,0.05),rgba(30,125,80,0.02))", border: "1px solid rgba(30,125,80,0.12)", borderRadius: 22, padding: "2.5rem", boxShadow: "0 4px 40px rgba(30,125,80,0.07)" }}>
            <div style={{ fontSize: "0.73rem", color: "#1e7d50", letterSpacing: "0.18em", marginBottom: "1.5rem", textTransform: "uppercase", fontWeight: 700 }}>Our Core Values</div>
            {[
              ["🔒", "Security First", "All AI systems built with data privacy and national security at the forefront."],
              ["⚖️", "Ethical AI", "Bias-free, explainable models that uphold democratic accountability."],
              ["🌱", "Inclusive Growth", "AI solutions accessible across linguistic and geographic barriers."],
              ["🔧", "Reliable Infrastructure", "99.8% uptime with disaster recovery and sovereign cloud hosting."],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", alignItems: "flex-start" }}>
                <div style={{ fontSize: "1.4rem", marginTop: 2, flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontWeight: 600, color: "#1a2e24", marginBottom: "0.25rem", fontSize: "0.95rem" }}>{title}</div>
                  <div style={{ fontSize: "0.85rem", color: "#5a8a6e", lineHeight: 1.65 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: "6rem 3rem", background: "#f0f7f3" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div style={{ fontSize: "0.73rem", color: "#1e7d50", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 700 }}>What We Do</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, color: "#0f1f17", marginBottom: "1rem" }}>Our AI Services</h2>
            <p style={{ color: "#5a8a6e", maxWidth: 540, margin: "0 auto", lineHeight: 1.75 }}>
              End-to-end AI capabilities designed specifically for the complexities and compliance requirements of government organizations.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {SERVICES.map((s, i) => (
              <div key={i} className="service-card" style={{ background: "#ffffff", border: "1px solid #dceee4", borderRadius: 18, padding: "2.2rem", boxShadow: "0 2px 16px rgba(30,125,80,0.06)" }}>
                <div style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 700, color: "#0f1f17", marginBottom: "0.75rem" }}>{s.title}</h3>
                <p style={{ fontSize: "0.9rem", color: "#5a8a6e", lineHeight: 1.75 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS ── */}
      <section id="solutions" style={{ padding: "6rem 3rem", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div style={{ fontSize: "0.73rem", color: "#1e7d50", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 700 }}>Use Cases</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, color: "#0f1f17", marginBottom: "1rem" }}>Department-Specific Solutions</h2>
          <p style={{ color: "#5a8a6e", maxWidth: 540, margin: "0 auto", lineHeight: 1.75 }}>
            Targeted AI applications built for the unique workflows of each government department.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
          {SOLUTIONS.map((s, i) => (
            <div key={i} style={{
              background: "#ffffff", border: "1px solid #dceee4", borderRadius: 18, padding: "2.2rem",
              boxShadow: "0 2px 16px rgba(30,125,80,0.06)", transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 16px 44px rgba(30,125,80,0.14)"; e.currentTarget.style.borderColor = "rgba(30,125,80,0.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(30,125,80,0.06)"; e.currentTarget.style.borderColor = "#dceee4"; }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{s.icon}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 700, color: "#1e7d50", marginBottom: "1.25rem" }}>{s.dept}</div>
              {s.items.map((item, j) => (
                <div key={j} style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.65rem" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#1e7d50", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.88rem", color: "#4a6b57" }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── STATISTICS ── */}
      <section id="statistics" ref={statsRef} style={{ padding: "6rem 3rem", background: "#f0f7f3", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(30,125,80,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(30,125,80,0.04) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div style={{ fontSize: "0.73rem", color: "#1e7d50", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 700 }}>Our Impact</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, color: "#0f1f17" }}>Numbers That Matter</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
            {STATS.map((s, i) => <StatCard key={i} {...s} animate={statsVisible} />)}
          </div>

          {/* Testimonial */}
          <div style={{ marginTop: "4rem", background: "#ffffff", border: "1px solid #dceee4", borderRadius: 22, padding: "2.5rem 3rem", textAlign: "center", maxWidth: 700, margin: "4rem auto 0", boxShadow: "0 4px 30px rgba(30,125,80,0.08)" }}>
            <div style={{ fontSize: "3rem", color: "rgba(30,125,80,0.2)", fontFamily: "Georgia", lineHeight: 0.5, marginBottom: "1rem" }}>"</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", color: "#2a4a38", lineHeight: 1.75, fontStyle: "italic", marginBottom: "1.5rem" }}>
              REGINX AI transformed our district-level grievance resolution process. Response times dropped by 60% and citizen satisfaction scores reached an all-time high.
            </p>
            <div style={{ fontSize: "0.85rem", color: "#7aab92" }}>
              <strong style={{ color: "#1e7d50" }}>District Collector</strong> — Kerala Administrative Services
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section style={{ padding: "6rem 3rem", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div style={{ fontSize: "0.73rem", color: "#1e7d50", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 700 }}>Our Leadership</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, color: "#0f1f17" }}>Meet the Team</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1.5rem" }}>
          {TEAM.map((member, i) => (
            <div key={i} style={{
              textAlign: "center", padding: "2.5rem 1.5rem",
              background: "#ffffff", border: "1px solid #dceee4", borderRadius: 18,
              boxShadow: "0 2px 16px rgba(30,125,80,0.06)",
              transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 44px rgba(30,125,80,0.14)"; e.currentTarget.style.borderColor = "rgba(30,125,80,0.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(30,125,80,0.06)"; e.currentTarget.style.borderColor = "#dceee4"; }}
            >
              <div style={{
                width: 82, height: 82, borderRadius: "50%",
                background: "linear-gradient(135deg,#1e7d50,#2da06a)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 1.25rem",
                fontSize: "1.4rem", fontWeight: 700, color: "#fff",
                fontFamily: "'Playfair Display', serif",
                boxShadow: "0 8px 28px rgba(30,125,80,0.3)",
              }}>{member.initials}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", fontWeight: 700, color: "#0f1f17", marginBottom: "0.35rem" }}>{member.name}</div>
              <div style={{ fontSize: "0.82rem", color: "#7aab92", letterSpacing: "0.04em" }}>{member.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "6rem 3rem", background: "#f0f7f3" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "5rem", alignItems: "start" }}>
          <div>
            <div style={{ fontSize: "0.73rem", color: "#1e7d50", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 700 }}>Contact Us</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3vw, 2.8rem)", fontWeight: 700, color: "#0f1f17", marginBottom: "1.5rem", lineHeight: 1.2 }}>
              Start Your AI<br /><em style={{ color: "#1e7d50", fontStyle: "italic" }}>Transformation</em>
            </h2>
            <p style={{ color: "#5a8a6e", lineHeight: 1.85, marginBottom: "2.5rem", fontSize: "0.95rem" }}>
              Whether you're looking for a proof-of-concept, a full-scale deployment or a consultation, our team is ready to craft the right AI solution for your organization.
            </p>
            {[
              ["📍", "Address", "REGINX AI Technologies LLP\nKochi, Kerala — 682001"],
              ["📧", "Email", "info@reginxai.com"],
              ["📞", "Phone", "+91 98765 43210"],
              ["🕐", "Business Hours", "Mon – Sat: 9:00 AM – 6:00 PM IST"],
            ].map(([icon, label, value]) => (
              <div key={label} style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", alignItems: "flex-start" }}>
                <div style={{ fontSize: "1.3rem", marginTop: 2 }}>{icon}</div>
                <div>
                  <div style={{ fontSize: "0.73rem", color: "#7aab92", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.25rem", fontWeight: 600 }}>{label}</div>
                  <div style={{ fontSize: "0.95rem", color: "#1a2e24", whiteSpace: "pre-line" }}>{value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div style={{ background: "#ffffff", border: "1px solid #dceee4", borderRadius: 22, padding: "2.5rem", boxShadow: "0 4px 40px rgba(30,125,80,0.08)" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "#1e7d50", marginBottom: "0.75rem" }}>Enquiry Submitted!</h3>
                <p style={{ color: "#5a8a6e" }}>Our team will contact you within 1 business day.</p>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "#0f1f17", marginBottom: "1.75rem" }}>Send an Enquiry</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  {[["name", "Full Name *", "text"], ["email", "Email Address *", "email"]].map(([key, placeholder, type]) => (
                    <input key={key} type={type} placeholder={placeholder}
                      value={formData[key]}
                      onChange={e => setFormData(p => ({ ...p, [key]: e.target.value }))}
                      style={{ background: "#f8fbf9", border: "1px solid #dceee4", borderRadius: 10, padding: "0.85rem 1rem", color: "#1a2e24", fontSize: "0.9rem", width: "100%", transition: "border-color 0.3s, box-shadow 0.3s" }}
                    />
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  {[["organization", "Organization / Department", "text"], ["phone", "Phone Number", "tel"]].map(([key, placeholder, type]) => (
                    <input key={key} type={type} placeholder={placeholder}
                      value={formData[key]}
                      onChange={e => setFormData(p => ({ ...p, [key]: e.target.value }))}
                      style={{ background: "#f8fbf9", border: "1px solid #dceee4", borderRadius: 10, padding: "0.85rem 1rem", color: "#1a2e24", fontSize: "0.9rem", width: "100%", transition: "border-color 0.3s, box-shadow 0.3s" }}
                    />
                  ))}
                </div>
                <textarea placeholder="Tell us about your requirements *"
                  value={formData.message}
                  onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  rows={4}
                  style={{ background: "#f8fbf9", border: "1px solid #dceee4", borderRadius: 10, padding: "0.85rem 1rem", color: "#1a2e24", fontSize: "0.9rem", width: "100%", resize: "vertical", marginBottom: "1.25rem", transition: "border-color 0.3s, box-shadow 0.3s" }}
                />
                <button className="btn-primary" style={{ width: "100%", padding: "1rem", fontSize: "1rem" }} onClick={handleSubmit}>
                  Submit Enquiry →
                </button>
                <p style={{ fontSize: "0.75rem", color: "#7aab92", textAlign: "center", marginTop: "1rem" }}>
                  🔒 Your information is secure and never shared with third parties.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0f1f17", borderTop: "1px solid rgba(30,125,80,0.2)", padding: "3.5rem 3rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
            <div>
              <div style={{ marginBottom: "1.25rem" }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 56" width="220" height="56" aria-label="REGINX AI">
                  <defs>
                    <linearGradient id="ftHexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2da06a"/>
                      <stop offset="100%" stopColor="#3dbf82"/>
                    </linearGradient>
                    <filter id="ftGlow" x="-40%" y="-40%" width="180%" height="180%">
                      <feGaussianBlur stdDeviation="1.2" result="blur"/>
                      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                  </defs>
                  <g transform="translate(3,3)">
                    <polygon points="25,2 45,13 45,37 25,48 5,37 5,13"
                      fill="url(#ftHexGrad)" opacity="0.15"/>
                    <polygon points="25,2 45,13 45,37 25,48 5,37 5,13"
                      fill="none" stroke="url(#ftHexGrad)" strokeWidth="1.5" filter="url(#ftGlow)"/>
                    <polygon points="25,9 38,17 38,33 25,41 12,33 12,17"
                      fill="none" stroke="#2da06a" strokeWidth="0.7" opacity="0.35"/>
                    <g stroke="#2da06a" strokeWidth="0.8" opacity="0.55">
                      <line x1="25" y1="25" x2="25" y2="13"/>
                      <line x1="25" y1="25" x2="25" y2="37"/>
                      <line x1="25" y1="25" x2="15" y2="19"/>
                      <line x1="25" y1="25" x2="35" y2="19"/>
                      <line x1="25" y1="25" x2="15" y2="31"/>
                      <line x1="25" y1="25" x2="35" y2="31"/>
                    </g>
                    <g fill="#2da06a" opacity="0.75">
                      <circle cx="25" cy="13" r="1.8"/>
                      <circle cx="25" cy="37" r="1.8"/>
                      <circle cx="15" cy="19" r="1.8"/>
                      <circle cx="35" cy="19" r="1.8"/>
                      <circle cx="15" cy="31" r="1.8"/>
                      <circle cx="35" cy="31" r="1.8"/>
                    </g>
                    <circle cx="25" cy="25" r="4" fill="#2da06a" filter="url(#ftGlow)"/>
                  </g>
                  <line x1="58" y1="10" x2="58" y2="46" stroke="rgba(163,210,185,0.2)" strokeWidth="1"/>
                  <text x="68" y="34" fontFamily="'Playfair Display', Georgia, serif" fontSize="22" fontWeight="800" letterSpacing="3" fill="#e8f2ee">REGINX</text>
                  <rect x="70" y="38" width="24" height="11" rx="2.5" fill="#2da06a"/>
                  <text x="82" y="47" fontFamily="'DM Sans', sans-serif" fontSize="7" fontWeight="700" letterSpacing="1.2" textAnchor="middle" fill="#fff">AI</text>
                  <text x="100" y="47" fontFamily="'DM Sans', sans-serif" fontSize="6.5" letterSpacing="1.5" fill="#4a6b57">TECHNOLOGIES LLP · INDIA</text>
                </svg>
              </div>
              <p style={{ fontSize: "0.85rem", color: "#4a6b57", lineHeight: 1.75, maxWidth: 260 }}>
                Empowering governments with responsible, scalable, and secure Artificial Intelligence solutions.
              </p>
            </div>
            {[
              ["Services", ["AI Consulting", "Document AI", "Predictive Analytics", "Smart Chatbots", "Audit AI"]],
              ["Solutions", ["Healthcare", "Public Safety", "Revenue & Tax", "Agriculture", "Education"]],
              ["Company", ["About Us", "Our Team", "Careers", "Press", "Privacy Policy"]],
            ].map(([title, items]) => (
              <div key={title}>
                <div style={{ fontSize: "0.73rem", color: "#1e7d50", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "1rem", fontWeight: 700 }}>{title}</div>
                {items.map(item => (
                  <div key={item} style={{ fontSize: "0.87rem", color: "#4a6b57", marginBottom: "0.65rem", cursor: "pointer", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#a3d2b9"}
                    onMouseLeave={e => e.currentTarget.style.color = "#4a6b57"}
                  >{item}</div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid rgba(30,125,80,0.15)", paddingTop: "1.75rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ fontSize: "0.8rem", color: "#2d4a39" }}>
              © 2024 REGINX AI Technologies LLP. All rights reserved. · CIN: AAQ-1234 · MSME Registered
            </div>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {["LinkedIn", "Twitter", "GitHub", "YouTube"].map(s => (
                <span key={s} style={{ fontSize: "0.8rem", color: "#2d4a39", cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#a3d2b9"}
                  onMouseLeave={e => e.currentTarget.style.color = "#2d4a39"}
                >{s}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
