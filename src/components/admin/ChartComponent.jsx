import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ChartComponent = ({ data, dataKey, dataLabel }) => {
  const maxY = Math.max(...data.map((item) => item[dataLabel]));
  // sort data by date
  const formattedData = data.map((item) => {
    const parts = item.date.split("/");
    const formattedDate = `${parts[1]}/${parts[0]}/${parts[2]}`;
    const roundedValue = parseFloat(item.value).toFixed(2); // Làm tròn đến 2 chữ số sau dấu thập phân
    return { ...item, formattedDate, value: roundedValue };
  });

  formattedData.sort(
    (a, b) => new Date(a.formattedDate) - new Date(b.formattedDate)
  );

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={formattedData}>
        <XAxis dataKey={dataKey} />
        <YAxis domain={[0, maxY * 1.5]} />
        <Tooltip />
        <Line
          fill="#8884d8"
          type="linear"
          dataKey={dataLabel}
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
    </ResponsiveContainer>
  );
};

export default ChartComponent;
