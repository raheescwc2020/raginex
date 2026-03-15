/**
 * REGINX AI Technologies LLP — Full Portal (Mobile-Responsive)
 * ─────────────────────────────────────────────────────────────
 * Prerequisites:  npm install @vapi-ai/web
 * Drop in as:     src/pages/Index.jsx  (or src/App.jsx)
 */

import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════ */
const T = {
  green50:  "#edfaf3", green100: "#c6f0d8", green200: "#8eddb2",
  green300: "#5dca8e", green400: "#34c26a", green500: "#1fa854",
  green600: "#167a3d", green700: "#0d5229",
  ink:   "#0b1510", ink80: "#1c2e22", ink60: "#3d5244",
  ink40: "#6b8271", ink20: "#a8bfac",
  white: "#ffffff", offWhite: "#f7faf8", surface: "#f0f7f3",
  border:   "rgba(31,168,84,0.13)",
  borderMd: "rgba(31,168,84,0.25)",
};

/* ═══════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════ */
const GlobalStyles = () => {
  useEffect(() => {
    const id = "rg-global";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
      *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
      html { scroll-behavior:smooth; }
      body { font-family:'Plus Jakarta Sans',sans-serif; background:#fff; color:#0b1510; overflow-x:hidden; -webkit-font-smoothing:antialiased; }

      /* Scroll reveal */
      .rg-reveal { opacity:0; transform:translateY(28px); transition:opacity 0.72s ease, transform 0.72s ease; }
      .rg-reveal.on { opacity:1; transform:translateY(0); }
      .rg-d1{transition-delay:.12s} .rg-d2{transition-delay:.24s} .rg-d3{transition-delay:.36s} .rg-d4{transition-delay:.48s}

      /* Keyframes */
      @keyframes rgPulse  { 0%,100%{transform:scale(1);opacity:1}    50%{transform:scale(1.7);opacity:.45} }
      @keyframes rgFloat  { 0%,100%{transform:translateY(0)}          50%{transform:translateY(-16px)} }
      @keyframes rgFadeUp { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
      @keyframes rgBarIn  { from{transform:scaleX(0)}                  to{transform:scaleX(1)} }
      @keyframes vapiPing { 0%{transform:scale(1);opacity:.55} 100%{transform:scale(2.2);opacity:0} }
      @keyframes vapiSpin { to{transform:rotate(360deg)} }
      @keyframes vapiWave { 0%,100%{height:5px} 50%{height:22px} }
      @keyframes vapiPop  { 0%{opacity:0;transform:scale(.82) translateY(12px)} 100%{opacity:1;transform:scale(1) translateY(0)} }
      @keyframes vapiSlide{ from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }

      /* Hero animations */
      .rg-hero-headline { animation:rgFadeUp .9s .28s both; }
      .rg-hero-body     { animation:rgFadeUp .9s .46s both; }
      .rg-hero-actions  { animation:rgFadeUp .9s .62s both; }
      .rg-hero-badge    { animation:rgFadeUp .8s .12s both; }
      .rg-hero-orb      { animation:rgFadeUp 1s  .80s both; }

      /* Card hovers */
      .rg-cap-card  { transition:background .25s,box-shadow .25s; }
      .rg-cap-card:hover { background:#f7faf8 !important; box-shadow:0 8px 32px rgba(31,168,84,.07); }
      .rg-plat-card { transition:border-color .28s,transform .28s,box-shadow .28s; position:relative; overflow:hidden; }
      .rg-plat-card:hover { border-color:rgba(31,168,84,.35) !important; transform:translateY(-5px); box-shadow:0 14px 40px rgba(31,168,84,.09); }
      .rg-plat-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#34c26a,#8eddb2); border-radius:16px 16px 0 0; transform:scaleX(0); transform-origin:left; transition:transform .35s; }
      .rg-plat-card:hover::before { transform:scaleX(1); }
      .rg-deploy-card { transition:border-color .28s,transform .28s,box-shadow .28s; }
      .rg-deploy-card:hover { border-color:rgba(31,168,84,.35) !important; transform:translateY(-5px); box-shadow:0 14px 40px rgba(31,168,84,.09); }
      .rg-stat-card { transition:border-color .28s,transform .28s; }
      .rg-stat-card:hover { border-color:rgba(52,194,106,.4) !important; transform:translateY(-5px); }

      /* Nav underline */
      .rg-nav-link { position:relative; }
      .rg-nav-link::after { content:''; position:absolute; bottom:-2px; left:0; right:0; height:1.5px; background:#1fa854; transform:scaleX(0); transition:transform .22s; }
      .rg-nav-link:hover::after { transform:scaleX(1); }

      /* Inputs */
      .rg-input { transition:border-color .2s,box-shadow .2s,background .2s; }
      .rg-input:focus { border-color:#34c26a !important; background:#fff !important; box-shadow:0 0 0 3px rgba(52,194,106,.1); outline:none; }

      /* Buttons */
      .rg-btn-p { transition:background .2s,transform .15s; }
      .rg-btn-p:hover { background:#167a3d !important; transform:translateY(-2px); }
      .rg-btn-o { transition:border-color .2s,background .2s,transform .15s; }
      .rg-btn-o:hover { border-color:#1fa854 !important; background:#edfaf3 !important; transform:translateY(-2px); }

      /* Vapi bar */
      .vapi-bar { width:3px; border-radius:3px; flex-shrink:0; animation:vapiWave .85s ease-in-out infinite; }

      /* Mobile hamburger */
      .rg-ham { display:none; flex-direction:column; gap:5px; cursor:pointer; padding:6px; background:none; border:none; }
      .rg-ham span { display:block; width:22px; height:2px; background:#0b1510; border-radius:2px; transition:transform .25s,opacity .25s; }

      /* Mobile nav drawer */
      .rg-mob-nav { display:none; }

      @media(max-width:768px) {
        .rg-desktop-nav { display:none !important; }
        .rg-ham { display:flex; }
        .rg-mob-nav {
          display:flex; flex-direction:column; gap:0;
          position:fixed; top:68px; left:0; right:0; z-index:190;
          background:rgba(255,255,255,0.98); backdrop-filter:blur(20px);
          border-bottom:1px solid rgba(31,168,84,0.13);
          transform:translateY(-110%); transition:transform .3s cubic-bezier(.4,0,.2,1);
          padding:0;
        }
        .rg-mob-nav.open { transform:translateY(0); }
        .rg-mob-nav a { display:block; padding:16px 6vw; font-size:16px; font-weight:500; color:#3d5244; text-decoration:none; border-bottom:1px solid rgba(31,168,84,0.08); }
        .rg-mob-nav a:hover { color:#1fa854; background:#edfaf3; }
        .rg-mob-nav a.cta { background:#1fa854; color:#fff; text-align:center; font-weight:600; margin:16px 6vw 20px; border-radius:100px; border-bottom:none; }

        /* Vapi mobile: bottom-center */
        .vapi-fab {
          left:50% !important; right:auto !important;
          transform:translateX(-50%) !important;
          bottom:24px !important;
          align-items:center !important;
        }
        .vapi-panel { width:calc(100vw - 32px) !important; max-width:360px !important; }
        .vapi-tooltip { display:none !important; }
      }
    `;
    document.head.appendChild(el);
  }, []);
  return null;
};

/* ═══════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════ */
function useIsMobile(bp = 768) {
  const [mob, setMob] = useState(() => typeof window !== "undefined" && window.innerWidth <= bp);
  useEffect(() => {
    const fn = () => setMob(window.innerWidth <= bp);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, [bp]);
  return mob;
}

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".rg-reveal");
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("on"); }),
      { threshold: 0.08 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

function useCounter(target, duration = 1800) {
  const [value, setValue] = useState(0);
  const ref = useRef(null); const counted = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !counted.current) {
        counted.current = true;
        let start;
        const step = ts => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / duration, 1);
          setValue(Math.floor((1 - Math.pow(1 - p, 3)) * target));
          if (p < 1) requestAnimationFrame(step); else setValue(target);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return [value, ref];
}

/* ═══════════════════════════════════════════
   ICONS
═══════════════════════════════════════════ */
const Icon = ({ name, size = 20, color = T.green400 }) => {
  const s = { width:size, height:size, display:"block", flexShrink:0 };
  const icons = {
    predict:  <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20"/><path d="M6 16l4-8 4 5 3-4 3 7"/><circle cx="6" cy="16" r="1.2" fill={color} stroke="none"/></svg>,
    pattern:  <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3"/><path d="M5.64 5.64l2.12 2.12m8.48 8.48 2.12 2.12M5.64 18.36l2.12-2.12m8.48-8.48 2.12-2.12"/></svg>,
    decision: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M17.5 14v3h-3m3 0v3"/></svg>,
    check:    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    mail:     <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>,
    map:      <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>,
    globe:    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    arrow:    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>,
    mic:      <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="9" y1="22" x2="15" y2="22"/></svg>,
    phoneOff: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/><line x1="2" y1="2" x2="22" y2="22"/></svg>,
    spinner:  <svg style={{width:size,height:size,display:"block",flexShrink:0,animation:"vapiSpin .8s linear infinite"}} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10" opacity=".18"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>,
    menu:     <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    x:        <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  };
  return icons[name] || null;
};

/* ═══════════════════════════════════════════
   SHARED PRIMITIVES
═══════════════════════════════════════════ */
const SectionLabel = ({ children }) => (
  <div style={{ display:"inline-flex", alignItems:"center", gap:7, fontSize:11, fontWeight:700, letterSpacing:"0.13em", textTransform:"uppercase", color:T.green500, background:T.green50, border:`1px solid ${T.green100}`, padding:"5px 14px", borderRadius:100 }}>
    <span style={{ width:6, height:6, borderRadius:"50%", background:T.green400 }}/>
    {children}
  </div>
);

const Headline = ({ children, style={} }) => (
  <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(28px,4.2vw,48px)", fontWeight:700, lineHeight:"clamp(1.17, 2vw, 1.2)", letterSpacing:"-0.022em", color:T.ink, ...style }}>{children}</h2>
);

const BodyText = ({ children, style={} }) => (
  <p style={{ fontSize:"clamp(16.5px,1.5vw,18.5px)", lineHeight:"clamp(1.55,2vw,1.65)", color:T.ink60, fontWeight:400, ...style }}>{children}</p>
);

/* ═══════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════ */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => { if (!isMobile) setMenuOpen(false); }, [isMobile]);

  const links = [
    { label:"Capabilities", href:"#capabilities" },
    { label:"Platforms",    href:"#platforms"    },
    { label:"Stats",        href:"#stats"        },
    { label:"Deployment",   href:"#deployment"   },
  ];

  return (
    <>
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 6vw", height:68, background:"rgba(255,255,255,0.96)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", borderBottom:`1px solid ${T.border}`, boxShadow:scrolled?"0 2px 24px rgba(11,21,16,0.07)":"none", transition:"box-shadow 0.3s" }}>
        {/* Logo */}
        <a href="#hero" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}>
          <div style={{ width:36, height:36, borderRadius:10, background:T.green500, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontFamily:"'Playfair Display',serif", fontWeight:800, fontSize:18, color:"#fff" }}>R</span>
          </div>
          <span style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"1.18rem", color:T.ink, letterSpacing:"-0.025em" }}>
            REGINX <span style={{ color:T.green500 }}>AI</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="rg-desktop-nav" style={{ display:"flex", gap:28, listStyle:"none", alignItems:"center" }}>
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="rg-nav-link" style={{ fontSize:14, fontWeight:500, color:T.ink60, textDecoration:"none" }}
                onMouseEnter={e => e.target.style.color = T.green500}
                onMouseLeave={e => e.target.style.color = T.ink60}
              >{l.label}</a>
            </li>
          ))}
          <li><a href="#contact" className="rg-btn-p" style={{ background:T.green500, color:"#fff", padding:"9px 22px", borderRadius:100, fontSize:14, fontWeight:600, textDecoration:"none" }}>Contact Us</a></li>
        </ul>

        {/* Hamburger */}
        <button className="rg-ham" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
          <Icon name={menuOpen ? "x" : "menu"} size={22} color={T.ink} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`rg-mob-nav ${menuOpen ? "open" : ""}`}>
        {links.map(l => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
        ))}
        <a href="#contact" className="cta" onClick={() => setMenuOpen(false)}>Contact Us</a>
      </div>
    </>
  );
};

/* ═══════════════════════════════════════════
   HERO
═══════════════════════════════════════════ */
const Hero = () => {
  const isMobile = useIsMobile();
  return (
    <section id="hero" style={{ minHeight:"100vh", display:"flex", alignItems:"center", padding:isMobile?"100px 5vw 64px":"120px 6vw 80px", position:"relative", overflow:"hidden", background:T.white }}>
      {/* BG */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", background:`radial-gradient(ellipse 55% 60% at 75% 35%,rgba(52,194,106,.08) 0%,transparent 60%),radial-gradient(ellipse 40% 45% at 15% 75%,rgba(31,168,84,.05) 0%,transparent 55%)` }}/>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:`linear-gradient(to right,rgba(31,168,84,.04) 1px,transparent 1px),linear-gradient(to bottom,rgba(31,168,84,.04) 1px,transparent 1px)`, backgroundSize:"64px 64px", maskImage:"radial-gradient(ellipse 85% 75% at 50% 45%,black,transparent)" }}/>

      <div style={{ position:"relative", zIndex:1, maxWidth:isMobile?"100%":760, width:"100%" }}>
        {/* Badge */}
        <div className="rg-hero-badge" style={{ display:"inline-flex", alignItems:"center", gap:9, fontSize:isMobile?10:11.5, fontWeight:700, letterSpacing:"0.11em", textTransform:"uppercase", color:T.green600, background:T.green50, border:`1px solid ${T.green100}`, padding:"7px 16px", borderRadius:100, marginBottom:24 }}>
          <span style={{ width:7, height:7, borderRadius:"50%", background:T.green400, animation:"rgPulse 2s infinite" }}/>
          AI-Driven Operational Intelligence
        </div>

        {/* Headline */}
        <h1 className="rg-hero-headline" style={{ fontFamily:"'Playfair Display',serif", fontSize:isMobile?"clamp(30px,8vw,40px)":"clamp(36px,5.8vw,60px)", fontWeight:800, lineHeight:isMobile?1.2:1.09, letterSpacing:"-0.028em", color:T.ink, marginBottom:20 }}>
          Intelligent Systems<br/>
          for <span style={{ color:T.green500 }}>Complex</span><br/>
          <span style={{ position:"relative", display:"inline-block" }}>
            Sector Ecosystems
            <span style={{ position:"absolute", bottom:4, left:0, right:0, height:4, background:T.green100, borderRadius:3, animation:"rgBarIn 0.8s 1.1s both", zIndex:-1 }}/>
          </span>
        </h1>

        {/* Body */}
        <p className="rg-hero-body" style={{ fontSize:isMobile?17:19, lineHeight:isMobile?1.6:1.66, color:T.ink60, maxWidth:600, fontWeight:400, marginBottom:32 }}>
          REGINX AI Technologies LLP integrates artificial intelligence, IoT, and sector intelligence to enable better decision-making, operational optimisation, and system transparency across institutional and enterprise environments.
        </p>

        {/* CTAs */}
        <div className="rg-hero-actions" style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
          <a href="#platforms" className="rg-btn-p" style={{ display:"inline-flex", alignItems:"center", gap:9, background:T.green500, color:"#fff", padding:isMobile?"13px 24px":"14px 30px", borderRadius:100, fontSize:isMobile?14:15, fontWeight:600, textDecoration:"none" }}>
            Explore Platforms <Icon name="arrow" size={16} color="#fff"/>
          </a>
          <a href="#contact" className="rg-btn-o" style={{ display:"inline-flex", alignItems:"center", gap:9, background:"transparent", color:T.ink, padding:isMobile?"13px 24px":"14px 30px", borderRadius:100, fontSize:isMobile?14:15, fontWeight:600, textDecoration:"none", border:`1.5px solid ${T.borderMd}` }}>
            Get in Touch
          </a>
        </div>
      </div>

      {/* Decorative orb — hidden on mobile */}
      {!isMobile && (
        <div className="rg-hero-orb" style={{ position:"absolute", right:"5vw", top:"50%", transform:"translateY(-50%)", width:"min(360px,38vw)", aspectRatio:"1" }}>
          <div style={{ width:"100%", height:"100%", borderRadius:"50%", background:`radial-gradient(circle at 38% 38%,${T.green100},${T.green400} 55%,${T.green700})`, opacity:0.18, animation:"rgFloat 7s ease-in-out infinite" }}/>
          <div style={{ position:"absolute", inset:"-18px", borderRadius:"50%", border:`1px solid ${T.green100}`, animation:"rgFloat 7s ease-in-out infinite reverse" }}/>
          <div style={{ position:"absolute", inset:"-48px", borderRadius:"50%", border:`1px solid rgba(31,168,84,.07)` }}/>
        </div>
      )}
    </section>
  );
};

/* ═══════════════════════════════════════════
   STATS
═══════════════════════════════════════════ */
const StatCard = ({ target, suffix, label }) => {
  const [val, ref] = useCounter(target);
  return (
    <div ref={ref} className="rg-stat-card" style={{ padding:"2rem 1.25rem", textAlign:"center", border:"1px solid rgba(255,255,255,0.06)", borderRadius:16 }}>
      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2.2rem,5vw,3.4rem)", fontWeight:800, color:"#fff", lineHeight:1, letterSpacing:"-0.04em" }}>
        {val}<span style={{ color:T.green400 }}>{suffix}</span>
      </div>
      <div style={{ marginTop:8, fontSize:"clamp(12px,1.2vw,13.5px)", color:"rgba(255,255,255,0.4)", fontWeight:400 }}>{label}</div>
    </div>
  );
};

const Stats = () => {
  useScrollReveal();
  const isMobile = useIsMobile();
  return (
    <section id="stats" style={{ background:T.ink, padding:isMobile?"60px 5vw":"80px 6vw", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:`repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(255,255,255,.018) 59px,rgba(255,255,255,.018) 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(255,255,255,.018) 59px,rgba(255,255,255,.018) 60px)` }}/>
      <div style={{ position:"absolute", top:-120, right:-80, width:440, height:440, borderRadius:"50%", background:"radial-gradient(circle,rgba(52,194,106,.1),transparent 65%)" }}/>
      <div style={{ position:"relative" }}>
        <div className="rg-reveal" style={{ textAlign:"center", marginBottom:36 }}>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.13em", textTransform:"uppercase", color:T.green400, marginBottom:8 }}>Numbers That Matter</div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.5rem,3vw,2.1rem)", fontWeight:700, color:"#fff", letterSpacing:"-0.02em" }}>The scale of REGINX intelligence</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr 1fr":"repeat(5,1fr)", gap:"1rem" }}>
          {[
            { target:5,   suffix:"+", label:"Platform Families"         },
            { target:3,   suffix:"",  label:"Core AI Capabilities"      },
            { target:100, suffix:"+", label:"Use Case Applications"     },
            { target:2,   suffix:"",  label:"Deployment Sectors"        },
            { target:15,  suffix:"+", label:"Intelligence Modules"      },
          ].map((s,i) => <StatCard key={i} {...s}/>)}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   CORE CAPABILITIES
═══════════════════════════════════════════ */
const capData = [
  { icon:"predict", title:"Predictive Operational Intelligence",
    desc:"AI systems analyse operational data to anticipate future developments — enabling organisations to get ahead of challenges rather than react to them.",
    points:["Predicting logistics bottlenecks before they cascade","Forecasting infrastructure utilisation and capacity needs","Identifying agricultural production trends in advance","Generating real-time supply-chain disruption alerts","Demand forecasting across distributed networks"],
    tags:["Logistics","Forecasting","Supply Chain","Infrastructure"] },
  { icon:"pattern", title:"Pattern Recognition & Anomaly Detection",
    desc:"AI detects irregularities within complex operational datasets — supporting risk monitoring and maintaining operational transparency at scale.",
    points:["Identifying supply chain disruptions from data signals","Detecting compliance anomalies across institutions","Spotting infrastructure inefficiencies in real time","Flagging unusual operational behaviour patterns","Cold chain temperature deviation alerts"],
    tags:["Risk Monitoring","Compliance","Anomaly Detection","Transparency"] },
  { icon:"decision", title:"Decision Support & Strategic Intelligence",
    desc:"AI assists decision-makers in complex operational environments — turning large datasets into clear, actionable strategic intelligence.",
    points:["Sector intelligence dashboards with live data integration","Operational performance analysis and benchmarking","Scenario modelling for strategic planning","Policy and regulatory monitoring feeds","Expert collaboration and knowledge synthesis"],
    tags:["Dashboards","Scenario Modelling","Policy Monitoring","Strategy"] },
];

const CapCard = ({ data, delay }) => (
  <div className={`rg-cap-card rg-reveal ${delay}`} style={{ background:T.white, padding:"clamp(20px,4vw,36px) clamp(18px,4vw,32px)", borderRight:`1px solid ${T.border}` }}>
    <div style={{ display:"flex", alignItems:"flex-start", gap:14, marginBottom:16 }}>
      <div style={{ width:50, height:50, borderRadius:13, flexShrink:0, background:T.green50, border:`1px solid ${T.green100}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <Icon name={data.icon} size={22} color={T.green400}/>
      </div>
      <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1rem,2vw,1.15rem)", fontWeight:700, color:T.ink, lineHeight:1.28, letterSpacing:"-0.012em", paddingTop:4 }}>{data.title}</h3>
    </div>
    <p style={{ fontSize:"clamp(13.5px,1.4vw,15px)", lineHeight:1.7, color:T.ink60, marginBottom:20 }}>{data.desc}</p>
    <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:9, marginBottom:22 }}>
      {data.points.map((pt,i) => (
        <li key={i} style={{ display:"flex", alignItems:"flex-start", gap:9, fontSize:"clamp(13px,1.3vw,14px)", color:T.ink60, lineHeight:1.6 }}>
          <span style={{ width:19, height:19, borderRadius:6, flexShrink:0, background:T.green50, border:`1px solid ${T.green100}`, display:"flex", alignItems:"center", justifyContent:"center", marginTop:1 }}>
            <Icon name="check" size={10} color={T.green500}/>
          </span>
          {pt}
        </li>
      ))}
    </ul>
    <div style={{ display:"flex", flexWrap:"wrap", gap:6, paddingTop:18, borderTop:`1px solid ${T.border}` }}>
      {data.tags.map(tag => <span key={tag} style={{ fontSize:11.5, fontWeight:500, padding:"3px 10px", borderRadius:100, background:T.green50, color:T.green600, border:`1px solid ${T.green100}` }}>{tag}</span>)}
    </div>
  </div>
);

const CoreCapabilities = () => {
  useScrollReveal();
  const isMobile = useIsMobile();
  return (
    <section id="capabilities" style={{ padding:isMobile?"64px 5vw":"100px 6vw", background:T.white }}>
      <div className="rg-reveal" style={{ marginBottom:isMobile?36:52 }}>
        <SectionLabel>Core AI Capabilities</SectionLabel>
        <Headline style={{ marginTop:14, maxWidth:640 }}>Intelligence that<br/>anticipates &amp; acts</Headline>
        <BodyText style={{ marginTop:14, maxWidth:580 }}>Three foundational AI systems that power every REGINX platform — from predicting disruptions to supporting strategic decisions at institutional scale.</BodyText>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"repeat(3,1fr)", gap:0, background:T.border, border:`1px solid ${T.border}`, borderRadius:24, overflow:"hidden" }}>
        {capData.map((d,i) => <CapCard key={i} data={d} delay={["","rg-d1","rg-d2"][i]}/>)}
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   PLATFORMS
═══════════════════════════════════════════ */
const platformsData = [
  { num:"01", title:"Infrastructure & Logistics Intelligence", desc:"AI-driven systems to analyse and optimise logistics and infrastructure environments.", items:["Warehouse ecosystem intelligence","Logistics network analysis","Transport flow monitoring","Infrastructure utilisation analytics","Distribution network optimisation"] },
  { num:"02", title:"Agriculture & Food Systems Intelligence", desc:"AI-enabled platforms supporting agricultural ecosystems and food supply chains.", items:["Crop production intelligence","Farm-to-market logistics analysis","Agricultural supply chain monitoring","Food distribution systems","Agricultural data platforms"] },
  { num:"03", title:"Cold Chain & Perishable Supply",          desc:"AI-driven systems supporting temperature-sensitive supply chains.", items:["Cold storage infrastructure monitoring","Temperature stability analytics","Perishable goods logistics monitoring","Pharmaceutical cold chain systems","Food export logistics"] },
  { num:"04", title:"Institutional & Compliance Intelligence", desc:"AI-assisted platforms for complex legal, administrative and compliance environments.", items:["Litigation lifecycle management","Document intelligence systems","Compliance monitoring","Regulatory data systems","Audit and risk analytics"] },
  { num:"05", title:"Knowledge & Sector Intelligence",         desc:"Digital platforms supporting sector intelligence and knowledge ecosystems.", items:["Sector intelligence systems","Policy and regulatory monitoring","Knowledge databases","Expert collaboration platforms","Dialogue and research environments"] },
];

const PlatCard = ({ data, delay }) => (
  <div className={`rg-plat-card rg-reveal ${delay}`} style={{ background:T.white, border:`1px solid ${T.border}`, borderRadius:20, padding:"clamp(20px,4vw,30px) clamp(18px,4vw,28px)" }}>
    <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.13em", textTransform:"uppercase", color:T.green400, marginBottom:8 }}>{data.num}</div>
    <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1rem,2vw,1.1rem)", fontWeight:700, color:T.ink, lineHeight:1.28, letterSpacing:"-0.012em", marginBottom:9 }}>{data.title}</h3>
    <p style={{ fontSize:"clamp(13px,1.3vw,14px)", lineHeight:1.65, color:T.ink60, marginBottom:18 }}>{data.desc}</p>
    <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:7 }}>
      {data.items.map(it => (
        <li key={it} style={{ display:"flex", alignItems:"center", gap:8, fontSize:"clamp(12.5px,1.2vw,13.5px)", color:T.ink60 }}>
          <span style={{ width:5, height:5, borderRadius:"50%", background:T.green400, flexShrink:0 }}/>
          {it}
        </li>
      ))}
    </ul>
  </div>
);

const Platforms = () => {
  useScrollReveal();
  const isMobile = useIsMobile();
  return (
    <section id="platforms" style={{ padding:isMobile?"64px 5vw":"100px 6vw", background:T.surface }}>
      <div className="rg-reveal" style={{ marginBottom:isMobile?36:52 }}>
        <SectionLabel>Platform Ecosystem</SectionLabel>
        <Headline style={{ marginTop:14, maxWidth:640 }}>Five platform families.<br/>One connected intelligence.</Headline>
        <BodyText style={{ marginTop:14, maxWidth:600 }}>REGINX develops sector platforms that connect central management with distributed field-level networks — keeping digital systems anchored to real operational ecosystems.</BodyText>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"repeat(auto-fit,minmax(260px,1fr))", gap:"1.1rem" }}>
        {platformsData.map((d,i) => <PlatCard key={i} data={d} delay={["","rg-d1","rg-d2","rg-d3","rg-d4"][i%5]}/>)}
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   DEPLOYMENT
═══════════════════════════════════════════ */
const Deployment = () => {
  useScrollReveal();
  const isMobile = useIsMobile();
  const cards = [
    { emoji:"🏛️", title:"Public Sector Institutions",  bar:`linear-gradient(90deg,${T.green500},${T.green300})`, items:["Infrastructure agencies","Warehousing corporations","Sectoral authorities","Regulatory organisations"] },
    { emoji:"🏢", title:"Private Sector Enterprises",  bar:`linear-gradient(90deg,${T.green300},${T.green100})`, items:["Logistics companies","Warehouse operators","Agri supply chain firms","Cold chain operators","Infrastructure companies"] },
  ];
  return (
    <section id="deployment" style={{ padding:isMobile?"64px 5vw":"100px 6vw", background:T.white }}>
      <div className="rg-reveal" style={{ marginBottom:isMobile?36:52 }}>
        <SectionLabel>Deployment Environments</SectionLabel>
        <Headline style={{ marginTop:14 }}>Built for institutions.<br/>Scaled for enterprise.</Headline>
        <BodyText style={{ marginTop:14, maxWidth:580 }}>REGINX platforms deploy across public sector institutions and private enterprises — wherever large and complex operational ecosystems need intelligent management.</BodyText>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:"1.5rem" }}>
        {cards.map((c,i) => (
          <div key={i} className={`rg-deploy-card rg-reveal ${i===1?"rg-d1":""}`} style={{ background:T.white, border:`1px solid ${T.border}`, borderRadius:24, padding:"clamp(24px,4vw,36px) clamp(20px,4vw,32px)", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:4, background:c.bar }}/>
            <span style={{ fontSize:"2rem", marginBottom:14, display:"block" }}>{c.emoji}</span>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.1rem,2.5vw,1.3rem)", fontWeight:700, color:T.ink, letterSpacing:"-0.015em", marginBottom:18 }}>{c.title}</h3>
            <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:10 }}>
              {c.items.map(it => (
                <li key={it} style={{ display:"flex", alignItems:"flex-start", gap:10, fontSize:"clamp(14px,1.4vw,15px)", color:T.ink60, lineHeight:1.55 }}>
                  <span style={{ width:19, height:19, borderRadius:"50%", flexShrink:0, background:T.green50, border:`1px solid ${T.green200}`, display:"flex", alignItems:"center", justifyContent:"center", marginTop:1 }}>
                    <Icon name="check" size={10} color={T.green500}/>
                  </span>
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   CONTACT FORM
═══════════════════════════════════════════ */
const ContactForm = () => {
  useScrollReveal();
  const isMobile = useIsMobile();
  const [form, setForm] = useState({ fn:"", ln:"", email:"", org:"", sector:"", message:"" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    if (!form.fn || !form.email) { setError("Please enter your name and email."); return; }
    setError(""); setSubmitted(true);
  };

  const inp = { width:"100%", padding:"12px 16px", border:`1.5px solid ${T.border}`, borderRadius:10, background:T.offWhite, fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:15, color:T.ink, appearance:"none" };
  const lbl = { display:"block", fontSize:13, fontWeight:600, color:T.ink80, marginBottom:7 };

  return (
    <section id="contact" style={{ padding:isMobile?"64px 5vw":"100px 6vw", background:T.surface }}>
      <div className="rg-reveal" style={{ marginBottom:isMobile?36:52 }}>
        <SectionLabel>Get in Touch</SectionLabel>
        <Headline style={{ marginTop:14 }}>Let's build something<br/>intelligent together</Headline>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1.15fr", gap:isMobile?"2rem":"5rem", alignItems:"start" }}>
        {/* Left info */}
        <div className="rg-reveal">
          <BodyText style={{ marginBottom:28 }}>Whether you're a public institution or a private enterprise, REGINX is ready to design an operational intelligence platform tailored to your sector ecosystem.</BodyText>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {[
              { icon:"mail",  label:"Email",          val:"info@reginx.ai" },
              { icon:"map",   label:"Registered",     val:"India · REGINX AI Technologies LLP" },
              { icon:"globe", label:"Sectors Served", val:"Logistics · Agriculture · Cold Chain · Institutional · Knowledge" },
            ].map(c => (
              <div key={c.label} style={{ display:"flex", alignItems:"flex-start", gap:12, padding:"14px 16px", background:T.white, border:`1px solid ${T.border}`, borderRadius:12 }}>
                <div style={{ width:38, height:38, borderRadius:9, flexShrink:0, background:T.green50, border:`1px solid ${T.green100}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Icon name={c.icon} size={17} color={T.green500}/>
                </div>
                <div>
                  <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em", color:T.ink40, fontWeight:600, marginBottom:2 }}>{c.label}</div>
                  <div style={{ fontSize:14, color:T.ink, fontWeight:500, lineHeight:1.45 }}>{c.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="rg-reveal rg-d1" style={{ background:T.white, border:`1px solid ${T.borderMd}`, borderRadius:24, padding:isMobile?"24px 20px":"36px 32px", boxShadow:"0 4px 40px rgba(31,168,84,0.06)" }}>
          {submitted ? (
            <div style={{ textAlign:"center", padding:"2.5rem 1rem" }}>
              <div style={{ fontSize:"2.8rem", marginBottom:14 }}>✅</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.4rem", fontWeight:700, color:T.ink, marginBottom:8 }}>Message received.</div>
              <p style={{ fontSize:15, color:T.ink60, lineHeight:1.65 }}>Our team will be in touch with you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:14, marginBottom:14 }}>
                <div><label style={lbl}>First Name</label><input name="fn" value={form.fn} onChange={handleChange} placeholder="Rajan" style={inp} className="rg-input"/></div>
                <div><label style={lbl}>Last Name</label><input name="ln" value={form.ln} onChange={handleChange} placeholder="Menon" style={inp} className="rg-input"/></div>
              </div>
              <div style={{ marginBottom:14 }}><label style={lbl}>Email Address</label><input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@organisation.com" style={inp} className="rg-input"/></div>
              <div style={{ marginBottom:14 }}><label style={lbl}>Organisation</label><input name="org" value={form.org} onChange={handleChange} placeholder="Your organisation name" style={inp} className="rg-input"/></div>
              <div style={{ marginBottom:14 }}>
                <label style={lbl}>Sector of Interest</label>
                <select name="sector" value={form.sector} onChange={handleChange} style={inp} className="rg-input">
                  <option value="" disabled>Select a platform area</option>
                  <option>Infrastructure &amp; Logistics Intelligence</option>
                  <option>Agriculture &amp; Food Systems</option>
                  <option>Cold Chain &amp; Perishable Supply</option>
                  <option>Institutional &amp; Compliance Intelligence</option>
                  <option>Knowledge &amp; Sector Intelligence</option>
                  <option>Multiple / Other</option>
                </select>
              </div>
              <div style={{ marginBottom:18 }}><label style={lbl}>Message</label><textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your operational environment and what you'd like to solve…" style={{ ...inp, minHeight:110, resize:"vertical" }} className="rg-input"/></div>
              {error && <p style={{ fontSize:13, color:"#c0392b", marginBottom:10 }}>{error}</p>}
              <button type="submit" className="rg-btn-p" style={{ width:"100%", background:T.green500, color:"#fff", border:"none", padding:"14px 24px", borderRadius:100, fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:15, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:9 }}>
                Send Message <Icon name="arrow" size={16} color="#fff"/>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════ */
const Footer = () => {
  const isMobile = useIsMobile();
  const cols = [
    { title:"Platforms", links:["Infrastructure & Logistics","Agriculture & Food Systems","Cold Chain","Institutional & Compliance","Knowledge & Sector"] },
    { title:"Company",   links:["AI Capabilities","Architecture","Deployment","Numbers","Contact Us"] },
    { title:"Sectors",   links:["Public Sector","Private Enterprise","Logistics Networks","Agricultural Systems","Supply Chains"] },
  ];
  return (
    <footer style={{ background:T.ink, padding:isMobile?"48px 5vw 100px":"64px 6vw 32px" }}>
      <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"2.2fr 1fr 1fr 1fr", gap:isMobile?"2rem":"3rem", paddingBottom:"2.5rem", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
        <div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"1.25rem", color:"#fff", letterSpacing:"-0.022em", marginBottom:12, display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ width:9, height:9, borderRadius:"50%", background:T.green400, animation:"rgPulse 2s infinite" }}/>
            REGINX AI Technologies
          </div>
          <p style={{ fontSize:14, lineHeight:1.75, color:"rgba(255,255,255,0.36)", fontWeight:300, maxWidth:290, marginBottom:20 }}>
            AI-driven operational intelligence platforms for complex sector ecosystems. Connecting institutions, enterprises, and field-level networks.
          </p>
          {[{ icon:"mail", text:"info@reginx.ai" },{ icon:"map", text:"India · REGINX AI Technologies LLP" }].map(c => (
            <div key={c.text} style={{ display:"flex", alignItems:"center", gap:9, fontSize:13, color:"rgba(255,255,255,0.4)", marginBottom:8 }}>
              <Icon name={c.icon} size={14} color={T.green400}/>{c.text}
            </div>
          ))}
        </div>
        {/* Link columns — stack 2-col on mobile */}
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr 1fr":"1fr", gap:isMobile?"1.5rem":"0", gridColumn:isMobile?"1":"auto" }}>
          {cols.slice(0,2).map(col => (
            <div key={col.title}>
              <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.55)", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:14 }}>{col.title}</div>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:9 }}>
                {col.links.map(l => <li key={l}><a href="#" style={{ fontSize:13.5, color:"rgba(255,255,255,0.37)", textDecoration:"none", fontWeight:300 }} onMouseEnter={e=>e.target.style.color=T.green300} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.37)"}>{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        {!isMobile && cols.slice(2).map(col => (
          <div key={col.title}>
            <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.55)", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:14 }}>{col.title}</div>
            <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:9 }}>
              {col.links.map(l => <li key={l}><a href="#" style={{ fontSize:13.5, color:"rgba(255,255,255,0.37)", textDecoration:"none", fontWeight:300 }} onMouseEnter={e=>e.target.style.color=T.green300} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.37)"}>{l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:20, flexWrap:"wrap", gap:10 }}>
        <span style={{ fontSize:12, color:"rgba(255,255,255,0.22)", fontWeight:300 }}>© 2025 REGINX AI Technologies LLP. All rights reserved.</span>
        <span style={{ display:"inline-flex", alignItems:"center", gap:7, fontSize:12, color:T.green300, background:"rgba(52,194,106,0.1)", border:"1px solid rgba(52,194,106,0.2)", padding:"6px 14px", borderRadius:100 }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:T.green400, animation:"rgPulse 2s infinite" }}/>
          AI-Powered Platform
        </span>
      </div>
    </footer>
  );
};

/* ═══════════════════════════════════════════
   VAPI VOICE ASSISTANT
   Install: npm install @vapi-ai/web
═══════════════════════════════════════════ */
const VAPI_PUBLIC_KEY   = "03907534-98e0-4f56-9bb8-369f3250a50d";
const VAPI_ASSISTANT_ID = "fe6e5cf5-8385-4801-a1c6-37ec21f3806a";

const CALL_LABELS = {
  idle:       { title:"Talk to REGINX AI",     sub:"Ask anything about our platforms" },
  connecting: { title:"Connecting…",           sub:"Establishing secure voice connection" },
  active:     { title:"Connected · Listening", sub:"Speak naturally — I'm listening" },
  ending:     { title:"Ending call…",          sub:"Wrapping up…" },
};

const VoiceButton = () => {
  const [status,     setStatus]     = useState("idle");
  const [open,       setOpen]       = useState(false);
  const [transcript, setTranscript] = useState([]);
  const [sdkReady,   setSdkReady]   = useState(false);
  const vapiRef  = useRef(null);
  const alive    = useRef(true);
  const txBottom = useRef(null);
  const isMobile = useIsMobile();

  /* Load Vapi SDK */
  useEffect(() => {
    alive.current = true;
    let vapi = null;
    (async () => {
      try {
        const mod = await import("@vapi-ai/web");
        const VapiClass = mod.default ?? mod.Vapi ?? mod;
        if (!alive.current) return;
        vapi = new VapiClass(VAPI_PUBLIC_KEY);
        vapi.on("call-start",  ()    => { if (alive.current) setStatus("active"); });
        vapi.on("call-end",    ()    => { if (alive.current) { setStatus("idle"); setTranscript([]); } });
        vapi.on("error",       err  => { console.error("[Vapi]", err); if (alive.current) setStatus("idle"); });
        vapi.on("message",     msg  => {
          if (msg?.type === "transcript" && msg?.transcriptType === "final" && alive.current)
            setTranscript(prev => [...prev.slice(-5), { role:msg.role, text:msg.transcript }]);
        });
        vapiRef.current = vapi;
        if (alive.current) setSdkReady(true);
      } catch (err) { console.error("[Vapi] SDK load failed — npm install @vapi-ai/web", err); }
    })();
    return () => { alive.current = false; try { vapi?.stop(); } catch(_) {} };
  }, []);

  useEffect(() => { txBottom.current?.scrollIntoView({ behavior:"smooth" }); }, [transcript]);

  const startCall = useCallback(async () => {
    if (!vapiRef.current || status !== "idle") return;
    setOpen(true); setStatus("connecting"); setTranscript([]);
    try { await vapiRef.current.start(VAPI_ASSISTANT_ID); }
    catch (err) { console.error("[Vapi] start:", err); if (alive.current) setStatus("idle"); }
  }, [status]);

  const endCall = useCallback(async () => {
    if (!vapiRef.current) return;
    setStatus("ending");
    try { await vapiRef.current.stop(); }
    catch { if (alive.current) setStatus("idle"); }
  }, []);

  const isIdle   = status === "idle";
  const isActive = status === "active";
  const isBusy   = status === "connecting" || status === "ending";

  const orbBg = isActive ? "linear-gradient(135deg,#ef4444,#c62828)"
              : isBusy   ? "linear-gradient(135deg,#f59e0b,#d97706)"
              :             "linear-gradient(135deg,#34c26a,#1fa854)";

  const pillProps = isActive
    ? { color:T.green700, bg:T.green50,  border:T.green100, dot:T.green500, text:"LIVE" }
    : isBusy
    ? { color:"#78350f",  bg:"#fffbeb",  border:"#fde68a",  dot:"#f59e0b",  text:"WAIT" }
    : { color:T.ink40,    bg:"#f3f4f6",  border:"#e5e7eb",  dot:"#d1d5db",  text:"READY" };

  /* Mobile: full-width bar at bottom; Desktop: FAB bottom-right */
  const fabStyle = isMobile ? {
    position:"fixed", bottom:0, left:0, right:0, zIndex:9999,
    display:"flex", flexDirection:"column", alignItems:"center",
    padding:"0 0 env(safe-area-inset-bottom)",
    background:"transparent",
  } : {
    position:"fixed", bottom:30, right:30, zIndex:9999,
    display:"flex", flexDirection:"column", alignItems:"flex-end", gap:12,
  };

  const panelStyle = isMobile ? {
    width:"100%", background:"#fff",
    borderRadius:"20px 20px 0 0",
    border:`1px solid rgba(31,168,84,0.22)`,
    borderBottom:"none",
    boxShadow:"0 -8px 40px rgba(11,21,16,0.12)",
    padding:"22px 20px 20px",
    animation:"vapiPop 0.3s cubic-bezier(.34,1.56,.64,1) both",
  } : {
    width:308, background:"#fff", borderRadius:22,
    border:`1px solid rgba(31,168,84,0.22)`,
    boxShadow:"0 20px 60px rgba(11,21,16,0.13), 0 4px 16px rgba(31,168,84,0.09)",
    padding:"26px 22px 20px",
    animation:"vapiPop 0.3s cubic-bezier(.34,1.56,.64,1) both",
  };

  /* Mobile bottom trigger bar */
  const MobileTrigger = () => (
    <div style={{
      width:"100%", background:T.ink,
      display:"flex", alignItems:"center", justifyContent:"center", gap:14,
      padding:"14px 20px", cursor:"pointer",
      borderTop:`2px solid ${T.green500}`,
      boxShadow:"0 -4px 20px rgba(11,21,16,0.15)",
    }} onClick={() => { if (isActive) endCall(); else if (!isBusy) setOpen(o => !o); }}>
      {/* Pulse rings around icon */}
      <div style={{ position:"relative", width:44, height:44, flexShrink:0 }}>
        {isIdle && <>
          <span style={{ position:"absolute", inset:0, borderRadius:"50%", background:"rgba(52,194,106,0.28)", animation:"vapiPing 1.8s ease-out infinite" }}/>
          <span style={{ position:"absolute", inset:0, borderRadius:"50%", background:"rgba(52,194,106,0.14)", animation:"vapiPing 1.8s .5s ease-out infinite" }}/>
        </>}
        <div style={{ width:44, height:44, borderRadius:"50%", background:orbBg, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", zIndex:1 }}>
          {isBusy   ? <Icon name="spinner"  size={20} color="#fff"/>
          : isActive ? <Icon name="phoneOff" size={18} color="#fff"/>
          :             <Icon name="mic"      size={20} color="#fff"/>}
        </div>
      </div>
      <div style={{ flex:1, textAlign:"left" }}>
        <div style={{ fontSize:14, fontWeight:700, color:"#fff", letterSpacing:"-0.01em" }}>
          {isActive ? "Tap to end call" : isBusy ? "Connecting…" : "Talk to REGINX AI"}
        </div>
        <div style={{ fontSize:11.5, color:"rgba(255,255,255,0.45)", marginTop:1 }}>
          {isActive ? "Live · Listening" : "Ask anything about our platforms"}
        </div>
      </div>
      {isActive && (
        <div style={{ display:"flex", alignItems:"center", gap:2.5, height:24 }}>
          {[0,1,2,3,4].map(i => <div key={i} className="vapi-bar" style={{ background:T.green400, animationDelay:`${i*0.1}s` }}/>)}
        </div>
      )}
    </div>
  );

  return (
    <div style={fabStyle}>

      {/* Panel */}
      {open && (
        <div style={panelStyle}>
          {/* Handle bar for mobile */}
          {isMobile && <div style={{ width:36, height:4, borderRadius:2, background:T.ink20, margin:"0 auto 18px" }}/>}

          {/* Header */}
          <div style={{ display:"flex", alignItems:"center", gap:11, marginBottom:16 }}>
            <div style={{ width:40, height:40, borderRadius:11, flexShrink:0, background:T.green50, border:`1px solid ${T.green100}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Icon name="mic" size={18} color={T.green500}/>
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"0.97rem", color:T.ink, lineHeight:1.2 }}>REGINX AI Assistant</div>
              <div style={{ fontSize:11.5, color:T.ink40, marginTop:2 }}>Voice · GPT-4.1 · VAPI</div>
            </div>
            {/* Status pill */}
            <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:10.5, fontWeight:700, letterSpacing:"0.07em", textTransform:"uppercase", color:pillProps.color, background:pillProps.bg, border:`1px solid ${pillProps.border}`, padding:"3px 9px", borderRadius:100, flexShrink:0 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:pillProps.dot, animation:(isActive||isBusy)?"rgPulse 1.4s infinite":"none" }}/>
              {pillProps.text}
            </div>
          </div>

          {/* Status card */}
          <div style={{ background:T.surface, borderRadius:12, padding:"12px 14px", marginBottom:12, border:`1px solid ${T.border}` }}>
            <div style={{ fontSize:13.5, fontWeight:600, color:T.ink, marginBottom:3 }}>{CALL_LABELS[status].title}</div>
            <div style={{ fontSize:11.5, color:T.ink40, lineHeight:1.55 }}>{sdkReady ? CALL_LABELS[status].sub : "Loading voice SDK…"}</div>
          </div>

          {/* Transcript */}
          {transcript.length > 0 && (
            <div style={{ maxHeight:130, overflowY:"auto", marginBottom:12, display:"flex", flexDirection:"column", gap:7 }}>
              {transcript.map((t,i) => {
                const me = t.role === "user";
                return (
                  <div key={i} style={{ display:"flex", justifyContent:me?"flex-end":"flex-start" }}>
                    <div style={{ maxWidth:"86%", padding:"8px 12px", borderRadius:12, fontSize:12.5, lineHeight:1.5, background:me?T.green500:"#f0f7f3", color:me?"#fff":T.ink, border:me?"none":`1px solid ${T.border}`, borderBottomRightRadius:me?3:12, borderBottomLeftRadius:me?12:3 }}>
                      {t.text}
                    </div>
                  </div>
                );
              })}
              <div ref={txBottom}/>
            </div>
          )}

          {/* Waveform */}
          {isActive && (
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:3, height:28, marginBottom:12 }}>
              {[0,1,2,3,4,5,6,7,8].map(i => <div key={i} className="vapi-bar" style={{ background:T.green400, animationDelay:`${i*0.09}s` }}/>)}
            </div>
          )}

          {/* Actions */}
          <div style={{ display:"flex", gap:9 }}>
            {isIdle && (
              <button onClick={startCall} disabled={!sdkReady} style={{ flex:1, border:"none", borderRadius:100, padding:"13px 0", background:sdkReady?T.green500:"#d1d5db", color:"#fff", fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14, fontWeight:600, cursor:sdkReady?"pointer":"not-allowed", opacity:sdkReady?1:.65, display:"flex", alignItems:"center", justifyContent:"center", gap:8, transition:"background 0.2s" }}
                onMouseEnter={e=>{if(sdkReady)e.currentTarget.style.background=T.green600}}
                onMouseLeave={e=>{if(sdkReady)e.currentTarget.style.background=T.green500}}
              >
                <Icon name="mic" size={16} color="#fff"/> {sdkReady?"Start Call":"Loading SDK…"}
              </button>
            )}
            {isBusy && (
              <div style={{ flex:1, background:"#fffbeb", borderRadius:100, padding:"13px 0", display:"flex", alignItems:"center", justifyContent:"center", gap:8, fontSize:13.5, color:"#92400e", fontWeight:600, border:"1px solid #fde68a" }}>
                <Icon name="spinner" size={16} color="#d97706"/>
                {status==="ending"?"Ending…":"Connecting…"}
              </div>
            )}
            {isActive && (
              <>
                <div style={{ flex:1, background:T.green50, borderRadius:100, padding:"13px 0", display:"flex", alignItems:"center", justifyContent:"center", gap:7, fontSize:13, color:T.green600, fontWeight:600, border:`1px solid ${T.green100}` }}>
                  {[0,1,2,3,4].map(i=><div key={i} className="vapi-bar" style={{ background:T.green500, animationDelay:`${i*0.11}s` }}/>)}
                  &nbsp;Live
                </div>
                <button onClick={endCall} style={{ background:"#fef2f2", color:"#dc2626", border:"1px solid #fecaca", borderRadius:100, padding:"13px 16px", cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, fontWeight:600, display:"flex", alignItems:"center", gap:6, transition:"background .18s" }}
                  onMouseEnter={e=>e.currentTarget.style.background="#fecaca"}
                  onMouseLeave={e=>e.currentTarget.style.background="#fef2f2"}
                >
                  <Icon name="phoneOff" size={14} color="#dc2626"/> End
                </button>
              </>
            )}
          </div>
          <div style={{ textAlign:"center", marginTop:10, fontSize:10.5, color:T.ink20 }}>🔒 Secure voice · REGINX AI Technologies</div>
        </div>
      )}

      {/* Desktop FAB orb OR Mobile bottom bar */}
      {isMobile ? (
        <MobileTrigger/>
      ) : (
        <div style={{ position:"relative", display:"flex", alignItems:"center", gap:12 }}>
          {isIdle && !open && (
            <div className="vapi-tooltip" style={{ background:T.ink, color:"#fff", fontSize:13, fontWeight:500, padding:"7px 15px", borderRadius:100, whiteSpace:"nowrap", boxShadow:"0 4px 16px rgba(11,21,16,0.2)", animation:"vapiSlide 0.28s both", pointerEvents:"none" }}>
              Talk to REGINX AI
            </div>
          )}
          {isIdle && <>
            <span style={{ position:"absolute", inset:0, borderRadius:"50%", background:"rgba(52,194,106,.3)", animation:"vapiPing 1.8s ease-out infinite", pointerEvents:"none" }}/>
            <span style={{ position:"absolute", inset:0, borderRadius:"50%", background:"rgba(52,194,106,.16)", animation:"vapiPing 1.8s .5s ease-out infinite", pointerEvents:"none" }}/>
          </>}
          <button
            onClick={() => { if (isActive) { endCall(); return; } if (isBusy) return; setOpen(o=>!o); }}
            title={isActive?"End call":"Talk to REGINX AI"}
            aria-label={isActive?"End call":"Open voice assistant"}
            style={{ width:62, height:62, borderRadius:"50%", border:"none", cursor:isBusy?"not-allowed":"pointer", background:orbBg, boxShadow:"0 6px 28px rgba(31,168,84,0.38)", display:"flex", alignItems:"center", justifyContent:"center", transition:"transform .2s, box-shadow .2s", position:"relative", zIndex:1 }}
            onMouseEnter={e=>{ if(!isBusy) e.currentTarget.style.transform="scale(1.1)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.transform="scale(1)"; }}
            onMouseDown={e=>{ e.currentTarget.style.transform="scale(.94)"; }}
            onMouseUp={e=>{ e.currentTarget.style.transform="scale(1.1)"; }}
          >
            {isBusy ? <Icon name="spinner" size={24} color="#fff"/>
            : isActive ? <Icon name="phoneOff" size={22} color="#fff"/>
            : <Icon name="mic" size={24} color="#fff"/>}
          </button>
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════
   ROOT PAGE
═══════════════════════════════════════════ */
const App = () => {
  useScrollReveal();
  return (
    <div style={{ minHeight:"100vh", background:"#fff", color:T.ink }}>
      <GlobalStyles />
      <Navbar />
      <Hero />
      <CoreCapabilities />
      <Platforms />
      <Stats />
      <Deployment />
      <ContactForm />
      <Footer />
      <VoiceButton />
    </div>
  );
};

export default App;
