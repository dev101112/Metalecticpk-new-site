import React, { useState, useEffect, useRef } from "react";
import { 
  Cpu, Battery, Zap, ShieldAlert, Sparkles, Scale, Check, X, Maximize, 
  Settings, Award, RefreshCw, ThermometerSun, ChevronRight, MessageSquare 
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BatterySizingCalculator } from "./BatterySizingCalculator";

gsap.registerPlugin(ScrollTrigger);

interface HomeDetailsProps {
  setActivePage: (page: string) => void;
  lang: "EN" | "UR";
  onSelectBlog: (slug: string) => void;
  blogs: any[];
}

export const HomeDetails: React.FC<HomeDetailsProps> = ({ setActivePage, lang, onSelectBlog, blogs }) => {
  const [activeCompare, setActiveCompare] = useState<"lfp" | "lead">("lfp");
  const containerRef = useRef<HTMLDivElement | null>(null);

  // GSAP Scroll-Triggered Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Rise gracefully animation for feature cards
      gsap.fromTo(
        ".gsap-card-rise",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".gsap-card-rise-trigger",
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // 2. Battery icons & badges fill with electric glow
      gsap.fromTo(
        ".gsap-battery-glow",
        { scale: 0.85, opacity: 0.3, filter: "drop-shadow(0px 0px 0px rgba(246, 185, 30, 0))" },
        {
          scale: 1,
          opacity: 1,
          filter: "drop-shadow(0px 0px 15px rgba(246, 185, 30, 0.6))",
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".gsap-battery-glow-trigger",
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );

      // 3. Manufacturing steps rise & highlight
      gsap.fromTo(
        ".gsap-mfg-step",
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".gsap-mfg-trigger",
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // 4. Testimonial glass cards rise
      gsap.fromTo(
        ".gsap-testimonial-card",
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".gsap-testimonial-trigger",
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const whyFeatures = [
    {
      icon: <ShieldAlert className="text-[#F6B91E]" size={28} />,
      title: "Safe LiFePO₄ Chemistry",
      desc: "Zero thermal runway risk. Chemical structures will not release oxygen or ignite even under mechanical punctures or extreme overload."
    },
    {
      icon: <Cpu className="text-[#F6B91E]" size={28} />,
      title: "Active-Balancing Bluetooth BMS",
      desc: "Maintains optimal cell voltage equilibrium automatically while broadcasting high-resolution telemetry directly to our mobile app."
    },
    {
      icon: <Zap className="text-[#F6B91E]" size={28} />,
      title: "Fast-Charge Acceleration",
      desc: "Fully charge system banks in under 2 hours compared to 8-10 hours required for standard lead-acid batteries."
    },
    {
      icon: <RefreshCw className="text-[#F6B91E]" size={28} />,
      title: "Exceptional Service Life",
      desc: "Deliver 8,000+ complete cycles at 80% Depth of Discharge, providing continuous premium service for over 15 years."
    },
    {
      icon: <Maximize className="text-[#F6B91E]" size={28} />,
      title: "Modular Expandability",
      desc: "Direct parallel synchronization of up to 16 battery systems, expanding power arrays up to 160 kWh with zero controller lag."
    },
    {
      icon: <Settings className="text-[#F6B91E]" size={28} />,
      title: "A-Grade Prismatic Cells",
      desc: "We exclusively match and weld brand-new, premium, high-density Prismatic Cells certified for demanding industrial discharge rates."
    }
  ];

  const compareParams = [
    { label: "Lifespan (Cycles)", lfp: "8,000+ Cycles (Excellent)", lead: "300 - 500 Cycles (Poor)", winner: "lfp" },
    { label: "Depth of Discharge (DoD)", lfp: "Up to 95% Usable Capacity", lead: "50% Maximum (Damaging if exceeded)", winner: "lfp" },
    { label: "Charging Speed", lfp: "1.5 to 2.5 Hours", lead: "8 to 12 Hours (Sulfate risk)", winner: "lfp" },
    { label: "Maintenance Required", lfp: "Zero (BMS fully automated)", lead: "Monthly distilled water toppings", winner: "lfp" },
    { label: "Weight & Portability", lfp: "Ultra-Light (~35% of Lead Acid)", lead: "Extremely Heavy (Requires crane/trolley)", winner: "lfp" },
    { label: "Warranty Terms", lfp: "5 - 10 Years Unlimited", lead: "6 - 12 Months (Often rejected)", winner: "lfp" },
    { label: "Efficiency (Energy Retention)", lfp: "98% Retained (Minimal solar waste)", lead: "70% Retained (Heavy solar dissipation)", winner: "lfp" }
  ];

  const mfgSteps = [
    {
      step: "01",
      title: "High-Resolution Cell Matching",
      desc: "Every incoming cell undergoes automatic voltage, internal resistance, and capacitance profiling. We pair cells down to 0.001V accuracy for perfect pack balancing."
    },
    {
      step: "02",
      title: "Automated Laser Micro-Welding",
      desc: "No manual soldering. Heavy copper busbars are laser-welded onto cells using custom fiber lasers, generating near-zero contact resistance for extreme discharge grids."
    },
    {
      step: "03",
      title: "Dynamic Smart BMS Integration",
      desc: "Our customized Alpha BMS is hand-wired, sealed, and programmed with specific overcharge, temperature, and short-circuit limits matching Pakistan's local load-shedding cycles."
    },
    {
      step: "04",
      title: "Full Thermal & Load Testing",
      desc: "Assembled battery banks undergo a full charge/discharge cycle under peak loads (up to 200A) on heavy electronic load testers to identify any thermal hotspots."
    }
  ];

  const testimonials = [
    {
      quote: "We replaced our entire hospital back-up array with 12 units of Alpha Ampere 48200. The transition from grid to battery is absolute zero-latency, keeping surgical monitoring completely stable.",
      author: "Dr. Farhan Jamil",
      role: "Chief Technical Administrator",
      org: "Malik Diagnostic Hospital, Karachi"
    },
    {
      quote: "Pakistan's summers are a nightmare for batteries. Traditional lead-acid batteries would expand and leak within 12 months. Alpha Ampere lithium is operating flawlessly at 45°C without a single complaint.",
      author: "Engr. Saad Khawaja",
      role: "Lead Project Engineer",
      org: "Apex Solar EPC, Lahore"
    },
    {
      quote: "Our data server grid requires clean, uninterrupted 48V power. The intelligent CAN bus protocol of Alpha batteries synchronizes with our Deye inverters instantly, allowing us to monitor heat metrics from our phones.",
      author: "Zainab Raza",
      role: "Infrastructure Lead",
      org: "Inov8 Systems, Islamabad"
    }
  ];

  return (
    <div ref={containerRef} className="bg-[#050505] text-white">
      
      {/* WHY ALPHA AMPERE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-zinc-900 gsap-card-rise-trigger">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase text-[#F6B91E] tracking-widest block mb-3">
            UNCOMPROMISING ENGINEERING
          </span>
          <h2 className="text-3xl sm:text-4.5xl font-black uppercase text-white tracking-tight">
            {lang === "EN" ? "Why Alpha Ampere Systems?" : "الفا ایمپیئر سسٹمز کیوں؟"}
          </h2>
          <p className="text-zinc-400 mt-4 leading-relaxed">
            While others repackage second-hand cells, we design, manufacture and custom-engineer lithium systems from the chemistry up, optimized for Pakistan's extreme load profiles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyFeatures.map((f, i) => (
            <div 
              key={i} 
              className="gsap-card-rise rounded-2xl bg-[#090909] border border-zinc-900 p-8 hover:border-[#F6B91E]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(246,185,30,0.05)] relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#F6B91E]/3 rounded-full blur-2xl group-hover:bg-[#F6B91E]/10 transition-all" />
              <div className="mb-6 inline-flex p-3 bg-zinc-900/80 rounded-xl border border-zinc-800 gsap-battery-glow">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#F6B91E] transition-colors">
                {f.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* BATTERY SIZING CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <BatterySizingCalculator lang={lang} setActivePage={setActivePage} />
      </section>

      {/* HEAD-TO-HEAD COMPARISON: LITHIUM VS LEAD ACID */}
      <section className="bg-zinc-950 border-y border-zinc-900 py-20 gsap-battery-glow-trigger">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold uppercase text-[#F6B91E] tracking-widest block mb-2">
              FINANCIAL & TECHNICAL METRICS
            </span>
            <h2 className="text-3xl sm:text-4.5xl font-black uppercase tracking-tight">
              {lang === "EN" ? "Alpha Lithium VS Lead Acid" : "لیتھیم اور لیڈ ایسڈ کا موازنہ"}
            </h2>
            <p className="text-zinc-400 mt-3 leading-relaxed">
              Don't throw money away on temporary batteries. See how a single Alpha Ampere system replaces up to 6 lead-acid battery replacements.
            </p>
          </div>

          {/* Interactive Toggle for Mobile View */}
          <div className="flex justify-center mb-8 lg:hidden">
            <div className="inline-flex rounded-full bg-zinc-900 p-1 border border-zinc-800">
              <button 
                onClick={() => setActiveCompare("lfp")}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${activeCompare === "lfp" ? "bg-[#F6B91E] text-black" : "text-zinc-400"}`}
              >
                Alpha LiFePO4
              </button>
              <button 
                onClick={() => setActiveCompare("lead")}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${activeCompare === "lead" ? "bg-red-500 text-white" : "text-zinc-400"}`}
              >
                Lead Acid / Tubular
              </button>
            </div>
          </div>

          {/* Table Matrix */}
          <div className="rounded-2xl border border-zinc-900 bg-[#090909]/80 overflow-hidden backdrop-blur-sm">
            
            {/* Table Header */}
            <div className="hidden lg:grid grid-cols-12 gap-4 bg-zinc-900/50 px-6 py-4 text-xs font-mono font-bold tracking-wider uppercase text-zinc-400 border-b border-zinc-800">
              <div className="col-span-4">Performance Parameter</div>
              <div className="col-span-4 text-[#F6B91E]">Alpha Ampere Lithium Iron Phosphate</div>
              <div className="col-span-4 text-zinc-500">Traditional Tubular / AGM Lead Acid</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-zinc-900">
              {compareParams.map((p, idx) => (
                <div key={idx} className="p-6">
                  {/* Desktop Layout */}
                  <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-4 font-sans font-bold text-white text-base">{p.label}</div>
                    <div className="col-span-4 flex items-center space-x-2 text-sm text-[#10B981] font-medium">
                      <Check size={16} className="text-[#10B981] flex-shrink-0" />
                      <span>{p.lfp}</span>
                    </div>
                    <div className="col-span-4 flex items-center space-x-2 text-sm text-zinc-500">
                      <X size={16} className="text-red-500 flex-shrink-0" />
                      <span>{p.lead}</span>
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="lg:hidden space-y-2">
                    <span className="block text-sm font-black text-white">{p.label}</span>
                    {activeCompare === "lfp" ? (
                      <div className="flex items-center space-x-2 text-sm text-[#10B981] bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-900/50">
                        <Check size={16} className="text-[#10B981] flex-shrink-0" />
                        <div>
                          <span className="block text-[10px] uppercase text-emerald-500 font-mono">Alpha LiFePO4</span>
                          <span className="font-medium">{p.lfp}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-sm text-zinc-400 bg-red-950/20 p-2.5 rounded-lg border border-red-900/50">
                        <X size={16} className="text-red-500 flex-shrink-0" />
                        <div>
                          <span className="block text-[10px] uppercase text-red-500 font-mono">AGM / Tubular</span>
                          <span>{p.lead}</span>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* MANUFACTURING & ASSEMBLING ROBOTICS AT SUNDAR INDUSTRIAL ESTATE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 gsap-mfg-trigger">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Technical copy */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-xs font-mono font-bold uppercase text-[#F6B91E] tracking-widest block">
              SUNDAR INDUSTRIAL ESTATE ASSEMBLY
            </span>
            <h2 className="text-3xl sm:text-4.5xl font-black uppercase text-white tracking-tight leading-tight">
              {lang === "EN" ? "Advanced Manufacturing" : "جدید اسمبلنگ پلانٹ"}
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Metalectric operates a state-of-the-art battery assembly facility in Sunder Industrial Estate, Lahore. Our production floor uses dust-controlled zones, high-frequency busbar welding systems, and automated testing rigs.
            </p>

            <div className="rounded-xl border border-zinc-900 bg-zinc-950/50 p-5 flex items-start space-x-4">
              <Award className="text-[#F6B91E] flex-shrink-0 mt-1" size={24} />
              <div>
                <h4 className="font-bold text-white text-sm">ISO 9001 & CE Certified Assembly</h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Every battery back is manufactured strictly under CE safety guidelines, with serialized traceability for all prismatic cells and microchip controllers.
                </p>
              </div>
            </div>

            <button
              onClick={() => setActivePage("about")}
              className="px-6 py-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 hover:border-zinc-700 text-sm font-bold transition-all flex items-center space-x-2"
            >
              <span>Explore our Factory Process</span>
              <ChevronRight size={16} className="text-[#F6B91E]" />
            </button>
          </div>

          {/* Right Block: Sequential steps */}
          <div className="lg:col-span-7 space-y-4">
            {mfgSteps.map((s, idx) => (
              <div 
                key={idx} 
                className="gsap-mfg-step rounded-2xl bg-[#090909] border border-zinc-900 p-6 flex items-start space-x-6 hover:border-zinc-800 transition-all"
              >
                <span className="font-mono text-2xl font-black text-[#F6B91E] bg-[#242424]/40 px-3 py-1 rounded-xl border border-zinc-800">
                  {s.step}
                </span>
                <div className="text-left">
                  <h3 className="text-base font-bold text-white mb-1.5">{s.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* INFINITE CLIENT LOGO MARQUEE */}
      <section className="bg-[#090909] border-y border-zinc-900 py-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6">
          <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">Trusted by Pakistan's Leading EPC Solar Integrators</span>
        </div>
        <div className="flex space-x-12 animate-marquee whitespace-nowrap overflow-x-hidden relative">
          <div className="flex space-x-16 items-center text-zinc-500 text-lg font-bold font-mono min-w-full justify-around shrink-0 py-2">
            <span>DEYE SOLAR ENERGY</span>
            <span>GROWATT INVERTERS</span>
            <span>VICTRON ENERGY</span>
            <span>SHAMS CO EPC</span>
            <span>HAREEM SOLAR</span>
            <span>SOLUX CAPITAL</span>
            <span>INDUS TEXTILES</span>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL GLASS CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 gsap-testimonial-trigger">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase text-[#F6B91E] tracking-widest block mb-2">
            PROVEN IN THE FIELD
          </span>
          <h2 className="text-3xl sm:text-4.5xl font-black uppercase text-white">
            {lang === "EN" ? "What Energy Experts Say" : "ماہرینِ توانائی کی آراء"}
          </h2>
          <p className="text-zinc-400 mt-3">
            Real feedback from solar engineers and infrastructure directors managing industrial and high-end residential networks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div 
              key={idx} 
              className="gsap-testimonial-card rounded-2xl bg-zinc-950 border border-zinc-900 p-8 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-4 left-4 text-6xl font-serif text-zinc-800 pointer-events-none">“</div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-6 italic relative z-10">
                {t.quote}
              </p>
              <div className="border-t border-zinc-900 pt-4 flex items-center space-x-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-[#242424] flex items-center justify-center font-bold text-sm text-[#F6B91E]">
                  {t.author.charAt(5)}
                </div>
                <div className="text-left">
                  <span className="block text-sm font-bold text-white">{t.author}</span>
                  <span className="block text-[11px] text-[#F6B91E] font-mono">{t.role}</span>
                  <span className="block text-[10px] text-zinc-500">{t.org}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEO-OPTIMIZED ARTICLES GRID */}
      <section className="bg-zinc-950 border-t border-zinc-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
            <div className="text-left max-w-xl">
              <span className="text-xs font-mono font-bold uppercase text-[#F6B91E] tracking-widest block mb-2">
                KNOWLEDGE BASE
              </span>
              <h2 className="text-3xl font-black uppercase text-white">
                {lang === "EN" ? "Latest Technical Articles" : "تازہ ترین مضامین"}
              </h2>
            </div>
            <button
              onClick={() => setActivePage("support")}
              className="text-[#F6B91E] hover:text-white transition-all text-xs font-mono font-bold flex items-center space-x-1.5 mt-4 sm:mt-0 group"
            >
              <span>EXPLORE ENTIRE SUPPORT CENTER</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.map((b) => (
              <div 
                key={b.id}
                onClick={() => onSelectBlog(b.slug)}
                className="rounded-2xl bg-[#090909] border border-zinc-900 overflow-hidden hover:border-zinc-800 transition-all cursor-pointer group flex flex-col md:flex-row"
              >
                <div className="md:w-2/5 h-48 md:h-auto overflow-hidden relative">
                  <img 
                    src={b.featuredImage} 
                    alt={b.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 px-2 py-1 rounded bg-[#F6B91E] text-black font-mono text-[9px] font-bold uppercase">
                    {b.category}
                  </span>
                </div>
                <div className="md:w-3/5 p-6 flex flex-col justify-between text-left">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-[10px] text-zinc-500 font-mono">
                      <span>{b.readTime}</span>
                      <span>•</span>
                      <span>{new Date(b.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#F6B91E] transition-colors leading-snug line-clamp-2">
                      {b.title}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                      {b.content.replace(/[#*`]/g, '').substring(0, 150)}...
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 text-[#F6B91E] text-xs font-mono font-bold group-hover:translate-x-1 transition-transform mt-4">
                    <span>Read Technical Article</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="relative overflow-hidden border-t border-zinc-900 py-24 bg-gradient-to-b from-[#050505] to-[#0d0d0d]">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[300px] bg-[#F6B91E]/5 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-8">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#242424] border border-zinc-800 text-[10px] font-mono font-bold tracking-wider text-zinc-400 uppercase">
            ⚡ CUSTOM STORAGE DESIGN
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            {lang === "EN" ? "Let's Build Your Energy Solution" : "آئیں اپنا پاور ہاؤس ڈیزائن کریں"}
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Get in touch with our sundar design engineers. We customize cell counts, voltage metrics, parallel configurations, and cabinet structures matching your commercial or off-grid targets.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
            <button
              onClick={() => {
                setActivePage("get-quote");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-8 py-4 rounded-xl bg-[#F6B91E] hover:bg-[#e0a410] text-black font-extrabold text-sm transition-all duration-300 shadow-xl flex items-center justify-center space-x-2"
            >
              <span>Build Custom Quote</span>
              <Zap size={15} fill="currentColor" />
            </button>
            <button
              onClick={() => {
                setActivePage("contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-8 py-4 rounded-xl bg-transparent border border-zinc-800 hover:border-zinc-700 text-white font-bold text-sm transition-all duration-300 hover:bg-zinc-900"
            >
              Contact Engineering
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
