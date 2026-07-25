import React, { useState, useEffect, useRef } from "react";
import { Zap, ShieldCheck, RefreshCw, Award, ArrowRight, Activity, Battery, CheckCircle, ChevronRight } from "lucide-react";

interface HeroProps {
  setActivePage: (page: string) => void;
  lang: "EN" | "UR";
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  color: string;
}

export const Hero: React.FC<HeroProps> = ({ setActivePage, lang }) => {
  const [chargeLevel, setChargeLevel] = useState(85);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroContainerRef = useRef<HTMLDivElement | null>(null);

  // Interactive Particle Canvas System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Mouse coordinates tracking
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 180, // Mouse interaction radius
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    const container = heroContainerRef.current || window;
    container.addEventListener("mousemove", handleMouseMove as any);
    container.addEventListener("mouseleave", handleMouseLeave as any);
    window.addEventListener("resize", handleResize);

    // Instantiate particles
    const particleCount = Math.min(65, Math.floor((width * height) / 18000));
    const particles: Particle[] = [];

    const colors = [
      "rgba(246, 185, 30, ",  // Brand Gold
      "rgba(16, 185, 129, ",  // Battery Status Green
      "rgba(191, 197, 201, ", // Tech Silver
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2.2 + 1,
        baseAlpha: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Canvas render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render & Update Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Bounce on borders
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse attraction / interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);

        let currentAlpha = p.baseAlpha;

        if (distToMouse < mouse.radius) {
          const force = (mouse.radius - distToMouse) / mouse.radius;
          p.x += (dx / distToMouse) * force * 0.8;
          p.y += (dy / distToMouse) * force * 0.8;
          currentAlpha = Math.min(1, p.baseAlpha + force * 0.6);
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${currentAlpha})`;
        ctx.shadowColor = "#F6B91E";
        ctx.shadowBlur = distToMouse < mouse.radius ? 8 : 0;
        ctx.fill();

        // Connect nearby particles with lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const pdx = p2.x - p.x;
          const pdy = p2.y - p.y;
          const pDist = Math.sqrt(pdx * pdx + pdy * pdy);

          if (pDist < 120) {
            const lineAlpha = (1 - pDist / 120) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(246, 185, 30, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        // Connect particle to mouse cursor if close
        if (distToMouse < mouse.radius) {
          const mouseLineAlpha = (1 - distToMouse / mouse.radius) * 0.4;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(246, 185, 30, ${mouseLineAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("mousemove", handleMouseMove as any);
      container.removeEventListener("mouseleave", handleMouseLeave as any);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Charge animation loop
    const interval = setInterval(() => {
      setChargeLevel((prev) => (prev >= 100 ? 20 : prev + 1));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  const t = {
    EN: {
      tagline: "MADE IN PAKISTAN FOR THE WORLD",
      titlePre: "Powering Pakistan",
      titleMid: "with Next Generation",
      titlePost: "Lithium Energy.",
      sub: "Premium LiFePO₄ Battery Systems engineered, laser-welded and customized for residential solar, telecom grids, and heavy industrial applications.",
      explore: "Explore Products",
      getQuote: "Get Free Quote",
      stat1: "8000+",
      stat1Label: "Charge Cycles",
      stat2: "5 Years",
      stat2Label: "Unlimited Warranty",
      stat3: "100%",
      stat3Label: "Maintenance Free",
      stat4: "Sundar IE",
      stat4Label: "Factory Assembled",
      scrollerTitle: "Engineered Applications",
      whyTitle: "Why Alpha Ampere",
      whySub: "Architected to perform under Pakistan's extreme voltages and 50°C+ ambient temperatures."
    },
    UR: {
      tagline: "پاکستان میں فخر سے تیار کردہ",
      titlePre: "پاکستان کو دیں",
      titleMid: "اگلی نسل کی بہترین",
      titlePost: "لیتھیم انرجی کی طاقت۔",
      sub: "پریمیم لیتھیم آئرن فاسفیٹ (LiFePO4) سسٹمز جو خاص طور پر گھروں، صنعتوں اور سولر سسٹمز کے لیے ڈیزائن اور تیار کیے گئے ہیں۔",
      explore: "پروڈکٹس دیکھیں",
      getQuote: "مفت کوٹ حاصل کریں",
      stat1: "+8000",
      stat1Label: "چارج سائیکلز",
      stat2: "5 سال",
      stat2Label: "مکمل وارنٹی",
      stat3: "100%",
      stat3Label: "دیکھ بھال سے پاک",
      stat4: "سندر انڈسٹریل",
      stat4Label: "فیکٹری اسمبلڈ",
      scrollerTitle: "انجنیرڈ ایپلی کیشنز",
      whyTitle: "الفا ایمپیئر کیوں؟",
      whySub: "پاکستان کے گرم ترین درجہ حرارت اور اتار چڑھاؤ والے وولٹیج کے لیے خصوصی ڈیزائن۔"
    }
  }[lang];

  const categories = [
    { title: "Residential Backups", desc: "Sleek wall-mounted LiFePO₄ banks for luxury off-grid smart homes.", key: "residential" },
    { title: "Commercial Grids", desc: "Standardized cabinet stacks designed for high-voltage office parks.", key: "commercial" },
    { title: "Industrial Mega", desc: "Heavy-duty server grade backup solutions engineered for Sundar factories.", key: "industrial" },
    { title: "Solar Microgrids", desc: "Long lifecycle energy nodes optimized for rural agricultural tubewells.", key: "solar" },
    { title: "UPS Standby", desc: "Ultra-fast millisecond response batteries to safeguard diagnostics.", key: "ups" },
    { title: "Custom Packs", desc: "High discharge customized power blocks built for golf carts and telecom.", key: "custom" }
  ];

  return (
    <section ref={heroContainerRef} className="relative bg-[#050505] text-white overflow-hidden pt-12 pb-24" id="home-section">
      
      {/* Absolute high-tech vector circuit backgrounds */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_10%,#000_70%,transparent_100%)] opacity-30" />

      {/* Interactive Particle Animation Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Top Banner Accent */}
      <div className="relative z-10 flex justify-center mb-6">
        <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#242424]/60 border border-[#F6B91E]/20 text-xs font-mono font-bold tracking-wider text-[#F6B91E] uppercase">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-1" />
          {t.tagline}
        </span>
      </div>

      {/* Main Grid Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Headline & Copy */}
        <div className="lg:col-span-7 space-y-8 text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6.5xl font-extrabold tracking-tight leading-[1.1] font-sans">
            <span className="block text-white font-black">{t.titlePre}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-[#BFC5C9] to-zinc-400 font-extrabold">
              {t.titleMid}
            </span>
            <span className="block text-[#F6B91E] drop-shadow-[0_0_20px_rgba(246,185,30,0.25)]">
              {t.titlePost}
            </span>
          </h1>

          <p className="text-zinc-400 text-lg sm:text-xl font-normal leading-relaxed max-w-2xl">
            {t.sub}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => {
                setActivePage("products");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-8 py-4 rounded-xl bg-[#F6B91E] text-black font-extrabold text-base transition-all duration-300 hover:bg-[#e0a410] hover:scale-[1.02] shadow-[0_0_25px_rgba(246,185,30,0.3)] flex items-center justify-center space-x-2"
            >
              <span>{t.explore}</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => {
                setActivePage("get-quote");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-8 py-4 rounded-xl bg-transparent border border-zinc-700 hover:border-[#F6B91E] text-white font-bold text-base transition-all duration-300 hover:bg-[#242424]/50 flex items-center justify-center space-x-2"
            >
              <span>{t.getQuote}</span>
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            </button>
          </div>

          {/* Core Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-zinc-800/80 pt-8 mt-4">
            <div className="space-y-1">
              <span className="block text-3xl font-mono font-black text-[#F6B91E]">{t.stat1}</span>
              <span className="block text-xs text-zinc-400 font-medium uppercase tracking-wider">{t.stat1Label}</span>
            </div>
            <div className="space-y-1">
              <span className="block text-3xl font-mono font-black text-white">{t.stat2}</span>
              <span className="block text-xs text-zinc-400 font-medium uppercase tracking-wider">{t.stat2Label}</span>
            </div>
            <div className="space-y-1">
              <span className="block text-3xl font-mono font-black text-emerald-500">{t.stat3}</span>
              <span className="block text-xs text-zinc-400 font-medium uppercase tracking-wider">{t.stat3Label}</span>
            </div>
            <div className="space-y-1">
              <span className="block text-3xl font-mono font-black text-zinc-300 flex items-center">
                🇵🇰
              </span>
              <span className="block text-xs text-zinc-400 font-medium uppercase tracking-wider">{t.stat4Label}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Immersive Interactive Custom 3D-Like Battery Render */}
        <div className="lg:col-span-5 relative flex justify-center py-8">
          
          {/* Glowing Aura backdrops */}
          <div className="absolute -inset-10 bg-gradient-to-tr from-[#F6B91E]/10 to-transparent blur-3xl rounded-full" />
          <div className="absolute -inset-4 bg-gradient-to-b from-emerald-500/5 to-transparent blur-2xl rounded-full" />

          {/* The Glassy Battery Block */}
          <div className="relative w-80 sm:w-96 rounded-3xl bg-[#0d0d0d]/80 border-2 border-[#242424] p-8 shadow-2xl backdrop-blur-md transform hover:rotate-1 hover:scale-105 transition-all duration-500">
            
            {/* Top Cap Connection Detail */}
            <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 w-28 h-4 rounded-t-xl bg-zinc-800 border-t border-x border-[#333]" />
            
            {/* Battery Core Front Panel Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#10B981] animate-pulse" />
                <span className="font-mono text-[10px] text-zinc-400 font-bold uppercase tracking-widest">SYSTEM ONLINE</span>
              </div>
              <span className="font-mono text-xs text-[#F6B91E] font-bold">ALPHA LFP 10.2kWh</span>
            </div>

            {/* Display Screen */}
            <div className="rounded-xl bg-black border border-zinc-800 p-4 mb-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#F6B91E]/5 rounded-full blur-xl" />
              
              <div className="flex justify-between items-end">
                <div>
                  <span className="block text-xs text-zinc-500 font-mono uppercase">State of Charge</span>
                  <span className="text-4xl font-mono font-black text-white">{chargeLevel}%</span>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] text-zinc-500 font-mono uppercase">Voltage</span>
                  <span className="text-sm font-mono text-emerald-400 font-bold">53.4 V</span>
                </div>
              </div>

              {/* Progress Bar with Glowing Blocks */}
              <div className="w-full bg-[#141414] h-3.5 rounded-full mt-4 p-0.5 overflow-hidden border border-zinc-800">
                <div 
                  className="bg-gradient-to-r from-emerald-600 via-[#10B981] to-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${chargeLevel}%` }}
                />
              </div>

              {/* Telemetry diagnostics stats */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-zinc-900 font-mono text-[9px] text-zinc-500">
                <div>
                  <span className="block text-[#666]">TEMP</span>
                  <span className="text-zinc-300 font-bold">28.4°C</span>
                </div>
                <div>
                  <span className="block text-[#666]">CURRENT</span>
                  <span className="text-zinc-300 font-bold">+45.2 A</span>
                </div>
                <div>
                  <span className="block text-[#666]">HEALTH</span>
                  <span className="text-emerald-400 font-bold">100% SOH</span>
                </div>
              </div>
            </div>

            {/* Simulated 4 Prismatic Cell stacks visible through "translucent window" */}
            <div className="space-y-2 mb-6">
              <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Active Modules (Grade-A cells)</span>
              
              {/* Stack 1 */}
              <div className="h-6 rounded bg-gradient-to-r from-[#242424] to-[#141414] border border-zinc-800/80 px-3 flex items-center justify-between">
                <span className="text-[9px] font-mono text-zinc-400">CELL PACK 01-04</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
              </div>
              {/* Stack 2 */}
              <div className="h-6 rounded bg-gradient-to-r from-[#242424] to-[#141414] border border-zinc-800/80 px-3 flex items-center justify-between">
                <span className="text-[9px] font-mono text-zinc-400">CELL PACK 05-08</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
              </div>
              {/* Stack 3 */}
              <div className="h-6 rounded bg-gradient-to-r from-[#242424] to-[#141414] border border-zinc-800/80 px-3 flex items-center justify-between">
                <span className="text-[9px] font-mono text-zinc-400">CELL PACK 09-12</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
              </div>
            </div>

            {/* Smart Bluetooth BMS module */}
            <div className="rounded-xl border border-zinc-800 p-3 bg-zinc-900/40 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <Activity size={16} className="text-[#F6B91E] animate-pulse" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-white font-mono">BMS INTEGRATED</span>
                  <span className="text-[8px] text-zinc-500 font-mono">BT-COMM V4.2 ACTIVE</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-900 text-[8px] font-mono uppercase">Pairing Ready</span>
            </div>

          </div>
        </div>

      </div>

      {/* Scrolling Battery Horizontal Premium Slider */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="flex justify-between items-baseline mb-8">
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-widest text-[#BFC5C9]">
            {t.scrollerTitle}
          </h3>
          <span className="text-xs font-mono text-[#F6B91E] flex items-center">
            DRAG TO EXPLORE <ChevronRight size={14} className="ml-1" />
          </span>
        </div>

        {/* Horizontal Slider Area */}
        <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
          {categories.map((c, i) => (
            <div
              key={i}
              onClick={() => {
                setActivePage("solutions");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex-shrink-0 w-80 rounded-2xl bg-[#090909] hover:bg-[#111] border border-zinc-900 hover:border-zinc-800 p-6 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[10px] text-[#F6B91E] font-bold block mb-2 uppercase">0{i + 1} / SOLUTIONS</span>
                <h4 className="text-lg font-bold text-white group-hover:text-[#F6B91E] transition-colors mb-2">
                  {c.title}
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                  {c.desc}
                </p>
              </div>
              <div className="flex items-center space-x-1.5 text-xs text-white font-mono group-hover:translate-x-1 transition-transform mt-auto">
                <span>View engineering specifications</span>
                <ArrowRight size={14} className="text-[#F6B91E]" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
