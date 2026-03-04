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
  Legend
} from "recharts";

function Charts({ active, inactive }) {

  const barData = [
    { name: "Active", value: active },
    { name: "Inactive", value: inactive }
  ];

  const pieData = [
    { name: "Active", value: active },
    { name: "Inactive", value: inactive }
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="chart-container">

      <h3 className="chart-title">Employee Activity</h3>

      <div className="chart-grid">

        {/* BAR CHART */}
        <div className="chart-box">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={barData}>
              <XAxis dataKey="name" stroke="#cbd5f5"/>
              <YAxis stroke="#cbd5f5"/>
              <Tooltip
                contentStyle={{
                  background:"#1e293b",
                  border:"none",
                  color:"#fff"
                }}
              />
              <Bar
                dataKey="value"
                fill="#6366f1"
                barSize={35}
                radius={[8,8,0,0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="chart-box">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={70}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
}

export default Charts;