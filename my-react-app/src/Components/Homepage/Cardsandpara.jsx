import { useState } from "react";
import cardspara from '../../assets/Css/Cardsandpara.module.css'
import whyimg from '../../assets/images/whychooseimg.jpg'
import schooledu from '../../assets/images/schooleducation.svg'
import testprep from '../../assets/images/testprep.svg'
import testpublish from '../../assets/images/testpublisher.svg'

const Cardsandpara = () => {

    const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    setMessage("Subscribed successfully! 🎉");
    setEmail("");
  };


  return (
    <div>
            <div className={cardspara.cardsspace}>
                <div className='row row-cols-1 row-cols-md-4 g-3 justify-content-center'>
                    <div className='col d-flex justify-content-center'>
                        <div className='card text-center' style={{ width: "12rem", border: "0px", backgroundColor: "#ffff" }} >
                            <img src={schooledu} alt="schooleduimg" style={{ height: "82px", width: "195px" }} />
                            <div className='card-body'>
                                <h6 className='card-title' style={{ fontSize: "16px", fontWeight: "700" }}>Reusable Questions</h6>
                                <p className='card-text' style={{ fontSize: "16px" }}>Save your question bank and re-
                                    use it in different exams with
                                    different mark distributions.</p>
                            </div>
                        </div>
                    </div>
                    <div className='col d-flex justify-content-center'>
                        <div className='card text-center' style={{ width: "12rem", border: "0px", backgroundColor:  "#ffff" }} >
                            <img src={testprep} alt="testprepimg" style={{ height: "82px", width: "195px" }} />
                            <div className='card-body'>
                                <h6 className='card-title' style={{ fontSize: "16px", fontWeight: "700" }}>Save Your Time</h6>
                                <p className='card-text' style={{ fontSize: "16px" }}> Say goodbye to the hassle of
                                    paper-based exams and the
                                    time-consuming manual grading
                                    system.</p>
                            </div>
                        </div>

                    </div>
                    <div className='col d-flex justify-content-center'>
                        <div className='card text-center' style={{ width: "12rem", border: "0px", backgroundColor:  "#ffff" }} >
                            <img src={testpublish} alt="testpublishimg" style={{ height: "82px", width: "195px" }} />
                            <div className='card-body'>
                                <h6 className='card-title' style={{ fontSize: "16px", fontWeight: "700" }}>Simple Process</h6>
                                <p className='card-text' style={{ fontSize: "16px" }}> Streamline your examination
                                    process. Create exam, select
                                    questions from question bank,
                                    allocate marks, done!</p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <div className={`container-fluid mt-5 mb-5 d-flex ${cardspara.newchange}`}>

                <div className="row align-items-center justify-content-center">

                    <div className="col-12 col-md-5">
                        <img src={whyimg} alt="whychooseimg" className='img-fluid rounded-4' />
                    </div>
                    <div className="col-12 col-md-5">
                        <h3 className={cardspara.whychoose}>Why choose us</h3>
                        <p className={cardspara.paras}>Unlock your creative potential with Xen Education's Exam portal one of the leading
                            It based course providers in Wayanad.Enroll in Xen Education's creative designing
                            and digital marketing course in Wayanad to unlock your creative potential and master the skills
                            needed for a successful career in the digital world.</p>
                    </div>
                </div>
            </div>
            <div className="text-center mt-4 mb-5">
                <h3 className={cardspara.subs}>Subscribe Newsletter</h3>

                <div className="d-flex justify-content-center gap-2 mt-3">
                    <input
                        type="text"
                        className="form-control w-25"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className={cardspara.subbutton} onSubmit={handleSubmit}>Subscribe</button>
                    {message && <p className="newsletter-message">{message}</p>}
                </div>
            </div>

        </div>
  )
}

export default Cardsandpara