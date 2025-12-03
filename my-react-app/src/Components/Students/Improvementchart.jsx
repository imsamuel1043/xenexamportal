import React from "react";
import { Line } from "react-chartjs-2";

const ImprovementChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Current Week",
        data: [10, 20, 15, 30, 18, 28],
        borderColor: "#4C8EF6",
        backgroundColor: "transparent",
        borderWidth: 2,
        tension: 0.4, 
      },
      {
        label: "Previous Week",
        data: [12, 18, 17, 25, 16, 24],
        borderColor: "#b0b0b0ff",
        backgroundColor: "transparent",
        borderWidth: 2,
        tension: 0.4,
        borderDash: [6, 6], 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="chart-container">
      <h3 className="chart-title">Improvements</h3>

      <div style={{ width: "100%", height: "300px" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ImprovementChart;
