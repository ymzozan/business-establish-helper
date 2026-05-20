"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ServiceRules {
  conditions: { questionId: string; operator: string; value: string }[];
  logic: string;
}

interface Service {
  id: string;
  name: string;
  description: string | null;
  priceMin: number | null;
  priceMax: number | null;
  category: string | null;
  partnerType: string | null;
  rules: ServiceRules;
}

interface QuestionRef {
  id: string;
  text: string;
  appType: string | null;
}

export function ServicesManager({
  initialServices,
  questions,
}: {
  initialServices: Service[];
  questions: QuestionRef[];
}) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    priceMin: "",
    priceMax: "",
    category: "",
    partnerType: "",
    ruleQuestionId: "",
    ruleOperator: "equals",
    ruleValue: "",
  });

  async function handleCreate() {
    try {
      const rules: ServiceRules = { conditions: [], logic: "AND" };
      if (form.ruleQuestionId && form.ruleValue) {
        rules.conditions.push({
          questionId: form.ruleQuestionId,
          operator: form.ruleOperator,
          value: form.ruleValue,
        });
      }

      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description || null,
          priceMin: form.priceMin || null,
          priceMax: form.priceMax || null,
          category: form.category || null,
          partnerType: form.partnerType || null,
          rules,
          sectorSlug: "kuyumcu",
        }),
      });

      if (!res.ok) throw new Error();

      toast.success("Hizmet eklendi");
      setDialogOpen(false);
      setForm({
        name: "",
        description: "",
        priceMin: "",
        priceMax: "",
        category: "",
        partnerType: "",
        ruleQuestionId: "",
        ruleOperator: "equals",
        ruleValue: "",
      });
      router.refresh();
    } catch {
      toast.error("Hizmet eklenemedi");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu hizmeti silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Hizmet silindi");
      router.refresh();
    } catch {
      toast.error("Hizmet silinemedi");
    }
  }

  // Group by category
  const grouped: Record<string, Service[]> = {};
  for (const s of initialServices) {
    const cat = s.category || "Diğer";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(s);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger className="inline-flex shrink-0 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 cursor-pointer">
            <Plus className="h-4 w-4 mr-2" />
            Yeni Hizmet Ekle
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Yeni Hizmet Ekle</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="space-y-2">
                <Label>Hizmet Adı</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Hizmet adı"
                />
              </div>
              <div className="space-y-2">
                <Label>Açıklama</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Hizmet açıklaması"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Min Fiyat (TL)</Label>
                  <Input
                    type="number"
                    value={form.priceMin}
                    onChange={(e) =>
                      setForm({ ...form, priceMin: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Max Fiyat (TL)</Label>
                  <Input
                    type="number"
                    value={form.priceMax}
                    onChange={(e) =>
                      setForm({ ...form, priceMax: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Kategori</Label>
                  <Input
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    placeholder="Yasal, Tasarım, Ekipman..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Partner Tipi</Label>
                  <Input
                    value={form.partnerType}
                    onChange={(e) =>
                      setForm({ ...form, partnerType: e.target.value })
                    }
                    placeholder="mali_musavir, vitrin_uretici..."
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-3">Kural Tanımlama</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Soru</Label>
                    <Select
                      value={form.ruleQuestionId}
                      onValueChange={(v) =>
                        v && setForm({ ...form, ruleQuestionId: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Soru seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {questions.map((q) => (
                          <SelectItem key={q.id} value={q.id}>
                            {q.text}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Operatör</Label>
                      <Select
                        value={form.ruleOperator}
                        onValueChange={(v) =>
                          v && setForm({ ...form, ruleOperator: v })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="equals">Eşittir</SelectItem>
                          <SelectItem value="contains">İçerir</SelectItem>
                          <SelectItem value="not_equals">
                            Eşit Değildir
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Değer</Label>
                      <Input
                        value={form.ruleValue}
                        onChange={(e) =>
                          setForm({ ...form, ruleValue: e.target.value })
                        }
                        placeholder="Beklenen cevap"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={handleCreate} className="w-full">
                Ekle
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {Object.entries(grouped).map(([category, services]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Badge variant="secondary">{category}</Badge>
              <span className="text-sm text-gray-400 font-normal">
                {services.length} hizmet
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {services.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium">{s.name}</p>
                    {s.description && (
                      <p className="text-xs text-gray-500">{s.description}</p>
                    )}
                    <div className="flex gap-2 mt-1">
                      {s.priceMin !== null && s.priceMax !== null && (
                        <span className="text-xs text-gray-400">
                          {s.priceMin.toLocaleString("tr-TR")} -{" "}
                          {s.priceMax.toLocaleString("tr-TR")} TL
                        </span>
                      )}
                      {s.rules.conditions.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {s.rules.conditions.length} kural
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(s.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
