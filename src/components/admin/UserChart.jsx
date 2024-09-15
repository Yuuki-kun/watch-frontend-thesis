import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ZAxis,
} from "recharts";

const UserChart = ({ data, width, customMaxY }) => {
  const maxY = Math.max(
    customMaxY,
    Math.max(...Object.values(data.map((d) => d.total)))
  );

  const [widths, setWidth] = useState(window.innerWidth / 1.5);
  //   console.log("xStartDate", new Date(xStartDate).toISOString().split("T")[0]);
  //   console.log("xEndDate", new Date(xEndDate).toISOString().split("T")[0]);

  return (
    <LineChart
      width={widths}
      height={400}
      data={data}
      margin={{ top: 25, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="date" tickCount={data.length} />
      <YAxis />

      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line
        type="linear"
        dataKey="total"
        stroke="#8884d8"
        label={{
          position: "top",
          fill: "#8884d8",
          fontSize: 16,
          dy: -10,
        }}
        dot={true}
        activeDot={{ r: 6 }}
        animateNewValues={true}
      />
    </LineChart>
  );
};

export default UserChart;
