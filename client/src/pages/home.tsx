import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Construction, RotateCcw, Search, Filter, Settings } from "lucide-react";
import { FilterSidebar } from "@/components/filter-sidebar";
import { MethodCard } from "@/components/method-card";
import type { AsphaltMethod } from "@shared/schema";

interface FilterValues {
  materialType: string;
  materialSubtype: string;
  climateZone: string;
  simulationGoal: string;
  status: string;
  sustainability: string;
  equipment: string;
  realism: string;
}

export default function Home() {
  const [filters, setFilters] = useState<FilterValues>({
    materialType: "all",
    materialSubtype: "all",
    climateZone: "all",
    simulationGoal: "all",
    status: "all",
    sustainability: "all",
    equipment: "all",
    realism: "all",
  });

  const { data: methods = [], isLoading, error } = useQuery<AsphaltMethod[]>({
    queryKey: ["/api/asphalt-methods"],
  });

  const filteredMethods = useMemo(() => {
    return methods.filter((method) => {
      return (
        (!filters.materialType || filters.materialType === "all" || method.materialType === filters.materialType) &&
        (!filters.materialSubtype || filters.materialSubtype === "all" || method.materialSubtype === filters.materialSubtype) &&
        (!filters.climateZone || filters.climateZone === "all" || method.climateZone === filters.climateZone || method.climateZone === "Multiple") &&
        (!filters.simulationGoal || filters.simulationGoal === "all" || method.simulationGoal === filters.simulationGoal || method.simulationGoal === "Multiple") &&
        (!filters.status || filters.status === "all" || method.status === filters.status) &&
        (!filters.sustainability || filters.sustainability === "all" || method.sustainability === filters.sustainability) &&
        (!filters.equipment || filters.equipment === "all" || method.equipment.includes(filters.equipment)) &&
        (!filters.realism || filters.realism === "all" || method.realism.toLowerCase().includes(filters.realism.toLowerCase()))
      );
    });
  }, [methods, filters]);

  const handleFilterChange = (filterName: keyof FilterValues, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      materialType: "all",
      materialSubtype: "all",
      climateZone: "all",
      simulationGoal: "all",
      status: "all",
      sustainability: "all",
      equipment: "all",
      realism: "all",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Construction className="text-primary text-2xl mr-3" />
                <h1 className="text-xl font-semibold text-gray-900">Fast Asphalt Aging Method Selector (FA2MS)</h1>
              </div>
              <div className="text-sm text-gray-500">
                Loading...
              </div>
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Loading asphalt aging methods...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Construction className="text-primary text-2xl mr-3" />
                <h1 className="text-xl font-semibold text-gray-900">Fast Asphalt Aging Method Selector (FA2MS)</h1>
              </div>
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="w-full max-w-md mx-auto">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-red-500 text-4xl mb-4">⚠️</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Methods</h3>
                <p className="text-gray-500">Failed to load asphalt aging methods. Please try again later.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <FilterSidebar
        filters={filters}
        onFilterChange={handleFilterChange}
        methodCount={methods.length}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-900">Recommended Methods</h1>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">
                  {Object.values(filters).filter(value => value !== "all" && value !== "").length} filters active
                </span>
                <Settings className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
        </header>

        {/* Results */}
        <div className="flex-1 p-6">
          {filteredMethods.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No methods found</h3>
              <p className="text-gray-500">Try adjusting your filters to see more results.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMethods.map((method) => (
                <MethodCard key={method.id} method={method} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
