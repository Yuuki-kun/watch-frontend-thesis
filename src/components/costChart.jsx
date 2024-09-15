import React, { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
const Chart = ({ data, setData }) => {
  const [height, setHeight] = useState(400);
  const [width, setWidth] = useState(window.innerWidth / 1.5);
  useEffect(() => {
    const sortedData = [...data];
    sortedData.sort((a, b) => a.time - b.time);
    setData(sortedData);
  }, []);
  return (
    <LineChart height={400} width={width} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="linear" dataKey="amount" stroke="#8884d8" />
    </LineChart>
  );
};

export default Chart;
