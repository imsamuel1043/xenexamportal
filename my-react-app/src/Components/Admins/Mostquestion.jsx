import React from 'react'
import mostcss from '../../assets/Css/Most.module.css'

const Mostquestion = ({ data }) => {
  return (
     <div
      style={{
        background: "#fff",
        padding: "15px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(255, 255, 255, 0.08)",
        width: "100%",
        marginLeft:"0px",
        marginTop: "0px",
        height:"300px"
      }}
    >
      <h5 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "15px" }}>
        Most Questions Used
      </h5>

      {data.map((item, index) => (
        <div
          key={index}
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <span style={{ fontSize: "14px", fontWeight: 500 }}>{item.subject}</span>

          <div
            style={{
              width: "100px",
              height: "6px",
              background: "#e5e7eb",
              borderRadius: "4px",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                width: `${item.percent}%`,
                height: "100%",
                background: "#3b82f6",
                borderRadius: "4px"
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>

  )
}

export default Mostquestion