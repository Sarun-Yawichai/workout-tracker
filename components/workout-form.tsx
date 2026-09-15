"use client";

import { useState, useTransition } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { addWorkout, updateWorkout } from "@/app/actions/workouts";
import type { ExerciseType, Workout } from "@/types/workout";

const EXERCISE_TYPES: { value: ExerciseType; label: string }[] = [
  { value: "running", label: "วิ่ง" },
  { value: "weights", label: "เวทเทรนนิ่ง" },
  { value: "yoga", label: "โยคะ" },
  { value: "swimming", label: "ว่ายน้ำ" },
  { value: "cycling", label: "ปั่นจักรยาน" },
  { value: "other", label: "อื่นๆ" },
];

export function WorkoutForm({
  workout,
  onSuccess,
}: {
  /** Pass an existing workout to edit it; omit to create a new one. */
  workout?: Workout;
  onSuccess?: () => void;
}) {
  const isEditing = Boolean(workout);
  const [isPending, startTransition] = useTransition();
  const [date, setDate] = useState(
    workout?.date ?? new Date().toISOString().slice(0, 10)
  );
  const [exerciseType, setExerciseType] = useState<ExerciseType>(
    workout?.exercise_type ?? "running"
  );
  const [duration, setDuration] = useState(
    String(workout?.duration_minutes ?? 30)
  );
  const [calories, setCalories] = useState(
    workout?.calories != null ? String(workout.calories) : ""
  );
  const [notes, setNotes] = useState(workout?.notes ?? "");
  const [saveFailed, setSaveFailed] = useState(false);

  function submit() {
    startTransition(async () => {
      const payload = {
        date,
        exercise_type: exerciseType,
        duration_minutes: Number(duration),
        calories: calories ? Number(calories) : null,
        notes: notes || null,
      };

      const result = workout
        ? await updateWorkout(workout.id, payload)
        : await addWorkout(payload);

      if (!result.success) {
        // Keep everything the user typed so "ลองอีกครั้ง" can just resubmit
        setSaveFailed(true);
        return;
      }

      setSaveFailed(false);

      if (!workout) {
        // reset the light fields, keep today's date and last-used type
        setDuration("30");
        setCalories("");
        setNotes("");
      }

      onSuccess?.();
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="date">วันที่</Label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="exercise_type">ประเภทการออกกำลังกาย</Label>
        <Select
          value={exerciseType}
          onValueChange={(v) => setExerciseType(v as ExerciseType)}
        >
          <SelectTrigger id="exercise_type">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {EXERCISE_TYPES.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="duration">ระยะเวลา (นาที)</Label>
          <Input
            id="duration"
            type="number"
            min={1}
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="calories">แคลอรี่ (ถ้ามี)</Label>
          <Input
            id="calories"
            type="number"
            min={0}
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">โน้ตเพิ่มเติม</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="เช่น รู้สึกอย่างไร ทำท่าไหนบ้าง"
        />
      </div>

      {saveFailed && (
        <div className="flex items-center justify-between gap-3 rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          <span className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            บันทึกไม่สำเร็จ ข้อมูลยังไม่ถูกเก็บ
          </span>
          <button
            type="button"
            onClick={submit}
            disabled={isPending}
            className="shrink-0 underline underline-offset-2 hover:no-underline disabled:opacity-50"
          >
            ลองอีกครั้ง
          </button>
        </div>
      )}

      <Button type="submit" disabled={isPending}>
        {isPending
          ? "กำลังบันทึก..."
          : isEditing
          ? "บันทึกการแก้ไข"
          : "บันทึกผลออกกำลังกาย"}
      </Button>
    </form>
  );
}
