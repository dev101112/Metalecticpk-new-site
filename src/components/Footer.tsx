import React, { useState } from "react";
import { AlphaAmpereLogo } from "./Logos";
import { 
  Phone, Mail, MapPin, Send, ShieldCheck, Clock, CheckCircle2,
  Facebook, Linkedin, Twitter, MessageCircle
} from "lucide-react";

interface FooterProps {
  setActivePage: (page: string) => void;
  lang: "EN" | "UR";
  settings: any;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage, lang, settings }) => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setNewsletterEmail("");
      setTimeout(() => setNewsletterSuccess(false), 5000);
    }
  };

  const navTo = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cInfo = settings?.contactInfo || {
    phone: "+92 42 111 267 373",
    email: "info@metalectricpk.com",
    officeAddress: "Block H-3, Johar Town, Lahore, Pakistan",
    factoryAddress: "Industrial Area, Sundar Industrial Estate, Lahore, Pakistan"
  };

  const t = {
    EN: {
      about: "ABOUT METALECTRIC",
      aboutDesc: "Pakistan's premier clean-energy lithium-ion battery design and manufacturing company. Engineering tomorrow's safe backups at Sundar Industrial Estate.",
      links: "QUICK LINKS",
      contact: "CONTACT HEADQUARTERS",
      newsletter: "ENGINEERING DISPATCH",
      newsletterDesc: "Get monthly technical battery datasheets, price indices, and backup sizing guidelines.",
      newsletterPlaceholder: "Enter engineer email address",
      newsletterBtn: "Subscribe",
      rights: "© 2026 Metalectric PK. All rights engineered.",
      privacy: "Privacy Policy",
      terms: "Manufacturing Terms",
      whatsAppText: "Chat with an Assembly Engineer"
    },
    UR: {
      about: "میٹالیکٹرک کے بارے میں",
      aboutDesc: "پاکستان میں متبادل توانائی کی فراہمی کا سب سے بڑا پلانٹ۔ جدید اسمبلنگ پلانٹ سندر انڈسٹریل اسٹیٹ، لاہور میں واقع ہے۔",
      links: "ضروری لنکس",
      contact: "ہیڈ کوارٹرز سے رابطہ",
      newsletter: "ٹیکنیکل نیوز لیٹر",
      newsletterDesc: "ماہانہ بنیادوں پر لیتھیم بیٹری کی قیمتوں اور ٹیکنیکل معلومات کی ای میل حاصل کریں۔",
      newsletterPlaceholder: "اپنی ای میل درج کریں",
      newsletterBtn: "سبسکرائب کریں",
      rights: "© 2026 میٹالیکٹرک پی کے۔ تمام حقوق محفوظ ہیں۔",
      privacy: "رازداری کی پالیسی",
      terms: "مینوفیکچرنگ شرائط",
      whatsAppText: "اسمبلی انجینئر سے واٹس ایپ پر بات کریں"
    }
  }[lang];

  return (
    <footer className="relative bg-[#020202] text-white border-t border-zinc-900 pt-16 pb-12" id="footer-section">
      
      {/* Footer Top Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
        
        {/* Col 1: Brand & Desc */}
        <div className="md:col-span-4 space-y-6 text-left">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navTo("home")}>
            <AlphaAmpereLogo size={42} />
            <div className="flex flex-col">
              <span className="font-sans font-black text-lg tracking-wider text-white">ALPHA AMPERE</span>
              <span className="text-[9px] text-[#F6B91E] tracking-widest uppercase font-mono font-bold">METALECTRIC PK</span>
            </div>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed">
            {t.aboutDesc}
          </p>

          <div className="flex items-center space-x-4">
            <a 
              href={settings?.socialLinks?.facebook || "#"} 
              target="_blank" 
              rel="noreferrer"
              className="w-9 h-9 rounded-lg bg-zinc-950 border border-zinc-900 flex items-center justify-center text-zinc-500 hover:text-[#F6B91E] hover:border-zinc-800 transition-all"
            >
              <Facebook size={16} />
            </a>
            <a 
              href={settings?.socialLinks?.linkedin || "#"} 
              target="_blank" 
              rel="noreferrer"
              className="w-9 h-9 rounded-lg bg-zinc-950 border border-zinc-900 flex items-center justify-center text-zinc-500 hover:text-[#F6B91E] hover:border-zinc-800 transition-all"
            >
              <Linkedin size={16} />
            </a>
            <a 
              href={settings?.socialLinks?.twitter || "#"} 
              target="_blank" 
              rel="noreferrer"
              className="w-9 h-9 rounded-lg bg-zinc-950 border border-zinc-900 flex items-center justify-center text-zinc-500 hover:text-[#F6B91E] hover:border-zinc-800 transition-all"
            >
              <Twitter size={16} />
            </a>
          </div>
        </div>

        {/* Col 2: Navigation Pathways */}
        <div className="md:col-span-2 space-y-4 text-left">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F6B91E]">
            {t.links}
          </h4>
          <ul className="space-y-2 text-sm text-zinc-500">
            <li>
              <button onClick={() => navTo("home")} className="hover:text-white transition-colors">
                Home Grid
              </button>
            </li>
            <li>
              <button onClick={() => navTo("products")} className="hover:text-white transition-colors">
                LFP Battery Catalog
              </button>
            </li>
            <li>
              <button onClick={() => navTo("solutions")} className="hover:text-white transition-colors">
                Sizing Solutions
              </button>
            </li>
            <li>
              <button onClick={() => navTo("quality")} className="hover:text-white transition-colors">
                Quality Standards
              </button>
            </li>
            <li>
              <button onClick={() => navTo("warranty")} className="hover:text-white transition-colors">
                Warranty Check
              </button>
            </li>
            <li>
              <button onClick={() => navTo("dealer")} className="hover:text-white transition-colors">
                Become a Dealer
              </button>
            </li>
            <li>
              <button onClick={() => navTo("careers")} className="hover:text-white transition-colors">
                Engineering Careers
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Contacts */}
        <div className="md:col-span-3 space-y-4 text-left text-sm text-zinc-500">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F6B91E]">
            {t.contact}
          </h4>
          <ul className="space-y-3">
            <li className="flex items-start space-x-2.5">
              <Phone size={16} className="text-[#F6B91E] mt-1 shrink-0" />
              <div>
                <span className="block text-[10px] uppercase font-mono text-zinc-600">CALL CENTER</span>
                <span className="text-zinc-300 font-mono font-bold">{cInfo.phone}</span>
              </div>
            </li>
            <li className="flex items-start space-x-2.5">
              <Mail size={16} className="text-[#F6B91E] mt-1 shrink-0" />
              <div>
                <span className="block text-[10px] uppercase font-mono text-zinc-600">EMAIL SUPPORT</span>
                <span className="text-zinc-300 font-mono">{cInfo.email}</span>
              </div>
            </li>
            <li className="flex items-start space-x-2.5">
              <MapPin size={16} className="text-[#F6B91E] mt-1 shrink-0" />
              <div>
                <span className="block text-[10px] uppercase font-mono text-zinc-600">HEAD OFFICE</span>
                <span className="text-zinc-400 leading-snug">{cInfo.officeAddress}</span>
              </div>
            </li>
            <li className="flex items-start space-x-2.5">
              <MapPin size={16} className="text-[#F6B91E] mt-1 shrink-0" />
              <div>
                <span className="block text-[10px] uppercase font-mono text-zinc-600">ASSEMBLY FACTORY</span>
                <span className="text-zinc-400 leading-snug">{cInfo.factoryAddress}</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Col 4: Newsletter & Verification badge */}
        <div className="md:col-span-3 space-y-4 text-left">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F6B91E]">
            {t.newsletter}
          </h4>
          <p className="text-xs text-zinc-500 leading-relaxed">
            {t.newsletterDesc}
          </p>

          <form onSubmit={handleNewsletter} className="flex flex-col space-y-2">
            <div className="relative">
              <input
                type="email"
                required
                placeholder={t.newsletterPlaceholder}
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full bg-[#090909] border border-zinc-900 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#F6B91E] font-mono"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-[#F6B91E] hover:bg-[#e0a410] text-[#050505] font-black rounded text-[10px] transition-all"
              >
                {t.newsletterBtn}
              </button>
            </div>
            {newsletterSuccess && (
              <p className="text-emerald-500 font-mono text-[10px] flex items-center space-x-1">
                <CheckCircle2 size={12} />
                <span>Subscribed successfully!</span>
              </p>
            )}
          </form>

          {/* Verification Badges */}
          <div className="border-t border-zinc-950 pt-4 flex items-center space-x-2 text-[10px] font-mono text-zinc-600">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>ISO 9001:2015 REGISTERED FACILITY</span>
          </div>

        </div>

      </div>

      {/* Map embed simulation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="w-full h-32 rounded-xl bg-[#080808] border border-zinc-900/50 p-4 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] bg-[size:10px_10px] opacity-20" />
          <div className="text-left relative z-10 mb-4 md:mb-0">
            <span className="text-[9px] font-mono text-[#F6B91E] font-bold uppercase block">SUNDAR INDUSTRIAL ESTATE ASSEMBLY FLOOR MAP</span>
            <span className="text-sm font-bold text-white block">Lahore Production HQ Connected Live</span>
            <p className="text-xs text-zinc-500 mt-1 leading-none">Coordinates: 31.2917° N, 74.1565° E • Sundar Industrial Estate • Lahore</p>
          </div>
          <div className="flex space-x-3 relative z-10 shrink-0">
            <span className="inline-flex items-center px-3 py-1.5 rounded bg-zinc-900 text-[10px] font-mono text-emerald-400 border border-emerald-950">
              <Clock size={12} className="mr-1.5 animate-spin" />
              FACTORY SHIFT B ONLINE
            </span>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-900/80 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600">
        <p className="mb-4 md:mb-0">
          {t.rights}
        </p>
        <div className="flex space-x-6">
          <button className="hover:text-zinc-400 transition-colors">
            {t.privacy}
          </button>
          <span>•</span>
          <button className="hover:text-zinc-400 transition-colors">
            {t.terms}
          </button>
        </div>
      </div>

      {/* Floating Sticky Smart WhatsApp Badge */}
      <a
        href={`https://wa.me/${settings?.whatsAppNumber || "923000673733"}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#128C7E] hover:bg-[#075e54] text-white px-4 py-3 rounded-full font-bold text-xs flex items-center space-x-2 shadow-2xl transition-all duration-300 hover:scale-105"
        title="WhatsApp Support"
      >
        <MessageCircle size={18} fill="currentColor" />
        <span className="hidden sm:inline font-sans">{t.whatsAppText}</span>
      </a>

    </footer>
  );
};
