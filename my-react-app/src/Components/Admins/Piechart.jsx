import React from "react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  { name: "Digital Marketing", value: 300, fill: "#5ca3f4ff" },
  { name: "Designers", value: 200, fill: "#7dcb86ff" },
  { name: "Multimedia", value: 100, fill: "#abd9f4ff" },
  { name: "Developers", value: 600, fill: "#404045ff" },
];

const Piechart = () => {
  return (
    <div
      className="shadow-sm"
      style={{
        backgroundColor: "#ffffff",
        width: "100%",
        maxWidth: "24rem",
        height: "auto",
        borderRadius: "13px",
        padding: "20px",
      }}
    >
      <h3
        className="fw-bold text-center"
        style={{ fontSize: "16px", marginBottom: "20px" }}
      >
        Exam Attended by
      </h3>

      <div
        style={{
          width: "100%",
          height: "260px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius="40%"
              outerRadius="90%"
              cornerRadius={10}
              paddingAngle={5}
              dataKey="value"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>


      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "15px",
          gap: "10px",
        }}
      >
        {data.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              minWidth: "40%",
              gap: "8px",
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: item.fill,
              }}
            ></span>
            <span style={{ fontSize: "14px" }}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Piechart;
