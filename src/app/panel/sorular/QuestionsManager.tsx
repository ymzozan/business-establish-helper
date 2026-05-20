"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { toast } from "sonner";

interface Question {
  id: string;
  text: string;
  type: string;
  options: string[] | null;
  order: number;
  appType: string | null;
  dependsOn: { questionId: string; answer: string } | null;
  sector: { name: string; slug: string };
}

export function QuestionsManager({
  initialQuestions,
}: {
  initialQuestions: Question[];
}) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    text: "",
    type: "single_choice",
    options: "",
    order: 0,
    appType: "NEW_BUSINESS",
  });

  const newBizQuestions = initialQuestions.filter(
    (q) => q.appType === "NEW_BUSINESS"
  );
  const renovationQuestions = initialQuestions.filter(
    (q) => q.appType === "RENOVATION"
  );
  const commonQuestions = initialQuestions.filter((q) => !q.appType);

  async function handleCreate() {
    try {
      const options = newQuestion.options
        .split(",")
        .map((o) => o.trim())
        .filter(Boolean);

      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newQuestion,
          options: options.length > 0 ? options : null,
          sectorSlug: "kuyumcu",
        }),
      });

      if (!res.ok) throw new Error();

      toast.success("Soru eklendi");
      setDialogOpen(false);
      setNewQuestion({
        text: "",
        type: "single_choice",
        options: "",
        order: 0,
        appType: "NEW_BUSINESS",
      });
      router.refresh();
    } catch {
      toast.error("Soru eklenemedi");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu soruyu silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`/api/questions/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Soru silindi");
      router.refresh();
    } catch {
      toast.error("Soru silinemedi");
    }
  }

  const typeLabels: Record<string, string> = {
    single_choice: "Tek Seçim",
    multiple_choice: "Çoklu Seçim",
    text: "Metin",
    yes_no: "Evet/Hayır",
  };

  function QuestionList({
    questions,
    title,
  }: {
    questions: Question[];
    title: string;
  }) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {questions.length === 0 ? (
            <p className="text-sm text-gray-500">Soru bulunmuyor.</p>
          ) : (
            <div className="space-y-2">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <GripVertical className="h-4 w-4 text-gray-400 shrink-0" />
                  <span className="text-sm font-medium text-gray-400 w-6">
                    {q.order}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{q.text}</p>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {typeLabels[q.type] || q.type}
                      </Badge>
                      {q.options && (
                        <span className="text-xs text-gray-400">
                          {q.options.length} seçenek
                        </span>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(q.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger className="inline-flex shrink-0 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 cursor-pointer">
            <Plus className="h-4 w-4 mr-2" />
            Yeni Soru Ekle
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni Soru Ekle</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Soru Metni</Label>
                <Input
                  value={newQuestion.text}
                  onChange={(e) =>
                    setNewQuestion({ ...newQuestion, text: e.target.value })
                  }
                  placeholder="Sorunuzu yazın..."
                />
              </div>
              <div className="space-y-2">
                <Label>Soru Tipi</Label>
                <Select
                  value={newQuestion.type}
                  onValueChange={(v) =>
                    v && setNewQuestion({ ...newQuestion, type: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single_choice">Tek Seçim</SelectItem>
                    <SelectItem value="multiple_choice">Çoklu Seçim</SelectItem>
                    <SelectItem value="text">Metin</SelectItem>
                    <SelectItem value="yes_no">Evet/Hayır</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Başvuru Tipi</Label>
                <Select
                  value={newQuestion.appType}
                  onValueChange={(v) =>
                    v && setNewQuestion({ ...newQuestion, appType: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NEW_BUSINESS">Yeni İşletme</SelectItem>
                    <SelectItem value="RENOVATION">Yenileme</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Seçenekler (virgülle ayırın)</Label>
                <Input
                  value={newQuestion.options}
                  onChange={(e) =>
                    setNewQuestion({ ...newQuestion, options: e.target.value })
                  }
                  placeholder="Seçenek 1, Seçenek 2, Seçenek 3"
                />
              </div>
              <div className="space-y-2">
                <Label>Sıra</Label>
                <Input
                  type="number"
                  value={newQuestion.order}
                  onChange={(e) =>
                    setNewQuestion({
                      ...newQuestion,
                      order: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <Button onClick={handleCreate} className="w-full">
                Ekle
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <QuestionList
        questions={newBizQuestions}
        title="Yeni İşletme Soruları"
      />
      <QuestionList
        questions={renovationQuestions}
        title="Yenileme Soruları"
      />
      {commonQuestions.length > 0 && (
        <QuestionList questions={commonQuestions} title="Ortak Sorular" />
      )}
    </div>
  );
}
