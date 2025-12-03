import React from 'react'

const Footer = () => {
  return (
     <footer className="text-white py-2" style={{ background: "#171E71" }}>
            <div className="container">

                <div className="row text-center text-md-start">


                    <div className="col-12 col-md-4 mb-5">
                        <h5 className="fw-bold mt-3">Location</h5>
                        <p className="mb-1">Chulliyode Road, Sultan Bathery,</p>
                        <p className="mb-1">Wayanad, Kerala</p>
                        <p className="mb-1">673592</p>
                        <div>
                            <p className="mb-1">exam.xeneducation.in</p>
                            <p className="mb-1">(+91) 6282 437 109</p>
                        </div>
                    </div>


                    <div className="col-12 col-md-4 mb-5">
                        <h5 className="fw-bold mt-3">Useful links</h5>
                        <p className="mb-1">xeventureitsolution.com</p>
                        <p className="mb-1">exam.xeneducation.in</p>
                        <p className="mb-1">How it works</p>
                         <p className="mb-1">Support</p>
                    </div>


                    <div className="col-12 col-md-4 mb-5">
                        <h5 className="fw-bold mt-3">Follow us</h5>
                        <p className="mb-1">Support Follow our social media <br />to get updates or news about <br />the projects</p><br />
                        <div className="d-flex gap-3" >
                            <i className="bi bi-instagram"></i>
                        <i className="bi bi-facebook"></i>
                        <i className="bi bi-linkedin"></i>
                        <i className="bi bi-twitter-x"></i>
                        <i className="bi bi-pinterest"></i>
                         </div>
                        
                    </div>

                </div>


                <div className="text-center py-3 mt-3 mb-4" style={{ borderTop: "1px solid rgba(255,255,255,0.3)" }}>
                    <p className="mb-0" style={{ fontSize: "14px" }}>
                        Copyright © 2025 Xeneducation, All Rights Reserved.
                        Developed by <strong>Xeventure</strong>
                    </p>
                </div>

            </div>
        </footer>
  )
}

export default Footer