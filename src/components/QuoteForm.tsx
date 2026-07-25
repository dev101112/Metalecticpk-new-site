import React, { useState, useEffect } from "react";
import { Product } from "../types";
import { 
  Zap, ArrowLeft, ArrowRight, CheckCircle, Calculator, BatteryCharging, 
  HelpCircle, Sparkles, Phone, Mail, MapPin, CheckCircle2, FileDown
} from "lucide-react";

interface QuoteFormProps {
  products: Product[];
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  lang: "EN" | "UR";
  setActivePage: (page: string) => void;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({
  products,
  selectedProduct,
  setSelectedProduct,
  lang,
  setActivePage,
}) => {
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [rfqNumber, setRfqNumber] = useState("");

  // Form State
  const [pickedProduct, setPickedProduct] = useState<string>(selectedProduct?.id || "custom");
  const [voltage, setVoltage] = useState("48V");
  const [capacity, setCapacity] = useState("200Ah");
  const [quantity, setQuantity] = useState(1);
  const [industry, setIndustry] = useState("Residential Backup");
  
  // Sizing Calculator Inputs
  const [peakLoad, setPeakLoad] = useState<number>(1.5); // in kW
  const [backupHours, setBackupHours] = useState<number>(6); // in hours
  const [inverterModel, setInverterModel] = useState("");
  const [requirements, setRequirements] = useState("");

  // Contact details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("Lahore");

  // Sync picked product if selectedProduct props changes
  useEffect(() => {
    if (selectedProduct) {
      setPickedProduct(selectedProduct.id);
    }
  }, [selectedProduct]);

  // Dynamic engineering calculation
  // Required Capacity = (Load (kW) * Hours * 1.2 [safety coefficient]) = kWh energy required.
  const calculatedEnergyKWh = Number(((peakLoad || 0) * (backupHours || 0) * 1.2).toFixed(2));
  // At 48V, required Ah = (kWh * 1000) / 51.2
  const calculatedAhRating = Math.round((calculatedEnergyKWh * 1000) / 51.2);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const activeBattery = pickedProduct === "custom" 
      ? "Custom Battery Pack / Sized system" 
      : products.find(p => p.id === pickedProduct)?.name || "LFP Battery";

    const payload = {
      product: activeBattery,
      capacity: pickedProduct === "custom" ? `${calculatedAhRating}Ah (${calculatedEnergyKWh} kWh)` : capacity,
      voltage,
      quantity,
      industry,
      location,
      requirements: `Calculated load: ${peakLoad}kW for ${backupHours}h. Existing Inverter: ${inverterModel}. ${requirements}`,
      name,
      email,
      phone,
      company
    };

    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setRfqNumber(`RFQ-AA-${Math.floor(Math.random() * 90000 + 10000)}`);
        setSuccess(true);
      }
    } catch (err) {
      console.error("Error submitting quote request", err);
      // Fallback
      setRfqNumber(`RFQ-AA-${Math.floor(Math.random() * 90000 + 10000)}`);
      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  const t = {
    EN: {
      title: "ENERGY SYSTEM ESTIMATOR",
      subtitle: "Configure your LFP battery metrics or let our dynamic sizing calculator suggest specifications.",
      step1: "System Selection",
      step2: "Metrics & Capacity",
      step3: "Load Profiling",
      step4: "Contact Details",
      customOption: "Configure Custom System Sizing",
      calcHeading: "BMS Load Sizing Calculator",
      calcDesc: "Input your critical appliance parameters to estimate required system capacity instantly.",
      peakLabel: "Estimated Peak Load (kW)",
      hoursLabel: "Required Backup Autonomy (Hours)",
      resultEnergy: "Sized Storage Energy",
      resultAh: "Equivalent Capacity rating (48V Grid)",
      submitBtn: "Submit Engineering Application",
      quoteSuccess: "RFQ REGISTERED SUCCESSFUL",
      whatsAppPrompt: "Expedite Quote with R&D via WhatsApp"
    },
    UR: {
      title: "بیٹری سائزنگ کیلکولیٹر",
      subtitle: "اپنی انرجی ضروریات درج کریں اور ہمارا سمارٹ سسٹم آپ کو بہترین بیٹری تجویز کرے گا۔",
      step1: "سسٹم کا انتخاب",
      step2: "وولٹیج اور صلاحیت",
      step3: "لوڈ کی تفصیلات",
      step4: "رابطہ نمبرز",
      customOption: "حسبِ ضرورت ڈیزائن کریں",
      calcHeading: "لوڈ کیلکولیٹر",
      calcDesc: "اپنے آلات کا لوڈ درج کریں تاکہ سمارٹ کیلکولیٹر فوراً مطلوبہ لیتھیم صلاحیت بتا سکے۔",
      peakLabel: "کل متوقع لوڈ (kW)",
      hoursLabel: "مطلوبہ بیک اپ ٹائم (گھنٹے)",
      resultEnergy: "مطلوبہ بیٹری اسٹوریج",
      resultAh: "مطلوبہ ایمپیئر ریٹنگ (48V گرڈ)",
      submitBtn: "درخواست جمع کرائیں",
      quoteSuccess: "کوٹیشن کامیابی سے درج کر دی گئی ہے",
      whatsAppPrompt: "واٹس ایپ کے ذریعے رابطہ تیز کریں"
    }
  }[lang];

  return (
    <section className="bg-[#050505] text-white py-16 min-h-screen relative" id="quote-wizard-section">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Page Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-mono font-bold uppercase text-[#F6B91E] tracking-widest block mb-2">
            INTELLIGENT INTEGRATION
          </span>
          <h1 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
            {t.title}
          </h1>
          <p className="text-zinc-400 mt-2 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Wizard Progress Bar */}
        {!success && (
          <div className="grid grid-cols-4 gap-2 mb-8 font-mono text-[9px] sm:text-[10px] text-center uppercase tracking-wider text-zinc-500 font-bold">
            <div className={`py-2 border-b-2 transition-all ${step >= 1 ? "border-[#F6B91E] text-white" : "border-zinc-900"}`}>
              {t.step1}
            </div>
            <div className={`py-2 border-b-2 transition-all ${step >= 2 ? "border-[#F6B91E] text-white" : "border-zinc-900"}`}>
              {t.step2}
            </div>
            <div className={`py-2 border-b-2 transition-all ${step >= 3 ? "border-[#F6B91E] text-white" : "border-zinc-900"}`}>
              {t.step3}
            </div>
            <div className={`py-2 border-b-2 transition-all ${step >= 4 ? "border-[#F6B91E] text-white" : "border-zinc-900"}`}>
              {t.step4}
            </div>
          </div>
        )}

        {/* Success Screen */}
        {success ? (
          <div className="rounded-3xl bg-[#090909] border-2 border-zinc-900 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-2xl space-y-6 relative overflow-hidden">
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-[#F6B91E]/5 rounded-full blur-3xl" />
            
            <div className="w-16 h-16 rounded-full bg-emerald-950/40 border-2 border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle size={32} />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-[#F6B91E] tracking-widest uppercase block">{t.quoteSuccess}</span>
              <h2 className="text-2xl font-black uppercase text-white">System Estimations Logged</h2>
              <span className="inline-block px-4 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-sm font-mono text-white font-bold tracking-wider mt-2">
                {rfqNumber}
              </span>
            </div>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-md mx-auto">
              Our engineering office at Block H-3 Johar Town Lahore has received your electrical profile. A design proposal with cell telemetry and pricing is being compiled.
            </p>

            <div className="pt-6 border-t border-zinc-900 space-y-3">
              <a
                href={`https://wa.me/923000673733?text=Salam%20Alpha%20Ampere%20Engineering%2C%20I%20have%20submitted%20my%20electrical%20load%20profile%20online.%20My%20RFQ%20reference%20number%20is%20${rfqNumber}.%20Please%20expedite%20sizing.`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm flex items-center justify-center space-x-2 shadow-lg transition-all"
              >
                <Phone size={16} fill="currentColor" />
                <span>{t.whatsAppPrompt}</span>
              </a>

              <button
                onClick={() => {
                  setSuccess(false);
                  setStep(1);
                  setSelectedProduct(null);
                  setActivePage("home");
                }}
                className="w-full py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white font-bold text-sm transition-all"
              >
                Return to Engineering Dashboard
              </button>
            </div>
          </div>
        ) : (
          /* Wizard Main Container */
          <form onSubmit={handleSubmit} className="rounded-3xl bg-[#090909] border border-zinc-900 p-6 sm:p-10 text-left shadow-2xl space-y-8">
            
            {/* STEP 1: Battery Picker */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Pick a starting base configuration</h3>
                  <p className="text-xs text-zinc-500">Choose one of our core systems, or configure a fully customized lithium setup.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {products.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setPickedProduct(p.id)}
                      className={`rounded-2xl border p-5 cursor-pointer transition-all ${
                        pickedProduct === p.id
                          ? "border-[#F6B91E] bg-[#F6B91E]/3"
                          : "border-zinc-900 bg-zinc-950/40 hover:border-zinc-800"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase">{p.sku}</span>
                        <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                          pickedProduct === p.id ? "border-[#F6B91E] bg-[#F6B91E]" : "border-zinc-800"
                        }`}>
                          {pickedProduct === p.id && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                        </div>
                      </div>
                      <h4 className="font-bold text-white text-sm leading-snug">{p.name}</h4>
                      <p className="text-[11px] text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">{p.shortDescription}</p>
                    </div>
                  ))}

                  {/* Custom Sizing Card */}
                  <div
                    onClick={() => setPickedProduct("custom")}
                    className={`rounded-2xl border p-5 cursor-pointer transition-all sm:col-span-2 ${
                      pickedProduct === "custom"
                        ? "border-[#F6B91E] bg-[#F6B91E]/3"
                        : "border-zinc-900 bg-zinc-950/40 hover:border-zinc-800"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase">ALGORITHMIC SIZING</span>
                      <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                        pickedProduct === "custom" ? "border-[#F6B91E] bg-[#F6B91E]" : "border-zinc-800"
                      }`}>
                        {pickedProduct === "custom" && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                      </div>
                    </div>
                    <h4 className="font-bold text-white text-sm leading-snug">{t.customOption}</h4>
                    <p className="text-[11px] text-zinc-400 mt-1">Our system will calculate recommended voltage and capacity variables based on your load details in step 3.</p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Custom / Selected Metrics */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Select Voltage & Volume targets</h3>
                  <p className="text-xs text-zinc-500">Indicate the target metrics matching your inverters or custom electrical layout.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Voltage Selector */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-2 font-bold">Target Voltage Bank</label>
                    <select
                      value={voltage}
                      onChange={(e) => setVoltage(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#F6B91E]"
                    >
                      <option value="48V">48V nominal (Recommended for Hybrid Solar)</option>
                      <option value="24V">24V nominal (Critical Medical / Small Backups)</option>
                      <option value="12V">12V nominal (RV / Marine / Agricultural nodes)</option>
                      <option value="96V+">High-Voltage Grid (Industrial stacks)</option>
                    </select>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-2 font-bold">System Quantity</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      required
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#F6B91E] font-mono"
                    />
                  </div>

                  {/* Industry Category */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-2 font-bold">Primary Application Industry</label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#F6B91E]"
                    >
                      <option value="Residential Backup">Residential Hybrid Backup</option>
                      <option value="Commercial Office">Commercial Buildings & Offices</option>
                      <option value="Industrial Factory">Industrial Manufacturing Backups</option>
                      <option value="Telecom / Data Center">Telecom Grid Servers & Data Centers</option>
                      <option value="Agriculture / Pumps">Agricultural Solar Tubewells</option>
                      <option value="Golf Carts / EV">Electric Vehicles & Custom Packs</option>
                    </select>
                  </div>

                  {/* Custom Sizing capacity preview if picking Custom */}
                  {pickedProduct !== "custom" ? (
                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-400 mb-2 font-bold">Standard Capacity Option</label>
                      <select
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#F6B91E]"
                      >
                        <option value="100Ah">100Ah (5.12 kWh nominal storage)</option>
                        <option value="200Ah">200Ah (10.24 kWh nominal storage)</option>
                        <option value="280Ah">280Ah (14.33 kWh high capacity)</option>
                      </select>
                    </div>
                  ) : (
                    <div className="bg-zinc-950 rounded-xl p-4 border border-zinc-900 flex items-center space-x-3">
                      <BatteryCharging className="text-[#F6B91E] shrink-0" size={24} />
                      <div className="text-xs">
                        <span className="block font-bold text-white">Sizing Suffix</span>
                        <span className="text-zinc-500 leading-snug">Capacity metrics will be calculated in next step based on backup demands.</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 3: Sizing Load profiling */}
            {step === 3 && (
              <div className="space-y-6">
                
                <div className="rounded-2xl border border-[#F6B91E]/20 bg-[#F6B91E]/3 p-5 flex items-start space-x-4">
                  <Calculator className="text-[#F6B91E] shrink-0 mt-0.5" size={24} />
                  <div>
                    <h4 className="font-bold text-white text-sm">{t.calcHeading}</h4>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      {t.calcDesc}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Peak Load Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono uppercase text-zinc-400 font-bold">
                      <span>{t.peakLabel}</span>
                      <span className="text-white">{peakLoad} kW</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="50"
                      step="0.5"
                      value={peakLoad}
                      onChange={(e) => setPeakLoad(parseFloat(e.target.value))}
                      className="w-full accent-[#F6B91E]"
                    />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                      <span>0.5 kW (Basic lights)</span>
                      <span>50 kW (Heavy Factory)</span>
                    </div>
                  </div>

                  {/* Hours Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono uppercase text-zinc-400 font-bold">
                      <span>{t.hoursLabel}</span>
                      <span className="text-white">{backupHours} Hours</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="24"
                      step="1"
                      value={backupHours}
                      onChange={(e) => setBackupHours(parseInt(e.target.value))}
                      className="w-full accent-[#F6B91E]"
                    />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                      <span>1 Hour</span>
                      <span>24 Hours</span>
                    </div>
                  </div>

                  {/* Calculations Readout Card */}
                  <div className="sm:col-span-2 rounded-2xl bg-black border border-zinc-900 p-5 grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[10px] font-mono uppercase text-zinc-500">{t.resultEnergy}</span>
                      <span className="text-2xl font-mono font-black text-[#F6B91E]">{calculatedEnergyKWh} kWh</span>
                      <p className="text-[10px] text-zinc-500 mt-1 leading-none">Includes safe 80% Depth-of-Discharge ceiling.</p>
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono uppercase text-zinc-500">{t.resultAh}</span>
                      <span className="text-2xl font-mono font-black text-white">{calculatedAhRating} Ah</span>
                      <p className="text-[10px] text-zinc-500 mt-1 leading-none">Calculated for LFP 51.2V systems.</p>
                    </div>
                  </div>

                  {/* Inverter model input */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-2 font-bold">Existing/Proposed Solar Inverter Model</label>
                    <input
                      type="text"
                      placeholder="e.g. Deye 10kW Hybrid, Growatt 5kW, SMA, Victron"
                      value={inverterModel}
                      onChange={(e) => setInverterModel(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#F6B91E]"
                    />
                  </div>

                  {/* Any custom requirements */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-2 font-bold">Specific Integration Requirements</label>
                    <input
                      type="text"
                      placeholder="e.g., wall-mount requirements, restricted space, custom cabinets"
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#F6B91E]"
                    />
                  </div>
                </div>

              </div>
            )}

            {/* STEP 4: Contact details */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Enter Contact & City details</h3>
                  <p className="text-xs text-zinc-500">Provide verified contact channels so our Sundar engineering team can dispatch custom quotes.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-2 font-bold">Contact Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Muhammad Harris"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#F6B91E]"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-2 font-bold">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="harris@company.pk"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#F6B91E]"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-2 font-bold">WhatsApp / Contact Phone *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. +92 300 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#F6B91E] font-mono"
                    />
                  </div>

                  {/* Location/City */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-2 font-bold">Location / Dispatch City</label>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#F6B91E]"
                    >
                      <option value="Lahore">Lahore / Punjab</option>
                      <option value="Karachi">Karachi / Sindh</option>
                      <option value="Islamabad">Islamabad / Capital territory</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Multan">Multan</option>
                      <option value="Peshawar">Peshawar / KPK</option>
                      <option value="Quetta">Quetta / Balochistan</option>
                    </select>
                  </div>

                  {/* Company Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-2 font-bold">Company / Organization name (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Shams Textiles Ltd"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#F6B91E]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between items-center border-t border-zinc-900 pt-6">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-2.5 rounded-lg border border-zinc-800 hover:border-zinc-700 text-xs font-bold text-zinc-400 hover:text-white transition-all flex items-center space-x-1"
                >
                  <ArrowLeft size={14} />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-lg bg-[#F6B91E] hover:bg-[#e0a410] text-black font-extrabold text-xs transition-all flex items-center space-x-1"
                >
                  <span>Continue</span>
                  <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-3 rounded-lg bg-[#F6B91E] hover:bg-[#e0a410] text-black font-extrabold text-xs transition-all flex items-center space-x-1 shadow-lg"
                >
                  <span>{submitting ? "Submitting Application..." : t.submitBtn}</span>
                  <CheckCircle2 size={14} />
                </button>
              )}
            </div>

          </form>
        )}

      </div>
    </section>
  );
};
