
import { cn } from "@/lib/utils";

interface StepperProps {
  steps: number;
  currentStep: number;
  labels?: string[];
}

export function Stepper({ steps, currentStep, labels }: StepperProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-6">
      <div className="flex items-center justify-between">
        {Array.from({ length: steps }).map((_, i) => (
          <div key={i} className="flex items-center flex-1">
            <div 
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                i < currentStep 
                  ? "bg-green-400 text-white" 
                  : i === currentStep 
                    ? "bg-green-400 text-white"
                    : "bg-gray-200 text-gray-500"
              )}
            >
              {i + 1}
            </div>
            
            {i < steps - 1 && (
              <div 
                className={cn(
                  "h-1 flex-1 mx-2",
                  i < currentStep ? "bg-green-400" : "bg-gray-300"
                )}
              />
            )}
          </div>
        ))}
      </div>
      
      {labels && (
        <div className="flex justify-between mt-2">
          {labels.map((label, i) => (
            <div 
              key={i} 
              className={cn(
                "text-xs font-medium text-center max-w-[80px]",
                i === currentStep ? "text-gray-900" : "text-gray-500"
              )}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
