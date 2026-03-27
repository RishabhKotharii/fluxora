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
} from 'recharts';

interface Stats {
  total: number;
  done: number;
  byColumn: { name: string; count: number }[];
  byTag: { name: string; count: number }[];
}

interface Props {
  stats: Stats;
}

const BAR_COLOR = '#7c3aed';
const PIE_COLORS = ['#f43f5e', '#8b5cf6', '#14b8a6'];

const TOOLTIP_STYLE = {
  backgroundColor: 'var(--card)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  color: 'var(--text)',
  fontSize: '12px',
};

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 flex flex-col gap-1">
      <span className="text-[var(--muted)] text-xs font-medium">{label}</span>
      <span className="text-[var(--text)] text-3xl font-bold">{value}</span>
      {sub && <span className="text-[var(--muted)] text-xs">{sub}</span>}
    </div>
  );
}

export default function DashboardPage({ stats }: Props) {
  const pct = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;
  const inProgress = stats.byColumn.find((c) => c.name === 'In Progress')?.count ?? 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Tasks" value={stats.total} />
        <StatCard label="Completed" value={stats.done} sub="reached Done stage" />
        <StatCard label="In Progress" value={inProgress} />
        <StatCard
          label="Completion Rate"
          value={`${pct}%`}
          sub={stats.total > 0 ? `${stats.done} of ${stats.total}` : 'No tasks yet'}
        />
      </div>

      {/* Progress bar */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[var(--text)] font-semibold text-sm">Overall Progress</span>
          <span className="text-violet-400 font-bold text-sm">{pct}%</span>
        </div>
        <div className="h-2.5 bg-[var(--surface)] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-600 to-indigo-500 rounded-full transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Bar chart by column */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5">
          <h3 className="text-[var(--text)] font-semibold text-sm mb-4">Tasks by Stage</h3>
          {stats.total === 0 ? (
            <div className="flex items-center justify-center h-40 text-[var(--muted)] text-sm">No data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={stats.byColumn} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--muted)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--muted)' }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(124,58,237,0.08)' }} />
                <Bar dataKey="count" fill={BAR_COLOR} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Pie chart by tag */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5">
          <h3 className="text-[var(--text)] font-semibold text-sm mb-4">Tasks by Tag</h3>
          {stats.total === 0 ? (
            <div className="flex items-center justify-center h-40 text-[var(--muted)] text-sm">No data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={stats.byTag.filter((d) => d.count > 0)}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={75}
                  innerRadius={40}
                  paddingAngle={3}
                >
                  {stats.byTag.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: '11px', color: 'var(--muted)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
