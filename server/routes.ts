import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all asphalt methods
  app.get("/api/asphalt-methods", async (req, res) => {
    try {
      const methods = await storage.getAllAsphaltMethods();
      res.json(methods);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch asphalt methods" });
    }
  });

  // Get specific asphalt method by ID
  app.get("/api/asphalt-methods/:id", async (req, res) => {
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

  const httpServer = createServer(app);
  return httpServer;
}
