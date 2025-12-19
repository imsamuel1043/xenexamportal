import React, { useEffect, useRef } from "react";
import "../../assets/Css/Student.css"; // Use main student CSS
import StudentLayout from "../Layouts/StudentLayout";

const FeeBalance = () => {
  const feeData = {
    totalFee: 45000,
    payments: [
      { date: "Nov 20, 2025", amount: 15000 },
      { date: "Oct 10, 2025", amount: 10000 },
      { date: "Sep 05, 2025", amount: 7000 },
    ],
  };

  const totalPaid = feeData.payments.reduce((acc, p) => acc + p.amount, 0);
  const pending = feeData.totalFee - totalPaid;

  const tableRef = useRef(null);

  useEffect(() => {
    if (!tableRef.current || !window.$) return;

    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    new window.DataTable(tableRef.current, {
      responsive: true,
      ordering: false,
      searching: false,
      paging: false,
      info: false,
      dom: "t",
    });
  }, []);

  return (
    <StudentLayout>
      <div className="student-management-box" style={{ maxWidth: "700px", margin: "0 auto" }}>
        <div className="page-header">
          <h2 className="page-title">Fee Balance</h2>
        </div>

        {/* FEE SUMMARY */}
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

          {/* PAYMENT HISTORY TABLE */}
          <div className="table-responsive">
            <table ref={tableRef} className="display students-table" style={{ width: "100%", marginTop: "10px" }}>
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

            {feeData.payments.length === 0 && (
              <p style={{ padding: "20px", textAlign: "center" }}>
                No payment history available.
              </p>
            )}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default FeeBalance;
