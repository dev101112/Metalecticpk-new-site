import React, { useState } from "react";
import { Briefcase, MapPin, Calendar, Clock, ChevronRight, CheckCircle, FileText, Upload } from "lucide-react";

interface CareersPageProps {
  lang: "EN" | "UR";
}

export const CareersPage: React.FC<CareersPageProps> = ({ lang }) => {
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Embedded Firmware Engineer");
  const [text, setText] = useState("");

  const jobs = [
    {
      title: "Embedded BMS Firmware Engineer",
      dept: "R&D Department",
      location: "Lahore Headquarters",
      type: "Full-Time",
      desc: "Develop and test active-balancing Bluetooth/CAN protocol algorithms on customized microcontrollers. Requires 2+ years firmware development in C/C++ or Rust.",
      salary: "PKR 150K - 250K / month"
    },
    {
      title: "Battery Mechanical Designer (SolidWorks)",
      dept: "Mechanical Tooling Division",
      location: "Sundar Industrial Estate Factory",
      type: "Full-Time",
      desc: "Design high-density sheet metal structural cabinets, thermal cellular spacers, and vibration-proof brackets. Proficient in structural analysis and heat mapping.",
      salary: "PKR 120K - 180K / month"
    },
    {
      title: "Automation & Laser Welding Technician",
      dept: "Production Floor",
      location: "Sundar Industrial Estate Factory",
      type: "Shift A / Full-Time",
      desc: "Operate high-frequency fiber laser welding terminals for copper busbar prismatic pairing. Calibrate pressure guidelines and perform laser alignment checks.",
      salary: "PKR 80K - 120K / month"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setName("");
      setEmail("");
      setText("");
    }, 5000);
  };

  const t = {
    EN: {
      title: "BUILD THE FUTURE OF CLEAN ENERGY",
      subtitle: "Join Pakistan's premier battery engineering house. We design and manufacture clean energy solutions in our state-of-the-art Sunder facility.",
      tag: "CAREERS & OPPORTUNITIES",
      formHeading: "Submit Application",
      cvSuccess: "CV Registered Successfully!",
      cvSuccessDesc: "Our R&D recruiting panel will review your profile and connect via phone if parameters match."
    },
    UR: {
      title: "کلین انرجی کے مستقبل کا حصہ بنیں",
      subtitle: "پاکستان کے سب سے جدید ترین لیتھیم بیٹری مینوفیکچرنگ پلانٹ، لاہور میں شمولیت اختیار کریں۔",
      tag: "ملازمتیں اور مواقع",
      formHeading: "درخواست جمع کروائیں",
      cvSuccess: "درخواست کامیابی سے جمع ہو گئی ہے!",
      cvSuccessDesc: "ہماری ٹیم جائزہ لینے کے بعد موزوں امیدواروں سے رابطہ کرے گی۔"
    }
  }[lang];

  return (
    <section className="bg-[#050505] text-white py-16 min-h-screen relative" id="careers-page-section">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold uppercase text-[#F6B91E] tracking-widest block mb-2 font-black">
            {t.tag}
          </span>
          <h1 className="text-3xl sm:text-4.5xl font-black uppercase text-white tracking-tight leading-tight">
            {t.title}
          </h1>
          <p className="text-zinc-400 mt-3 text-sm sm:text-base leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
          
          {/* Left Block: Listings */}
          <div className="lg:col-span-7 space-y-6">
            {jobs.map((j, idx) => (
              <div key={idx} className="rounded-2xl bg-[#090909] border border-zinc-900 p-6 hover:border-zinc-800 transition-all space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-bold text-lg text-white font-sans">{j.title}</h3>
                  <span className="px-2.5 py-1 rounded bg-zinc-900 text-[9px] font-mono text-[#F6B91E] font-bold uppercase border border-zinc-800">
                    {j.type}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-500">
                  <span className="flex items-center"><MapPin size={12} className="mr-1 text-emerald-500" /> {j.location}</span>
                  <span className="flex items-center"><Briefcase size={12} className="mr-1 text-[#F6B91E]" /> {j.dept}</span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {j.desc}
                </p>

                <div className="pt-3 border-t border-zinc-950 flex justify-between items-center text-xs text-zinc-500 font-mono">
                  <span>COMPENSATION: {j.salary}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Block: Submit CV */}
          <div className="lg:col-span-5">
            {success ? (
              <div className="rounded-2xl border border-zinc-900 bg-[#090909] p-8 text-center space-y-4 shadow-xl">
                <div className="w-12 h-12 rounded-full bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle size={24} />
                </div>
                <h3 className="font-bold text-white text-base">{t.cvSuccess}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{t.cvSuccessDesc}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-2xl border border-zinc-900 bg-[#090909] p-6 sm:p-8 space-y-4 text-xs shadow-xl">
                <h3 className="text-sm font-bold text-white uppercase border-b border-zinc-900 pb-2">{t.formHeading}</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-zinc-500 mb-1">FULL NAME *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Harris Nadeem"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-500 mb-1">EMAIL ADDRESS *</label>
                    <input
                      type="email"
                      required
                      placeholder="harris@engineer.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-500 mb-1">POSITION *</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-3 py-2 text-white"
                    >
                      {jobs.map((j, i) => (
                        <option key={i} value={j.title}>{j.title}</option>
                      ))}
                    </select>
                  </div>

                  {/* Manual file upload box */}
                  <div className="border border-dashed border-zinc-800 rounded-lg p-5 text-center cursor-pointer hover:border-[#F6B91E] transition-colors relative">
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                    <Upload className="mx-auto text-zinc-500 mb-2" size={20} />
                    <span className="block text-zinc-300 font-bold">Upload Resume File (PDF)</span>
                    <span className="block text-[10px] text-zinc-500 font-mono mt-1">Drag and drop or select manually</span>
                  </div>

                  <div>
                    <label className="block text-zinc-500 mb-1">SHORT INTRODUCTION (OPTIONAL)</label>
                    <textarea
                      rows={3}
                      placeholder="Summarize your engineering background or why you want to build lithium batteries with us."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-3 py-2 text-white leading-relaxed"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#F6B91E] hover:bg-[#e0a410] text-black font-extrabold rounded-lg text-xs transition-all flex items-center justify-center space-x-1.5"
                >
                  <span>Submit CV</span>
                  <ChevronRight size={14} />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
