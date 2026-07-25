import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;
const DB_FILE = path.join(process.cwd(), "src", "db.json");

app.use(express.json());

// Initialize Local JSON DB with realistic, premium data if it doesn't exist
const initialData = {
  products: [
    {
      id: "prod-1",
      name: "Alpha Ampere LiFe-48200 Pro",
      slug: "alpha-ampere-life-48200-pro",
      sku: "AA-LFP-48V-200AH",
      shortDescription: "Ultra-high performance 9.6kWh LiFePO₄ wall-mount energy storage system with integrated 200A smart Bluetooth BMS.",
      longDescription: "The Alpha Ampere LiFe-48200 Pro is our flagship wall-mounted energy storage system designed to deliver bulletproof reliability, ultra-long service life, and maximum efficiency for premium homes and critical commercial solar configurations. Engineered with automotive-grade Prismatic Grade-A LiFePO4 cells, this unit is capable of continuous high discharge currents and boasts an exceptional thermal threshold. The integrated smart BMS provides active balancing, dual temperature protection, and real-time Bluetooth telemetry directly to your smartphone.",
      price: 495000,
      discount: 10,
      category: "Wall Mount Batteries",
      subcategory: "Solar Batteries",
      tags: ["48V", "Premium", "LiFePO4", "Wall Mount"],
      voltage: "48V (51.2V Nominal)",
      capacity: "200Ah (9.6 kWh)",
      dimensions: "650 x 480 x 220 mm",
      weight: "84 kg",
      warranty: "5 Years",
      stock: 14,
      status: "In Stock",
      featured: true,
      specifications: [
        { label: "Nominal Voltage", value: "51.2 V" },
        { label: "Nominal Capacity", value: "200 Ah" },
        { label: "Total Energy", value: "10.24 kWh (9.6 kWh Usable)" },
        { label: "Chemistry", value: "Lithium Iron Phosphate (LiFePO4)" },
        { label: "Cell Type", value: "Premium Prismatic Grade A" },
        { label: "Cycle Life", value: "8,000+ Cycles @ 80% DoD" },
        { label: "Max Charge Current", value: "150 A" },
        { label: "Max Discharge Current", value: "200 A Continuous" },
        { label: "Communication Protocols", value: "CAN, RS485, RS232, Bluetooth" }
      ],
      downloads: [
        { title: "Datasheet (PDF)", url: "#" },
        { title: "User Manual (PDF)", url: "#" },
        { title: "Warranty Card (PDF)", url: "#" }
      ],
      applications: ["Solar Systems", "UPS Backup", "Residential Backup", "Telecom Backup"],
      thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600",
      gallery: [
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      id: "prod-2",
      name: "Alpha Ampere Rack-Rack 48100",
      slug: "alpha-ampere-rack-48100",
      sku: "AA-LFP-48V-100AH-R",
      shortDescription: "Enterprise grade 5.12kWh 19-inch server rack Lithium battery designed for telecom servers, data centers, and heavy UPS configurations.",
      longDescription: "Engineered for robust vertical stacking and high-density power rooms, the Rack-Rack 48100 offers standardized 19-inch 3U rack compatibility, absolute fire-safe chemistry, and seamless multi-unit communication. Standard CAN and RS485 protocol engines integrate flawlessly with premium hybrid solar inverters including Victron, Growatt, SMA, and Deye.",
      price: 275000,
      discount: 5,
      category: "Rack Batteries",
      subcategory: "Solar Batteries",
      tags: ["48V", "Rack Mount", "Data Center", "100Ah"],
      voltage: "48V (51.2V Nominal)",
      capacity: "100Ah (5.12 kWh)",
      dimensions: "442 x 480 x 133 mm (3U)",
      weight: "43 kg",
      warranty: "5 Years",
      stock: 35,
      status: "In Stock",
      featured: true,
      specifications: [
        { label: "Nominal Voltage", value: "51.2 V" },
        { label: "Nominal Capacity", value: "100 Ah" },
        { label: "Total Energy", value: "5.12 kWh" },
        { label: "Cycle Life", value: "6,500+ Cycles @ 80% DoD" },
        { label: "Rack Standard", value: "19-inch 3U Compatible" },
        { label: "Cell Configuration", value: "16S 1P" },
        { label: "Standard Discharge", value: "50 A" },
        { label: "Max Discharge", value: "100 A" }
      ],
      downloads: [
        { title: "Datasheet (PDF)", url: "#" },
        { title: "Installation Manual", url: "#" }
      ],
      applications: ["Telecom Backup", "Data Centers", "Solar Farms", "Industrial Backup"],
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600",
      gallery: [
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      id: "prod-3",
      name: "Alpha Power-Base 12200 Slim",
      slug: "alpha-power-base-12200-slim",
      sku: "AA-LFP-12V-200AH",
      shortDescription: "Ultra-safe 12V 200Ah deep-cycle marine and RV lithium replacement for standard lead-acid batteries with smart auto-heating BMS.",
      longDescription: "Replace dual heavy lead-acid batteries with a single, highly durable, zero-maintenance 12V 200Ah Alpha Power-Base Slim. Weighing less than half of an equivalent AGM battery, it delivers double the runtime and is ideal for marine yachts, high-end RVs, off-grid cabins, and mobile medical applications.",
      price: 145000,
      discount: 0,
      category: "Portable Power",
      subcategory: "Custom Battery Packs",
      tags: ["12V", "Marine", "RV", "200Ah"],
      voltage: "12V (12.8V Nominal)",
      capacity: "200Ah (2.56 kWh)",
      dimensions: "485 x 170 x 240 mm",
      weight: "22 kg",
      warranty: "5 Years",
      stock: 18,
      status: "In Stock",
      featured: false,
      specifications: [
        { label: "Nominal Voltage", value: "12.8 V" },
        { label: "Nominal Capacity", value: "200 Ah" },
        { label: "Total Energy", value: "2.56 kWh" },
        { label: "Weight", value: "22 kg" },
        { label: "Max Continuous Discharge", value: "150 A" },
        { label: "Waterproofing", value: "IP65 Rated Sealed Enclosure" }
      ],
      downloads: [
        { title: "Datasheet (PDF)", url: "#" }
      ],
      applications: ["Marine", "Agriculture", "Medical Equipment", "UPS Backup"],
      thumbnail: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&q=80&w=600",
      gallery: [
        "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&q=80&w=800"
      ]
    }
  ],
  blogs: [
    {
      id: "blog-1",
      title: "Why LiFePO₄ is the Ultimate Lithium Chemistry for Pakistan's Extreme Climate",
      slug: "lifepo4-pakistan-extreme-climate",
      content: "Pakistan experiences some of the most brutal summers globally, with ambient temperatures in Sindh and Punjab frequently scaling past 45°C. For industrial plants and high-end residential energy backups, traditional Lithium-Ion (NMC) or Lead-Acid batteries represent massive hazards.\n\n### The Science of LiFePO₄\nLithium Iron Phosphate (LiFePO4) stands apart due to its extreme thermal stability. Unlike NMC cells which can enter thermal runaway at ~150°C, LiFePO₄ thermal runaway threshold sits robustly at 270°C. Additionally, the chemistry delivers over 8,000 cycles without significant degradation, whereas Lead-Acid batteries give up after 300-500 cycles under typical high-temperature operations.\n\nAt **Metalectric PK**, our battery packs feature custom-molded cellular spacer channels and smart thermal cutoffs, ensuring absolute safety even during extended blackouts in June.",
      category: "Lithium",
      tags: ["LiFePO4", "Battery Safety", "Pakistan climate"],
      author: "Engr. Harris Nadeem (Director of R&D)",
      featuredImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600",
      createdAt: "2026-07-20T10:30:00Z",
      readTime: "5 min read"
    },
    {
      id: "blog-2",
      title: "A Comprehensive Guide to Sizing Your Solar Battery Backup System",
      slug: "comprehensive-guide-sizing-solar-battery",
      content: "Sizing your lithium battery storage incorrectly can either result in wasted money or a system that shuts down when you need it most. This guide outlines the simple engineering formulas our team uses to design customized residential backups.\n\n### Step 1: Calculate Your Essential Load\nIdentify the wattage of appliances you must run during a power outage:\n- 1 Inverter AC (Low frequency mode): 1000W\n- 1 Refrigerator (Inverter): 200W\n- 4 Fans: 240W\n- 10 LED bulbs: 100W\n*Total Peak Load = 1,540 Watts*\n\n### Step 2: Determine Required Autonomy\nIf you require 6 hours of backup through the night, the raw energy required is:\n`1,540W x 6 hours = 9,240 Wh = 9.24 kWh`.\n\nUsing a 48V nominal system, you would need `9,240Wh / 51.2V = 180Ah` capacity. An Alpha Ampere **LiFe-48200 Pro** (9.6kWh) is the perfect fit, providing a safe margin of protection.",
      category: "Solar",
      tags: ["Solar Batteries", "Battery Sizing", "Guide"],
      author: "M. Farhan Khan (Lead Systems Engineer)",
      featuredImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=600",
      createdAt: "2026-07-22T14:15:00Z",
      readTime: "8 min read"
    }
  ],
  quotes: [
    {
      id: "q-1",
      product: "Alpha Ampere LiFe-48200 Pro",
      capacity: "200Ah (9.6 kWh)",
      voltage: "48V",
      quantity: 2,
      industry: "Residential Backup",
      location: "Lahore, DHA Phase 6",
      requirements: "Require wall-mounting battery bank integrated with our existing Deye 10kW hybrid inverter. Please provide installation pricing.",
      name: "Sarmad Alvi",
      email: "sarmad.alvi@gmail.com",
      phone: "+92 300 1234567",
      company: "Alvi Residences",
      status: "Pending",
      createdAt: "2026-07-24T18:22:00Z"
    }
  ],
  dealers: [
    {
      id: "d-1",
      companyName: "Solux Energies PK",
      contactPerson: "Kamran Shah",
      email: "dealership@solux.pk",
      phone: "+92 321 9876543",
      city: "Islamabad / Rawalpindi",
      businessType: "Solar EPC Installer",
      experience: "5+ years installing tier-1 solar solutions in Islamabad capital territory.",
      status: "Pending",
      createdAt: "2026-07-23T09:45:00Z"
    }
  ],
  messages: [
    {
      id: "msg-1",
      name: "Dr. Ayesha Malik",
      email: "ayesha@malikhospital.com",
      subject: "Custom Medical Equipment Backup Design",
      message: "We operate a specialized diagnostic clinic in Karachi and require bulletproof 24V lithium battery packs for critical ultrasound systems. Can your engineering team customize these?",
      status: "Inbox",
      createdAt: "2026-07-24T21:10:00Z"
    }
  ],
  settings: {
    logo: "Alpha Ampere",
    favicon: "",
    theme: "dark",
    socialLinks: {
      facebook: "https://facebook.com/metalectricpk",
      linkedin: "https://linkedin.com/company/metalectricpk",
      twitter: "https://twitter.com/metalectricpk"
    },
    contactInfo: {
      phone: "+92 42 111 267 373",
      email: "info@metalectricpk.com",
      officeAddress: "Block H-3, Johar Town, Lahore, Pakistan",
      factoryAddress: "Industrial Area, Sundar Industrial Estate, Lahore, Pakistan"
    },
    whatsAppNumber: "+923000673733"
  }
};

function readDB() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const dir = path.dirname(DB_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
      return initialData;
    }
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading db.json", err);
    return initialData;
  }
}

