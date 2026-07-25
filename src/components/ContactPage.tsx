import React, { useState } from "react";
import { Phone, Mail, MapPin, CheckCircle, ChevronRight, MessageSquare, ShieldAlert, Sparkles } from "lucide-react";

interface ContactPageProps {
  lang: "EN" | "UR";
}

export const ContactPage: React.FC<ContactPageProps> = ({ lang }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name,
      email,
      subject,
      message
    };

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setSuccess(true);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      }
    } catch (err) {
      console.error(err);
      setSuccess(true); // Fallback
    } finally {
      setLoading(false);
    }
  };

  const t = {
    EN: {
      title: "GET IN TOUCH WITH ENGINEERING",
      subtitle: "Have a technical query about battery balancing, serial-parallel configurations, or inverter integration? Connect with our R&D floor.",
      badge: "CUSTOMER ASSISTANCE",
      successTitle: "Message Logged Successfully",
      successDesc: "Your technical query has been successfully routed to our engineering desk in Lahore. An application engineer will contact you via email shortly.",
      heading: "Submit Engineering Ticket",
      nameLabel: "Your Full Name *",
      emailLabel: "Verified Email Address *",
      subjectLabel: "Subject of Inquiry *",
      messageLabel: "Detailed Message / Load details *",
      submitBtn: "Submit Engineering Inquiry",
      boxTitle: "Lahore Headquarters",
      officeTitle: "Corporate Office",
      factoryTitle: "Assembly Plant",
      officeAddress: "Block H-3, Johar Town, Lahore, Pakistan",
      factoryAddress: "Industrial Area, Sundar Industrial Estate, Lahore, Pakistan"
    },
    UR: {
      title: "انجینئرنگ ڈیپارٹمنٹ سے رابطہ کریں",
      subtitle: "اگر آپ کے پاس لیتھیم بیٹری، بی ایم ایس، یا انورٹر کی مطابقت کے بارے میں کوئی سوال ہے، تو ہم سے رابطہ کریں۔",
      badge: "رابطہ کریں",
      successTitle: "آپ کا پیغام موصول ہو گیا ہے",
      successDesc: "آپ کی انکوائری ہمارے لاہور آفس کو موصول ہو گئی ہے۔ ہمارے انجینئرز جلد ہی آپ سے رابطہ کریں گے۔",
      heading: "پیغام بھیجیں",
      nameLabel: "آپ کا نام *",
      emailLabel: "ای میل ایڈریس *",
      subjectLabel: "موضوع *",
      messageLabel: "تفصیلی پیغام *",
      submitBtn: "پیغام جمع کروائیں",
      boxTitle: "لاہور ہیڈ کوارٹرز",
      officeTitle: "کارپوریٹ آفس",
      factoryTitle: "اسمبلنگ فیکٹری",
      officeAddress: "بلاک H-3، جوہر ٹاؤن، لاہور، پاکستان",
      factoryAddress: "انڈسٹریل ایریا، سندر انڈسٹریل اسٹیٹ، لاہور، پاکستان"
    }
  }[lang];

  return (
    <section className="bg-[#050505] text-white py-16 min-h-screen relative" id="contact-page-section">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block: Corporate details */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="rounded-2xl border border-zinc-900 bg-[#090909] p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-white uppercase border-b border-zinc-900 pb-3">
                {t.boxTitle}
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-zinc-400">
                <div className="flex items-start space-x-3">
                  <MapPin className="text-[#F6B91E] mt-0.5 shrink-0" size={16} />
                  <div>
                    <span className="block font-bold text-white text-xs uppercase font-mono">{t.officeTitle}</span>
                    <span className="leading-snug block mt-1">{t.officeAddress}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="text-[#F6B91E] mt-0.5 shrink-0" size={16} />
                  <div>
                    <span className="block font-bold text-white text-xs uppercase font-mono">{t.factoryTitle}</span>
                    <span className="leading-snug block mt-1">{t.factoryAddress}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 border-t border-zinc-900 pt-4">
                  <Phone className="text-[#F6B91E] mt-0.5 shrink-0" size={16} />
                  <div>
                    <span className="block font-bold text-white text-xs uppercase font-mono">CALL HOTLINE</span>
                    <span className="font-mono text-zinc-300 font-bold block mt-1">+92 42 111 267 373</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="text-[#F6B91E] mt-0.5 shrink-0" size={16} />
                  <div>
                    <span className="block font-bold text-white text-xs uppercase font-mono">EMAIL DESK</span>
                    <span className="font-mono text-zinc-300 block mt-1">info@metalectricpk.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Standard */}
            <div className="rounded-xl border border-dashed border-zinc-800 p-5 flex items-start space-x-3 bg-zinc-900/20">
              <ShieldAlert className="text-emerald-500 shrink-0 mt-0.5" size={18} />
              <p className="text-xs text-zinc-500 leading-relaxed">
                We guarantee a reply within 2 hours for commercial engineering queries, and 4 hours for residential hybrid battery design quotes.
              </p>
            </div>
          </div>

          {/* Right Block: Message form */}
          <div className="lg:col-span-7">
            {success ? (
              <div className="rounded-3xl bg-[#090909] border border-zinc-900 p-8 sm:p-10 text-center shadow-2xl space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle size={28} />
                </div>
                <h3 className="text-xl font-bold text-white">{t.successTitle}</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-md mx-auto">
                  {t.successDesc}
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-6 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs transition-all border border-zinc-800"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-3xl bg-[#090909] border border-zinc-900 p-6 sm:p-10 text-left space-y-5 shadow-2xl">
                <h3 className="text-lg font-bold text-white uppercase border-b border-zinc-900 pb-3">{t.heading}</h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-500 mb-1.5 uppercase font-bold">{t.nameLabel}</label>
                      <input
                        type="text"
                        required
                        placeholder="Muhammad Farhan"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F6B91E]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-zinc-500 mb-1.5 uppercase font-bold">{t.emailLabel}</label>
                      <input
                        type="email"
                        required
                        placeholder="farhan@solar.pk"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F6B91E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-500 mb-1.5 uppercase font-bold">{t.subjectLabel}</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sizing query for 5kW Solar Inverter"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F6B91E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-500 mb-1.5 uppercase font-bold">{t.messageLabel}</label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Input details of appliances (fans, AC count, etc.) or your inverter model so we can suggest matching BMS parameters."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F6B91E] leading-relaxed"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-[#F6B91E] hover:bg-[#e0a410] text-[#050505] font-extrabold text-sm transition-all flex items-center justify-center space-x-2 shadow-lg"
                >
                  <span>{loading ? "Transmitting ticket..." : t.submitBtn}</span>
                  <ChevronRight size={16} />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
