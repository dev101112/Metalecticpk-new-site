import React from "react";
import { Cpu, Server, Home, ShieldCheck, Sun, Workflow, ArrowRight, Zap, RefreshCw } from "lucide-react";

interface SolutionsProps {
  setActivePage: (page: string) => void;
  lang: "EN" | "UR";
}

export const Solutions: React.FC<SolutionsProps> = ({ setActivePage, lang }) => {
  const solutions = [
    {
      icon: <Home size={28} className="text-[#F6B91E]" />,
      title: "Luxury Residential Backups",
      target: "Homes with 3kW to 20kW Solar Inverters",
      voltage: "48V (51.2V Nominal)",
      desc: "Perfect off-grid and hybrid backup for premium homes. Synchronizes flawlessly with Deye, Fronus, Knox, and Solis inverters. Our LFP packs supply uninterrupted power for inverter ACs, refrigerator compressors, and heavy home lighting, protecting sensitive smart home components against grid surges.",
      specs: ["Modular expandability up to 160 kWh", "Bluetooth active balancing BMS integration", "Zero terminal maintenance required", "Wall-mount sleek space-saving layouts"]
    },
    {
      icon: <Server size={28} className="text-[#F6B91E]" />,
      title: "Enterprise Telecom & Server Grids",
      target: "Data centers, cellular antennas, and IT backbones",
      voltage: "48V Standard Rack Mount",
      desc: "Standardized 19-inch server rack lithium banks. Designed to operate at high ambient heat rooms, delivering continuous C-rate discharge thresholds. Dual CAN/RS485 protocol engines provide remote monitoring and cellular health metrics instantly to server room diagnostics software.",
      specs: ["Fits standard 19-inch 3U/4U rack frames", "98% power efficiency under peak server load", "Dual redundant temperature sensor protection", "Hot-swappable module synchronization"]
    },
    {
      icon: <Workflow size={28} className="text-[#F6B91E]" />,
      title: "Sundar Industrial Power Banks",
      target: "Heavy manufacturing, CNC shops, textile automation",
      voltage: "96V to 600V High-Voltage Arrays",
      desc: "Robust Cabinet arrays custom engineered for heavy motor startups and computer-guided manufacturing plants in Lahore, Karachi, and Faisalabad. Active balance microchips control massive cell grids, preventing voltage dips during sudden local grid blackouts.",
      specs: ["High-voltage series-parallel control modules", "Heavy structural steel vibration-safe cabinet", "Automated fire extinguisher cartridges built-in", "Automated load-shedding scheduling interfaces"]
    },
    {
      icon: <Sun size={28} className="text-[#F6B91E]" />,
      title: "Agricultural Solar Tubewells",
      target: "Deep water-pumps, farm irrigation, off-grid storage",
      voltage: "24V to 48V Weatherproof packs",
      desc: "Specialized ruggedized lithium packs designed to withstand dust, moisture, and high-temperature pump-houses. Our LiFePO₄ cells provide full current delivery during low-solar intervals, allowing farms to pump water steadily without tripping pump controllers.",
      specs: ["IP65 dust & waterproof sealed chassis", "High-efficiency output for induction pump motors", "Integrated auto-heating BMS for winter cold", "Secure lockable steel enclosures"]
    }
  ];

  const t = {
    EN: {
      title: "ENGINEERED SYSTEM SOLUTIONS",
      subtitle: "Tailor-made Lithium Iron Phosphate battery layouts optimized for critical industrial, commercial, and off-grid configurations.",
      tag: "SYSTEM ARCHITECTURE",
      backBtn: "Explore LFP Catalog",
      startProject: "Sponsor a Custom Design",
      ctaTitle: "Need a specialized series-parallel battery configuration?",
      ctaDesc: "Our Lahore Sundar R&D team regularly engineers customized voltage cells configurations, integrated cooling systems, and communication microchips."
    },
    UR: {
      title: "انجنیرڈ انرجی سلوشنز",
      subtitle: "خصوصی ضروریات کے مطابق تیار کردہ لیتھیم آئرن فاسفیٹ (LiFePO4) سسٹمز جو آپ کے کاروبار اور گھر کو روشن رکھیں۔",
      tag: "سسٹم آرکیٹیکچر",
      backBtn: "بیٹری کیٹلاگ دیکھیں",
      startProject: "ڈیزائن پلان کریں",
      ctaTitle: "کیا آپ کو اپنی انڈسٹری کے لیے مخصوص وولٹیج کا سسٹم چاہیے؟",
      ctaDesc: "ہماری سندر انڈسٹریل اسٹیٹ، لاہور کی فیکٹری میں الیکٹریکل انجینئرز کی ٹیم آپ کی ضرورت کے مطابق کسٹم وولٹیج بیٹریاں بنا سکتی ہے۔"
    }
  }[lang];

  return (
    <section className="bg-[#050505] text-white py-16 min-h-screen relative" id="solutions-page-section">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-left mb-16 border-b border-zinc-900 pb-8">
          <span className="text-xs font-mono font-bold uppercase text-[#F6B91E] tracking-widest block mb-2">
            {t.tag}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight">
            {t.title}
          </h1>
          <p className="text-zinc-400 mt-3 text-sm sm:text-base max-w-3xl leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {solutions.map((s, idx) => (
            <div 
              key={idx} 
              className="rounded-3xl bg-[#090909] border border-zinc-900 p-8 text-left space-y-6 flex flex-col justify-between hover:border-[#F6B91E]/40 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                    {s.icon}
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/20 border border-emerald-900/40">
                    {s.voltage}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#F6B91E] transition-colors">{s.title}</h3>
                  <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-bold">{s.target}</span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {s.desc}
                </p>

                <div className="pt-4 border-t border-zinc-900 space-y-2">
                  <span className="block text-[10px] font-mono text-[#F6B91E] uppercase font-bold tracking-wider">Engineering Specs:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-zinc-400 font-mono">
                    {s.specs.map((spec, sidx) => (
                      <div key={sidx} className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => {
                    setActivePage("get-quote");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 hover:border-zinc-700 text-xs font-bold transition-all flex items-center justify-center space-x-1.5 group-hover:bg-[#F6B91E] group-hover:text-black group-hover:border-[#F6B91E]"
                >
                  <span>Build System Sizing Sheet</span>
                  <ArrowRight size={14} />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Custom Engineering Request Section */}
        <div className="rounded-3xl border border-zinc-900 bg-zinc-950 p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#F6B91E]/3 rounded-full blur-3xl pointer-events-none" />
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-mono font-bold tracking-wider text-[#F6B91E] uppercase">
            🛠️ SUNDAR R&D CENTER
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">{t.ctaTitle}</h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {t.ctaDesc}
          </p>

          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 max-w-md mx-auto pt-4">
            <button
              onClick={() => {
                setActivePage("get-quote");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-6 py-3 rounded-lg bg-[#F6B91E] hover:bg-[#e0a410] text-black font-extrabold text-xs transition-all flex items-center justify-center space-x-1 shadow-lg"
            >
              <span>{t.startProject}</span>
              <Zap size={14} fill="currentColor" />
            </button>
            <button
              onClick={() => {
                setActivePage("products");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-6 py-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs font-bold transition-all"
            >
              {t.backBtn}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
