import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DoubleChartComponent = ({ data, dataKey, dataLabel, data2 }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      {/* <LineChart data={data}>
        <XAxis dataKey={dataKey} />
        <YAxis />
        <Tooltip />
        <Line
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
      </LineChart> */}
      <LineChart>
        <XAxis dataKey={dataKey} />
        <YAxis />
        <Tooltip />
        <Line
          type="linear"
          data={data}
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
        <Line
          type="linear"
          data={data2}
          dataKey={dataLabel}
          stroke="#82ca9d"
          label={{
            position: "top",
            fill: "#82ca9d",
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

export default DoubleChartComponent;
