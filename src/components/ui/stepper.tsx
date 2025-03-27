
import { cn } from "@/lib/utils";

interface StepperProps {
  steps: number;
  currentStep: number;
  labels?: string[];
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-4">
      <div className="flex justify-center items-center">
        <div className="px-4 py-2 bg-green-100 rounded-full text-sm font-medium text-green-800">
          Paso {currentStep + 1}/{steps}
        </div>
      </div>
    </div>
  );
}
