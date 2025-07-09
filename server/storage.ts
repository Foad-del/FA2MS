import { users, asphaltMethods, type User, type InsertUser, type AsphaltMethod, type InsertAsphaltMethod } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllAsphaltMethods(): Promise<AsphaltMethod[]>;
  getAsphaltMethodById(id: number): Promise<AsphaltMethod | undefined>;
  createAsphaltMethod(method: InsertAsphaltMethod): Promise<AsphaltMethod>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private asphaltMethods: Map<number, AsphaltMethod>;
  private currentUserId: number;
  private currentMethodId: number;

  constructor() {
    this.users = new Map();
    this.asphaltMethods = new Map();
    this.currentUserId = 1;
    this.currentMethodId = 1;
    this.initializeAsphaltMethods();
  }

  private initializeAsphaltMethods() {
    const methods: InsertAsphaltMethod[] = [
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

    methods.forEach(method => {
      // Add standards field if not present
      if (!method.standards) {
        method.standards = "NA";
      }
      this.createAsphaltMethod(method);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllAsphaltMethods(): Promise<AsphaltMethod[]> {
    return Array.from(this.asphaltMethods.values());
  }

  async getAsphaltMethodById(id: number): Promise<AsphaltMethod | undefined> {
    return this.asphaltMethods.get(id);
  }

  async createAsphaltMethod(insertMethod: InsertAsphaltMethod): Promise<AsphaltMethod> {
    const id = this.currentMethodId++;
    const method: AsphaltMethod = { ...insertMethod, id };
    this.asphaltMethods.set(id, method);
    return method;
  }
}

export const storage = new MemStorage();
