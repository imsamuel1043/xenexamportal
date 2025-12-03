import React from 'react'
import aboutimg from '../../assets/images/aboutimg.jpg'
import aboutcss from '../../assets/Css/About.module.css'

const About = () => {
  return (
    <div>
        <div>
            <h4 className='text-center fs-6 fw-bold mt-5'>"Your Gateway to Smarter Exams."</h4>
            <div className='container mt-5 mb-5 d-flex justify-content-center'>

                <div className="row row align-items-center justify-content-center">
                    <div className="col-12 col-md-5 ">
                        <h3 className={aboutcss.about}>About</h3>
                        <p className={aboutcss.para}>An online exam portal in the IT field is a web-based platform designed for the digital administration
                            ,execution, and evaluation of technical assessments
                            and certifications. These systems streamline the
                            entire examination process, leveraging technology
                            to offer a secure, efficient, and scalable alternative
                            to traditional paper-based testing.</p>
                    </div>
                    <div className="col-12 col-md-5">
                        <img src={aboutimg} alt="aboutimage" className='img-fluid rounded-4' />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About