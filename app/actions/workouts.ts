"use server";

import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";
import type { NewWorkout, Workout } from "@/types/workout";

type ActionResult = { success: boolean };

export async function addWorkout(input: NewWorkout): Promise<ActionResult> {
  const db = getDb();
  if (!db) return { success: false }; // no persistent storage available

  try {
    db.prepare(
      `INSERT INTO workouts (date, exercise_type, duration_minutes, calories, notes)
       VALUES (@date, @exercise_type, @duration_minutes, @calories, @notes)`
    ).run({
      date: input.date,
      exercise_type: input.exercise_type,
      duration_minutes: input.duration_minutes,
      calories: input.calories ?? null,
      notes: input.notes ?? null,
    });
  } catch (err) {
    console.error("addWorkout failed, entry was not saved:", err);
    return { success: false };
  }

  // Re-run the dashboard/list server components with fresh data
  revalidatePath("/");
  return { success: true };
}

export async function getWorkouts(): Promise<Workout[]> {
  const db = getDb();
  if (!db) return [];

  try {
    return db
      .prepare(`SELECT * FROM workouts ORDER BY date DESC, id DESC`)
      .all() as Workout[];
  } catch (err) {
    console.error("getWorkouts failed, showing empty list:", err);
    return [];
  }
}

export async function updateWorkout(
  id: number,
  input: NewWorkout
): Promise<ActionResult> {
  const db = getDb();
  if (!db) return { success: false };

  try {
    db.prepare(
      `UPDATE workouts
       SET date = @date,
           exercise_type = @exercise_type,
           duration_minutes = @duration_minutes,
           calories = @calories,
           notes = @notes
       WHERE id = @id`
    ).run({
      id,
      date: input.date,
      exercise_type: input.exercise_type,
      duration_minutes: input.duration_minutes,
      calories: input.calories ?? null,
      notes: input.notes ?? null,
    });
  } catch (err) {
    console.error("updateWorkout failed, entry was not updated:", err);
    return { success: false };
  }

  revalidatePath("/");
  return { success: true };
}

export async function deleteWorkout(id: number): Promise<ActionResult> {
  const db = getDb();
  if (!db) return { success: false };

  try {
    db.prepare(`DELETE FROM workouts WHERE id = ?`).run(id);
  } catch (err) {
    console.error("deleteWorkout failed:", err);
    return { success: false };
  }

  revalidatePath("/");
  return { success: true };
}

// Handy aggregate for the dashboard: total minutes per exercise type
export async function getSummaryByType() {
  const db = getDb();
  if (!db) return [];

  try {
    return db
      .prepare(
        `SELECT exercise_type, COUNT(*) as sessions, SUM(duration_minutes) as total_minutes
         FROM workouts
         GROUP BY exercise_type
         ORDER BY total_minutes DESC`
      )
      .all() as { exercise_type: string; sessions: number; total_minutes: number }[];
  } catch (err) {
    console.error("getSummaryByType failed, showing empty summary:", err);
    return [];
  }
}

// Sessions per day for the last N days, useful for a weekly bar chart
export async function getDailyCounts(days = 7) {
  const db = getDb();
  if (!db) return [];

  try {
    return db
      .prepare(
        `SELECT date, COUNT(*) as sessions, SUM(duration_minutes) as total_minutes
         FROM workouts
         WHERE date >= date('now', ?)
         GROUP BY date
         ORDER BY date ASC`
      )
      .all(`-${days} days`) as { date: string; sessions: number; total_minutes: number }[];
  } catch (err) {
    console.error("getDailyCounts failed, showing empty chart data:", err);
    return [];
  }
}
