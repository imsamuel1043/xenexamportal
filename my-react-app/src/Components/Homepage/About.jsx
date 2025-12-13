import React, { useState } from 'react';
import aboutimg from "../../assets/images/aboutnew.png";
import aboutcss from '../../assets/Css/About.module.css';

const About = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const courses = [
    { title: "Creative Designing", icon: "bi-palette", description: "Learn creative designing techniques including color theory, layout, and typography." },
    { title: "Full Stack Development", icon: "bi-code-slash", description: "Learn to build complete web applications using frontend and backend technologies." },
    { title: "Digital Marketing", icon: "bi-cpu", description: "Master marketing strategies, SEO, social media, and analytics." },
    { title: "UI/UX Design and Development", icon: "bi-brush", description: "Design and develop modern user interfaces with great user experience." },
    { title: "Multimedia With Animation", icon: "bi-film", description: "Create animations, video editing, and interactive multimedia content." },
    { title: "PHP Development", icon: "bi-filetype-php", description: "Develop dynamic web applications using PHP and MySQL." },
    { title: "Node JS Development", icon: "bi-hexagon", description: "Build scalable backend applications using Node.js." },
    { title: "Python Development", icon: "bi-braces", description: "Learn Python programming and build applications or automation scripts." },
  ];

  const toggleDescription = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      <div className={`container mb-3 ${aboutcss.coursesWrapper}`}>
        <h3 className="text-center fw-bold mt-3">
          <span>Our</span>{" "}
          <span style={{ color: "#3956AD" }}>Courses</span>
        </h3>

        <div className={aboutcss.cardRow}>
          {courses.map((course, index) => (
            <div key={index} className={aboutcss.courseCardFull}>
              <div className={aboutcss.iconCircle}>
                <i className={`bi ${course.icon}`}></i>
              </div>
              <h6 className="fw-bold">{course.title}</h6>
              <button
                className={aboutcss.learnBtn}
                onClick={() => toggleDescription(index)}
              >
                Learn More
              </button>

              {activeIndex === index && (
                <div className={aboutcss.cardDescription}>
                  {course.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={`container-fluid mt-3  d-flex justify-content-center ${aboutcss.colorchange}`}>
        <div className='container'>
          <div className="row align-items-center justify-content-center">
            {/* <div className="col-12 col-md-5">
              <h3 className={aboutcss.about}>About</h3>
              <p className={aboutcss.para}>
                An online exam portal in the IT field is a web-based platform designed for the digital administration,
                execution, and evaluation of technical assessments and certifications. These systems streamline the
                entire examination process, leveraging technology to offer a secure, efficient, and scalable alternative
                to traditional paper-based testing.
              </p>
            </div>
            <div className="col-12 col-md-5">
              <img src={aboutimg} alt="aboutimage" className="img-fluid rounded-4" />
            </div> */}

            <div className={aboutcss.aboutSection}>
              <h2 className={aboutcss.aboutTitle}>
                About <span>US</span>
              </h2>

              <div className={aboutcss.aboutImageWrapper}>
                <img
                  src={aboutimg} 
                  alt="Chatbot Illustration"
                  className={aboutcss.aboutImage}
                />
              </div>

              <h4 className={aboutcss.aboutSubtitle}>
                About us 
              </h4>

              <p className={aboutcss.aboutDescription}>
                An online exam portal in the IT field is a web-based platform designed for the digital administration,
                execution, and evaluation of technical assessments and certifications. These systems streamline the
                entire examination process, leveraging technology to offer a secure, efficient, and scalable alternative
                to traditional paper-based testing.
              </p>
            </div>



          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
