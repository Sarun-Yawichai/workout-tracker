import { getWorkouts, getSummaryByType, getDailyCounts } from "@/app/actions/workouts";
import { AddWorkoutDialog } from "@/components/add-workout-dialog";
import { DashboardCharts } from "@/components/dashboard-charts";
import { WorkoutHistoryList } from "@/components/workout-history-list";

export default async function HomePage() {
  const [workouts, typeSummary, dailyCounts] = await Promise.all([
    getWorkouts(),
    getSummaryByType(),
    getDailyCounts(7),
  ]);

  return (
    <main className="mx-auto max-w-5xl space-y-10 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Workout Dashboard</h1>
          <p className="text-muted-foreground">
            บันทึกและดูสรุปผลการออกกำลังกายของคุณ
          </p>
        </div>
        <AddWorkoutDialog />
      </div>

      <section>
        <h2 className="mb-4 text-lg font-medium">สรุปภาพรวม</h2>
        <DashboardCharts dailyCounts={dailyCounts} typeSummary={typeSummary} />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-medium">ประวัติล่าสุด</h2>
        <WorkoutHistoryList workouts={workouts} />
      </section>
    </main>
  );
}
