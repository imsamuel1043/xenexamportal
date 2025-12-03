import React from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import "../../assets/Css/Studentboard.css"; 
import "../../assets/Css/Studentcss/Monthly.css";

const MonthlyChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Hours",
        data: [12, 25, 18, 32, 15, 22],
        backgroundColor:  [
        "#a6bde4ff",
        "#99dec6ff", 
        "#5a5a5aff", 
        "#8cdffaff", 
        "#af9ee2ff", 
        "#85f599ff", 
      ],
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="chart-container">
      <h3 className="chart-title">Monthly Activity Chart</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MonthlyChart;
