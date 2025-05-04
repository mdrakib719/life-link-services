import React, { useState } from "react";
import axios from "axios";

const PaymentForm: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [amount, setAmount] = useState(0);
  const [orderId, setOrderId] = useState("");
  const [message, setMessage] = useState("");

  const handlePayment = async () => {
    try {
      const res = await axios.post("/api/payment", {
        orderId,
        amount,
        method: paymentMethod,
      });

      if (res.status === 200) {
        setMessage("Payment successful! Confirmation sent.");
      }
    } catch (error) {
      setMessage("Payment failed.");
    }
  };

  return (
    <div>
      <h2>Confirm Payment</h2>
      <input
        type="text"
        placeholder="Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="bkash">Bkash</option>
        <option value="nagad">Nagad</option>
        <option value="card">Card</option>
      </select>
      <button onClick={handlePayment}>Pay Now</button>
      <p>{message}</p>
    </div>
  );
};

export default PaymentForm;
