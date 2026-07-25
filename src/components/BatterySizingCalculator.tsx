import React, { useState, useMemo } from "react";
import { 
  Zap, Cpu, Battery, Sliders, ShieldCheck, ArrowRight, RefreshCw, 
  CheckCircle, Calculator, Info, Sparkles, Scale, Server, Home, Factory
} from "lucide-react";

interface CalculatorProps {
  lang: "EN" | "UR";
  setActivePage?: (page: string) => void;
  onSelectRecommendedProduct?: (productName: string) => void;
}

interface ApplianceItem {
  id: string;
  name: string;
  nameUr: string;
  wattage: number; // in Watts
  count: number;
  category: "home" | "office" | "industrial";
}

export const BatterySizingCalculator: React.FC<CalculatorProps> = ({
  lang,
  setActivePage,
  onSelectRecommendedProduct
}) => {
  // Mode: "custom" (kW + hours sliders) or "preset" (appliance picker)
  const [mode, setMode] = useState<"custom" | "preset">("preset");

  // Custom load state
  const [customLoadKW, setCustomLoadKW] = useState<number>(3.5);
  const [backupHours, setBackupHours] = useState<number>(4);
  const [systemVoltage, setSystemVoltage] = useState<number>(51.2); // 48V/51.2V nominal
  const [dod, setDod] = useState<number>(0.9); // 90% Depth of discharge for LiFePO4

  // Preset appliances state
  const [appliances, setAppliances] = useState<ApplianceItem[]>([
    { id: "ac1", name: "1.5 Ton Inverter AC", nameUr: "1.5 ٹن انورٹر اے سی", wattage: 1600, count: 1, category: "home" },
    { id: "fridge", name: "Inverter Refrigerator", nameUr: "انورٹر ریفریجریٹر", wattage: 250, count: 1, category: "home" },
    { id: "fans", name: "Ceiling Fans & LED Lights", nameUr: "پنکھے اور ایل ای ڈی لائٹس", wattage: 350, count: 1, category: "home" },
    { id: "water_pump", name: "1.0 HP Water Pump", nameUr: "1.0 ایچ پی واٹر پمپ", wattage: 750, count: 0, category: "home" },
    { id: "computer", name: "Desktop Workstation / Server", nameUr: "کمپیوٹر / سرور", wattage: 300, count: 0, category: "office" },
    { id: "tv", name: "55\" LED TV & WiFi Router", nameUr: "ایل ای ڈی ٹی وی اور وائی فائی", wattage: 150, count: 1, category: "home" },
    { id: "heavy_motor", name: "3-Phase Industrial Motor", nameUr: "3 فیز انڈسٹریل موٹر", wattage: 3700, count: 0, category: "industrial" },
  ]);

  // Appliance count update handler
  const handleApplianceChange = (id: string, delta: number) => {
    setAppliances((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, count: Math.max(0, item.count + delta) } : item
      )
    );
  };

  // Calculate total load in kW from preset mode
  const presetTotalKW = useMemo(() => {
    const totalWatts = appliances.reduce(
      (sum, item) => sum + item.wattage * item.count,
      0
    );
    return Math.max(0.5, parseFloat((totalWatts / 1000).toFixed(2)));
  }, [appliances]);

  // Effective Load in kW based on mode
  const effectiveLoadKW = mode === "preset" ? presetTotalKW : customLoadKW;

  // Key Calculations
  const calculatedKWh = useMemo(() => {
    // Energy required = (Load kW * Hours) / Inverter efficiency (~0.92) / DoD
    const rawKWh = (effectiveLoadKW * backupHours) / (0.92 * dod);
    return parseFloat(rawKWh.toFixed(2));
  }, [effectiveLoadKW, backupHours, dod]);

  // Calculate required Ah at nominal system voltage
  const calculatedAh = useMemo(() => {
    const ah = (calculatedKWh * 1000) / systemVoltage;
    return Math.round(ah);
  }, [calculatedKWh, systemVoltage]);

  // Determine Recommended Metalectric Battery Model
  const recommendedSystem = useMemo(() => {
    if (calculatedKWh <= 5.5) {
      return {
        model: "ALPHA LFP 5.12 kWh Wall-Mount",
        sku: "ALPHA-5120-W",
        type: "Residential Compact",
        nominalKWh: 5.12,
        voltage: "51.2 V",
        capacity: "100 Ah",
        recommendedUnits: Math.max(1, Math.ceil(calculatedKWh / 5.12)),
        chargeTime: "1.5 Hours (0.5C)",
        cycleLife: "8,000+ Cycles",
        weight: "44 kg",
        idealFor: "Apartments, Small Offices & 3kW-5kW Solar Systems",
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80"
      };
    } else if (calculatedKWh <= 12) {
      return {
        model: "ALPHA LFP 10.2 kWh High-Density Stack",
        sku: "ALPHA-10240-S",
        type: "Residential & Commercial Premium",
        nominalKWh: 10.24,
        voltage: "51.2 V",
        capacity: "200 Ah",
        recommendedUnits: Math.max(1, Math.ceil(calculatedKWh / 10.24)),
        chargeTime: "2.0 Hours (0.5C)",
        cycleLife: "8,000+ Cycles",
        weight: "82 kg",
        idealFor: "Luxury Residencies, Clinics & 6kW-12kW Solar Grids",
        image: "https://images.unsplash.com/photo-1558441719-670b9575250c?auto=format&fit=crop&w=800&q=80"
      };
    } else if (calculatedKWh <= 25) {
      return {
        model: "ALPHA LFP 14.3 kWh Dual-Rack System",
        sku: "ALPHA-14300-R",
        type: "Commercial Heavy",
        nominalKWh: 14.3,
        voltage: "51.2 V",
        capacity: "280 Ah",
        recommendedUnits: Math.max(1, Math.ceil(calculatedKWh / 14.3)),
        chargeTime: "2.0 Hours (0.5C)",
        cycleLife: "8,500+ Cycles",
        weight: "115 kg",
        idealFor: "Office Buildings, Data Centers & 15kW-20kW Inverters",
        image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80"
      };
    } else {
      return {
        model: "ALPHA MEGA-GRID 20.4 kWh Industrial Modular Stack",
        sku: "ALPHA-MEGA-204",
        type: "Heavy Industrial Grid",
        nominalKWh: 20.4,
        voltage: "51.2 V / High Voltage Option",
        capacity: "400 Ah+",
        recommendedUnits: Math.max(1, Math.ceil(calculatedKWh / 20.4)),
        chargeTime: "2.5 Hours (0.5C)",
        cycleLife: "10,000+ Cycles",
        weight: "170 kg",
        idealFor: "Sundar Industrial Factories, Hospitals & Microgrids",
        image: "https://images.unsplash.com/photo-1548611716-300188981442?auto=format&fit=crop&w=800&q=80"
      };
    }
  }, [calculatedKWh]);

  // Lead-acid comparison equivalent
  const leadAcidEquivalent = useMemo(() => {
    // Lead acid max DoD is 50%, efficiency is ~70%
    const leadKWhNeeded = calculatedKWh * 2.2;
    const standard200AhBatteries = Math.ceil((leadKWhNeeded * 1000) / (12 * 200));
    const totalLeadWeightKg = standard200AhBatteries * 62; // ~62kg per 200Ah lead battery
    return {
      batteryCount: standard200AhBatteries,
      weightKg: totalLeadWeightKg,
      replacementsIn15Years: 5, // Lead acid needs replacement every 2-3 yrs
      estimatedCostSavedPkr: (standard200AhBatteries * 75000 * 4).toLocaleString()
    };
  }, [calculatedKWh]);

  const handleActionClick = () => {
    if (onSelectRecommendedProduct) {
      onSelectRecommendedProduct(recommendedSystem.model);
    }
    if (setActivePage) {
      setActivePage("get-quote");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-[#050505] text-white py-12 px-4 sm:px-6 lg:px-8 border-y border-zinc-900 rounded-3xl" id="battery-calculator">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#F6B91E]/10 border border-[#F6B91E]/30 text-xs font-mono font-bold uppercase tracking-widest text-[#F6B91E]">
            <Calculator size={14} className="mr-1" />
            {lang === "EN" ? "Interactive Energy Matrix" : "انٹرایکٹو بیٹری سائزنگ کیلکولیٹر"}
          </span>
          <h2 className="text-3xl sm:text-4.5xl font-black uppercase text-white tracking-tight">
            {lang === "EN" ? "Battery Sizing Calculator" : "اپنی ضرورت کے مطابق بیٹری منتخب کریں"}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            {lang === "EN"
              ? "Input your electrical load parameters or pick your daily appliances to calculate the precise lithium storage required for your home, commercial office, or industrial factory."
              : "اپنے لوڈ اور درکار بیک اپ ٹائم کا اندراج کریں اور فوری طور پر اپنے گھر یا کاروبار کے لیے بہترین لیتھیم ماڈل کی معلومات حاصل کریں۔"}
          </p>
        </div>

        {/* Main Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Input Controls (7 Cols) */}
          <div className="lg:col-span-7 bg-[#090909] border border-zinc-900 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl relative">
            
            {/* Mode Switcher */}
            <div className="flex justify-between items-center border-b border-zinc-800 pb-4 flex-wrap gap-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                1. Select Calculation Mode
              </span>
              <div className="inline-flex rounded-xl bg-zinc-950 p-1 border border-zinc-800">
                <button
                  onClick={() => setMode("preset")}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
                    mode === "preset"
                      ? "bg-[#F6B91E] text-black shadow-md"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Home size={14} />
                  <span>{lang === "EN" ? "Appliance Picker" : "آلات کا انتخاب"}</span>
                </button>
                <button
                  onClick={() => setMode("custom")}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
                    mode === "custom"
                      ? "bg-[#F6B91E] text-black shadow-md"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Sliders size={14} />
                  <span>{lang === "EN" ? "Direct kW Input" : "کلوواٹ درج کریں"}</span>
                </button>
              </div>
            </div>

            {/* PRESET MODE APPLIANCE LIST */}
            {mode === "preset" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
                  <span>Select Active Electrical Load Items:</span>
                  <span className="text-[#F6B91E] font-bold">
                    Total Load: {effectiveLoadKW} kW ({Math.round(effectiveLoadKW * 1000)} Watts)
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3 max-h-80 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-800">
                  {appliances.map((app) => (
                    <div
                      key={app.id}
                      className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                        app.count > 0
                          ? "bg-zinc-900/80 border-[#F6B91E]/40"
                          : "bg-zinc-950/40 border-zinc-900 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <div>
                        <span className="block font-sans text-sm font-bold text-white">
                          {lang === "UR" ? app.nameUr : app.name}
                        </span>
                        <span className="font-mono text-[10px] text-zinc-500">
                          {app.wattage} W per unit
                        </span>
                      </div>

                      {/* Counter Controls */}
                      <div className="flex items-center space-x-3 bg-black/60 border border-zinc-800 rounded-xl p-1">
                        <button
                          onClick={() => handleApplianceChange(app.id, -1)}
                          className="w-7 h-7 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-mono font-bold text-sm flex items-center justify-center transition-all"
                        >
                          -
                        </button>
                        <span className="font-mono text-sm font-black text-[#F6B91E] w-5 text-center">
                          {app.count}
                        </span>
                        <button
                          onClick={() => handleApplianceChange(app.id, 1)}
                          className="w-7 h-7 rounded-lg bg-[#242424] hover:bg-[#F6B91E] hover:text-black text-white font-mono font-bold text-sm flex items-center justify-center transition-all"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CUSTOM MODE SLIDERS */}
            {mode === "custom" && (
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2 font-mono text-xs">
                    <span className="text-zinc-400 font-bold uppercase">Peak Running Load (kW)</span>
                    <span className="text-[#F6B91E] font-black text-base">{customLoadKW} kW</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="50"
                    step="0.5"
                    value={customLoadKW}
                    onChange={(e) => setCustomLoadKW(parseFloat(e.target.value))}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#F6B91E]"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-zinc-600 mt-1">
                    <span>0.5 kW (Studio)</span>
                    <span>10 kW (Home)</span>
                    <span>25 kW (Commercial)</span>
                    <span>50 kW (Factory)</span>
                  </div>
                </div>
              </div>
            )}

            {/* BACKUP DURATION SLIDER */}
            <div className="pt-4 border-t border-zinc-800/80 space-y-3">
              <div className="flex justify-between items-center mb-2 font-mono text-xs">
                <span className="text-zinc-400 font-bold uppercase">Required Backup Duration</span>
                <span className="text-[#10B981] font-black text-base">{backupHours} Hours</span>
              </div>
              <input
                type="range"
                min="1"
                max="24"
                step="1"
                value={backupHours}
                onChange={(e) => setBackupHours(parseInt(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#10B981]"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-600 mt-1">
                <span>1 Hour (Peak load shed)</span>
                <span>6 Hours (Standard night)</span>
                <span>12 Hours (Heavy outage)</span>
                <span>24 Hours (Off-grid)</span>
              </div>
            </div>

            {/* ADVANCED VOLTAGE & DOD */}
            <div className="pt-4 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div>
                <label className="block text-zinc-400 uppercase font-bold mb-1">System Voltage</label>
                <select
                  value={systemVoltage}
                  onChange={(e) => setSystemVoltage(parseFloat(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono focus:border-[#F6B91E] outline-none"
                >
                  <option value={25.6}>24V Nominal (25.6V LiFePO4)</option>
                  <option value={51.2}>48V Nominal (51.2V Industry Standard)</option>
                  <option value={200}>200V Commercial High Voltage</option>
                  <option value={400}>400V Industrial Mega-Stack</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase font-bold mb-1">Target Depth of Discharge</label>
                <select
                  value={dod}
                  onChange={(e) => setDod(parseFloat(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono focus:border-[#F6B91E] outline-none"
                >
                  <option value={0.9}>90% DoD (Recommended LiFePO4)</option>
                  <option value={0.8}>80% DoD (Maximum 10,000+ Cycle Lifespan)</option>
                  <option value={0.95}>95% DoD (Extreme Emergency Buffer)</option>
                </select>
              </div>
            </div>

            {/* Quick Live Calc Badge */}
            <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 flex justify-between items-center flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <Cpu className="text-[#F6B91E] animate-pulse" size={18} />
                <span className="font-mono text-xs text-zinc-400">Total Storage Requirement:</span>
              </div>
              <div className="font-mono text-right">
                <span className="text-2xl font-black text-white">{calculatedKWh} kWh</span>
                <span className="text-xs text-emerald-400 font-bold block">({calculatedAh} Ah @ {systemVoltage}V)</span>
              </div>
            </div>

          </div>

          {/* RIGHT: Recommended Solution Card (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#0e0e0e] to-[#050505] border-2 border-[#F6B91E]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            
            {/* Glowing Accent Aura */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#F6B91E]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
              <span className="text-[10px] font-mono uppercase text-[#F6B91E] font-extrabold tracking-widest flex items-center">
                <Sparkles size={12} className="mr-1 animate-spin" />
                RECOMMENDED METALECTRIC MODEL
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 font-mono text-[9px] font-bold uppercase">
                A-Grade Prismatic
              </span>
            </div>

            {/* Product Image & Title */}
            <div className="space-y-3 text-left">
              <div className="h-40 rounded-2xl bg-black border border-zinc-800 overflow-hidden relative flex items-center justify-center p-4">
                <img
                  src={recommendedSystem.image}
                  alt={recommendedSystem.model}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-all"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-mono text-[#F6B91E] font-bold bg-black/80 px-2.5 py-1 rounded-md border border-zinc-800">
                  {recommendedSystem.sku}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase block">{recommendedSystem.type}</span>
                <h3 className="text-xl font-black uppercase text-white tracking-tight">{recommendedSystem.model}</h3>
              </div>
            </div>

            {/* Spec Matrix List */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs bg-zinc-950/80 p-4 rounded-2xl border border-zinc-900">
              <div>
                <span className="block text-zinc-500 text-[9px] uppercase">Recommended Units</span>
                <span className="text-[#F6B91E] font-black text-sm">{recommendedSystem.recommendedUnits} x Parallel Units</span>
              </div>
              <div>
                <span className="block text-zinc-500 text-[9px] uppercase">Nominal Output</span>
                <span className="text-white font-bold">{recommendedSystem.voltage}</span>
              </div>
              <div>
                <span className="block text-zinc-500 text-[9px] uppercase">Full Charge Rate</span>
                <span className="text-emerald-400 font-bold">{recommendedSystem.chargeTime}</span>
              </div>
              <div>
                <span className="block text-zinc-500 text-[9px] uppercase">Cycle Lifespan</span>
                <span className="text-white font-bold">{recommendedSystem.cycleLife}</span>
              </div>
            </div>

            {/* Value Proposition against Lead-Acid */}
            <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-2 text-xs">
              <div className="flex items-center space-x-1.5 text-[#F6B91E] font-mono font-bold text-[11px] uppercase">
                <Scale size={14} />
                <span>VS Traditional Lead-Acid / Tubular:</span>
              </div>
              <ul className="space-y-1 text-zinc-300 font-sans text-xs">
                <li className="flex justify-between">
                  <span>Tubular Batteries Replaced:</span>
                  <span className="font-mono text-red-400 font-bold">{leadAcidEquivalent.batteryCount} Heavy Units</span>
                </li>
                <li className="flex justify-between">
                  <span>Weight Saved:</span>
                  <span className="font-mono text-emerald-400 font-bold">~{leadAcidEquivalent.weightKg - 80} kg lighter</span>
                </li>
                <li className="flex justify-between">
                  <span>15-Yr Lead Replacements Saved:</span>
                  <span className="font-mono text-white font-bold">{leadAcidEquivalent.replacementsIn15Years} Cycles</span>
                </li>
              </ul>
            </div>

            {/* Ideal Applications */}
            <div className="text-xs text-zinc-400 font-mono flex items-center space-x-2">
              <CheckCircle size={14} className="text-emerald-400 flex-shrink-0" />
              <span>Suitable for: {recommendedSystem.idealFor}</span>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleActionClick}
              className="w-full py-4 rounded-xl bg-[#F6B91E] hover:bg-[#e0a410] text-black font-extrabold text-sm transition-all duration-300 shadow-[0_0_25px_rgba(246,185,30,0.3)] flex items-center justify-center space-x-2"
            >
              <span>Request Direct Factory Quote</span>
              <ArrowRight size={16} />
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};
