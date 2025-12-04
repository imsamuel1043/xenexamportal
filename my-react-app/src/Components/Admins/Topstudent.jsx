

import Studentcss from '../../assets/Css/Topstudent.module.css'
import students1 from "../../assets/images/students1.jpeg";
import students2 from "../../assets/images/students2.jpeg";
import Piechart from './Piechart';





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

];
const Topstudent = () => {
    return (
        <div className={Studentcss.bigbox}>

            <div className={Studentcss.leftSection}>
                <h5 className={Studentcss.title}>Top Students of the Month</h5>

                <div className={Studentcss.studentgrid}>
                    {students.map((student, index) => (
                        <div key={index} className={Studentcss.studentscard}>
                            <img src={student.image} alt={student.name} className={Studentcss.studentsimg} />
                            <h5 style={{fontWeight:"600"}}>{student.name}</h5>
                            <p style={{color:"#449bffff"}}>{student.percentage}</p>
                            <div className={Studentcss.badg}>Congratulations 🎉</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={Studentcss.rightSection}>
                <Piechart/>
            </div>

        </div>



    )
}

export default Topstudent