import React from 'react'

import Studentcss from '../../assets/Css/Topstudent.module.css'
import student1 from '../../assets/images/student1.jpg'
import student2 from '../../assets/images/student2.jpg'
import grade from '../../assets/images/studentgrades.png'
import Piechart from './Piechart'

const Topstudent = () => {
    return (
        <div className="card p-2 shadow-sm d-flex align-items-center mt-1" style={{
            width: "25rem", height: "25rem",
            borderRadius: "15px", border: "0px"
        }}>

            <h4 className='fw-bold mb-1 text-align-start '
                style={{ fontSize: "18px", paddingTop: "8px", paddingRight: "79px" }}>
                Top performers of the month </h4>

            <div className='row justify-content-center gap-3'>

                <div className="card p-3 shadow-sm d-flex align-items-center col-md-2"
                    style={{ width: "10rem", height: "16rem", borderRadius: "8px", border: "0px" }}>

                    <img
                        src={student1}
                        alt="student"
                        className="mb-3"
                        style={{ width: "134px", height: "100px", objectFit: "cover" }}
                    />

                    <h5 className="fw-bold mb-1" style={{ fontSize: "14px" }}>Prabin K</h5>
                    <p className="text-muted mb-1 text-center" style={{ fontSize: "14px" }}>
                        UI/UX Design and Development</p>

                    <div
                        className="mt-2 px-3 py-1"
                        style={{ background: "#231c80ff", borderRadius: "3px" }}
                    >
                        <span className="fw-bold" style={{
                            color: "#ffffffff", border: "1px",
                            backgroundColor: "#231c80ff"
                        }}>
                            Congratulations
                        </span>
                    </div>
                    <div className="p-3 shadow-sm" style={{
                        background: "#ffffffff",
                        borderRadius: "10px",
                        marginTop: "30px",
                        width: "160px",

                    }}
                    >

                        {/* small card 1 */}

                        <div className='row justify-content-cente'>
                            <div className='d-flex align-items-center col-3 '>
                                <img src={grade} alt="Gradeimg" style={{ height: "30px", width: "30px" }} />
                            </div>
                            <div className=' d-flex align-items-center col-3'>
                                <p className={Studentcss.grades}>Score:</p>
                                <p className="mb-0 fw-bold">96%</p>
                            </div>

                        </div>

                    </div>
                </div>
                <div className="card p-3 shadow-sm d-flex align-items-center col-md-2"
                    style={{ width: "10rem", height: "16rem", borderRadius: "8px", border: "0.5px" }}>

                    <img
                        src={student2}
                        alt="student"
                        className="mb-3"
                        style={{ width: "134px", height: "100px", objectFit: "cover" }}
                    />

                    <h5 className="fw-bold mb-1" style={{ fontSize: "14px" }}>Aiswarya</h5>
                    <p className="text-muted mb-1 text-center" style={{ fontSize: "14px" }}>
                        UI/UX Design and Development</p>

                    <div
                        className="mt-2 px-3 py-1"
                        style={{ background: "#231c80ff", borderRadius: "3px" }}
                    >
                        <span className="fw-bold" style={{
                            color: "#ffffffff", border: "1px",
                            backgroundColor: "#231c80ff"
                        }}>
                            Congratulations
                        </span>
                    </div>

                    {/* smallcard 2 */}

                    <div className="p-3 shadow-sm" style={{
                        background: "#ffffffff",
                        borderRadius: "10px",
                        marginTop: "40px",
                        width: "160px",

                    }}
                    >
                        <div className='row justify-content-cente'>
                            <div className='d-flex align-items-center col-3 '>
                                <img src={grade} alt="Gradeimg" style={{ height: "30px", width: "30px" }} />
                            </div>
                            <div className=' d-flex align-items-center col-3'>
                                <p className={Studentcss.grades}>Score:</p>
                                <p className="mb-0 fw-bold"> 96%</p>
                            </div>

                        </div>

                    </div>
                </div>
                <div>

                </div>

            </div>

        </div>


    )
}

export default Topstudent