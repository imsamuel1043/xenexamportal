import React, { useEffect, useRef, useState } from "react";
import aboutimg from "../../assets/images/aboutnew.png";
import aboutcss from "../../assets/Css/About.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          let start = 0;
          const increment = end / (duration / 16);

          const counter = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(counter);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}</span>;
};

const About = () => {
  const courses = [
    { title: "Full Stack Development", icon: "bi-file-earmark-code" },
    { title: "Creative Designing", icon: "bi-palette" },
    { title: "PHP Development", icon: "bi-filetype-php" },
    { title: "Digital Marketing", icon: "bi-megaphone" },
    { title: "Node JS Development", icon: "bi-node-plus" },
    { title: "UI/UX Development", icon: "bi-brush" },
    { title: "Python Development", icon: "bi-braces" },
    { title: "Multimedia & Animation", icon: "bi-film" },
  ];

  return (
    <div>
      <div className="container my-5">
        <div className="row align-items-start g-5">

          <div className="col-md-8">
            <h3 className={aboutcss.sectionTitle}>Our <span style={{ color: "#3956AD" }}>Courses</span></h3>

            <div className={aboutcss.courseGrid}>
              {courses.map((course, index) => (
                <div key={index} className={aboutcss.courseItem}>
                  <i className={`bi ${course.icon}`}></i>
                  <span>{course.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-4">
            <h3 className={aboutcss.sectionTitle}>
              Get easily started in<span style={{ color: "#3956AD" }}> 3 simple steps</span>
            </h3>

            <div className={aboutcss.stepsWrapper}>
              <div className={aboutcss.stepItem}>
                <div className={aboutcss.stepCircle}>1</div>
                <p>Login / Register</p>
              </div>

              <div className={aboutcss.stepLine}></div>

              <div className={aboutcss.stepItem}>
                <div className={aboutcss.stepCircle}>2</div>
                <p>Select your course</p>
              </div>

              <div className={aboutcss.stepLine}></div>

              <div className={aboutcss.stepItem}>
                <div className={aboutcss.stepCircle}>3</div>
                <p>Enjoy giving test</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className={`container-fluid mt-3 d-flex justify-content-center ${aboutcss.colorchange}`}>
        <div className="container">
          <div className="row align-items-center justify-content-center">

            <div className={aboutcss.statsWrapper}>
              <div className={aboutcss.statCard}>
                <h3><CountUp end={500} />+</h3>
                <p>Active Students</p>
              </div>

              <div className={aboutcss.statCard}>
                <h3><CountUp end={50} />+</h3>
                <p>Online Exams</p>
              </div>

              <div className={aboutcss.statCard}>
                <h3><CountUp end={20} />+</h3>
                <p>Expert Trainers</p>
              </div>

              <div className={aboutcss.statCard}>
                <h3><CountUp end={95} />%</h3>
                <p>Success Rate</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
