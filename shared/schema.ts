import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const asphaltMethods = pgTable("asphalt_methods", {
  id: serial("id").primaryKey(),
  method: text("method").notNull(),
  materialType: text("material_type").notNull(),
  materialSubtype: text("material_subtype").notNull(),
  category: text("category").notNull(),
  realism: text("realism").notNull(),
  equipment: text("equipment").notNull(),
  status: text("status").notNull(),
  climateZone: text("climate_zone").notNull(),
  simulationGoal: text("simulation_goal").notNull(),
  sustainability: text("sustainability").notNull(),
  standards: text("standards"),
});

export const insertAsphaltMethodSchema = createInsertSchema(asphaltMethods).omit({
  id: true,
});

export type InsertAsphaltMethod = z.infer<typeof insertAsphaltMethodSchema>;
export type AsphaltMethod = typeof asphaltMethods.$inferSelect;

// Filter options for the UI
export const MATERIAL_TYPES = ["Binder", "Mixture", "Binder/Mixture"] as const;
export const MATERIAL_SUBTYPES = ["All", "SBS", "CRMB", "PMB", "OGFC", "SMA", "WMA", "Cold Mix", "Bio-Asphalt", "Cold Regions", "Emulsion"] as const;
export const CATEGORIES = ["Thermal", "UV", "Moisture", "Other", "Field", "Thermal/UV/Moisture", "Thermal/Other", "Thermal/Moisture", "UV/Moisture"] as const;
export const STATUSES = ["Standard", "Emerging", "Experimental", "Obsolete"] as const;
export const CLIMATE_ZONES = ["All", "Hot", "Cold", "Temperate", "UVThermal", "FreezeThaw", "Hydrothermal", "High-UV", "Urban / High-UV", "Hot Desert", "Cold Regions"] as const;
export const SIMULATION_GOALS = ["Short-Term", "Long-Term", "Short-Term/Long-Term", "Lifecycle", "UV Resistance", "Moisture", "Thermal", "Accelerated Aging", "Environmental"] as const;
export const SUSTAINABILITY_LEVELS = ["Low", "Medium", "High", "Very High"] as const;
export const EQUIPMENT_TYPES = ["TFOT Oven", "RTFOT Oven", "PAV", "Modified PAV", "RCAT Device", "VBA", "Pressure Vessel", "Oven", "UV Chamber", "Climate Chamber", "QUV", "Steam Oven", "Water Bath", "Environmental Chamber"] as const;
export const REALISM_LEVELS = ["Low", "Medium", "High", "Very High"] as const;

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
