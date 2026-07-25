import React, { useState } from "react";
import { AlphaAmpereLogo } from "./Logos";
import { Menu, X, Globe, ChevronDown, Zap } from "lucide-react";

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  lang: "EN" | "UR";
  setLang: (lang: "EN" | "UR") => void;
  onOpenAdmin: () => void;
}

export const translations = {
  EN: {
    home: "Home",
    products: "Products",
    solutions: "Solutions",
    industries: "Industries",
    about: "About Us",
    quality: "Quality Testing",
    downloads: "Downloads",
    support: "Support & FAQs",
    warranty: "Warranty",
    contact: "Contact",
    dealer: "Dealers",
    careers: "Careers",
    projects: "Installations",
    getQuote: "Get Quote",
    admin: "Admin Console",
    tagline: "Powering Pakistan with Next-Gen Lithium Energy",
    exploreBtn: "Explore Systems",
    quoteBtn: "Get Quote",
    becomeDealer: "Become Dealer",
    backToHome: "Back to Home"
  },
  UR: {
    home: "ہوم",
    products: "پروڈکٹس",
    solutions: "حل (سلوشنز)",
    industries: "انڈسٹریز",
    about: "ہمارے بارے میں",
    quality: "کوالٹی ٹیسٹنگ",
    downloads: "ڈاؤن لوڈز",
    support: "سپورٹ اور سوالات",
    warranty: "وارنٹی",
    contact: "رابطہ کریں",
    dealer: "ڈیلرز",
    careers: "ملازمتیں",
    projects: "تنصیبات",
    getQuote: "کوٹیشن حاصل کریں",
    admin: "ایڈمن پینل",
    tagline: "پاکستان کو اگلی نسل کی لیتھیم انرجی سے بااختیار بنانا",
    exploreBtn: "مصنوعات دیکھیں",
    quoteBtn: "کوٹ حاصل کریں",
    becomeDealer: "ڈیلر بنیں",
    backToHome: "ہوم پیج پر واپس جائیں"
  }
};

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  lang,
  setLang,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const t = translations[lang];

  const handleNav = (page: string) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    { id: "home", label: t.home },
    { id: "calculator", label: lang === "EN" ? "Calculator" : "کیلکولیٹر" },
    { id: "products", label: t.products },
    { id: "solutions", label: t.solutions },
    { id: "industries", label: t.industries },
    { id: "quality", label: t.quality },
    { id: "support", label: t.support },
    { id: "contact", label: t.contact },
  ];

  const secondaryItems = [
    { id: "about", label: t.about },
    { id: "warranty", label: t.warranty },
    { id: "dealer", label: t.dealer },
    { id: "careers", label: t.careers },
    { id: "projects", label: t.projects },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 bg-[#050505]/80 backdrop-blur-xl border-b border-[#242424]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => handleNav("home")} 
          className="flex items-center space-x-3 cursor-pointer group"
          id="nav-brand-logo"
        >
          <AlphaAmpereLogo size={42} className="group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="font-sans font-black text-xl tracking-wider text-white">
              ALPHA AMPERE
            </span>
            <span className="text-[10px] text-[#F6B91E] tracking-widest uppercase font-mono font-bold">
              METALECTRIC PK
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-1" id="desktop-navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:text-white ${
                activePage === item.id
                  ? "text-[#F6B91E] bg-[#242424]/40"
                  : "text-[#BFC5C9]"
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-[#BFC5C9] hover:text-white transition-all rounded-md"
            >
              <span>{lang === "EN" ? "More" : "مزید"}</span>
              <ChevronDown size={14} className={`transform transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl bg-[#090909] border border-[#242424] shadow-2xl p-2 z-50">
                {secondaryItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-all ${
                      activePage === item.id
                        ? "text-[#F6B91E] bg-[#242424]"
                        : "text-[#BFC5C9] hover:text-white hover:bg-[#242424]/40"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Actions (Language, Admin, Quote Button) */}
        <div className="hidden md:flex items-center space-x-4">
          
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === "EN" ? "UR" : "EN")}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-[#242424] hover:border-[#F6B91E] text-[#BFC5C9] hover:text-white text-xs font-mono transition-all"
            title="Toggle Language"
          >
            <Globe size={14} className="text-[#F6B91E]" />
            <span>{lang}</span>
          </button>

          {/* Admin link */}
          <button
            onClick={onOpenAdmin}
            className={`px-3 py-1.5 rounded-full border border-dashed transition-all text-xs font-mono ${
              activePage === "admin"
                ? "border-[#F6B91E] text-[#F6B91E] bg-[#F6B91E]/5"
                : "border-[#242424] text-[#BFC5C9] hover:text-white hover:border-[#F6B91E]"
            }`}
          >
            {t.admin}
          </button>

          {/* Become a dealer */}
          <button
            onClick={() => handleNav("dealer")}
            className="text-xs font-medium text-[#BFC5C9] hover:text-[#F6B91E] transition-all"
          >
            {t.becomeDealer}
          </button>

          {/* Get Quote Action Button */}
          <button
            onClick={() => handleNav("get-quote")}
            className="relative overflow-hidden px-5 py-2.5 rounded-lg bg-[#F6B91E] hover:bg-[#e0a410] text-[#050505] font-bold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(246,185,30,0.2)] hover:shadow-[0_0_30px_rgba(246,185,30,0.4)] flex items-center space-x-1.5"
            id="nav-quote-btn"
          >
            <Zap size={15} fill="currentColor" />
            <span>{t.getQuote}</span>
          </button>
        </div>

        {/* Mobile menu and Language toggler */}
        <div className="flex items-center space-x-2 lg:hidden">
          <button
            onClick={() => setLang(lang === "EN" ? "UR" : "EN")}
            className="p-2 rounded-lg border border-[#242424] text-[#BFC5C9]"
          >
            <Globe size={16} />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-[#242424] text-[#BFC5C9] hover:text-white"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-[#050505] border-b border-[#242424] py-6 px-4 space-y-4 shadow-2xl max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activePage === item.id
                    ? "text-[#F6B91E] bg-[#242424]"
                    : "text-[#BFC5C9] bg-[#090909]/60 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="border-t border-[#242424] pt-4">
            <p className="text-xs font-mono uppercase text-[#666] mb-2 px-2">More Resources</p>
            <div className="grid grid-cols-2 gap-2">
              {secondaryItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`text-left px-4 py-2 rounded-lg text-xs transition-all ${
                    activePage === item.id
                      ? "text-[#F6B91E] bg-[#242424]"
                      : "text-[#BFC5C9] hover:text-white hover:bg-[#242424]/40"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-[#242424] pt-4 space-y-3">
            <button
              onClick={onOpenAdmin}
              className="w-full py-3 rounded-lg bg-[#242424]/50 border border-[#242424] text-center text-sm font-mono text-white"
            >
              🔐 {t.admin}
            </button>
            <button
              onClick={() => handleNav("get-quote")}
              className="w-full py-3 rounded-lg bg-[#F6B91E] text-[#050505] font-bold text-center text-sm flex items-center justify-center space-x-2 shadow-lg"
            >
              <Zap size={16} fill="currentColor" />
              <span>{t.getQuote}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
