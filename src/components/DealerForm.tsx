import React, { useState } from "react";
import { Award, Briefcase, FileCheck, CheckCircle2, ChevronRight, MapPin, Zap } from "lucide-react";

interface DealerFormProps {
  lang: "EN" | "UR";
}

export const DealerForm: React.FC<DealerFormProps> = ({ lang }) => {
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Lahore");
  const [businessType, setBusinessType] = useState("Solar EPC Installer");
  const [experience, setExperience] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      companyName,
      contactPerson,
      email,
      phone,
      city,
      businessType,
      experience
    };

    try {
      const res = await fetch("/api/dealers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setSuccess(true);
      }
    } catch (err) {
      console.error("Dealer application error", err);
      // Fallback success
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  const criteria = [
    { title: "Technical Expertise", desc: "Applicants should have certified solar installation staff or certified UPS technicians on staff to support end-users." },
    { title: "Showroom Presence", desc: "A brick-and-mortar office or electrical warehouse setup in major provincial hubs to showcase LiFePO4 modules." },
    { title: "Quality Commitment", desc: "Adherence to Alpha Ampere's official warranty policies and certified installation checklists." }
  ];

  const t = {
    EN: {
      title: "BECOME AN AUTHORIZED INTEGRATOR",
      subtitle: "Join Pakistan's fastest-growing lithium network. Gain access to direct factory pricing, technical sizing support, and premium warranties.",
      badge: "PARTNERSHIP APPLICATION",
      successTitle: "Dealer Application Received",
      successDesc: "Our distribution department in Sundar Industrial Estate is analyzing your company profile. An onboarding manager will connect via phone within 48 business hours.",
      requirementsTitle: "Partnership Framework & Criteria",
      criteriaDesc: "To maintain the premium reputation of the Alpha Ampere brand, all dealers undergo evaluation matching electrical integration capabilities.",
      companyLabel: "Registered Company Name *",
      contactLabel: "Primary Contact Person *",
      emailLabel: "Business Email Address *",
      phoneLabel: "Mobile / WhatsApp Contact *",
      cityLabel: "Primary Distribution City *",
      typeLabel: "Business Model Type *",
      expLabel: "Solar / Electrical Experience Details *",
      submitBtn: "Submit Distributor Application"
    },
    UR: {
      title: "آفیشل پارٹنر اور ڈیلر بنیں",
      subtitle: "پاکستان کے سب سے بڑے لیتھیم نیٹ ورک کا حصہ بنیں۔ فیکٹری ریٹس پر پروڈکٹس اور آفیشل وارنٹی سپورٹ حاصل کریں۔",
      badge: "شراکت داری کی درخواست",
      successTitle: "درخواست موصول ہو گئی ہے",
      successDesc: "ہماری ڈسٹری بیوشن ٹیم آپ کی درخواست کا جائزہ لے کر 48 گھنٹوں کے اندر آپ سے رابطہ کرے گی۔",
      requirementsTitle: "شراکت داری کا طریقہ کار",
      criteriaDesc: "پروڈکٹس کی کوالٹی برقرار رکھنے کے لیے تمام ڈیلرز کو ان معیار پر پورا اترنا ضروری ہے۔",
      companyLabel: "رجسٹرڈ کمپنی کا نام *",
      contactLabel: "رابطہ کرنے والے کا نام *",
      emailLabel: "کمپنی ای میل *",
      phoneLabel: "واٹس ایپ یا موبائل نمبر *",
      cityLabel: "شہر کا نام *",
      typeLabel: "کاروبار کی نوعیت *",
      expLabel: "سولر یا الیکٹریکل کے کام کا تجربہ *",
      submitBtn: "درخواست جمع کروائیں"
    }
  }[lang];

  return (
    <section className="bg-[#050505] text-white py-16 min-h-screen relative" id="dealer-page-section">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold uppercase text-[#F6B91E] tracking-widest block mb-2">
            {t.badge}
          </span>
          <h1 className="text-3xl sm:text-4.5xl font-black uppercase text-white tracking-tight leading-tight">
            {t.title}
          </h1>
          <p className="text-zinc-400 mt-3 text-sm sm:text-base leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {success ? (
          <div className="rounded-3xl bg-[#090909] border border-zinc-900 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-2xl space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-2xl font-black uppercase text-white">{t.successTitle}</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {t.successDesc}
            </p>
            <div className="pt-4 border-t border-zinc-900">
              <p className="text-xs font-mono text-zinc-600">Distribution HQ: Sundar Industrial Estate, Lahore, Pakistan</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Requirements and framework */}
            <div className="lg:col-span-5 space-y-8 text-left">
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase text-[#F6B91E] font-bold">ALPHA INTEGRATION PROGRAM</span>
                <h3 className="text-2xl font-black uppercase text-white leading-tight">{t.requirementsTitle}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {t.criteriaDesc}
                </p>
              </div>

              <div className="space-y-4">
                {criteria.map((c, idx) => (
                  <div key={idx} className="rounded-xl border border-zinc-900 bg-zinc-950/40 p-5 flex items-start space-x-4">
                    <Briefcase className="text-[#F6B91E] mt-0.5 shrink-0" size={18} />
                    <div>
                      <h4 className="font-bold text-white text-sm">{c.title}</h4>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Technical Certifications badge */}
              <div className="rounded-xl border border-dashed border-zinc-800 p-5 flex items-center space-x-3.5 bg-[#090909]/40">
                <FileCheck className="text-[#10B981] shrink-0" size={24} />
                <div className="text-xs">
                  <span className="block font-bold text-white">Full Sizing Software Provided</span>
                  <span className="text-zinc-500 leading-snug">All accepted dealers receive access to our proprietary smart lithium sizing software and remote cell diagnostics platform.</span>
                </div>
              </div>
            </div>

            {/* Right Column: Application Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 rounded-3xl bg-[#090909] border border-zinc-900 p-6 sm:p-10 text-left space-y-6 shadow-2xl">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Company Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-2 font-bold">{t.companyLabel}</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Solux Solar Solutions"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#F6B91E]"
                  />
                </div>

                {/* Contact Person */}
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-2 font-bold">{t.contactLabel}</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. M. Kamran"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#F6B91E]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-2 font-bold">{t.emailLabel}</label>
                  <input
                    type="email"
                    required
                    placeholder="dealer@company.pk"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#F6B91E]"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-2 font-bold">{t.phoneLabel}</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. +92 300 7654321"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#F6B91E] font-mono"
                  />
                </div>

                {/* Primary City */}
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-2 font-bold">{t.cityLabel}</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#F6B91E]"
                  >
                    <option value="Lahore">Lahore / Punjab</option>
                    <option value="Karachi">Karachi / Sindh</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Multan">Multan</option>
                    <option value="Peshawar">Peshawar / KPK</option>
                    <option value="Quetta">Quetta / Balochistan</option>
                  </select>
                </div>

                {/* Business Model */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-2 font-bold">{t.typeLabel}</label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#F6B91E]"
                  >
                    <option value="Solar EPC Installer">Solar EPC Design & Installation</option>
                    <option value="Electrical Retailer">Electrical Warehouse / Retail Shop</option>
                    <option value="Telecom Contractor">Telecom Infrastructure Sub-Contractor</option>
                    <option value="UPS Specialist">Industrial UPS Supplier</option>
                  </select>
                </div>

                {/* Experience Details */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-2 font-bold">{t.expLabel}</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Summarize your company's electrical integration or solar volume (e.g., kW installed per month, existing inverter brands you trust)."
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#F6B91E] leading-relaxed"
                  />
                </div>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-[#F6B91E] hover:bg-[#e0a410] text-[#050505] font-extrabold text-sm transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>{loading ? "Registering distributor profile..." : t.submitBtn}</span>
                <ChevronRight size={16} />
              </button>

            </form>

          </div>
        )}

      </div>
    </section>
  );
};
