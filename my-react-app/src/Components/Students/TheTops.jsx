import React from "react";
import "../../assets/Css/Studentcss/TheTops.css";
import students1 from "../../assets/images/students1.jpeg";
import students2 from "../../assets/images/students2.jpeg";
import students3 from "../../assets/images/students3.jpeg";
import students4 from "../../assets/images/students4.jpeg";

const students = [
  {
    name: "Suguru Geto",
    percentage: "95%",
    image: students1,
  },
  {
    name: "Satoru Gojo",
    percentage: "92%",
    image: students2,
  },
  {
    name: "Yuji Itadori",
    percentage: "90%",
    image: students3,
  },
  {
    name: "Yuta Okkotsu",
    percentage: "89%",
    image: students4,
  },
];

const TheTops = () => {
  return (
    <div className="topcontainer">
      <h3 className="titles">Top Students of the Month</h3>

      <div className="studentgrid">
        {students.map((student, index) => (
          <div key={index} className="studentscard">
            <img src={student.image} alt={student.name} className="studentimg" />

            <h4 className="studentname">{student.name}</h4>
            <p className="studentspercentage">{student.percentage}</p>

            <div className="badges">Congratulations 🎉</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TheTops;
