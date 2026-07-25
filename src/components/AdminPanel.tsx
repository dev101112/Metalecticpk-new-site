import React, { useState, useEffect } from "react";
import { Product, BlogPost, QuoteRequest, DealerApplication, ContactMessage, SiteSettings } from "../types";
import { 
  Lock, Key, ShieldCheck, LayoutDashboard, Database, FileText, 
  MessageSquare, UserCheck, Settings, LogOut, Plus, Trash2, Edit2, 
  Check, X, Zap, RefreshCw, FileCheck, PhoneCall, AlertCircle
} from "lucide-react";

interface AdminPanelProps {
  lang: "EN" | "UR";
  onClose: () => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  blogs: BlogPost[];
  setBlogs: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  settings: SiteSettings;
  setSettings: (settings: SiteSettings) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  lang,
  onClose,
  products,
  setProducts,
  blogs,
  setBlogs,
  settings,
  setSettings,
}) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("admin-token"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // Active sub-section
  const [subTab, setSubTab] = useState<"dashboard" | "products" | "blogs" | "quotes" | "dealers" | "messages" | "settings">("dashboard");

  // Collections state
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [dealers, setDealers] = useState<DealerApplication[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  // Editing/Creating item state
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [editingBlog, setEditingBlog] = useState<Partial<BlogPost> | null>(null);

  // Refresh lists helper
  const fetchData = async () => {
    try {
      const pRes = await fetch("/api/products");
      if (pRes.ok) setProducts(await pRes.json());

      const bRes = await fetch("/api/blogs");
      if (bRes.ok) setBlogs(await bRes.json());

      const qRes = await fetch("/api/quotes");
      if (qRes.ok) setQuotes(await qRes.json());

      const dRes = await fetch("/api/dealers");
      if (dRes.ok) setDealers(await dRes.json());

      const mRes = await fetch("/api/messages");
      if (mRes.ok) setMessages(await mRes.json());
    } catch (err) {
      console.error("Error loading admin data collections", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem("admin-token", data.token);
        setToken(data.token);
      } else {
        setLoginError(data.message || "Invalid credential parameters");
      }
    } catch (err) {
      console.error("Login err", err);
      // Mock fallback if offline/cors
      if (email === "admin@metalectricpk.com" && password === "admin") {
        localStorage.setItem("admin-token", "mock-token");
        setToken("mock-token");
      } else {
        setLoginError("Credentials authentication failed.");
      }
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin-token");
    setToken(null);
  };

  // Products CRUD
  const saveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const url = editingProduct.id ? `/api/products/${editingProduct.id}` : "/api/products";
    const method = editingProduct.id ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProduct)
      });
      if (res.ok) {
        setEditingProduct(null);
        fetchData();
        alert("Product entry updated successfully.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to remove this battery model?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Blogs CRUD
  const saveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;

    const url = editingBlog.id ? `/api/blogs/${editingBlog.id}` : "/api/blogs";
    const method = editingBlog.id ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingBlog)
      });
      if (res.ok) {
        setEditingBlog(null);
        fetchData();
        alert("Blog article updated successfully.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBlog = async (id: string) => {
    if (!confirm("Remove this blog post permanently?")) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Quote & Dealer actions
  const updateQuoteStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/quotes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const updateDealerStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/dealers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const updateMessageStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Settings Save
  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        alert("Global site contacts modified successfully on server.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050505]/98 backdrop-blur-md flex items-center justify-center p-4">
      
      {!token ? (
        /* LOGIN BLOCK */
        <div className="bg-[#090909] border-2 border-zinc-900 rounded-2xl w-full max-w-md p-8 shadow-2xl space-y-6 text-left relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-[#F6B91E]/3 rounded-full blur-2xl" />
          
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-1.5 rounded-full border border-zinc-800 text-zinc-500 hover:text-white"
          >
            <X size={16} />
          </button>

          <div className="space-y-1">
            <span className="text-[10px] font-mono text-[#F6B91E] font-bold tracking-widest uppercase block">SECURE SYSTEM CONSOLE</span>
            <h2 className="text-xl font-black text-white">Engineering Login</h2>
            <p className="text-xs text-zinc-500">Provide credentials registered in Sundar R&D databases.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 pt-4">
            <div>
              <label className="block text-xs font-mono text-zinc-500 mb-1.5">EMAIL REGISTERED</label>
              <input
                type="email"
                required
                placeholder="admin@metalectricpk.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#F6B91E] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-500 mb-1.5 font-bold">PASSWORD (DEMO IS "admin")</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#F6B91E] font-mono"
              />
            </div>

            {loginError && (
              <p className="text-red-500 text-xs font-mono flex items-center space-x-1">
                <AlertCircle size={14} />
                <span>{loginError}</span>
              </p>
            )}

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3 rounded-xl bg-[#F6B91E] hover:bg-[#e0a410] text-black font-extrabold text-xs transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Lock size={14} />
              <span>{loggingIn ? "Authenticating security..." : "Decrypt & Enter"}</span>
            </button>
          </form>
        </div>
      ) : (
        /* MAIN CMS DASHBOARD */
        <div className="bg-[#050505] border border-zinc-800 rounded-3xl w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden text-left shadow-2xl">
          
          {/* Dashboard Header Bar */}
          <div className="px-6 py-4 bg-zinc-950 border-b border-zinc-900 flex justify-between items-center shrink-0">
            <div className="flex items-center space-x-3">
              <span className="px-2.5 py-1 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-900 font-mono text-[9px] font-bold">
                ROOT AUTHORIZED
              </span>
              <h2 className="text-sm font-black text-white font-mono">METALECTRIC CMS CONSOLE v2.4</h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg border border-zinc-900 hover:border-red-900 text-zinc-500 hover:text-red-500 transition-all text-xs flex items-center space-x-1.5"
                title="Log Out Security Card"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline font-mono">Sign Out</span>
              </button>
              <button 
                onClick={onClose} 
                className="p-1.5 rounded-full border border-zinc-800 text-zinc-500 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Core Body: Left Sidebar + Right Content Area */}
          <div className="flex-grow flex overflow-hidden">
            
            {/* Sidebar nav */}
            <nav className="w-56 bg-zinc-950/40 border-r border-zinc-900 p-4 space-y-1.5 shrink-0 hidden md:block">
              <button
                onClick={() => { setSubTab("dashboard"); setEditingProduct(null); setEditingBlog(null); }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-2.5 ${subTab === "dashboard" ? "bg-[#F6B91E] text-black" : "text-zinc-400 hover:text-white hover:bg-[#242424]/30"}`}
              >
                <LayoutDashboard size={14} />
                <span>Overview Stats</span>
              </button>
              <button
                onClick={() => { setSubTab("products"); setEditingProduct(null); }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-2.5 ${subTab === "products" ? "bg-[#F6B91E] text-black" : "text-zinc-400 hover:text-white hover:bg-[#242424]/30"}`}
              >
                <Database size={14} />
                <span>Battery Catalog</span>
              </button>
              <button
                onClick={() => { setSubTab("blogs"); setEditingBlog(null); }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-2.5 ${subTab === "blogs" ? "bg-[#F6B91E] text-black" : "text-zinc-400 hover:text-white hover:bg-[#242424]/30"}`}
              >
                <FileText size={14} />
                <span>Blog Articles</span>
              </button>
              <button
                onClick={() => { setSubTab("quotes"); setEditingProduct(null); }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-2.5 ${subTab === "quotes" ? "bg-[#F6B91E] text-black" : "text-zinc-400 hover:text-white hover:bg-[#242424]/30"}`}
              >
                <Zap size={14} />
                <span>RFQ Inquiries</span>
                {quotes.filter(q=>q.status==="Pending").length > 0 && (
                  <span className="bg-red-500 text-white rounded-full text-[9px] px-1.5 py-0.5 ml-auto">
                    {quotes.filter(q=>q.status==="Pending").length}
                  </span>
                )}
              </button>
              <button
                onClick={() => { setSubTab("dealers"); setEditingProduct(null); }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-2.5 ${subTab === "dealers" ? "bg-[#F6B91E] text-black" : "text-zinc-400 hover:text-white hover:bg-[#242424]/30"}`}
              >
                <UserCheck size={14} />
                <span>Dealer Profiles</span>
                {dealers.filter(d=>d.status==="Pending").length > 0 && (
                  <span className="bg-amber-500 text-black rounded-full text-[9px] px-1.5 py-0.5 ml-auto font-bold">
                    {dealers.filter(d=>d.status==="Pending").length}
                  </span>
                )}
              </button>
              <button
                onClick={() => { setSubTab("messages"); setEditingProduct(null); }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-2.5 ${subTab === "messages" ? "bg-[#F6B91E] text-black" : "text-zinc-400 hover:text-white hover:bg-[#242424]/30"}`}
              >
                <MessageSquare size={14} />
                <span>Contact Inbox</span>
              </button>
              <button
                onClick={() => { setSubTab("settings"); setEditingProduct(null); }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-2.5 ${subTab === "settings" ? "bg-[#F6B91E] text-black" : "text-zinc-400 hover:text-white hover:bg-[#242424]/30"}`}
              >
                <Settings size={14} />
                <span>Global Settings</span>
              </button>
            </nav>

            {/* Right details content view */}
            <div className="flex-grow p-6 sm:p-8 overflow-y-auto bg-[#070707] relative">
              
              {/* SUBTAB: OVERVIEW STATS */}
              {subTab === "dashboard" && (
                <div className="space-y-8">
                  <div className="border-b border-zinc-900 pb-4">
                    <span className="text-xs font-mono font-bold text-[#F6B91E] uppercase">R&D DIAGNOSTICS CENTER</span>
                    <h3 className="text-xl font-black text-white">Engineering Overview</h3>
                  </div>

                  {/* Top Counter Blocks */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="rounded-2xl border border-zinc-900 bg-[#090909] p-6 text-left">
                      <span className="block text-xs font-mono text-zinc-500 uppercase">ACTIVE CODES</span>
                      <span className="block text-3xl font-mono font-black text-[#F6B91E] mt-1">{products.length}</span>
                      <span className="block text-[10px] text-zinc-600 mt-2 font-mono">Battery models registered</span>
                    </div>

                    <div className="rounded-2xl border border-zinc-900 bg-[#090909] p-6 text-left">
                      <span className="block text-xs font-mono text-zinc-500 uppercase">PENDING RFQs</span>
                      <span className="block text-3xl font-mono font-black text-white mt-1">
                        {quotes.filter((q) => q.status === "Pending").length}
                      </span>
                      <span className="block text-[10px] text-zinc-600 mt-2 font-mono">Awaiting load sizing</span>
                    </div>

                    <div className="rounded-2xl border border-zinc-900 bg-[#090909] p-6 text-left">
                      <span className="block text-xs font-mono text-zinc-500 uppercase">DEALER APPLICATIONS</span>
                      <span className="block text-3xl font-mono font-black text-emerald-400 mt-1">
                        {dealers.length}
                      </span>
                      <span className="block text-[10px] text-zinc-600 mt-2 font-mono">Onboarding pipeline</span>
                    </div>

                    <div className="rounded-2xl border border-zinc-900 bg-[#090909] p-6 text-left">
                      <span className="block text-xs font-mono text-zinc-500 uppercase">INBOX METRICS</span>
                      <span className="block text-3xl font-mono font-black text-zinc-300 mt-1">
                        {messages.length}
                      </span>
                      <span className="block text-[10px] text-zinc-600 mt-2 font-mono">Customer inquiries</span>
                    </div>
                  </div>

                  {/* Logs dashboard */}
                  <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-6">
                    <h4 className="text-xs font-mono uppercase text-[#F6B91E] font-bold mb-4">Live Dispatch & Pipeline Logs</h4>
                    <div className="divide-y divide-zinc-900 font-mono text-xs">
                      <div className="py-2.5 flex justify-between text-zinc-500">
                        <span>[2026-07-25 09:22:15] Server pre-populating db.json</span>
                        <span className="text-emerald-500">INIT SUCCESS</span>
                      </div>
                      <div className="py-2.5 flex justify-between text-zinc-500">
                        <span>[2026-07-24 18:22:00] Web RFQ submitted by Sarmad Alvi (Lahore)</span>
                        <span className="text-[#F6B91E]">PENDING SIZING</span>
                      </div>
                      <div className="py-2.5 flex justify-between text-zinc-500">
                        <span>[2026-07-23 09:45:00] Dealer application Solux Energies (Islamabad)</span>
                        <span className="text-amber-500">EVALUATING</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SUBTAB: CATALOG CRUD */}
              {subTab === "products" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#F6B91E] uppercase">LFP STOCK ENGINE</span>
                      <h3 className="text-xl font-black text-white">Catalog Manager</h3>
                    </div>
                    <button
                      onClick={() => setEditingProduct({
                        name: "", sku: "", price: 250000, category: "Wall Mount Batteries",
                        voltage: "48V", capacity: "200Ah", shortDescription: "", longDescription: "",
                        stock: 10, status: "In Stock", featured: false, dimensions: "600x400x200",
                        weight: "50kg", warranty: "5 Years", specifications: [], downloads: [], applications: [],
                        thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600"
                      })}
                      className="px-4 py-2 bg-[#F6B91E] hover:bg-[#e0a410] text-black font-extrabold text-xs rounded-lg transition-all flex items-center space-x-1.5"
                    >
                      <Plus size={14} />
                      <span>Register Battery model</span>
                    </button>
                  </div>

                  {editingProduct ? (
                    /* Product edit form */
                    <form onSubmit={saveProduct} className="rounded-2xl border border-zinc-900 bg-[#090909] p-6 space-y-4">
                      <h4 className="font-bold text-white text-sm">{editingProduct.id ? "Edit Battery Parameters" : "Register Brand New System Code"}</h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block text-zinc-500 mb-1">SYSTEM NAME</label>
                          <input
                            type="text"
                            required
                            value={editingProduct.name || ""}
                            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-3 py-2 text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-zinc-500 mb-1">SKU CODE</label>
                          <input
                            type="text"
                            required
                            value={editingProduct.sku || ""}
                            onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-3 py-2 text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-zinc-500 mb-1">PRICE (PKR)</label>
                          <input
                            type="number"
                            required
                            value={editingProduct.price || 0}
                            onChange={(e) => setEditingProduct({ ...editingProduct, price: parseInt(e.target.value) || 0 })}
                            className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-3 py-2 text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-zinc-500 mb-1">CATEGORY</label>
                          <select
                            value={editingProduct.category || "Wall Mount Batteries"}
                            onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-3 py-2 text-white"
                          >
                            <option value="Wall Mount Batteries">Wall Mount Batteries</option>
                            <option value="Rack Batteries">Rack Batteries</option>
                            <option value="Portable Power">Portable Power</option>
                            <option value="Custom Battery Packs">Custom Battery Packs</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-zinc-500 mb-1">VOLTAGE RATING</label>
                          <input
                            type="text"
                            required
                            value={editingProduct.voltage || ""}
                            onChange={(e) => setEditingProduct({ ...editingProduct, voltage: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-3 py-2 text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-zinc-500 mb-1">CAPACITY RATING</label>
                          <input
                            type="text"
                            required
                            value={editingProduct.capacity || ""}
                            onChange={(e) => setEditingProduct({ ...editingProduct, capacity: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-3 py-2 text-white font-mono"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-zinc-500 mb-1">SHORT SUMMARY</label>
                          <input
                            type="text"
                            required
                            value={editingProduct.shortDescription || ""}
                            onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-3 py-2 text-white"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-zinc-500 mb-1">LONG SPECS SHEET DETAILS</label>
                          <textarea
                            rows={3}
                            required
                            value={editingProduct.longDescription || ""}
                            onChange={(e) => setEditingProduct({ ...editingProduct, longDescription: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-3 py-2 text-white leading-relaxed"
                          />
                        </div>
                      </div>

                      <div className="flex space-x-2 pt-4 justify-end">
                        <button
                          type="button"
                          onClick={() => setEditingProduct(null)}
                          className="px-4 py-2 rounded-lg border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-400"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                        >
                          Save Battery Specifications
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* Products listing grid */
                    <div className="rounded-2xl border border-zinc-900 bg-[#090909] overflow-hidden">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-zinc-950 text-zinc-500 font-bold uppercase tracking-wider">
                          <tr>
                            <th className="p-4">SKU / Model</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Voltage/Amp</th>
                            <th className="p-4 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900">
                          {products.map((p) => (
                            <tr key={p.id} className="hover:bg-zinc-900/40 text-zinc-300">
                              <td className="p-4">
                                <span className="block font-sans font-bold text-white">{p.name}</span>
                                <span className="text-[10px] text-zinc-500">{p.sku}</span>
                              </td>
                              <td className="p-4 text-zinc-400">{p.category}</td>
                              <td className="p-4 font-bold">Rs. {p.price.toLocaleString()}</td>
                              <td className="p-4">{p.voltage} • {p.capacity}</td>
                              <td className="p-4 text-center space-x-2">
                                <button
                                  onClick={() => setEditingProduct(p)}
                                  className="p-1 text-zinc-400 hover:text-white inline-block"
                                >
                                  <Edit2 size={14} />
                                </button>
                                <button
                                  onClick={() => deleteProduct(p.id)}
                                  className="p-1 text-zinc-500 hover:text-red-500 inline-block"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* SUBTAB: BLOG ARTICLES */}
              {subTab === "blogs" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#F6B91E] uppercase">KNOWLEDGE MANAGEMENT</span>
                      <h3 className="text-xl font-black text-white">Articles Manager</h3>
                    </div>
                    <button
                      onClick={() => setEditingBlog({
                        title: "", slug: "", content: "", category: "Lithium",
                        author: "Engineering HQ", featuredImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600",
                        readTime: "5 min read"
                      })}
                      className="px-4 py-2 bg-[#F6B91E] hover:bg-[#e0a410] text-black font-extrabold text-xs rounded-lg transition-all flex items-center space-x-1.5"
                    >
                      <Plus size={14} />
                      <span>Write Article</span>
                    </button>
                  </div>

                  {editingBlog ? (
                    <form onSubmit={saveBlog} className="rounded-2xl border border-zinc-900 bg-[#090909] p-6 space-y-4">
                      <h4 className="font-bold text-white text-sm">{editingBlog.id ? "Modify Article" : "Compose Tech Article"}</h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block text-zinc-500 mb-1">TITLE</label>
                          <input
                            type="text"
                            required
                            value={editingBlog.title || ""}
                            onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-') })}
                            className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-3 py-2 text-white font-sans text-sm font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-zinc-500 mb-1">URL SLUG</label>
                          <input
                            type="text"
                            required
                            value={editingBlog.slug || ""}
                            onChange={(e) => setEditingBlog({ ...editingBlog, slug: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-3 py-2 text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-zinc-500 mb-1">CATEGORY</label>
                          <select
                            value={editingBlog.category || "Lithium"}
                            onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-3 py-2 text-white"
                          >
                            <option value="Lithium">Lithium</option>
                            <option value="Solar">Solar</option>
                            <option value="BMS Controls">BMS Controls</option>
                            <option value="Case Studies">Case Studies</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-zinc-500 mb-1">READ TIME SUMMARY</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. 5 min read"
                            value={editingBlog.readTime || ""}
                            onChange={(e) => setEditingBlog({ ...editingBlog, readTime: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-3 py-2 text-white"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-zinc-500 mb-1">MARKDOWN MARKUP CONTENT</label>
                          <textarea
                            rows={10}
                            required
                            value={editingBlog.content || ""}
                            onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-3 py-2 text-white font-sans text-xs leading-relaxed"
                          />
                        </div>
                      </div>

                      <div className="flex space-x-2 pt-4 justify-end">
                        <button
                          type="button"
                          onClick={() => setEditingBlog(null)}
                          className="px-4 py-2 rounded-lg border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-400"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                        >
                          Publish Article
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="rounded-2xl border border-zinc-900 bg-[#090909] overflow-hidden">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-zinc-950 text-zinc-500 font-bold uppercase tracking-wider">
                          <tr>
                            <th className="p-4">Title</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Date</th>
                            <th className="p-4 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900 text-zinc-300">
                          {blogs.map((b) => (
                            <tr key={b.id} className="hover:bg-zinc-900/40">
                              <td className="p-4 font-sans font-bold text-white">{b.title}</td>
                              <td className="p-4 text-zinc-400">{b.category}</td>
                              <td className="p-4">{new Date(b.createdAt).toLocaleDateString()}</td>
                              <td className="p-4 text-center space-x-2">
                                <button
                                  onClick={() => setEditingBlog(b)}
                                  className="p-1 text-zinc-400 hover:text-white inline-block"
                                >
                                  <Edit2 size={14} />
                                </button>
                                <button
                                  onClick={() => deleteBlog(b.id)}
                                  className="p-1 text-zinc-500 hover:text-red-500 inline-block"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* SUBTAB: QUOTE INQUIRIES */}
              {subTab === "quotes" && (
                <div className="space-y-6">
                  <div className="border-b border-zinc-900 pb-4">
                    <span className="text-xs font-mono font-bold text-[#F6B91E] uppercase">Active RFQ Sizing pipeline</span>
                    <h3 className="text-xl font-black text-white">Quote Requests</h3>
                  </div>

                  {quotes.length === 0 ? (
                    <p className="text-zinc-500 font-mono text-xs">No active quotes logged yet.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {quotes.map((q) => (
                        <div key={q.id} className="rounded-2xl border border-zinc-900 bg-[#090909] p-6 text-left space-y-4 relative">
                          <span className={`absolute top-4 right-4 text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                            q.status === "Pending" ? "bg-amber-500/10 text-amber-500 border border-amber-950" : "bg-zinc-800 text-zinc-400"
                          }`}>
                            {q.status}
                          </span>

                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-zinc-500 block">RFQ SERIAL: {q.id}</span>
                            <h4 className="font-bold text-white text-base leading-snug">{q.name}</h4>
                            <span className="text-[11px] font-mono text-zinc-400 block">{q.email} • {q.phone}</span>
                            <span className="text-xs font-bold text-zinc-500 block">Location: {q.location} • Company: {q.company || "N/A"}</span>
                          </div>

                          <div className="bg-zinc-950 p-4.5 rounded-xl border border-zinc-900 space-y-2 text-xs">
                            <div className="flex justify-between font-mono">
                              <span className="text-zinc-500">PROPOSED POWER</span>
                              <span className="text-white font-bold">{q.product}</span>
                            </div>
                            <div className="flex justify-between font-mono">
                              <span className="text-zinc-500">CAPACITY METRIC</span>
                              <span className="text-[#F6B91E] font-bold">{q.capacity}</span>
                            </div>
                            <div className="flex justify-between font-mono">
                              <span className="text-zinc-500">QUANTITY</span>
                              <span className="text-white font-bold">{q.quantity}</span>
                            </div>
                            <div className="border-t border-zinc-900 pt-2 text-zinc-400 font-sans leading-relaxed">
                              {q.requirements}
                            </div>
                          </div>

                          <div className="flex space-x-2 pt-2">
                            <button
                              onClick={() => updateQuoteStatus(q.id, "Replied")}
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-all"
                            >
                              Mark Replied
                            </button>
                            <button
                              onClick={() => updateQuoteStatus(q.id, "Archived")}
                              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-850 text-zinc-400 text-xs rounded-lg transition-all"
                            >
                              Archive
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* SUBTAB: DEALER PIPELINE */}
              {subTab === "dealers" && (
                <div className="space-y-6">
                  <div className="border-b border-zinc-900 pb-4">
                    <span className="text-xs font-mono font-bold text-[#F6B91E] uppercase">AUTHORIZED PARTNERS PIPELINE</span>
                    <h3 className="text-xl font-black text-white">Dealer Applications</h3>
                  </div>

                  {dealers.length === 0 ? (
                    <p className="text-zinc-500 font-mono text-xs">No pending dealer profiles registered.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {dealers.map((d) => (
                        <div key={d.id} className="rounded-2xl border border-zinc-900 bg-[#090909] p-6 text-left space-y-4 relative">
                          <span className={`absolute top-4 right-4 text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                            d.status === "Pending" ? "bg-amber-500/10 text-amber-500 border border-amber-950" : "bg-emerald-950/20 text-emerald-400 border border-emerald-900/40"
                          }`}>
                            {d.status}
                          </span>

                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-zinc-500 block">SUBMITTED DATE: {new Date(d.createdAt).toLocaleDateString()}</span>
                            <h4 className="font-bold text-white text-base leading-snug">{d.companyName}</h4>
                            <span className="text-[11px] font-mono text-[#F6B91E] block">Rep: {d.contactPerson} • {d.phone} • {d.email}</span>
                            <span className="text-xs text-zinc-500 block">Distribution City: {d.city} • Industry Type: {d.businessType}</span>
                          </div>

                          <div className="bg-zinc-950 p-4.5 rounded-xl border border-zinc-900 text-xs text-zinc-400 leading-relaxed font-sans">
                            {d.experience}
                          </div>

                          <div className="flex space-x-2 pt-2">
                            <button
                              onClick={() => updateDealerStatus(d.id, "Approved")}
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-all"
                            >
                              Approve Partnership
                            </button>
                            <button
                              onClick={() => updateDealerStatus(d.id, "Rejected")}
                              className="px-4 py-2 bg-[#242424] hover:bg-red-900/20 text-zinc-400 hover:text-red-500 border border-zinc-800 text-xs rounded-lg transition-all"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* SUBTAB: MESSAGES */}
              {subTab === "messages" && (
                <div className="space-y-6">
                  <div className="border-b border-zinc-900 pb-4">
                    <span className="text-xs font-mono font-bold text-[#F6B91E] uppercase">GENERAL CUSTOMER COMMUNICATIONS</span>
                    <h3 className="text-xl font-black text-white">Contact Messages</h3>
                  </div>

                  {messages.length === 0 ? (
                    <p className="text-zinc-500 font-mono text-xs">Inbox empty.</p>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((m) => (
                        <div key={m.id} className="rounded-2xl border border-zinc-900 bg-[#090909] p-6 text-left space-y-3 relative">
                          <span className="absolute top-4 right-4 text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-850 text-zinc-500 uppercase">
                            {m.status}
                          </span>
                          
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-zinc-500 block">SUBMITTED: {new Date(m.createdAt).toLocaleDateString()}</span>
                            <h4 className="font-bold text-white text-sm">Subject: {m.subject}</h4>
                            <span className="text-xs text-[#F6B91E] block">From: {m.name} ({m.email})</span>
                          </div>

                          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                            {m.message}
                          </p>

                          <div className="flex space-x-2 pt-2">
                            <button
                              onClick={() => updateMessageStatus(m.id, "Archive")}
                              className="px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-400 rounded-lg border border-zinc-850 transition-all"
                            >
                              Archive Message
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* SUBTAB: SITE SETTINGS */}
              {subTab === "settings" && (
                <form onSubmit={saveSettings} className="space-y-6">
                  <div className="border-b border-zinc-900 pb-4">
                    <span className="text-xs font-mono font-bold text-[#F6B91E] uppercase">SERVER STATE VARIABLES</span>
                    <h3 className="text-xl font-black text-white">Global Site Settings</h3>
                  </div>

                  <div className="rounded-2xl border border-zinc-900 bg-[#090909] p-6 space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-zinc-500 mb-1">CALL CENTER NUMBER</label>
                        <input
                          type="text"
                          required
                          value={settings.contactInfo.phone}
                          onChange={(e) => setSettings({
                            ...settings,
                            contactInfo: { ...settings.contactInfo, phone: e.target.value }
                          })}
                          className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-3 py-2 text-white font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-zinc-500 mb-1">WHATSAPP OUTBOUND NUMBER</label>
                        <input
                          type="text"
                          required
                          value={settings.whatsAppNumber}
                          onChange={(e) => setSettings({
                            ...settings,
                            whatsAppNumber: e.target.value
                          })}
                          className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-3 py-2 text-white font-mono"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-zinc-500 mb-1">OFFICE ADDRESS HEADQUARTERS</label>
                        <input
                          type="text"
                          required
                          value={settings.contactInfo.officeAddress}
                          onChange={(e) => setSettings({
                            ...settings,
                            contactInfo: { ...settings.contactInfo, officeAddress: e.target.value }
                          })}
                          className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-3 py-2 text-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-zinc-500 mb-1">FACTORY ASSEMBLY FLOOR ADDRESS</label>
                        <input
                          type="text"
                          required
                          value={settings.contactInfo.factoryAddress}
                          onChange={(e) => setSettings({
                            ...settings,
                            contactInfo: { ...settings.contactInfo, factoryAddress: e.target.value }
                          })}
                          className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-3 py-2 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-lg transition-all"
                  >
                    Commit Settings to Server
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
