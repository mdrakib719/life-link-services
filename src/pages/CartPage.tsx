// import React, { useState, useEffect, FormEvent } from "react";
// import axios from "axios";

// interface Payment {
//   _id: string;
//   email: string;
//   item: string;
//   amount: number;
//   method: string;
//   status: string;
//   paidAt: string;
// }

// const PaymentPage: React.FC = () => {
//   const [email, setEmail] = useState<string>("");
//   const [item] = useState<string>("Flat Rent");
//   const [amount] = useState<number>(6000);
//   const [method, setMethod] = useState<string>("bkash");
//   const [message, setMessage] = useState<string>("");
//   const [history, setHistory] = useState<Payment[]>([]);

//   const handlePayment = async (e: FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("/api/make-payment", {
//         email,
//         item,
//         amount,
//         method,
//       });
//       setMessage(res.data.message);
//       loadHistory();
//     } catch (error) {
//       console.error(error);
//       setMessage("Payment failed");
//     }
//   };

//   useEffect(() => {
//     if (email && validateEmail(email)) {
//       loadHistory();
//     }
//   }, [email]);

//   const validateEmail = (email: string): boolean => {
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   };

//   const loadHistory = async () => {
//     try {
//       const res = await axios.get<Payment[]>(`/api/payments?email=${email}`);
//       setHistory(res.data);
//     } catch (err) {
//       console.error("Failed to fetch payment history", err);
//       // Optional: setHistory([]) to clear old data on failure
//     }
//   };
//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Make a Payment</h1>
//       <form onSubmit={handlePayment} className="space-y-4">
//         <input
//           type="email"
//           placeholder="Your email"
//           className="w-full p-2 border rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <select
//           className="w-full p-2 border rounded"
//           value={method}
//           onChange={(e) => setMethod(e.target.value)}
//         >
//           <option value="bkash">bKash</option>
//           <option value="nagad">Nagad</option>
//           <option value="rocket">Rocket</option>
//         </select>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Pay {amount} BDT
//         </button>
//       </form>

//       {message && <p className="mt-4 text-green-600">{message}</p>}

//       <h2 className="text-xl font-semibold mt-8 mb-2">Payment History</h2>
//       <ul className="space-y-2">
//         {history.map((pay) => (
//           <li key={pay._id} className="border p-2 rounded">
//             <strong>{pay.item}</strong> - {pay.amount} BDT via {pay.method} on{" "}
//             {new Date(pay.paidAt).toLocaleDateString()}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default PaymentPage;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// // Define types for the payment details
// interface Item {
//   _id: string;
//   title: string;
//   location: string;
//   pricePerMonth: string;
//   status: string;
// }

// interface PaymentDetails {
//   user: {
//     email: string;
//     item: Item;
//     paid: boolean;
//     status: string;
//     price: string;
//   };
// }

// const PaymentDetails: React.FC = () => {
//   const { id } = useParams<{ id: string }>(); // Grab payment id from URL
//   const [payment, setPayment] = useState<PaymentDetails | null>(null);

//   useEffect(() => {
//     const fetchPaymentDetails = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:3000/payment-details/${id}`
//         );

//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`Server error: ${errorText}`);
//         }

//         const data: PaymentDetails = await response.json();
//         setPayment(data);
//       } catch (error) {
//         console.error("Error fetching payment details:", error);
//       }
//     };

//     fetchPaymentDetails();
//   }, [id]);

//   if (!payment) return <div>Loading...</div>;

//   return (
//     <div>
//       <h2>Payment Details</h2>
//       <p>
//         <strong>Email:</strong> {payment.user.email}
//       </p>
//       <p>
//         <strong>Item Title:</strong> {payment.user.item.title}
//       </p>
//       <p>
//         <strong>Location:</strong> {payment.user.item.location}
//       </p>
//       <p>
//         <strong>Price Per Month:</strong> {payment.user.item.pricePerMonth}
//       </p>
//       <p>
//         <strong>Status:</strong> {payment.user.status}
//       </p>
//       <button>Pay Now</button>
//     </div>
//   );
// };

// export default PaymentDetails;
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Item {
  _id: string;
  title: string;
  location: string;
  distanceFromCampus: string;
  pricePerMonth: string;
  status: string;
  paid: boolean;
  paidAt: string | null;
}

interface Payment {
  _id: string;
  email: string;
  item: Item;
  createdAt: string;
}

const PaymentPage = () => {
  const { id } = useParams<{ id: string }>(); // Get the `id` from the URL
  const navigate = useNavigate();
  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate("/"); // Redirect if no id is provided
      return;
    }

    const fetchPayment = async () => {
      try {
        const res = await axios.get(`/api/payments/${id}`);
        setPayment(res.data);
      } catch (error) {
        console.error("Error fetching payment:", error);
        navigate("/error"); // Redirect to an error page on failure
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, [id, navigate]);

  const handlePayment = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent the default form submission or page reload
    try {
      const response = await axios.post(`/api/pay/${id}`);
      if (response.data.message === "Payment successful") {
        alert("Payment successful!");
        navigate("/success");
      }
    } catch (error) {
      alert("Payment failed.");
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!payment) return <div>Payment not found.</div>;

  const item = payment.item;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pay for: {item.title}</h2>
      <p>
        <strong>Location:</strong> {item.location}
      </p>
      <p>
        <strong>Distance:</strong> {item.distanceFromCampus}
      </p>
      <p>
        <strong>Price/Month:</strong> {item.pricePerMonth}
      </p>
      <p>
        <strong>Status:</strong> {item.status}
      </p>
      <p>
        <strong>Paid:</strong> {item.paid ? "Yes" : "No"}
      </p>

      {!item.paid ? (
        <button
          onClick={handlePayment}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Pay Now 💳
        </button>
      ) : (
        <p className="mt-4 text-green-600 font-semibold">
          Payment already completed ✅
        </p>
      )}
    </div>
  );
};

export default PaymentPage;
