// import React from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const DashBoardStatusChart = ({ data }) => {
//   // Kiểm tra xem mảng data có trống không hoặc không chứa đối tượng nào có trường value không
//   if (!data || !data.length || !data[0].value) {
//     return <div>No data available</div>;
//   }

//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <LineChart data={data}>
//         <XAxis dataKey="date" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         {Object.keys(data[0].value).map((key, index) => (
//           <Line
//             key={index}
//             type="monotone"
//             dataKey={`value.${key}`}
//             name={key}
//             stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Random color
//           />
//         ))}
//       </LineChart>
//     </ResponsiveContainer>
//   );
// };

// export default DashBoardStatusChart;

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DashBoardStatusChart = ({ data }) => {
  const formattedData = data.map((item) => {
    const parts = item.date.split("/");
    const formattedDate = `${parts[1]}/${parts[0]}/${parts[2]}`;
    return { ...item, formattedDate };
  });
  formattedData.sort(
    (a, b) => new Date(a.formattedDate) - new Date(b.formattedDate)
  );
  // Kiểm tra xem mảng data có trống không hoặc không chứa đối tượng nào có trường value không
  if (!formattedData || !formattedData.length || !formattedData[0].value) {
    return <div>No data available</div>;
  }

  // Tạo một mảng chứa tất cả các trạng thái xuất hiện trong dữ liệu
  const allStatus = formattedData.reduce((acc, cur) => {
    Object.keys(cur.value).forEach((status) => {
      if (!acc.includes(status)) {
        acc.push(status);
      }
    });
    return acc;
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={formattedData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {allStatus.map((status, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={`value.${status}`}
            name={status}
            stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Random color
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DashBoardStatusChart;
