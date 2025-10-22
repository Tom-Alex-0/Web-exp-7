import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // 👈 we'll add a small CSS file for full height centering

function App() {
  const [loanAmount, setLoanAmount] = useState("");
  const [annualRate, setAnnualRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);

  const calculateEMI = () => {
    if (!loanAmount || !annualRate || !tenure) {
      alert("⚠️ Please fill all fields.");
      return;
    }
    if (loanAmount <= 0 || annualRate <= 0 || tenure <= 0) {
      alert("⚠️ Enter only positive values.");
      return;
    }

    const P = parseFloat(loanAmount);
    const R = parseFloat(annualRate) / 12 / 100;
    const N = parseFloat(tenure);

    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalAmount = emiValue * N;
    const interest = totalAmount - P;

    setEmi(emiValue.toFixed(2));
    setTotalInterest(interest.toFixed(2));
  };

  return (
    <div className="app-container d-flex justify-content-center align-items-center">
      <div className="calculator-card p-4 bg-white rounded shadow">
        <h2 className="text-center mb-4">💰 EMI Calculator</h2>

        <div className="mb-3">
          <label className="form-label">Loan Amount (₹)</label>
          <input
            type="number"
            className="form-control"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="Enter loan amount"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Annual Interest Rate (%)</label>
          <input
            type="number"
            className="form-control"
            value={annualRate}
            onChange={(e) => setAnnualRate(e.target.value)}
            placeholder="Enter annual interest rate"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Loan Tenure (Months)</label>
          <input
            type="number"
            className="form-control"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            placeholder="Enter loan tenure in months"
          />
        </div>

        <button className="btn btn-primary w-100" onClick={calculateEMI}>
          Calculate EMI
        </button>

        {emi && (
          <div className="mt-4 bg-light p-3 rounded border">
            <h5 className="text-center">📊 Calculation Result</h5>
            <p><strong>Loan Amount:</strong> ₹{loanAmount}</p>
            <p><strong>Monthly EMI:</strong> ₹{emi}</p>
            <p><strong>Total Interest:</strong> ₹{totalInterest}</p>
            <p>
              <strong>Total Payment (Principal + Interest):</strong>{" "}
              ₹{(parseFloat(loanAmount) + parseFloat(totalInterest)).toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
