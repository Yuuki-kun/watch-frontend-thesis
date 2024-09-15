import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartDashBoardComponent = ({ totalOrdersByDate, totalAmountByDate }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const labels = Object.keys(totalOrdersByDate);
    const totalOrdersData = Object.values(totalOrdersByDate);
    const totalAmountData = Object.values(totalAmountByDate);

    if (chartRef.current && labels.length > 0) {
      new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Total Orders",
              data: totalOrdersData,
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgb(75, 192, 192, 0.2)",
            },
            {
              label: "Total Amount",
              data: totalAmountData,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgb(255, 99, 132, 0.2)",
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [totalOrdersByDate, totalAmountByDate]);

  return <canvas ref={chartRef} />;
};

export default ChartDashBoardComponent;
