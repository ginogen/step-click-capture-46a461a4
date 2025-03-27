
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface StepperProps {
  steps: number;
  currentStep: number;
  labels?: string[];
}

export function Stepper({ steps, currentStep, labels }: StepperProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full max-w-3xl mx-auto mb-4">
      <div className="flex items-center justify-between">
        {Array.from({ length: steps }).map((_, i) => (
          <div key={i} className="flex items-center flex-1">
            <div 
              className={cn(
                "rounded-full flex items-center justify-center text-xs font-medium transition-colors",
                isMobile ? "w-6 h-6" : "w-9 h-9",
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
                  "flex-1 mx-1 md:mx-2",
                  isMobile ? "h-0.5" : "h-1",
                  i < currentStep ? "bg-green-400" : "bg-gray-300"
                )}
              />
            )}
          </div>
        ))}
      </div>
      
      {labels && (
        <div className="flex justify-between mt-1 md:mt-2 px-1">
          {labels.map((label, i) => (
            <div 
              key={i} 
              className={cn(
                "font-medium text-center truncate",
                isMobile ? "text-[10px] max-w-[50px]" : "text-xs max-w-[80px]",
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
