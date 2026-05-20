"use client";

import { Progress } from "@/components/ui/progress";

interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function WizardProgress({ currentStep, totalSteps }: WizardProgressProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span className="font-medium">
          Adım {currentStep + 1} / {totalSteps}
        </span>
        <span>%{Math.round(progress)}</span>
      </div>
      <Progress value={progress} className="h-1.5" />
    </div>
  );
}
