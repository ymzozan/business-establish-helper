"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  text: string;
  type: string;
  options: string[] | null;
}

interface QuestionRendererProps {
  question: Question;
  value: unknown;
  onChange: (value: unknown) => void;
}

export function QuestionRenderer({ question, value, onChange }: QuestionRendererProps) {
  if (question.type === "yes_no" || question.type === "single_choice") {
    const options = question.options || (question.type === "yes_no" ? ["Evet", "Hayır"] : []);
    return (
      <div className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{question.text}</h2>
        </div>
        <RadioGroup
          value={(value as string) || ""}
          onValueChange={(v) => onChange(v)}
          className="space-y-2.5"
        >
          {options.map((option) => {
            const isSelected = value === option;
            return (
              <div
                key={option}
                className={cn(
                  "flex items-center gap-3 rounded-lg border p-3.5 cursor-pointer transition-all duration-150",
                  isSelected
                    ? "border-primary/50 bg-primary/5 shadow-sm"
                    : "border-border/60 hover:border-border hover:bg-muted/50"
                )}
              >
                <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                <Label
                  htmlFor={`${question.id}-${option}`}
                  className="cursor-pointer flex-1 text-sm font-medium"
                >
                  {option}
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>
    );
  }

  if (question.type === "multiple_choice") {
    const selected = (value as string[]) || [];
    const options = question.options || [];
    return (
      <div className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{question.text}</h2>
          <p className="text-sm text-muted-foreground mt-1">Birden fazla seçebilirsiniz</p>
        </div>
        <div className="space-y-2.5">
          {options.map((option) => {
            const isSelected = selected.includes(option);
            return (
              <div
                key={option}
                className={cn(
                  "flex items-center gap-3 rounded-lg border p-3.5 cursor-pointer transition-all duration-150",
                  isSelected
                    ? "border-primary/50 bg-primary/5 shadow-sm"
                    : "border-border/60 hover:border-border hover:bg-muted/50"
                )}
                onClick={() => {
                  const newSelected = isSelected
                    ? selected.filter((s) => s !== option)
                    : [...selected, option];
                  onChange(newSelected);
                }}
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={(checked) => {
                    const newSelected = checked
                      ? [...selected, option]
                      : selected.filter((s) => s !== option);
                    onChange(newSelected);
                  }}
                />
                <Label className="cursor-pointer flex-1 text-sm font-medium">
                  {option}
                </Label>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (question.type === "text") {
    return (
      <div className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{question.text}</h2>
        </div>
        <Input
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Cevabınızı yazın..."
          className="h-10"
        />
      </div>
    );
  }

  return null;
}
