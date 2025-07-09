import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import {
  MATERIAL_TYPES,
  MATERIAL_SUBTYPES,
  CLIMATE_ZONES,
  SIMULATION_GOALS,
  STATUSES,
  SUSTAINABILITY_LEVELS,
  EQUIPMENT_TYPES,
  REALISM_LEVELS,
} from "@shared/schema";

interface FilterSidebarProps {
  filters: {
    materialType: string;
    materialSubtype: string;
    climateZone: string;
    simulationGoal: string;
    status: string;
    sustainability: string;
    equipment: string;
    realism: string;
  };
  onFilterChange: (filterName: string, value: string) => void;
  methodCount: number;
}

export function FilterSidebar({ filters, onFilterChange, methodCount }: FilterSidebarProps) {
  const resetFilters = () => {
    onFilterChange("materialType", "all");
    onFilterChange("materialSubtype", "all");
    onFilterChange("climateZone", "all");
    onFilterChange("simulationGoal", "all");
    onFilterChange("status", "all");
    onFilterChange("sustainability", "all");
    onFilterChange("equipment", "all");
    onFilterChange("realism", "all");
  };

  const activeFilterCount = Object.values(filters).filter(value => value !== "all" && value !== "").length;

  return (
    <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900">Filter Methods</h2>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {methodCount} methods
            </Badge>
          </div>
        </div>

        {/* Material Type */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-medium flex items-center justify-center">
              0
            </div>
            <Label className="text-sm font-medium text-gray-900">Material Type</Label>
          </div>
          <div className="ml-8 space-y-2">
            {MATERIAL_TYPES.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`material-${type}`}
                  name="materialType"
                  checked={filters.materialType === type}
                  onChange={() => onFilterChange("materialType", type)}
                  className="w-4 h-4 text-blue-600"
                />
                <label htmlFor={`material-${type}`} className="text-sm text-gray-700">
                  {type === "Binder/Mixture" ? "Binder/Mixture" : type}
                </label>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="material-all"
                name="materialType"
                checked={filters.materialType === "all"}
                onChange={() => onFilterChange("materialType", "all")}
                className="w-4 h-4 text-blue-600"
              />
              <label htmlFor="material-all" className="text-sm text-gray-700">
                All Types
              </label>
            </div>
          </div>
        </div>

        {/* Material Subtype */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-medium flex items-center justify-center">
              1
            </div>
            <Label className="text-sm font-medium text-gray-900">Material Subtype</Label>
          </div>
          <div className="ml-8">
            <Select
              value={filters.materialSubtype}
              onValueChange={(value) => onFilterChange("materialSubtype", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Subtypes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subtypes</SelectItem>
                {MATERIAL_SUBTYPES.map((subtype) => (
                  <SelectItem key={subtype} value={subtype}>
                    {subtype}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Climate Zone */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-medium flex items-center justify-center">
              2
            </div>
            <Label className="text-sm font-medium text-gray-900">Climate Zone</Label>
          </div>
          <div className="ml-8">
            <Select
              value={filters.climateZone}
              onValueChange={(value) => onFilterChange("climateZone", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Climate Zones" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Climate Zones</SelectItem>
                {CLIMATE_ZONES.map((zone) => (
                  <SelectItem key={zone} value={zone}>
                    {zone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Simulation Goal */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-medium flex items-center justify-center">
              3
            </div>
            <Label className="text-sm font-medium text-gray-900">Simulation Goal</Label>
          </div>
          <div className="ml-8">
            <Select
              value={filters.simulationGoal}
              onValueChange={(value) => onFilterChange("simulationGoal", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Goals" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Goals</SelectItem>
                {SIMULATION_GOALS.map((goal) => (
                  <SelectItem key={goal} value={goal}>
                    {goal}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Equipment & Considerations */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-medium flex items-center justify-center">
              4
            </div>
            <Label className="text-sm font-medium text-gray-900">Equipment & Considerations</Label>
          </div>
          <div className="ml-8 space-y-3">
            <div>
              <Label className="text-xs text-gray-500 uppercase tracking-wide">Available Equipment</Label>
              <Select
                value={filters.equipment}
                onValueChange={(value) => onFilterChange("equipment", value)}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Any Equipment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Equipment</SelectItem>
                  {EQUIPMENT_TYPES.map((equipment) => (
                    <SelectItem key={equipment} value={equipment}>
                      {equipment}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-gray-500 uppercase tracking-wide">Realism Level</Label>
              <Select
                value={filters.realism}
                onValueChange={(value) => onFilterChange("realism", value)}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Any Realism" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Realism</SelectItem>
                  {REALISM_LEVELS.map((realism) => (
                    <SelectItem key={realism} value={realism}>
                      {realism}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Method Status */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-medium flex items-center justify-center">
              5
            </div>
            <Label className="text-sm font-medium text-gray-900">Method Status</Label>
          </div>
          <div className="ml-8 space-y-2">
            {STATUSES.map((status) => (
              <div key={status} className="flex items-center space-x-2">
                <Checkbox
                  id={`status-${status}`}
                  checked={filters.status === status}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onFilterChange("status", status);
                    } else {
                      onFilterChange("status", "all");
                    }
                  }}
                />
                <label htmlFor={`status-${status}`} className="text-sm text-gray-700">
                  {status}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Sustainability */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-medium flex items-center justify-center">
              6
            </div>
            <Label className="text-sm font-medium text-gray-900">Sustainability</Label>
          </div>
          <div className="ml-8">
            <Select
              value={filters.sustainability}
              onValueChange={(value) => onFilterChange("sustainability", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Any Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Level</SelectItem>
                {SUSTAINABILITY_LEVELS.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Reset Button */}
        {activeFilterCount > 0 && (
          <div className="pt-4 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="w-full"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}