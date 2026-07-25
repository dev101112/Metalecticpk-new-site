import React, { useState } from "react";
import { 
  FileText, ShieldCheck, HelpCircle, FileDown, Search, ArrowRight, CheckCircle, 
  Settings, Award, RefreshCw, Smartphone, ThermometerSun, AlertCircle, Sparkles
} from "lucide-react";

interface AboutSupportProps {
  lang: "EN" | "UR";
  setActivePage: (page: string) => void;
}

export const AboutSupport: React.FC<AboutSupportProps> = ({ lang, setActivePage }) => {
  const [activeTab, setActiveTab] = useState<"story" | "quality" | "warranty" | "downloads" | "faqs">("story");
  
  // Warranty search states
  const [serialQuery, setSerialQuery] = useState("");
  const [warrantyResult, setWarrantyResult] = useState<any>(null);
  const [searched, setSearched] = useState(false);

  // Warranty register states
  const [regSerial, setRegSerial] = useState("");
  const [regName, setRegName] = useState("");
  const [regInverter, setRegInverter] = useState("");
  const [regDate, setRegDate] = useState("");
  const [regSuccess, setRegSuccess] = useState(false);

  const handleWarrantySearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    
    const formatted = serialQuery.trim().toUpperCase();
    if (formatted.startsWith("AA-LFP-") || formatted.startsWith("AA-") || formatted.length > 5) {
      setWarrantyResult({
        serial: formatted,
        model: "Alpha Ampere LiFe-48200 Pro System",
        capacity: "200Ah (10.24 kWh nominal)",
        dispatchDate: "September 14, 2025",
        status: "Active",
        expiry: "September 14, 2030",
        coverage: "5 Years Unlimited Factory Warranty",
        assembly: "Sundar Industrial Estate Lahore, Shift B"
      });
    } else {
      setWarrantyResult(null);
    }
  };

  const handleRegisterWarranty = (e: React.FormEvent) => {
    e.preventDefault();
    if (regSerial && regName) {
      setRegSuccess(true);
      setTimeout(() => {
        setRegSuccess(false);
        setRegSerial("");
        setRegName("");
        setRegInverter("");
        setRegDate("");
      }, 5000);
    }
  };

  const faqs = [
    {
      q: "Which solar inverters are directly compatible with Alpha Ampere batteries?",
      a: "Our integrated smart BMS supports automatic CAN and RS485 communication protocols with standard premium hybrid inverters sold in Pakistan, including Deye, Victron Energy, Growatt, Solis, SMA, Knox, Fronus, and Voltronic Power. Standard RS485 matching keys are pre-loaded."
    },
    {
      q: "What is the lifespan of these LiFePO₄ batteries under Lahore or Karachi heat?",
      a: "Traditional lead-acid or tubular batteries fail rapidly under ambient heat exceeding 40°C due to acid boil-off. Our Grade-A Lithium Iron Phosphate (LiFePO4) chemistry has a thermal threshold of 60°C. Coupled with custom cell-spacers and automatic high-temperature cut-offs, our battery systems consistently deliver over 8,000 cycles (15+ years of daily cycling)."
    },
    {
      q: "Is it possible to connect multiple batteries in parallel?",
      a: "Yes. Our Alpha BMS supports direct parallel daisy-chaining of up to 16 units using CAN communication cords. The master battery auto-configures the load balance, expanding your storage array up to 160 kWh safely."
    },
    {
      q: "Do I need to top up water or do any periodic maintenance?",
      a: "No. Unlike tubular or deep-cycle lead-acid batteries, Alpha Lithium systems are 100% sealed, dry-operating, and require zero water topping, cleaning, or cell-balancing maintenance. The integrated microchip monitors and maintains optimal balances automatically."
    }
  ];

  const qualityStandards = [
    { title: "Dynamic Internal Resistance Matching", desc: "Every lithium prismatic cell is automatically tested for internal resistance down to 0.1mΩ. Cells are paired precisely to prevent micro-voltage mismatches that compromise longevity." },
    { title: "High-Discharge Stress Tests", desc: "Finished battery banks are connected to heavy industrial electronic load banks and discharged continuously at 1.0C rate to profile heat emission and verify BMS safety thresholds." },
    { title: "Cell Spacer Structural Framing", desc: "Cells are never stacked directly against each other. We use custom fire-safe modular polycarbonate brackets and insulation plates, leaving clean airflow pathways to limit heat accumulation during fast charging." }
  ];

  const downloads = [
    { title: "Alpha Ampere LiFe-48200 Pro Datasheet (PDF)", size: "2.4 MB", type: "Specs Brochure", url: "#" },
    { title: "Standard 19-inch Rack-Rack 48100 Installation Guide", size: "4.1 MB", type: "User Manual", url: "#" },
    { title: "Official Inverter CAN/RS485 Protocol Connection Codes", size: "1.2 MB", type: "Technical Note", url: "#" },
    { title: "Metalectric Factory Warranty Policy Document", size: "0.8 MB", type: "Certificate", url: "#" }
  ];

  const t = {
    EN: {
      storyTab: "Factory Story",
      qualityTab: "Quality Testing",
      warrantyTab: "Warranty Check",
      downloadsTab: "Manuals & PDF",
      faqsTab: "Technical FAQs",
      serialPlaceholder: "e.g. AA-LFP-48200-9842",
      verifyBtn: "Verify Serial",
      activeTitle: "WARRANTY ACTIVE",
      regHeading: "Register New Warranty Card",
      regNameLabel: "Owner Name",
      regSerialLabel: "Battery Serial Number",
      regInverterLabel: "Installed Inverter Model",
      regDateLabel: "Date of Purchase"
    },
    UR: {
      storyTab: "ہماری کہانی",
      qualityTab: "کوالٹی ٹیسٹنگ",
      warrantyTab: "وارنٹی چیکر",
      downloadsTab: "ڈاؤن لوڈز",
      faqsTab: "اہم سوالات",
      serialPlaceholder: "سیریل نمبر درج کریں...",
      verifyBtn: "تصدیق کریں",
      activeTitle: "وارنٹی ایکٹو ہے",
      regHeading: "وارنٹی کارڈ رجسٹر کریں",
      regNameLabel: "مالک کا نام",
      regSerialLabel: "بیٹری سیریل نمبر",
      regInverterLabel: "انورٹر ماڈل",
      regDateLabel: "خریداری کی تاریخ"
    }
  }[lang];

  return (
    <section className="bg-[#050505] text-white py-16 min-h-screen relative" id="about-support-section">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Tabs */}
        <div className="flex justify-center space-x-1 sm:space-x-2 overflow-x-auto pb-4 border-b border-zinc-900/80 mb-12">
          <button
            onClick={() => { setActiveTab("story"); setSearched(false); }}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === "story" ? "bg-[#F6B91E] text-black" : "bg-[#090909] border border-zinc-900 text-zinc-400 hover:text-white"
            }`}
          >
            {t.storyTab}
          </button>
          <button
            onClick={() => { setActiveTab("quality"); setSearched(false); }}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === "quality" ? "bg-[#F6B91E] text-black" : "bg-[#090909] border border-zinc-900 text-zinc-400 hover:text-white"
            }`}
          >
            {t.qualityTab}
          </button>
          <button
            onClick={() => { setActiveTab("warranty"); setSearched(false); }}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === "warranty" ? "bg-[#F6B91E] text-black" : "bg-[#090909] border border-zinc-900 text-zinc-400 hover:text-white"
            }`}
          >
            {t.warrantyTab}
          </button>
          <button
            onClick={() => { setActiveTab("downloads"); setSearched(false); }}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === "downloads" ? "bg-[#F6B91E] text-black" : "bg-[#090909] border border-zinc-900 text-zinc-400 hover:text-white"
            }`}
          >
            {t.downloadsTab}
          </button>
          <button
            onClick={() => { setActiveTab("faqs"); setSearched(false); }}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === "faqs" ? "bg-[#F6B91E] text-black" : "bg-[#090909] border border-zinc-900 text-zinc-400 hover:text-white"
            }`}
          >
            {t.faqsTab}
          </button>
        </div>

        {/* TAB 1: STORY & SUNDAR FACTORY */}
        {activeTab === "story" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono font-bold uppercase text-[#F6B91E] tracking-widest block">
                ENGINEERING CELL CHEMISTRY
              </span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight leading-tight">
                Pakistan's Premium Battery Engineering House
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                Founded by solar integrators and electrical engineers, **Metalectric PK** operates with a clear objective: build lithium batteries that never fail, even under Pakistan's extreme voltages and 50°C summer conditions.
              </p>
              <p className="text-sm text-zinc-500 leading-relaxed">
                From our facility at Sundar Industrial Estate Lahore, our technical team works on laser prismatic welding, high-density busbar designing, and custom smart BMS firmware programming. We pair only Grade-A cells with high discharge capabilities, providing residential and industrial setups with absolute protection.
              </p>

              <div className="grid grid-cols-2 gap-4 border-t border-zinc-900 pt-6 font-mono text-xs text-zinc-500">
                <div>
                  <span className="text-[#F6B91E] font-black block text-lg">ISO 9001</span>
                  <span>Registered Production Facility</span>
                </div>
                <div>
                  <span className="text-emerald-400 font-black block text-lg">CE CERTIFIED</span>
                  <span>Safety and Protection Standard</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-zinc-900 h-96 relative bg-zinc-950">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" 
                alt="Factory assembly" 
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
              <div className="absolute bottom-6 left-6 text-left">
                <span className="text-[10px] font-mono text-[#F6B91E] uppercase font-bold tracking-widest block mb-1">AUTOMATED LINE</span>
                <span className="text-lg font-black text-white block">SUNDAR INDUSTRIAL ESTATE, LAHORE</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: QUALITY TESTING */}
        {activeTab === "quality" && (
          <div className="space-y-12 text-left">
            <div className="max-w-3xl">
              <span className="text-xs font-mono font-bold uppercase text-[#F6B91E] tracking-widest block mb-2">
                UNCOMPROMISING EVALUATIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white">
                Cell Profiling and Stress Standards
              </h2>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                No battery leaves our Sundar assembly floor without passing complete telemetry checks. We simulate extreme load-shedding cycles and maximum discharge rates to confirm safety.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {qualityStandards.map((qs, idx) => (
                <div key={idx} className="rounded-2xl bg-[#090909] border border-zinc-900 p-8 hover:border-[#F6B91E]/30 transition-all">
                  <span className="font-mono text-[#F6B91E] text-2xl font-black block mb-4">0{idx + 1}</span>
                  <h3 className="text-base font-bold text-white mb-2">{qs.title}</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{qs.desc}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-[#F6B91E]/10 bg-[#F6B91E]/2 p-6 flex items-start space-x-4 max-w-4xl">
              <AlertCircle className="text-[#F6B91E] mt-0.5 shrink-0" size={20} />
              <div className="text-xs">
                <span className="block font-bold text-white">Thermal Chamber Cycles</span>
                <p className="text-zinc-500 leading-relaxed mt-1">
                  Each BMS controller undergoes cyclic high-temperature chamber tests to calibrate safety thermal sensor cutoffs. This guarantees that even if ambient temperatures scale past 50°C, the cell blocks continue to operate within optimal limits.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: WARRANTY REGISTRY AND SEARCH */}
        {activeTab === "warranty" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 text-left items-start">
            
            {/* Warranty lookup */}
            <div className="lg:col-span-6 space-y-6">
              <div className="rounded-2xl bg-[#090909] border border-zinc-900 p-6 sm:p-8 space-y-6 shadow-xl">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Verify Registered Battery Warranty</h3>
                  <p className="text-xs text-zinc-500 font-mono">Input your serial number from your physical warranty certificate card.</p>
                </div>

                <form onSubmit={handleWarrantySearch} className="flex space-x-2">
                  <input
                    type="text"
                    required
                    placeholder={t.serialPlaceholder}
                    value={serialQuery}
                    onChange={(e) => setSerialQuery(e.target.value)}
                    className="flex-grow bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#F6B91E] font-mono"
                  />
                  <button
                    type="submit"
                    className="px-5 bg-[#F6B91E] hover:bg-[#e0a410] text-black font-extrabold text-xs rounded-xl transition-all font-mono"
                  >
                    {t.verifyBtn}
                  </button>
                </form>

                {searched && (
                  <div className="border-t border-zinc-900 pt-6 space-y-4">
                    {warrantyResult ? (
                      <div className="rounded-xl bg-emerald-950/20 border border-emerald-900/50 p-4 space-y-3">
                        <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs font-bold">
                          <CheckCircle size={14} />
                          <span>{t.activeTitle}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-[11px] font-mono text-zinc-400">
                          <div>
                            <span className="block text-zinc-600">SERIAL NUMBER</span>
                            <span className="text-white font-bold">{warrantyResult.serial}</span>
                          </div>
                          <div>
                            <span className="block text-zinc-600">BATTERY MODEL</span>
                            <span className="text-white">{warrantyResult.model}</span>
                          </div>
                          <div>
                            <span className="block text-zinc-600">DISPATCH DATE</span>
                            <span className="text-white">{warrantyResult.dispatchDate}</span>
                          </div>
                          <div>
                            <span className="block text-zinc-600">WARRANTY EXPIRES</span>
                            <span className="text-emerald-400 font-bold">{warrantyResult.expiry}</span>
                          </div>
                          <div className="col-span-2 border-t border-zinc-900 pt-2">
                            <span className="block text-zinc-600">COVERAGE</span>
                            <span className="text-white">{warrantyResult.coverage}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-xl bg-red-950/20 border border-red-900/40 p-4 flex items-start space-x-3">
                        <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={16} />
                        <div className="text-xs">
                          <span className="block font-bold text-white font-mono">SERIAL NOT REGISTERED IN LAHORE HEADQUARTERS</span>
                          <span className="text-zinc-500 leading-snug mt-1 block">Please verify spelling or register your system using the warranty card registry form on the right.</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Warranty Register Card */}
            <div className="lg:col-span-6">
              <form onSubmit={handleRegisterWarranty} className="rounded-2xl bg-[#090909] border border-zinc-900 p-6 sm:p-8 space-y-4 shadow-xl">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{t.regHeading}</h3>
                  <p className="text-xs text-zinc-500">Register your brand new system parameters into our server databases.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-500 mb-1.5 uppercase font-bold">{t.regNameLabel}</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Harris Nadeem"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F6B91E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-500 mb-1.5 uppercase font-bold">{t.regSerialLabel}</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. AA-LFP-48200"
                      value={regSerial}
                      onChange={(e) => setRegSerial(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F6B91E] font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-500 mb-1.5 uppercase font-bold">{t.regInverterLabel}</label>
                      <input
                        type="text"
                        placeholder="Deye 10kW, Fronus 5kW"
                        value={regInverter}
                        onChange={(e) => setRegInverter(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F6B91E]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-zinc-500 mb-1.5 uppercase font-bold">{t.regDateLabel}</label>
                      <input
                        type="date"
                        required
                        value={regDate}
                        onChange={(e) => setRegDate(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F6B91E] font-mono text-zinc-500"
                      />
                    </div>
                  </div>
                </div>

                {regSuccess && (
                  <p className="text-emerald-500 font-mono text-xs flex items-center space-x-1.5 pt-2">
                    <CheckCircle size={14} />
                    <span>Warranty registered successfully into database!</span>
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold text-xs rounded-xl transition-all"
                >
                  Register Serial Parameters
                </button>

              </form>
            </div>

          </div>
        )}

        {/* TAB 4: MANUALS & PDF DOWNLOADS */}
        {activeTab === "downloads" && (
          <div className="space-y-8 text-left max-w-4xl mx-auto">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-[#F6B91E] tracking-widest block mb-2">
                RESOURCES AND BROCHURES
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white">
                Technical Documents Library
              </h2>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                Download verified wiring schematics, smart Bluetooth application APKs, and parameter connection sheets to configure hybrid solar setups.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {downloads.map((dl, idx) => (
                <div 
                  key={idx} 
                  className="rounded-2xl bg-[#090909] border border-zinc-900 p-6 flex justify-between items-center group hover:border-[#F6B91E]/30 transition-all"
                >
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded bg-[#242424] text-[9px] font-mono text-[#F6B91E] font-bold uppercase">
                      {dl.type}
                    </span>
                    <h4 className="font-bold text-sm text-white pt-1">{dl.title}</h4>
                    <span className="block text-[10px] text-zinc-500 font-mono">{dl.size} • PDF Doc</span>
                  </div>
                  
                  <a
                    href={dl.url}
                    onClick={(e) => { e.preventDefault(); alert("Technical download started! Check your browser files."); }}
                    className="p-3 rounded-xl bg-zinc-900 border border-zinc-850 text-zinc-400 group-hover:bg-[#F6B91E] group-hover:text-black transition-all"
                  >
                    <FileDown size={18} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: FAQs */}
        {activeTab === "faqs" && (
          <div className="space-y-8 text-left max-w-4xl mx-auto">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-[#F6B91E] tracking-widest block mb-2">
                TECHNICAL ASSISTANCE
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white">
                Engineering Support FAQs
              </h2>
            </div>

            <div className="divide-y divide-zinc-900 space-y-6">
              {faqs.map((f, idx) => (
                <div key={idx} className="pt-6 text-left space-y-2">
                  <h3 className="text-sm sm:text-base font-bold text-white flex items-start space-x-2.5">
                    <span className="text-[#F6B91E] font-mono">Q:</span>
                    <span>{f.q}</span>
                  </h3>
                  <div className="pl-6 text-xs sm:text-sm text-zinc-400 leading-relaxed flex items-start space-x-2.5">
                    <span className="text-emerald-500 font-mono shrink-0">A:</span>
                    <span>{f.a}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
