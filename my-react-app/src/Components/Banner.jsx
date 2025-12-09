import { useNavigate } from "react-router-dom";

  

import Bannercss from '../assets/Css/Banner.module.css';
import bannerimg from '../assets/images/banner.png';

const Banner = () => {

  const navigate = useNavigate();
  
    

  return (
    <div >
    
     <div className={Bannercss.bannerContainer}>
      <img src={bannerimg} className={Bannercss.bannerImage} alt="bannerimg" />
      <div className={Bannercss.Textover}>
        
        <h3 className={Bannercss.xen}>Xen Education</h3>
        <h1 className={Bannercss.bannerhead}>Exam Portal</h1>
        
        <p className={Bannercss.para}>
          Discover a World of Knowledge and Opportunity with Our
          Diverse Range of Courses
        </p>
        

        <button 
          className={Bannercss.homebutton} 
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
        
        
      </div>
    </div>

    </div>
  )
}

export default Banner