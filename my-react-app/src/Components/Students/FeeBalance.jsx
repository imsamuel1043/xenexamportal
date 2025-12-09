import React, { useEffect, useRef, useState } from "react";
import "../../assets/Css/Studentcss/FeeBalance.css";
import StudentLayout from "../Layouts/StudentLayout";

const FeeBalance = () => {
  const [feeData] = useState({
    totalFee: 45000,
    payments: [
      { date: "Nov 20, 2025", amount: 15000 },
      { date: "Oct 10, 2025", amount: 10000 },
      { date: "Sep 05, 2025", amount: 7000 },
    ],
  });

  const totalPaid = feeData.payments.reduce((acc, p) => acc + p.amount, 0);
  const pending = feeData.totalFee - totalPaid;

  const tableRef = useRef(null);
  const initialized = useRef(false); // prevents reinitialization

  useEffect(() => {
    if (!initialized.current && window.$) {
      window.$(tableRef.current).DataTable({
        paging: true,
        searching: false,
        info: false,
        responsive: true,
      });

      initialized.current = true; // mark as initialized
    }
  }, []);

  return (
    <StudentLayout>
      <div className="fee-container">
        <h2 className="fee-title">Fee Balance</h2>

        <div className="fee-card">
          <div className="fee-row">
            <p>Total Course Fee</p>
            <h4>₹ {feeData.totalFee.toLocaleString()}</h4>
          </div>

          <div className="fee-row">
            <p>Total Paid</p>
            <h4 className="paid">₹ {totalPaid.toLocaleString()}</h4>
          </div>

          <div className="fee-row">
            <p>Pending Amount</p>
            <h4 className="pending">₹ {pending.toLocaleString()}</h4>
          </div>

          <div className="divider"></div>

          <h4 className="history-title">Payment History</h4>

          {/* TABLE */}
          <table
            ref={tableRef}
            className="display"
            id="paymentTable"
            style={{ width: "100%", marginTop: "10px" }}
          >
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount Paid</th>
              </tr>
            </thead>

            <tbody>
              {feeData.payments.map((pay, index) => (
                <tr key={index}>
                  <td>{pay.date}</td>
                  <td>₹ {pay.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </StudentLayout>
  );
};

export default FeeBalance;
