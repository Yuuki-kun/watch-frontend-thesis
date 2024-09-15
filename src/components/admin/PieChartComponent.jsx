import React, { useEffect, useState } from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

const PieChartComponent = ({ data, dataKey, dataLabel }) => {
  console.log(data);
  //   const generateColors = (count) => {
  //     // Sử dụng mặc định là 3 nếu count không tồn tại
  //     count = count || 3;
  //     const generatedColors = [];
  //     for (let i = 0; i < count; i++) {
  //       // Tạo một màu ngẫu nhiên
  //       const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  //       generatedColors.push(color);
  //     }
  //     return generatedColors;
  //   };

  // Tạo mảng dữ liệu series
  const [seri, setSeri] = useState([]);
  useEffect(() => {
    const seriesData =
      data.length > 0 &&
      data.map(({ [dataKey]: key, [dataLabel]: value }) => ({
        id: key,
        value: value,
        label: key,
      }));

    // const finalColors = colors || generateColors(data?.length);
    // if (finalColors.length < data?.length) {
    //   const newColors = generateColors(data?.length - finalColors.length);
    //   setFinalColors([...finalColors, ...newColors]);
    // } else {
    //   setFinalColors(finalColors);
    // }
    setSeri(seriesData);
  }, [data]);
  //   console.log("seri=" + seri, finalColors);
  // Nếu không có màu được cung cấp, tạo một mảng màu mặc định

  const series = [
    {
      arcLabel: (item) => `(${item.value})`,
      arcLabelMinAngle: 45,
      data: seri,
    },
  ];

  return (
    <div style={{ width: "100%", height: 500 }}>
      <PieChart
        series={series}
        slicesLabelsSkipAngle={10}
        animate
        motionStiffness={90}
        motionDamping={15}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontWeight: "bold",
          },
        }}
        // skipAnimation
      />
    </div>
  );
};

export default PieChartComponent;
