import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import {
  MATERIAL_TYPES,
  MATERIAL_SUBTYPES,
  CLIMATE_ZONES,
  SIMULATION_GOALS,
  STATUSES,
  SUSTAINABILITY_LEVELS,
} from "@shared/schema";

interface FilterSectionProps {
  filters: {
    materialType: string;
    materialSubtype: string;
    climateZone: string;
    simulationGoal: string;
    status: string;
    sustainability: string;
  };
  onFilterChange: (filterName: string, value: string) => void;
}

export function FilterSection({ filters, onFilterChange }: FilterSectionProps) {
  const filterDefinitions = [
    {
      key: "materialType",
      label: "Material Type",
      tooltip: "Choose the type of asphalt material to be tested: Binder (asphalt cement), Mixture (complete asphalt mix), or Binder-Mixture (combination testing)",
      options: MATERIAL_TYPES,
      placeholder: "All Material Types"
    },
    {
      key: "materialSubtype",
      label: "Material Subtype",
      tooltip: "Specific classification of the material: PG (Performance Grade), Modified, Dense-Graded, etc.",
      options: MATERIAL_SUBTYPES,
      placeholder: "All Subtypes"
    },
    {
      key: "climateZone",
      label: "Climate Zone",
      tooltip: "Target climate conditions: Hot (high temperature), Cold (low temperature), Wet (high moisture), Dry (low moisture), or combinations thereof",
      options: CLIMATE_ZONES,
      placeholder: "All Climate Zones"
    },
    {
      key: "simulationGoal",
      label: "Simulation Goal",
      tooltip: "Primary objective of the aging simulation: Short-term (construction), Long-term (service life), Lifecycle (complete performance), UV Resistance, Moisture resistance, etc.",
      options: SIMULATION_GOALS,
      placeholder: "All Goals"
    },
    {
      key: "status",
      label: "Status",
      tooltip: "Current status of the method: Standard (widely accepted), Emerging (new but promising), Experimental (research phase), Obsolete (no longer recommended)",
      options: STATUSES,
      placeholder: "All Status"
    },
    {
      key: "sustainability",
      label: "Sustainability",
      tooltip: "Environmental impact rating: Low (minimal environmental impact), Medium, High, Very High (significant environmental considerations)",
      options: SUSTAINABILITY_LEVELS,
      placeholder: "All Sustainability Levels"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filterDefinitions.map((filter) => (
        <div key={filter.key} className="space-y-2">
          <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {filter.label}
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-gray-400 ml-1 inline cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-sm">{filter.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </Label>
          <Select
            value={filters[filter.key as keyof typeof filters]}
            onValueChange={(value) => onFilterChange(filter.key, value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={filter.placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{filter.placeholder}</SelectItem>
              {filter.options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  );
}
