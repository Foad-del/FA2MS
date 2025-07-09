import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tag, Wrench, Globe, Target, Leaf, FileText, Activity, Thermometer } from "lucide-react";
import type { AsphaltMethod } from "@shared/schema";

interface MethodCardProps {
  method: AsphaltMethod;
}

export function MethodCard({ method }: MethodCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Standard":
        return "bg-blue-500 text-white";
      case "Emerging":
        return "bg-gray-600 text-white";
      case "Experimental":
        return "bg-yellow-500 text-white";
      case "Obsolete":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Standard":
        return "✓";
      case "Emerging":
        return "⚬";
      case "Experimental":
        return "⚠";
      case "Obsolete":
        return "⚫";
      default:
        return "?";
    }
  };

  const getSustainabilityColor = (sustainability: string) => {
    switch (sustainability) {
      case "Low":
        return "text-red-600";
      case "Medium":
        return "text-yellow-600";
      case "High":
        return "text-green-600";
      case "Very High":
        return "text-green-800";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-5">
        {/* Header with method name and status */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 leading-tight pr-2">
            {method.method}
          </h3>
          <Badge className={`${getStatusColor(method.status)} text-xs px-2 py-1`}>
            <span className="mr-1">{getStatusIcon(method.status)}</span>
            {method.status}
          </Badge>
        </div>
        
        {/* Method details */}
        <div className="space-y-3 text-sm">
          <div className="flex items-center">
            <Tag className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
            <span className="text-gray-500">Category:</span>
            <span className="ml-2 font-medium text-gray-900">{method.category}</span>
          </div>
          
          <div className="flex items-center">
            <Wrench className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
            <span className="text-gray-500">Equipment:</span>
            <span className="ml-2 font-medium text-gray-900">{method.equipment}</span>
          </div>
          
          <div className="flex items-center">
            <Globe className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
            <span className="text-gray-500">Climate:</span>
            <span className="ml-2 font-medium text-gray-900">{method.climateZone}</span>
          </div>
          
          <div className="flex items-center">
            <Target className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
            <span className="text-gray-500">Goal:</span>
            <span className="ml-2 font-medium text-gray-900">{method.simulationGoal}</span>
          </div>
          
          <div className="flex items-center">
            <Activity className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
            <span className="text-gray-500">Realism:</span>
            <span className="ml-2 font-medium text-gray-900">{method.realism}</span>
          </div>
          
          <div className="flex items-center">
            <Leaf className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
            <span className="text-gray-500">Sustainability:</span>
            <span className={`ml-2 font-medium ${getSustainabilityColor(method.sustainability)}`}>
              {method.sustainability}
            </span>
          </div>

          {/* Standards/Procedures */}
          {method.standards && (
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-start">
                <FileText className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-gray-500 text-xs uppercase tracking-wide">Standards/Procedures:</span>
                  <p className="text-xs text-gray-700 mt-1 leading-relaxed">{method.standards}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
