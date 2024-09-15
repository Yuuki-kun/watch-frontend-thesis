import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ColumnChartComponent = ({ data, dataKey, dataLabel }) => {
  //   const formattedData = data.map((item) => {
  //     const parts = item.date.split("/");
  //     const formattedDate = `${parts[1]}/${parts[0]}/${parts[2]}`;
  //     return { ...item, formattedDate };
  //   });
  //   formattedData.sort(
  //     (a, b) => new Date(a.formattedDate) - new Date(b.formattedDate)
  //   );
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis dataKey={dataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={dataLabel} fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ColumnChartComponent;
