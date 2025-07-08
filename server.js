// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  asphaltMethods;
  currentUserId;
  currentMethodId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.asphaltMethods = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentMethodId = 1;
    this.initializeAsphaltMethods();
  }
  initializeAsphaltMethods() {
    const methods = [
      {
        method: "TFOT",
        materialType: "Binder",
        materialSubtype: "All",
        category: "Thermal",
        realism: "Low",
        equipment: "TFOT Oven",
        status: "Obsolete",
        climateZone: "All",
        simulationGoal: "Short-Term",
        sustainability: "Medium",
        standards: "ASTM D1754, EN 12607-2, JTG E20-T0609"
      },
      {
        method: "RTFOT",
        materialType: "Binder",
        materialSubtype: "All",
        category: "Thermal",
        realism: "Medium - Low for PMA and WMA, None for COLD and OGFC",
        equipment: "RTFOT Oven",
        status: "Standard",
        climateZone: "All",
        simulationGoal: "Short-Term/Long-Term",
        sustainability: "Medium",
        standards: "ASTM D2872, AASHTO T240, UNE-EN 12607-1, JTG E20 T 0610, AASHTO TP70"
      },
      {
        method: "PAV",
        materialType: "Binder/Mixture",
        materialSubtype: "All",
        category: "Thermal",
        realism: "Medium - Low for PMA, Low-Medium for WMA, None for COLD",
        equipment: "PAV",
        status: "Standard",
        climateZone: "All",
        simulationGoal: "Short-Term/Long-Term",
        sustainability: "Medium",
        standards: "ASTM D6521, ASTM PS 36, AASHTO R 28, JTG E20, UNE-EN 14769"
      },
      {
        method: "HiPAT",
        materialType: "Binder",
        materialSubtype: "SBS",
        category: "Thermal",
        realism: "High",
        equipment: "Modified PAV",
        status: "Emerging",
        climateZone: "All",
        simulationGoal: "Long-Term",
        sustainability: "Low",
        standards: "EN 14769 (draft)"
      },
      {
        method: "RCAT",
        materialType: "Binder",
        materialSubtype: "SBS",
        category: "Thermal",
        realism: "High - Low/Moderate for PMB, Moderate for CRMB, Medium for WMA, None for OGFC",
        equipment: "RCAT Device",
        status: "Standard",
        climateZone: "All",
        simulationGoal: "Short-Term/Long-Term",
        sustainability: "Low",
        standards: "EN 15323 (variant), CE TC 336"
      },
      {
        method: "VBA",
        materialType: "Binder",
        materialSubtype: "SBS",
        category: "Thermal/Other",
        realism: "High - Partial for OGFC",
        equipment: "VBA",
        status: "Emerging",
        climateZone: "All",
        simulationGoal: "Long-Term",
        sustainability: "Medium",
        standards: "NA"
      },
      {
        method: "IDT",
        materialType: "Binder",
        materialSubtype: "SBS",
        category: "Thermal",
        realism: "High",
        equipment: "Pressure Vessel",
        status: "Experimental",
        climateZone: "All",
        simulationGoal: "Long-Term",
        sustainability: "Medium",
        standards: "NA"
      },
      {
        method: "STOA",
        materialType: "Mixture",
        materialSubtype: "All Mixtures",
        category: "Thermal",
        realism: "Medium - Low for PMA, Low-Medium for WMA, None for COLD",
        equipment: "Oven",
        status: "Standard",
        climateZone: "All",
        simulationGoal: "Short-Term",
        sustainability: "Medium",
        standards: "AASHTO R 30, SHRP-A-383, T 0734 (JTG E20), CEN/TS 12697-52, NCHRP 815"
      },
      {
        method: "LTOA",
        materialType: "Mixture",
        materialSubtype: "All Mixtures",
        category: "Thermal",
        realism: "High - Low for PMA, None for COLD",
        equipment: "Oven",
        status: "Standard",
        climateZone: "Temperate",
        simulationGoal: "Long-Term",
        sustainability: "Low",
        standards: "AASHTO R30, T 0734 (JTG E20), JTJ 052, NCHRP Report 871, CEN/TS 12697-52"
      },
      {
        method: "Oven Aging",
        materialType: "Binder",
        materialSubtype: "All",
        category: "Thermal",
        realism: "Medium",
        equipment: "Oven",
        status: "Standard",
        climateZone: "All",
        simulationGoal: "Short-Term",
        sustainability: "Medium",
        standards: "ASTM D2872, ASTM D6521"
      },
      {
        method: "Dynamic Thermal Aging",
        materialType: "Binder/Mixture",
        materialSubtype: "All",
        category: "Thermal",
        realism: "Medium",
        equipment: "TFOT/Dynamic Chamber",
        status: "Experimental",
        climateZone: "All",
        simulationGoal: "Lifecycle",
        sustainability: "Medium",
        standards: "NA"
      },
      {
        method: "Thermal Cycling",
        materialType: "Binder",
        materialSubtype: "Cold Regions",
        category: "Thermal",
        realism: "High",
        equipment: "Thermal Cycling Setup",
        status: "Experimental",
        climateZone: "Cold",
        simulationGoal: "Lifecycle",
        sustainability: "Low",
        standards: "NA"
      },
      {
        method: "UV Chamber",
        materialType: "Binder/Mixture",
        materialSubtype: "OGFC",
        category: "UV",
        realism: "High",
        equipment: "UV Chamber",
        status: "Standard",
        climateZone: "UVThermal",
        simulationGoal: "UV Resistance",
        sustainability: "Medium",
        standards: "ASTM G154"
      },
      {
        method: "Accelerated Weathering Machine",
        materialType: "Binder/Mixture",
        materialSubtype: "All",
        category: "Thermal/UV/Moisture",
        realism: "High",
        equipment: "QUV, APWS, Weatherometer, Weathering Oven",
        status: "Standard",
        climateZone: "UVThermal",
        simulationGoal: "UV Resistance",
        sustainability: "Medium",
        standards: "ASTM G154 / G155"
      },
      {
        method: "TEAGE",
        materialType: "Mixture",
        materialSubtype: "All",
        category: "UV/Moisture",
        realism: "Very High - High for PMB, CRMB, COLD, WMA, Moderate for OGFC",
        equipment: "Climate Chamber",
        status: "Emerging",
        climateZone: "All",
        simulationGoal: "Lifecycle",
        sustainability: "Low",
        standards: "NA"
      },
      {
        method: "Bespoke Aging",
        materialType: "Binder",
        materialSubtype: "PMB",
        category: "Thermal",
        realism: "Very High",
        equipment: "Custom Setup",
        status: "Emerging",
        climateZone: "All",
        simulationGoal: "Lifecycle",
        sustainability: "Low"
      },
      {
        method: "Photocatalytic Degradation",
        materialType: "Binder",
        materialSubtype: "SBS",
        category: "UV",
        realism: "High",
        equipment: "UV Source",
        status: "Experimental",
        climateZone: "Hot",
        simulationGoal: "UV Resistance",
        sustainability: "Medium"
      },
      {
        method: "Natural Aging",
        materialType: "Binder",
        materialSubtype: "All",
        category: "UV",
        realism: "Very High",
        equipment: "Natural Exposure",
        status: "Standard",
        climateZone: "All",
        simulationGoal: "Lifecycle",
        sustainability: "Very High"
      },
      {
        method: "Steam Aging",
        materialType: "Mixture",
        materialSubtype: "OGFC",
        category: "Moisture",
        realism: "High",
        equipment: "Steam Oven",
        status: "Experimental",
        climateZone: "Hot",
        simulationGoal: "Moisture",
        sustainability: "Medium"
      },
      {
        method: "Water Aging",
        materialType: "Binder",
        materialSubtype: "PMB",
        category: "Moisture",
        realism: "High",
        equipment: "Water Bath",
        status: "Standard",
        climateZone: "Hot",
        simulationGoal: "Moisture",
        sustainability: "High"
      },
      {
        method: "VAPro",
        materialType: "Mixture",
        materialSubtype: "CRMB",
        category: "Thermal",
        realism: "High",
        equipment: "VAPro",
        status: "Emerging",
        climateZone: "Hot",
        simulationGoal: "Lifecycle",
        sustainability: "Low"
      },
      {
        method: "Vacuum Furnace",
        materialType: "Mixture",
        materialSubtype: "SMA",
        category: "Thermal",
        realism: "Very High",
        equipment: "Vacuum Furnace",
        status: "Experimental",
        climateZone: "All",
        simulationGoal: "Moisture",
        sustainability: "Low"
      },
      {
        method: "POVs",
        materialType: "Binder",
        materialSubtype: "WMA",
        category: "Thermal",
        realism: "High",
        equipment: "POVs",
        status: "Emerging",
        climateZone: "Hot",
        simulationGoal: "Long-Term",
        sustainability: "Low"
      },
      {
        method: "Environmental Room",
        materialType: "Mixture",
        materialSubtype: "Cold Mix",
        category: "Moisture",
        realism: "Very High",
        equipment: "Environmental Chamber",
        status: "Emerging",
        climateZone: "All",
        simulationGoal: "Lifecycle",
        sustainability: "Low"
      },
      {
        method: "Aging Cycles",
        materialType: "Binder",
        materialSubtype: "All",
        category: "Thermal",
        realism: "High",
        equipment: "RTFOT/PAV/Thermal Chamber",
        status: "Emerging",
        climateZone: "All",
        simulationGoal: "Lifecycle",
        sustainability: "Low"
      },
      {
        method: "Anaerobic Aging",
        materialType: "Binder",
        materialSubtype: "SBS",
        category: "Other",
        realism: "Medium",
        equipment: "Anaerobic Setup",
        status: "Experimental",
        climateZone: "All",
        simulationGoal: "Long-Term",
        sustainability: "High"
      },
      {
        method: "Microwave Aging",
        materialType: "Binder",
        materialSubtype: "CRMB",
        category: "Other",
        realism: "Medium",
        equipment: "Microwave Chamber",
        status: "Experimental",
        climateZone: "All",
        simulationGoal: "Short-Term",
        sustainability: "High"
      },
      {
        method: "SAT/USAT",
        materialType: "Binder",
        materialSubtype: "PMB",
        category: "Other",
        realism: "High",
        equipment: "SAT Plate",
        status: "Standard",
        climateZone: "All",
        simulationGoal: "Long-Term",
        sustainability: "High"
      },
      {
        method: "RRT",
        materialType: "Binder",
        materialSubtype: "All",
        category: "Other",
        realism: "Low",
        equipment: "Rolling Bottle",
        status: "Obsolete",
        climateZone: "All",
        simulationGoal: "Short-Term",
        sustainability: "Medium"
      },
      {
        method: "RFT",
        materialType: "Binder",
        materialSubtype: "All",
        category: "Other",
        realism: "Low",
        equipment: "RFT Equipment",
        status: "Obsolete",
        climateZone: "All",
        simulationGoal: "Short-Term",
        sustainability: "Medium"
      },
      {
        method: "SMT",
        materialType: "Binder",
        materialSubtype: "All",
        category: "Other",
        realism: "Medium",
        equipment: "Thin Film Setup",
        status: "Obsolete",
        climateZone: "All",
        simulationGoal: "Short-Term",
        sustainability: "Medium"
      },
      {
        method: "Simple Stove Aging",
        materialType: "Binder",
        materialSubtype: "All",
        category: "Other",
        realism: "Low",
        equipment: "Stove",
        status: "Obsolete",
        climateZone: "All",
        simulationGoal: "Short-Term",
        sustainability: "High"
      },
      {
        method: "Normal Aging",
        materialType: "Binder",
        materialSubtype: "All",
        category: "Other",
        realism: "Medium",
        equipment: "Outdoor Setup",
        status: "Experimental",
        climateZone: "Temperate",
        simulationGoal: "Lifecycle",
        sustainability: "Very High"
      },
      {
        method: "Field Aging",
        materialType: "Binder",
        materialSubtype: "All",
        category: "Field",
        realism: "Very High",
        equipment: "Field",
        status: "Standard",
        climateZone: "All",
        simulationGoal: "Lifecycle",
        sustainability: "High"
      },
      {
        method: "TODT",
        materialType: "Binder",
        materialSubtype: "PMB",
        category: "Thermal",
        realism: "High",
        equipment: "Tilted Oven",
        status: "Obsolete",
        climateZone: "Hot",
        simulationGoal: "Short-Term",
        sustainability: "Medium"
      },
      {
        method: "RMFOT",
        materialType: "Binder",
        materialSubtype: "All",
        category: "Thermal",
        realism: "Medium",
        equipment: "RTFOT + Capillary",
        status: "Obsolete",
        climateZone: "Temperate",
        simulationGoal: "Short-Term",
        sustainability: "Low"
      },
      {
        method: "TFAAT",
        materialType: "Binder",
        materialSubtype: "All",
        category: "Thermal",
        realism: "High",
        equipment: "Column Oxidation Chamber",
        status: "Experimental",
        climateZone: "All",
        simulationGoal: "Long-Term",
        sustainability: "Medium"
      },
      {
        method: "POB",
        materialType: "Binder",
        materialSubtype: "All",
        category: "Thermal",
        realism: "Very High",
        equipment: "Pressure Bomb",
        status: "Experimental",
        climateZone: "All",
        simulationGoal: "Long-Term",
        sustainability: "Medium"
      },
      {
        method: "SAFT",
        materialType: "Binder",
        materialSubtype: "PMB",
        category: "Thermal",
        realism: "Medium",
        equipment: "Stirred Airflow Reactor",
        status: "Experimental",
        climateZone: "All",
        simulationGoal: "Short-Term",
        sustainability: "Low"
      },
      {
        method: "Laboratory Aging",
        materialType: "Mixture",
        materialSubtype: "All",
        category: "Thermal",
        realism: "Very High",
        equipment: "Oven / Environmental Chamber",
        status: "Experimental",
        climateZone: "All",
        simulationGoal: "Long-Term",
        sustainability: "High"
      },
      {
        method: "NOx Degradation (Photocatalytic Degradation)",
        materialType: "Binder",
        materialSubtype: "SBS",
        category: "UV",
        realism: "High",
        equipment: "Photocatalytic Reactor",
        status: "Experimental",
        climateZone: "Hot",
        simulationGoal: "UV Resistance",
        sustainability: "Very High"
      },
      {
        method: "Low-Temperature Hardening",
        materialType: "Binder",
        materialSubtype: "Bio-Asphalt",
        category: "Thermal",
        realism: "Medium",
        equipment: "Low-Temperature Chamber",
        status: "Experimental",
        climateZone: "Cold",
        simulationGoal: "Short-Term",
        sustainability: "Medium"
      }
    ];
    methods.forEach((method) => {
      if (!method.standards) {
        method.standards = "NA";
      }
      this.createAsphaltMethod(method);
    });
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async getAllAsphaltMethods() {
    return Array.from(this.asphaltMethods.values());
  }
  async getAsphaltMethodById(id) {
    return this.asphaltMethods.get(id);
  }
  async createAsphaltMethod(insertMethod) {
    const id = this.currentMethodId++;
    const method = { ...insertMethod, id };
    this.asphaltMethods.set(id, method);
    return method;
  }
};
var storage = new MemStorage();

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/asphalt-methods", async (req, res) => {
    try {
      const methods = await storage.getAllAsphaltMethods();
      res.json(methods);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch asphalt methods" });
    }
  });
  app2.get("/api/asphalt-methods/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid method ID" });
      }
      const method = await storage.getAsphaltMethodById(id);
      if (!method) {
        return res.status(404).json({ message: "Method not found" });
      }
      res.json(method);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch asphalt method" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  base: "/FA2MS/",
  // ✅ Important for GitHub Pages deployment
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
