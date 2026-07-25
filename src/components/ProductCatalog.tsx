import React, { useState } from "react";
import { Product } from "../types";
import { 
  Search, SlidersHorizontal, Scale, CheckCircle, Info, FileText, 
  ArrowRight, ShieldCheck, ShoppingCart, Heart, RefreshCw, X, ChevronRight, Zap
} from "lucide-react";

interface ProductCatalogProps {
  products: Product[];
  setActivePage: (page: string) => void;
  lang: "EN" | "UR";
  setSelectedProductForQuote: (product: Product | null) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  setActivePage,
  lang,
  setSelectedProductForQuote,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [voltageFilter, setVoltageFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Popular");
  
  // Interactive Comparison states
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Detail Modal states
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  const t = {
    EN: {
      title: "LFP ENERGY SYSTEMS",
      subtitle: "Automotive-Grade LiFePO₄ Battery Storage with Intelligent BMS, Engineered for 15+ Year Lifespans.",
      searchPlaceholder: "Search battery model or SKU...",
      categories: ["All", "Wall Mount Batteries", "Rack Batteries", "Portable Power", "Custom Battery Packs"],
      filters: "Filter Parameters",
      voltage: "Nominal Voltage",
      sort: "Sort By",
      compare: "Compare Systems",
      compareBtn: "Compare",
      compareDesc: "Select up to 3 battery models for deep specification analysis.",
      clearCompare: "Clear List",
      inStock: "In Stock - Dispatch Available",
      outOfStock: "Sold Out / Custom Order",
      viewSpecs: "Technical Datasheet",
      quoteBtn: "Build Custom Quote",
      warranty: "Warranty Term",
      cycles: "Cycle Life",
      weight: "Net Weight",
      capacity: "Capacity",
      applications: "Best Applications",
      downloads: "Documentation & Downloads",
      specs: "Technical Parameters",
      addToCompare: "Add to Compare",
      removeFromCompare: "Remove Compare"
    },
    UR: {
      title: "لیتھیم انرجی کیٹلاگ",
      subtitle: "جدید بی ایم ایس کے ساتھ لیتھیم آئرن فاسفیٹ (LiFePO4) بیٹریاں، جو پندرہ سال سے زائد لائف کے لیے ڈیزائن کی گئی ہیں۔",
      searchPlaceholder: "بیٹری ماڈل تلاش کریں...",
      categories: ["All", "Wall Mount Batteries", "Rack Batteries", "Portable Power", "Custom Battery Packs"],
      filters: "فلٹرز",
      voltage: "وولٹیج",
      sort: "ترتیب دیں",
      compare: "موازنہ کریں",
      compareBtn: "موازنہ کریں",
      compareDesc: "موازنہ کرنے کے لیے زیادہ سے زیادہ 3 بیٹریاں منتخب کریں۔",
      clearCompare: "لسٹ صاف کریں",
      inStock: "اسٹاک میں موجود ہے",
      outOfStock: "اسٹاک ختم / آرڈر پر تیار",
      viewSpecs: "ٹیکنیکل ڈیٹا شیٹ",
      quoteBtn: "کوٹ حاصل کریں",
      warranty: "وارنٹی",
      cycles: "سائیکلز لائف",
      weight: "وزن",
      capacity: "گنجائش",
      applications: "بہترین استعمال",
      downloads: "دستاویزات اور ڈاؤن لوڈز",
      specs: "ٹیکنیکل خصوصیات",
      addToCompare: "موازنہ میں شامل کریں",
      removeFromCompare: "موازنہ سے نکالیں"
    }
  }[lang];

  // Handler for Compare
  const handleToggleCompare = (product: Product) => {
    if (compareList.some((p) => p.id === product.id)) {
      setCompareList(compareList.filter((p) => p.id !== product.id));
    } else {
      if (compareList.length >= 3) {
        alert("You can compare a maximum of 3 products at a time.");
        return;
      }
      setCompareList([...compareList, product]);
    }
  };

  const handleInquire = (product: Product) => {
    setSelectedProductForQuote(product);
    setDetailProduct(null);
    setActivePage("get-quote");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Filter logic
  const filteredProducts = products.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "All" || p.category === selectedCategory || p.subcategory === selectedCategory;

    const matchesVoltage = 
      voltageFilter === "All" || p.voltage.includes(voltageFilter);

    return matchesSearch && matchesCategory && matchesVoltage;
  });

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "PriceAsc") return a.price - b.price;
    if (sortOption === "PriceDesc") return b.price - a.price;
    if (sortOption === "Capacity") return parseFloat(b.capacity) - parseFloat(a.capacity);
    return 0; // Popular / default
  });

  return (
    <section className="bg-[#050505] text-white py-16 min-h-screen relative" id="products-catalog-section">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-left mb-12">
          <span className="text-xs font-mono font-bold uppercase text-[#F6B91E] tracking-widest block mb-2">
            ENGINEERED LITHIUM SOLUTIONS
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            {t.title}
          </h1>
          <p className="text-zinc-400 mt-3 text-base sm:text-lg max-w-3xl leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex space-x-2 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-zinc-800 border-b border-zinc-900/80 mb-8">
          {t.categories.map((cat, idx) => {
            const actualCategory = cat === "All" ? "All" : cat;
            return (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-[#F6B91E] text-black"
                    : "bg-[#090909] border border-zinc-900 text-zinc-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Filter / Search Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
          {/* Search */}
          <div className="md:col-span-6 relative">
            <Search className="absolute left-3.5 top-3.5 text-zinc-500" size={16} />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#090909] border border-zinc-900 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#F6B91E]"
            />
          </div>

          {/* Voltage Filter */}
          <div className="md:col-span-3">
            <select
              value={voltageFilter}
              onChange={(e) => setVoltageFilter(e.target.value)}
              className="w-full bg-[#090909] border border-zinc-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#F6B91E]"
            >
              <option value="All">{lang === "EN" ? "All Voltages" : "تمام وولٹیج"}</option>
              <option value="48V">48V nominal systems</option>
              <option value="24V">24V nominal systems</option>
              <option value="12V">12V nominal systems</option>
            </select>
          </div>

          {/* Sort Option */}
          <div className="md:col-span-3">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full bg-[#090909] border border-zinc-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#F6B91E]"
            >
              <option value="Popular">{lang === "EN" ? "Most Popular" : "مشہور پروڈکٹس"}</option>
              <option value="PriceAsc">{lang === "EN" ? "Price: Low to High" : "قیمت: کم سے زیادہ"}</option>
              <option value="PriceDesc">{lang === "EN" ? "Price: High to Low" : "قیمت: زیادہ سے کم"}</option>
              <option value="Capacity">{lang === "EN" ? "Highest Capacity" : "سب سے زیادہ گنجائش"}</option>
            </select>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        {sortedProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-800 p-12 text-center text-zinc-500 font-mono">
            No energy storage systems match the filtered conditions.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {sortedProducts.map((p) => {
              const inCompare = compareList.some((cp) => cp.id === p.id);
              return (
                <div 
                  key={p.id}
                  className="rounded-2xl bg-[#090909] border border-zinc-900 overflow-hidden flex flex-col justify-between group hover:border-[#F6B91E]/40 transition-all duration-300 hover:shadow-[0_0_25px_rgba(246,185,30,0.03)]"
                >
                  
                  {/* Thumbnail and badges */}
                  <div className="h-52 overflow-hidden relative bg-zinc-950">
                    <img 
                      src={p.thumbnail} 
                      alt={p.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090909] to-transparent opacity-85" />
                    
                    <span className="absolute top-4 left-4 px-2.5 py-1 rounded bg-black/70 text-[9px] font-mono tracking-wider font-bold text-[#F6B91E] border border-zinc-800">
                      {p.sku}
                    </span>

                    {p.featured && (
                      <span className="absolute top-4 right-4 px-2.5 py-1 rounded bg-[#F6B91E] text-black font-mono text-[9px] font-bold">
                        FEATURED
                      </span>
                    )}

                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <span className="text-xs text-[#10B981] font-mono bg-[#10B981]/10 px-2 py-0.5 rounded border border-emerald-950">
                        {p.status === "In Stock" ? t.inStock : t.outOfStock}
                      </span>
                    </div>
                  </div>

                  {/* Body Copy */}
                  <div className="p-6 flex-grow text-left flex flex-col justify-between">
                    <div className="space-y-3">
                      <h3 className="text-lg font-black text-white group-hover:text-[#F6B91E] transition-colors line-clamp-1">
                        {p.name}
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                        {p.shortDescription}
                      </p>

                      {/* Micro specifications preview */}
                      <div className="grid grid-cols-2 gap-2 font-mono text-[10px] text-zinc-500 pt-2 border-t border-zinc-900/60">
                        <div>
                          <span>VOLTAGE:</span>
                          <span className="block text-zinc-300 font-bold">{p.voltage}</span>
                        </div>
                        <div>
                          <span>CAPACITY:</span>
                          <span className="block text-zinc-300 font-bold">{p.capacity}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-zinc-900/60 mt-4 flex flex-col space-y-3">
                      
                      {/* Pricing */}
                      <div className="flex justify-between items-baseline">
                        <div>
                          <span className="text-[10px] text-zinc-500 font-mono uppercase block leading-none">ESTIMATED ASSEMBLED PRICE</span>
                          <span className="text-xl font-mono font-black text-white">
                            Rs. {p.price.toLocaleString()}
                          </span>
                        </div>
                        <button
                          onClick={() => handleToggleCompare(p)}
                          className={`flex items-center space-x-1 text-[10px] font-mono font-bold transition-all px-2.5 py-1 rounded border ${
                            inCompare 
                              ? "border-amber-500 bg-amber-500/10 text-[#F6B91E]" 
                              : "border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-700"
                          }`}
                        >
                          <Scale size={11} />
                          <span>{inCompare ? t.removeFromCompare : t.addToCompare}</span>
                        </button>
                      </div>

                      {/* Grid Action buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setDetailProduct(p)}
                          className="py-2.5 rounded-lg border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/40 text-xs font-bold text-zinc-300 transition-all flex items-center justify-center space-x-1"
                        >
                          <Info size={13} />
                          <span>{t.viewSpecs}</span>
                        </button>
                        <button
                          onClick={() => handleInquire(p)}
                          className="py-2.5 rounded-lg bg-[#F6B91E] hover:bg-[#e0a410] text-black text-xs font-black transition-all flex items-center justify-center space-x-1"
                        >
                          <Zap size={13} fill="currentColor" />
                          <span>{t.quoteBtn}</span>
                        </button>
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* FLOATING COMPARE BAR QUEUE */}
        {compareList.length > 0 && (
          <div className="fixed bottom-6 left-6 right-6 lg:left-auto lg:right-12 z-40 max-w-sm rounded-2xl bg-zinc-950 border border-zinc-800 p-4 shadow-2xl backdrop-blur-md flex flex-col space-y-3">
            <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
              <span className="text-xs font-mono font-bold text-white uppercase flex items-center">
                <Scale size={14} className="text-[#F6B91E] mr-1.5" />
                {t.compare} ({compareList.length}/3)
              </span>
              <button 
                onClick={() => setCompareList([])} 
                className="text-[10px] font-mono text-zinc-500 hover:text-white"
              >
                {t.clearCompare}
              </button>
            </div>
            
            <div className="flex space-x-2">
              {compareList.map((cp) => (
                <div key={cp.id} className="relative w-14 h-14 rounded-lg overflow-hidden border border-zinc-800 bg-[#090909]">
                  <img src={cp.thumbnail} alt="" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => handleToggleCompare(cp)}
                    className="absolute -top-1 -right-1 bg-red-600 rounded-full p-0.5 text-white hover:bg-red-500"
                  >
                    <X size={10} />
                  </button>
                </div>
              ))}
              {compareList.length < 3 && (
                <div className="w-14 h-14 rounded-lg border border-dashed border-zinc-800 flex items-center justify-center text-zinc-700">
                  +
                </div>
              )}
            </div>

            <button
              onClick={() => setShowCompareModal(true)}
              className="w-full py-2 rounded-lg bg-[#F6B91E] hover:bg-[#e0a410] text-black font-bold text-xs transition-all flex items-center justify-center space-x-1"
            >
              <span>View Side-by-Side Analysis</span>
              <ArrowRight size={13} />
            </button>
          </div>
        )}

        {/* DYNAMIC SIDE-BY-SIDE COMPARE MODAL */}
        {showCompareModal && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#050505] border border-zinc-800 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 relative">
              
              <button 
                onClick={() => setShowCompareModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full border border-zinc-800 text-zinc-500 hover:text-white"
              >
                <X size={18} />
              </button>

              <div className="text-left mb-6 border-b border-zinc-900 pb-4">
                <span className="text-xs font-mono font-bold text-[#F6B91E] uppercase">DEEP TELEMETRY COMPARISON</span>
                <h2 className="text-2xl font-black text-white">System Specification Board</h2>
              </div>

              {/* Grid Matrix of Products */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
                {/* Column 0: Label Column */}
                <div className="hidden md:block space-y-6 pt-24 font-mono text-xs text-zinc-500 border-r border-zinc-900 pr-4">
                  <div>SKU CODE</div>
                  <div>ENERGY CAPACITY</div>
                  <div>VOLTAGE BAND</div>
                  <div>NET WEIGHT</div>
                  <div>DIMENSIONS</div>
                  <div>CYCLE WARRANTY</div>
                  <div>CELL CONFIGURATION</div>
                  <div>STANDARD DISCHARGE</div>
                </div>

                {/* Compare items */}
                {compareList.map((cp) => (
                  <div key={cp.id} className="rounded-xl bg-[#090909] border border-zinc-900 p-4 space-y-4">
                    <div className="h-32 rounded-lg overflow-hidden mb-2">
                      <img src={cp.thumbnail} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white">{cp.name}</h3>
                      <span className="text-[10px] text-zinc-500 font-mono block mt-1">Rs. {cp.price.toLocaleString()}</span>
                    </div>

                    <div className="space-y-4 pt-2 border-t border-zinc-900/80 text-xs text-zinc-300">
                      <div>
                        <span className="block text-[8px] font-mono text-zinc-600 uppercase md:hidden">SKU</span>
                        <span className="font-mono text-[10px] text-[#F6B91E] font-bold">{cp.sku}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] font-mono text-zinc-600 uppercase md:hidden">ENERGY</span>
                        <span>{cp.capacity}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] font-mono text-zinc-600 uppercase md:hidden">VOLTAGE</span>
                        <span>{cp.voltage}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] font-mono text-zinc-600 uppercase md:hidden">WEIGHT</span>
                        <span>{cp.weight}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] font-mono text-zinc-600 uppercase md:hidden">DIMENSIONS</span>
                        <span className="font-mono text-[10px]">{cp.dimensions}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] font-mono text-zinc-600 uppercase md:hidden">WARRANTY</span>
                        <span className="text-emerald-500 font-bold">{cp.warranty}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] font-mono text-zinc-600 uppercase md:hidden">CELL TYPE</span>
                        <span className="text-[10px]">{cp.specifications.find(s=>s.label.includes("Chemistry"))?.value || "LiFePO4"}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] font-mono text-zinc-600 uppercase md:hidden">MAX DISCHARGE</span>
                        <span className="text-[10px]">{cp.specifications.find(s=>s.label.includes("Max Discharge"))?.value || "100A"}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleInquire(cp)}
                      className="w-full py-2 rounded-lg bg-[#F6B91E] text-black font-extrabold text-xs mt-4 flex items-center justify-center space-x-1"
                    >
                      <Zap size={12} fill="currentColor" />
                      <span>Select & Build Quote</span>
                    </button>
                  </div>
                ))}

                {/* Fill empty spots */}
                {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                  <div key={i} className="hidden md:flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-900 p-8 h-full min-h-[400px]">
                    <span className="text-zinc-700 text-3xl font-light mb-2">+</span>
                    <span className="text-xs text-zinc-600 font-mono">Empty slot</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* DETAILED SINGLE PRODUCT SPECS DRAWER MODAL */}
        {detailProduct && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#050505] border border-zinc-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 relative text-left">
              
              <button 
                onClick={() => setDetailProduct(null)}
                className="absolute top-4 right-4 p-2 rounded-full border border-zinc-800 text-zinc-500 hover:text-white"
              >
                <X size={18} />
              </button>

              <div className="flex items-center space-x-3 text-xs font-mono font-bold text-[#F6B91E] uppercase mb-3">
                <span>{detailProduct.sku}</span>
                <span>•</span>
                <span>{detailProduct.category}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase mb-4">{detailProduct.name}</h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">{detailProduct.longDescription}</p>

              {/* Spec list and Applications grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F6B91E] border-b border-zinc-900 pb-2 mb-3">
                    {t.specs}
                  </h4>
                  <ul className="divide-y divide-zinc-950 text-xs font-mono">
                    <li className="py-2 flex justify-between">
                      <span className="text-zinc-500">NOMINAL ENERGY:</span>
                      <span className="text-white font-bold">{detailProduct.capacity}</span>
                    </li>
                    <li className="py-2 flex justify-between">
                      <span className="text-zinc-500">NOMINAL VOLTAGE:</span>
                      <span className="text-white font-bold">{detailProduct.voltage}</span>
                    </li>
                    <li className="py-2 flex justify-between">
                      <span className="text-zinc-500">NET WEIGHT:</span>
                      <span className="text-white font-bold">{detailProduct.weight}</span>
                    </li>
                    <li className="py-2 flex justify-between">
                      <span className="text-zinc-500">DIMENSIONS:</span>
                      <span className="text-white font-bold">{detailProduct.dimensions}</span>
                    </li>
                    <li className="py-2 flex justify-between">
                      <span className="text-zinc-500">WARRANTY CARD:</span>
                      <span className="text-emerald-500 font-bold">{detailProduct.warranty}</span>
                    </li>
                    {detailProduct.specifications.slice(0, 4).map((spec, idx) => (
                      <li key={idx} className="py-2 flex justify-between">
                        <span className="text-zinc-500 uppercase">{spec.label}:</span>
                        <span className="text-white font-bold text-right">{spec.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F6B91E] border-b border-zinc-900 pb-2 mb-3">
                      {t.applications}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {detailProduct.applications.map((app, idx) => (
                        <span key={idx} className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                          ⚡ {app}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F6B91E] border-b border-zinc-900 pb-2 mb-3">
                      {t.downloads}
                    </h4>
                    <div className="space-y-2">
                      {detailProduct.downloads.map((dl, idx) => (
                        <a
                          key={idx}
                          href={dl.url}
                          className="flex items-center space-x-2 p-2.5 rounded-lg border border-zinc-900 hover:border-zinc-800 bg-[#090909] text-xs font-mono text-zinc-400 hover:text-white transition-all"
                        >
                          <FileText size={14} className="text-[#F6B91E]" />
                          <span>{dl.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer action */}
              <div className="border-t border-zinc-900 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <span className="text-[10px] text-zinc-500 font-mono uppercase block">Estimated cost:</span>
                  <span className="text-xl font-mono font-black text-white">Rs. {detailProduct.price.toLocaleString()}</span>
                </div>
                <div className="flex space-x-3 w-full sm:w-auto">
                  <button
                    onClick={() => handleToggleCompare(detailProduct)}
                    className="flex-1 sm:flex-none px-6 py-3 rounded-lg border border-zinc-850 hover:border-zinc-700 text-xs font-bold text-zinc-300 transition-all flex items-center justify-center space-x-1.5"
                  >
                    <Scale size={14} />
                    <span>{compareList.some(c=>c.id===detailProduct.id) ? "Remove compare" : "Compare cell metrics"}</span>
                  </button>
                  <button
                    onClick={() => handleInquire(detailProduct)}
                    className="flex-1 sm:flex-none px-8 py-3 rounded-lg bg-[#F6B91E] hover:bg-[#e0a410] text-black font-extrabold text-xs transition-all flex items-center justify-center space-x-1.5 shadow-lg"
                  >
                    <Zap size={14} fill="currentColor" />
                    <span>{t.quoteBtn}</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
