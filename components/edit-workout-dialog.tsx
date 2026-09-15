"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { WorkoutForm } from "@/components/workout-form";
import type { Workout } from "@/types/workout";
import { cn } from "@/lib/utils";

export function EditWorkoutDialog({ workout }: { workout: Workout }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Styled directly (not via asChild) — see note in add-workout-dialog.tsx */}
      <DialogTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "h-8 w-8"
        )}
        aria-label="แก้ไขรายการนี้"
      >
        <Pencil className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>แก้ไขบันทึกผลออกกำลังกาย</DialogTitle>
        </DialogHeader>
        <WorkoutForm workout={workout} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
