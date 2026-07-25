import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { HomeDetails } from "./components/HomeDetails";
import { ProductCatalog } from "./components/ProductCatalog";
import { QuoteForm } from "./components/QuoteForm";
import { DealerForm } from "./components/DealerForm";
import { Solutions } from "./components/Solutions";
import { AboutSupport } from "./components/AboutSupport";
import { AdminPanel } from "./components/AdminPanel";
import { ContactPage } from "./components/ContactPage";
import { CareersPage } from "./components/CareersPage";
import { ProjectsPage } from "./components/ProjectsPage";
import { BatterySizingCalculator } from "./components/BatterySizingCalculator";
import { Footer } from "./components/Footer";
import { Product, BlogPost, SiteSettings } from "./types";
import { X, Check, Zap, Cpu, Settings } from "lucide-react";

export default function App() {
  const [lang, setLang] = useState<"EN" | "UR">("EN");
  const [activePage, setActivePage] = useState<string>("home");
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Database collections loaded from Express API
  const [products, setProducts] = useState<Product[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    contactInfo: {
      phone: "+92 42 111 267 373",
      email: "info@metalectricpk.com",
      officeAddress: "Block H-3, Johar Town, Lahore, Pakistan",
      factoryAddress: "Industrial Area, Sundar Industrial Estate, Lahore, Pakistan"
    },
    whatsAppNumber: "+923007654321"
  });

  // Selected battery for spec modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Initialize data collections
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const pRes = await fetch("/api/products");
        if (pRes.ok) {
          const pData = await pRes.json();
          setProducts(pData);
        }

        const bRes = await fetch("/api/blogs");
        if (bRes.ok) {
          const bData = await bRes.json();
          setBlogs(bData);
        }

        const sRes = await fetch("/api/settings");
        if (sRes.ok) {
          const sData = await sRes.json();
          setSettings(sData);
        }
      } catch (err) {
        console.error("Error connecting with Metalectric API services", err);
      }
    };
    loadInitialData();
  }, []);

  const handlePageChange = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#F6B91E] selection:text-[#050505] flex flex-col justify-between">
      
      {/* GLOBAL HIGH-TECH DECORATIONS */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F6B91E]/30 to-transparent z-50 pointer-events-none" />

      {/* NAVBAR */}
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        activePage={activePage} 
        setActivePage={handlePageChange} 
        setIsAdminOpen={setIsAdminOpen}
      />

      {/* BODY ROUTER */}
      <main className="flex-grow">
        {activePage === "home" && (
          <>
            <Hero lang={lang} setActivePage={handlePageChange} />
            <HomeDetails lang={lang} setActivePage={handlePageChange} blogs={blogs} />
          </>
        )}

        {activePage === "calculator" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <BatterySizingCalculator lang={lang} setActivePage={handlePageChange} />
          </div>
        )}

        {activePage === "products" && (
          <ProductCatalog 
            lang={lang} 
            products={products} 
            setSelectedProduct={setSelectedProduct} 
          />
        )}

        {activePage === "get-quote" && (
          <QuoteForm lang={lang} products={products} />
        )}

        {activePage === "dealers" && (
          <DealerForm lang={lang} />
        )}

        {activePage === "solutions" && (
          <Solutions lang={lang} setActivePage={handlePageChange} />
        )}

        {activePage === "support" && (
          <AboutSupport lang={lang} setActivePage={handlePageChange} />
        )}

        {activePage === "contact" && (
          <ContactPage lang={lang} />
        )}

        {activePage === "careers" && (
          <CareersPage lang={lang} />
        )}

        {activePage === "projects" && (
          <ProjectsPage lang={lang} setActivePage={handlePageChange} />
        )}
      </main>

      {/* FOOTER */}
      <Footer 
        lang={lang} 
        setActivePage={handlePageChange} 
        setIsAdminOpen={setIsAdminOpen} 
        settings={settings}
      />

      {/* ADMIN PANEL CONSOLE OVERLAY MODAL */}
      {isAdminOpen && (
        <AdminPanel
          lang={lang}
          onClose={() => setIsAdminOpen(false)}
          products={products}
          setProducts={setProducts}
          blogs={blogs}
          setBlogs={setBlogs}
          settings={settings}
          setSettings={setSettings}
        />
      )}

      {/* DYNAMIC PRODUCT DETAILS / SPEC OVERLAY MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#090909] border border-zinc-900 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl relative text-left">
            
            {/* Close button */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-zinc-950 border border-zinc-900 text-zinc-500 hover:text-white transition-all z-10"
            >
              <X size={16} />
            </button>

            {/* Header / Meta */}
            <div className="grid grid-cols-1 md:grid-cols-5 border-b border-zinc-900">
              <div className="md:col-span-2 bg-[#050505] p-6 flex flex-col justify-center items-center border-r border-zinc-900">
                <img 
                  src={selectedProduct.thumbnail} 
                  alt={selectedProduct.name} 
                  className="w-40 h-40 object-contain drop-shadow-[0_0_15px_rgba(246,185,30,0.15)]"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="md:col-span-3 p-6 sm:p-8 space-y-4">
                <span className="text-[9px] font-mono text-[#F6B91E] border border-[#F6B91E]/20 bg-[#F6B91E]/2 px-2 py-0.5 rounded font-bold uppercase tracking-widest">
                  {selectedProduct.category}
                </span>

                <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">{selectedProduct.name}</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">{selectedProduct.shortDescription}</p>

                <div className="grid grid-cols-2 gap-4 pt-2 font-mono text-xs text-zinc-500">
                  <div>
                    <span className="block text-[#F6B91E] uppercase font-bold text-[10px]">Voltage rating</span>
                    <span className="text-white block font-sans font-bold text-sm mt-0.5">{selectedProduct.voltage}</span>
                  </div>
                  <div>
                    <span className="block text-[#F6B91E] uppercase font-bold text-[10px]">Storage Capacity</span>
                    <span className="text-white block font-sans font-bold text-sm mt-0.5">{selectedProduct.capacity}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications Tab details */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold">Comprehensive Specs Sheet</span>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">{selectedProduct.longDescription}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-900 font-mono text-xs">
                <div className="space-y-2.5">
                  <div className="flex justify-between border-b border-zinc-950 pb-1">
                    <span className="text-zinc-600">PRODUCT SKU</span>
                    <span className="text-white font-bold">{selectedProduct.sku}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-950 pb-1">
                    <span className="text-zinc-600">WARRANTY RATING</span>
                    <span className="text-[#F6B91E] font-bold">{selectedProduct.warranty}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-950 pb-1">
                    <span className="text-zinc-600">DISPATCH WEIGHT</span>
                    <span className="text-white">{selectedProduct.weight}</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="flex justify-between border-b border-zinc-950 pb-1">
                    <span className="text-zinc-600">BMS COMMUNICATION</span>
                    <span className="text-emerald-400 font-bold">CAN / RS485</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-950 pb-1">
                    <span className="text-zinc-600">CELL MATCHING</span>
                    <span className="text-white">Active Balance (0.1mΩ)</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-950 pb-1">
                    <span className="text-zinc-600">FACTORY ORIGIN</span>
                    <span className="text-white">Sundar, Lahore</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-900 flex justify-between items-center flex-wrap gap-4">
                <div className="font-mono text-sm">
                  <span className="text-zinc-500 block text-[9px] uppercase">Direct Factory Cost</span>
                  <span className="text-white font-black text-lg sm:text-xl">Rs. {selectedProduct.price.toLocaleString()}</span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedProduct(null);
                      handlePageChange("get-quote");
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#F6B91E] hover:bg-[#e0a410] text-black font-extrabold text-xs transition-all flex items-center space-x-1 shadow-lg"
                  >
                    <Zap size={13} fill="currentColor" />
                    <span>Calculate Custom Sizing</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
