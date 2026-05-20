"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WizardProgress } from "./WizardProgress";
import { QuestionRenderer } from "./QuestionRenderer";
import { ContactForm } from "./ContactForm";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ArrowLeft, ArrowRight, Send, Loader2 } from "lucide-react";

interface Question {
  id: string;
  text: string;
  type: string;
  options: string[] | null;
  dependsOn: { questionId: string; answer: string } | null;
}

interface WizardContainerProps {
  sectorSlug: string;
  appType: "NEW_BUSINESS" | "RENOVATION";
}

export function WizardContainer({ sectorSlug, appType }: WizardContainerProps) {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
  });

  useEffect(() => {
    fetch(`/api/questions?sectorSlug=${sectorSlug}&appType=${appType}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      });
  }, [sectorSlug, appType]);

  const visibleQuestions = questions.filter((q) => {
    if (!q.dependsOn) return true;
    const dep = q.dependsOn;
    const parentAnswer = answers[dep.questionId];
    if (Array.isArray(parentAnswer)) {
      return parentAnswer.includes(dep.answer);
    }
    return parentAnswer === dep.answer;
  });

  const totalSteps = visibleQuestions.length + 1;
  const isContactStep = currentStep >= visibleQuestions.length;
  const currentQuestion = visibleQuestions[currentStep];

  const canProceed = useCallback(() => {
    if (isContactStep) {
      return (
        contact.firstName.length >= 2 &&
        contact.lastName.length >= 2 &&
        contact.phone.length >= 10 &&
        contact.email.includes("@")
      );
    }
    if (!currentQuestion) return false;
    const answer = answers[currentQuestion.id];
    if (!answer) return false;
    if (Array.isArray(answer) && answer.length === 0) return false;
    return true;
  }, [isContactStep, contact, currentQuestion, answers]);

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const answerList = Object.entries(answers).map(([questionId, value]) => ({
        questionId,
        value,
      }));

      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: appType,
          sectorSlug,
          ...contact,
          answers: answerList,
        }),
      });

      if (!res.ok) throw new Error("Submission failed");

      const application = await res.json();

      await fetch("/api/packages/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId: application.id }),
      });

      router.push(`/basvuru/${sectorSlug}/sonuc?id=${application.id}`);
    } catch {
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
      setSubmitting(false);
    }
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-xl">
      <WizardProgress currentStep={currentStep} totalSteps={totalSteps} />

      <Card className="mt-6 shadow-sm border-border/50">
        <CardContent className="p-5 sm:p-6">
          {isContactStep ? (
            <ContactForm data={contact} onChange={setContact} />
          ) : currentQuestion ? (
            <QuestionRenderer
              question={currentQuestion}
              value={answers[currentQuestion.id]}
              onChange={(value) =>
                setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }))
              }
            />
          ) : null}
        </CardContent>
      </Card>

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          size="lg"
          onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Geri
        </Button>

        {isContactStep ? (
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={!canProceed() || submitting}
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                Gönderiliyor...
              </>
            ) : (
              <>
                Başvuruyu Gönder
                <Send className="h-4 w-4 ml-1.5" />
              </>
            )}
          </Button>
        ) : (
          <Button
            size="lg"
            onClick={() => setCurrentStep((s) => s + 1)}
            disabled={!canProceed()}
          >
            İleri
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </Button>
        )}
      </div>
    </div>
  );
}
