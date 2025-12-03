import React from 'react'
import AdminLayout from '../Layouts/AdminLayout';

const OngoingExam = () => {

    const liveExams = [
        {
            title: "Javascript",
            date: "Dec 5, 2025",
            duration: "2 Hours",
            status: "inprogress"
        },
        {
            title: "Css",
            date: "Dec 15, 2025",
            duration: "1 Hour",
            status: "notstarted"
        },
        {
            title: "Digital Marketing",
            date: "Nov 27, 2025",
            duration: "1.5 Hours",
            status: "completed"
        }];


    return (
        <AdminLayout>
            <div className="d-flex justify-content-between align-items-center flex-wrap">
        <h3 className="fw-bold mb-2">Examinations</h3>

      </div>


            <div className="card shadow-sm p-3 mt-3" style={{ borderRadius: "10px" }}>

                <div className="row mt-3">
                    {liveExams.map((exam, index) => (
                        <div key={index} className="col-12 col-md-6 col-lg-4 mb-3">

                            <div className="card p-3 shadow-sm d-flex justify-content-between" style={{ borderRadius: "10px" }}>
                                <div className='mb-3' style={{
                                    width: "100%", borderRadius: " 0 0 10px 10px ",
                                    height: "6px",
                                    marginTop: "-16px",
                                    backgroundColor: exam.status === "completed"
                                        ? "#0dba35"
                                        : exam.status === "inprogress"
                                            ? "#144efd"
                                            : "#ff480b"

                                }}>
                                </div>

                                <div>
                                    <h6 className="fw-bold">{exam.title}</h6>
                                    <p className="mb-1 " 
                                    style={{fontSize:"13px",color:"#4f4f4f"}}>
                                        Date: {exam.date}</p>
                                    <p className="mb-1" 
                                    style={{fontSize:"14px"}}>
                                        Duration: {exam.duration}</p>
                                </div>


                                <div className="mt-2">

                                    {exam.status === "completed" && (
                                        <span className="badge px-3 py-2"
                                            style={{
                                                backgroundColor: "#0dba3525",
                                                borderRadius: "30px",
                                                color: "#028b22ff"
                                            }}>
                                            Completed
                                        </span>
                                    )}
                                    {exam.status === "inprogress" && (
                                        <span className="badge px-3 py-2"
                                            style={{
                                                backgroundColor: "#144efd20",
                                                borderRadius: "30px",
                                                color: "#144efdff"
                                            }}>
                                            In Progress
                                        </span>
                                    )}
                                    {exam.status === "notstarted" && (
                                        <span className="badge px-3 py-2"
                                            style={{
                                                backgroundColor: "#ff480b24",
                                                borderRadius: "30px",
                                                color: "#ff480bff"
                                            }}>
                                            Not Started
                                        </span>
                                    )}
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>


        </AdminLayout>

    )
}

export default OngoingExam