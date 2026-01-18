import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Sparkles } from "lucide-react";
import { z } from "zod";

const customCardSchema = z.object({
  title: z.string()
    .trim()
    .min(5, { message: "El título debe tener al menos 5 caracteres" })
    .max(100, { message: "El título no puede exceder 100 caracteres" }),
  description: z.string()
    .trim()
    .min(10, { message: "La descripción debe tener al menos 10 caracteres" })
    .max(300, { message: "La descripción no puede exceder 300 caracteres" })
});

type CustomCardForm = z.infer<typeof customCardSchema>;

interface CustomCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCard: (card: { title: string; description: string }) => void;
  customCardCount: number;
}

export function CustomCardModal({ 
  isOpen, 
  onClose, 
  onAddCard, 
  customCardCount
}: CustomCardModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof CustomCardForm, string>>>({});

  const handleSubmit = () => {
    const result = customCardSchema.safeParse({ title, description });
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof CustomCardForm, string>> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof CustomCardForm] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    onAddCard({
      title: result.data.title,
      description: result.data.description
    });

    // Reset form
    setTitle("");
    setDescription("");
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Crear Carta Personalizada
          </DialogTitle>
          <DialogDescription>
            Crea un criterio personalizado para tu equipo. 
            Ya tienes <strong>{customCardCount}</strong> carta{customCardCount !== 1 ? 's' : ''} personalizada{customCardCount !== 1 ? 's' : ''}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="title">Título del criterio</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setErrors(prev => ({ ...prev, title: undefined }));
              }}
              placeholder="Ej: Los mockups están aprobados"
              maxLength={100}
              className={errors.title ? "border-destructive" : ""}
            />
            <div className="flex justify-between">
              {errors.title ? (
                <p className="text-xs text-destructive">{errors.title}</p>
              ) : (
                <span />
              )}
              <p className="text-xs text-muted-foreground">{title.length}/100</p>
            </div>
          </div>

          {/* Description Textarea */}
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setErrors(prev => ({ ...prev, description: undefined }));
              }}
              placeholder="Describe el criterio con más detalle..."
              maxLength={300}
              rows={3}
              className={errors.description ? "border-destructive" : ""}
            />
            <div className="flex justify-between">
              {errors.description ? (
                <p className="text-xs text-destructive">{errors.description}</p>
              ) : (
                <span />
              )}
              <p className="text-xs text-muted-foreground">{description.length}/300</p>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            <Plus className="w-4 h-4 mr-2" />
            Agregar Carta
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
