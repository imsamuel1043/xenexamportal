import React, { useState } from "react";
import "../../assets/Css/Studentcss/FeeBalance.css";
import StudentLayout from "../Layouts/StudentLayout";

const FeeBalance = () => {
    const [feeData] = useState({
        totalFee: 45000,
        payments: [
            { date: "Nov 20, 2025", amount: 15000 },
            { date: "Oct 10, 2025", amount: 10000 },
            { date: "Sep 05, 2025", amount: 7000 }
        ]
    });

    const totalPaid = feeData.payments.reduce((acc, p) => acc + p.amount, 0);
    const pending = feeData.totalFee - totalPaid;

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

                    <div className="payment-list">
                        {feeData.payments.map((pay, index) => (
                            <div key={index} className="payment-box">
                                <p className="payment-date">{pay.date}</p>
                                <p className="payment-amount">₹ {pay.amount.toLocaleString()}</p>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </StudentLayout>
    );
};

export default FeeBalance;
