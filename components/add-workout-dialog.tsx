"use client";

import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { WorkoutForm } from "@/components/workout-form";

export function AddWorkoutDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Style the trigger directly instead of nesting <Button> inside it via
          asChild — this shadcn/ui version renders on Base UI primitives,
          whose DialogTrigger doesn't merge asChild the way Radix's does,
          which was causing a <button> nested inside a <button>. */}
      <DialogTrigger className={buttonVariants({ variant: "default" })}>
        + เพิ่มบันทึก
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>บันทึกผลออกกำลังกาย</DialogTitle>
        </DialogHeader>
        <WorkoutForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
