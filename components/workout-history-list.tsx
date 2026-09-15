import { EditWorkoutDialog } from "@/components/edit-workout-dialog";
import { DeleteWorkoutButton } from "@/components/delete-workout-button";
import type { Workout } from "@/types/workout";

export function WorkoutHistoryList({ workouts }: { workouts: Workout[] }) {
  if (workouts.length === 0) {
    return (
      <p className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
        ยังไม่มีบันทึก — กด "+ เพิ่มบันทึก" เพื่อเริ่มต้น
      </p>
    );
  }

  return (
    <ul className="divide-y rounded-md border">
      {workouts.slice(0, 10).map((w) => (
        <li key={w.id} className="flex items-center justify-between gap-4 p-3 text-sm">
          <span>
            {w.date} — {w.exercise_type} ({w.duration_minutes} นาที)
            {w.calories ? (
              <span className="text-muted-foreground"> · {w.calories} kcal</span>
            ) : null}
          </span>
          <span className="flex shrink-0 items-center gap-1">
            <EditWorkoutDialog workout={w} />
            <DeleteWorkoutButton id={w.id} />
          </span>
        </li>
      ))}
    </ul>
  );
}
