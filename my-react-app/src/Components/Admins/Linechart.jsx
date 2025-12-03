import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const data = [
    { name: "Jan", students: 40, lastYear: 32 },
    { name: "Feb", students: 55, lastYear: 30 },
    { name: "Mar", students: 65, lastYear: 38 },
    { name: "Apr", students: 45, lastYear: 40 },
    { name: "May", students: 80, lastYear: 42 },
    { name: "Jun", students: 70, lastYear: 52 },
    { name: "Jul", students: 40, lastYear: 67 },
    { name: "Aug", students: 55, lastYear: 34 },
    { name: "Sep", students: 65, lastYear: 39 },
    { name: "Oct", students: 80, lastYear: 28 },
    { name: "Nov", students: 78, lastYear: 40 },
    { name: "Dec", students: 90, lastYear: 59 }
];

const Linechart = () => {
    return (
        <div style={{
            width: "75%", backgroundColor: "#ffffffff", borderRadius: "12px",
            paddingTop: "12px", paddingLeft: "12px", height: "300px"
        }}>

            <h4 style={{ marginBottom: "5px", color: "#000000ff", fontSize: "18px", fontWeight: 600 }}>
                Students Performance
            </h4>
            <p style={{ marginTop: 0, marginBottom: "15px", color: "#555", fontSize: "14px" }}>
                Monthly comparison between current year and last year
            </p>


           
            <div style={{ display: "flex", width: "93%", height:" 188px" }}>

                
                <div style={{ flex: 1 , width: "100%" }}>
                    <ResponsiveContainer>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="0.1 0.1" />
                            <XAxis dataKey="name" axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: "#68686898" }}
                            />
                            <YAxis axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: "#3333339e" }}
                            />
                            <Tooltip />
                            <Line type="monotone"
                                dataKey="students"
                                stroke="#4e73df" strokeWidth={2} />

                            <Line
                                type="monotone"
                                dataKey="lastYear"
                                stroke="#bcdfe4ff"
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                name="Last Year"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                

                
                
            </div>
            
            
            

        </div>
    
    )
}

export default Linechart