function writeDB(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing db.json", err);
  }
}

// REST API Routes

// Authentication Endpoint (Simple JWT Simulation)
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "admin@metalectricpk.com" && password === "admin") {
    res.json({
      success: true,
      user: {
        email: "admin@metalectricpk.com",
        role: "Admin",
        name: "Metalectric R&D Admin"
      },
      token: "mock-jwt-token-alpha-ampere-2026"
    });
  } else {
    res.status(401).json({ success: false, message: "Invalid email or password" });
  }
});

// Products API
app.get("/api/products", (req, res) => {
  const db = readDB();
  res.json(db.products);
});

app.post("/api/products", (req, res) => {
  const db = readDB();
  const newProduct = {
    id: "prod-" + Date.now(),
    ...req.body
  };
  db.products.push(newProduct);
  writeDB(db);
  res.status(201).json(newProduct);
});

app.put("/api/products/:id", (req, res) => {
  const db = readDB();
  const idx = db.products.findIndex((p: any) => p.id === req.params.id);
  if (idx !== -1) {
    db.products[idx] = { ...db.products[idx], ...req.body };
    writeDB(db);
    res.json(db.products[idx]);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

app.delete("/api/products/:id", (req, res) => {
  const db = readDB();
  const filtered = db.products.filter((p: any) => p.id !== req.params.id);
  db.products = filtered;
  writeDB(db);
  res.json({ success: true });
});

// Blogs API
app.get("/api/blogs", (req, res) => {
  const db = readDB();
  res.json(db.blogs);
});

app.post("/api/blogs", (req, res) => {
  const db = readDB();
  const newBlog = {
    id: "blog-" + Date.now(),
    createdAt: new Date().toISOString(),
    ...req.body
  };
  db.blogs.push(newBlog);
  writeDB(db);
  res.status(201).json(newBlog);
});

app.put("/api/blogs/:id", (req, res) => {
  const db = readDB();
  const idx = db.blogs.findIndex((b: any) => b.id === req.params.id);
  if (idx !== -1) {
    db.blogs[idx] = { ...db.blogs[idx], ...req.body };
    writeDB(db);
    res.json(db.blogs[idx]);
  } else {
    res.status(404).json({ error: "Blog not found" });
  }
});

app.delete("/api/blogs/:id", (req, res) => {
  const db = readDB();
  db.blogs = db.blogs.filter((b: any) => b.id !== req.params.id);
  writeDB(db);
  res.json({ success: true });
});

// Quote Requests API
app.get("/api/quotes", (req, res) => {
  const db = readDB();
  res.json(db.quotes || []);
});

app.post("/api/quotes", (req, res) => {
  const db = readDB();
  const newQuote = {
    id: "q-" + Date.now(),
    status: "Pending",
    createdAt: new Date().toISOString(),
    ...req.body
  };
  if (!db.quotes) db.quotes = [];
  db.quotes.push(newQuote);
  writeDB(db);
  res.status(201).json(newQuote);
});

app.put("/api/quotes/:id", (req, res) => {
  const db = readDB();
  const idx = db.quotes.findIndex((q: any) => q.id === req.params.id);
  if (idx !== -1) {
    db.quotes[idx] = { ...db.quotes[idx], ...req.body };
    writeDB(db);
    res.json(db.quotes[idx]);
  } else {
    res.status(404).json({ error: "Quote not found" });
  }
});

// Dealer Applications API
app.get("/api/dealers", (req, res) => {
  const db = readDB();
  res.json(db.dealers || []);
});

app.post("/api/dealers", (req, res) => {
  const db = readDB();
  const newDealer = {
    id: "d-" + Date.now(),
    status: "Pending",
    createdAt: new Date().toISOString(),
    ...req.body
  };
  if (!db.dealers) db.dealers = [];
  db.dealers.push(newDealer);
  writeDB(db);
  res.status(201).json(newDealer);
});

app.put("/api/dealers/:id", (req, res) => {
  const db = readDB();
  const idx = db.dealers.findIndex((d: any) => d.id === req.params.id);
  if (idx !== -1) {
    db.dealers[idx] = { ...db.dealers[idx], ...req.body };
    writeDB(db);
    res.json(db.dealers[idx]);
  } else {
    res.status(404).json({ error: "Dealer application not found" });
  }
});

// Messages API
app.get("/api/messages", (req, res) => {
  const db = readDB();
  res.json(db.messages || []);
});

app.post("/api/messages", (req, res) => {
  const db = readDB();
  const newMsg = {
    id: "msg-" + Date.now(),
    status: "Inbox",
    createdAt: new Date().toISOString(),
    ...req.body
  };
  if (!db.messages) db.messages = [];
  db.messages.push(newMsg);
  writeDB(db);
  res.status(201).json(newMsg);
});

app.put("/api/messages/:id", (req, res) => {
  const db = readDB();
  const idx = db.messages.findIndex((m: any) => m.id === req.params.id);
  if (idx !== -1) {
    db.messages[idx] = { ...db.messages[idx], ...req.body };
    writeDB(db);
    res.json(db.messages[idx]);
  } else {
    res.status(404).json({ error: "Message not found" });
  }
});

// Settings API
app.get("/api/settings", (req, res) => {
  const db = readDB();
  res.json(db.settings);
});

app.put("/api/settings", (req, res) => {
  const db = readDB();
  db.settings = { ...db.settings, ...req.body };
  writeDB(db);
  res.json(db.settings);
});

// Set up server listening and Vite configuration
async function startServer() {
  // Mount Vite middleware for development or serve build assets in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Metalectric PK] Server started on http://localhost:${PORT}`);
  });
}

startServer();
