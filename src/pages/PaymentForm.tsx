import React, { useState } from "react";
import axios from "axios";

interface Item {
  _id: string;
  title: string;
  location: string;
  distanceFromCampus: string;
  pricePerMonth: string;
  status: string;
  paid: boolean;
  paidAt: Date | null;
  createdAt: Date;
}

interface PaymentInfo {
  email: string;
  item: Item;
}

const PaymentForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchPaymentInfo = async () => {
    try {
      const res = await axios.get(`/api/payment-info/${email}`);

      // Check if the response has valid data
      if (res.data) {
        setPaymentInfo(res.data);
        setErrorMessage(""); // Clear error message if data is fetched
      } else {
        setErrorMessage("No payment record found for this email.");
        setPaymentInfo(null); // Reset payment info if no data found
      }
    } catch (error) {
      console.error("Error fetching payment info:", error);
      setErrorMessage("An error occurred while fetching the data.");
      setPaymentInfo(null);
    }
  };

  return (
    <div>
      <h2>Enter Email to Get Payment Info</h2>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={fetchPaymentInfo}>Fetch Info</button>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {paymentInfo && (
        <div>
          <h3>Payment Details</h3>
          <p>
            <strong>Email:</strong> {paymentInfo.email}
          </p>
          <p>
            <strong>Item Title:</strong> {paymentInfo.item.title}
          </p>
          <p>
            <strong>Location:</strong> {paymentInfo.item.location}
          </p>
          <p>
            <strong>Distance from Campus:</strong>{" "}
            {paymentInfo.item.distanceFromCampus}
          </p>
          <p>
            <strong>Price per Month:</strong> {paymentInfo.item.pricePerMonth}
          </p>
          <p>
            <strong>Status:</strong> {paymentInfo.item.status}
          </p>
          <p>
            <strong>Paid:</strong> {paymentInfo.item.paid ? "Yes" : "No"}
          </p>
          <p>
            <strong>Paid At:</strong>{" "}
            {paymentInfo.item.paidAt
              ? paymentInfo.item.paidAt.toString()
              : "Not paid yet"}
          </p>
          <p>
            <strong>Created At:</strong> {paymentInfo.item.createdAt.toString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
