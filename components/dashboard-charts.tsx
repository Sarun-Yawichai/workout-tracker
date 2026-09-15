"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface DailyCount {
  date: string;
  sessions: number;
  total_minutes: number;
}

interface TypeSummary {
  exercise_type: string;
  sessions: number;
  total_minutes: number;
}

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626", "#7c3aed", "#0891b2"];

export function DashboardCharts({
  dailyCounts,
  typeSummary,
}: {
  dailyCounts: DailyCount[];
  typeSummary: TypeSummary[];
}) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">
          นาทีออกกำลังกายต่อวัน (7 วันล่าสุด)
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={dailyCounts}>
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="total_minutes" fill="#2563eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">
          สัดส่วนประเภทการออกกำลังกาย
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={typeSummary}
              dataKey="total_minutes"
              nameKey="exercise_type"
              outerRadius={100}
              label
            >
              {typeSummary.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
