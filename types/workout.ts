export type ExerciseType =
  | "running"
  | "weights"
  | "yoga"
  | "swimming"
  | "cycling"
  | "other";

export interface Workout {
  id: number;
  date: string; // ISO date, e.g. "2026-09-16"
  exercise_type: ExerciseType;
  duration_minutes: number;
  calories: number | null;
  notes: string | null;
  created_at: string;
}

export interface NewWorkout {
  date: string;
  exercise_type: ExerciseType;
  duration_minutes: number;
  calories?: number | null;
  notes?: string | null;
}
