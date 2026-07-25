import React from "react";
import { MapPin, Zap, ArrowRight, ShieldCheck, Calendar, Sparkles } from "lucide-react";

interface ProjectsPageProps {
  lang: "EN" | "UR";
  setActivePage: (page: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ lang, setActivePage }) => {
  const caseStudies = [
    {
      title: "Karachi Medical Diagnostics Power Wall",
      location: "Karachi Clifton, Diagnostics Block",
      client: "Malik Diagnostic Clinic",
      system: "Alpha Ampere LiFe-48200 Pro Stacks",
      capacity: "40.96 kWh (4x Parallel Synchronized)",
      inverter: "Deye 15kW Hybrid 3-Phase",
      desc: "Replaced an expanding and venting tubular battery bank with a clean, fire-safe, wall-mounted Alpha lithium grid. The system provides zero-latency UPS standby for high-resolution ultrasound machines, safeguarding critical diagnostics during unannounced load shedding.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600",
      date: "August 2025"
    },
    {
      title: "Sundar Industrial Textile Automation",
      location: "Sundar Industrial Estate, Lahore",
      client: "Indus Apparel Group",
      system: "High-Voltage Cabinet Array",
      capacity: "120 kWh (Cabinet System Custom Engineered)",
      inverter: "SMA Sunny Island High-Voltage Arrays",
      desc: "Custom-engineered high-voltage cabinet matching high startup surge currents of textile automatic loom motors. Pre-loaded with dynamic thermal air channels and smart active balances to maintain cell health continuously.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600",
      date: "November 2025"
    },
    {
      title: "Luxury Off-Grid Organic Farms",
      location: "Rawalpindi Outskirts, Punjab",
      client: "Al-Noor Agricultural Orchards",
      system: "Alpha Power-Base 48200 Slim Units",
      capacity: "19.2 kWh (2x Parallel Synchronized)",
      inverter: "Growatt 10kW Off-Grid Inverters",
      desc: "Supplies bulletproof deep cycle standby for water pumps, fans, and security grids at a fully off-grid remote farmhouse. The system utilizes IP65 sealed enclosures to keep out Punjab farm dust and insect grids.",
      image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&q=80&w=600",
      date: "June 2025"
    }
  ];

  const t = {
    EN: {
      title: "LATEST INSTALLATIONS & CASE STUDIES",
      subtitle: "See how Alpha Ampere LiFePO₄ energy storage systems are powering critical operations, medical labs, and premium homes throughout Pakistan.",
      tag: "CASE STUDIES",
      systemLabel: "INTEGRATED STORAGE SYSTEM",
      capacityLabel: "ENERGY CAPACITY",
      inverterLabel: "SYNCHRONIZED INVERTER",
      cta: "Need Sizing for a Similar Project?"
    },
    UR: {
      title: "حالیہ منصوبے اور کیس اسٹڈیز",
      subtitle: "دیکھیں کہ الفا ایمپیئر لیتھیم سسٹمز کس طرح پاکستان بھر میں ہسپتالوں، فیکٹریوں اور گھروں کو بجلی فراہم کر رہے ہیں۔",
      tag: "کیس اسٹڈیز",
      systemLabel: "لیتھیم اسٹوریج سسٹم",
      capacityLabel: "سٹوریج گنجائش",
      inverterLabel: "انورٹر ماڈل",
      cta: "کیا آپ کو بھی ایسے منصوبے کے لیے ڈیزائن چاہیے؟"
    }
  }[lang];

  return (
    <section className="bg-[#050505] text-white py-16 min-h-screen relative" id="projects-page-section">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-left mb-16 border-b border-zinc-900 pb-8">
          <span className="text-xs font-mono font-bold uppercase text-[#F6B91E] tracking-widest block mb-2 font-black">
            {t.tag}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight">
            {t.title}
          </h1>
          <p className="text-zinc-400 mt-3 text-sm sm:text-base max-w-3xl leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="space-y-16">
          {caseStudies.map((cs, idx) => (
            <div 
              key={idx} 
              className="rounded-3xl bg-[#090909] border border-zinc-900 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 hover:border-[#F6B91E]/30 transition-all duration-300"
            >
              
              {/* Image Column */}
              <div className="lg:col-span-5 h-64 lg:h-auto rounded-2xl overflow-hidden relative">
                <img 
                  src={cs.image} 
                  alt={cs.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909] to-transparent" />
                <span className="absolute top-4 left-4 px-2.5 py-1 rounded bg-black/60 border border-zinc-800 text-[10px] font-mono text-white font-bold uppercase flex items-center">
                  <MapPin size={12} className="text-[#F6B91E] mr-1" />
                  {cs.location}
                </span>
              </div>

              {/* Technical Copy Column */}
              <div className="lg:col-span-7 text-left flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-xs font-mono text-zinc-500">
                    <Calendar size={13} />
                    <span>Commissioned: {cs.date}</span>
                    <span>•</span>
                    <span className="text-[#F6B91E] font-bold">Client: {cs.client}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">{cs.title}</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">{cs.desc}</p>
                </div>

                {/* Sizing specifics block */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-zinc-950 pt-6 font-mono text-[10px] text-zinc-500">
                  <div>
                    <span className="block text-[#F6B91E] uppercase font-bold">{t.systemLabel}</span>
                    <span className="text-zinc-300 font-sans font-bold text-xs block mt-1 leading-snug">{cs.system}</span>
                  </div>
                  <div>
                    <span className="block text-[#F6B91E] uppercase font-bold">{t.capacityLabel}</span>
                    <span className="text-white font-sans font-bold text-xs block mt-1 leading-snug">{cs.capacity}</span>
                  </div>
                  <div>
                    <span className="block text-[#F6B91E] uppercase font-bold">{t.inverterLabel}</span>
                    <span className="text-zinc-300 font-sans font-bold text-xs block mt-1 leading-snug">{cs.inverter}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-950">
                  <button
                    onClick={() => {
                      setActivePage("get-quote");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-850 text-xs font-bold transition-all flex items-center space-x-1.5"
                  >
                    <span>{t.cta}</span>
                    <ArrowRight size={14} className="text-[#F6B91E]" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
