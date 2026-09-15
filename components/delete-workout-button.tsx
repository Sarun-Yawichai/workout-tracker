"use client";

import { useState, useTransition } from "react";
import { AlertCircle, Trash2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteWorkout } from "@/app/actions/workouts";
import { cn } from "@/lib/utils";

export function DeleteWorkoutButton({ id }: { id: number }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [deleteFailed, setDeleteFailed] = useState(false);

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteWorkout(id);

      if (!result.success) {
        setDeleteFailed(true); // keep the dialog open so "ลองอีกครั้ง" can retry
        return;
      }

      setDeleteFailed(false);
      setOpen(false);
    });
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setDeleteFailed(false); // reset error state if user cancels
      }}
    >
      {/* Styled directly (not via asChild) — see note in add-workout-dialog.tsx */}
      <AlertDialogTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "h-8 w-8 text-destructive hover:text-destructive"
        )}
        aria-label="ลบรายการนี้"
      >
        <Trash2 className="h-4 w-4" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>ลบบันทึกนี้?</AlertDialogTitle>
          <AlertDialogDescription>
            ลบแล้วจะกู้คืนไม่ได้ ต้องการลบรายการนี้ใช่ไหม
          </AlertDialogDescription>
        </AlertDialogHeader>

        {deleteFailed && (
          <div className="flex items-center gap-2 rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            ลบไม่สำเร็จ ลองใหม่อีกครั้ง
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault(); // don't let the dialog auto-close before we know the result
              handleDelete();
            }}
          >
            {isPending ? "กำลังลบ..." : deleteFailed ? "ลองอีกครั้ง" : "ลบ"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
