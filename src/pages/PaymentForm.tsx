import React, { useState } from "react";
import axios from "axios";

interface RentalItem {
  _id: string;
  title: string;
  location: string;
  pricePerMonth: string;
  status: string;
  createdAt: string;
}

const PaymentForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [items, setItems] = useState<RentalItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:3000/api/payment", {
        email,
      });
      const { status, unpaidItems } = response.data;

      if (status === "success") {
        if (unpaidItems.length > 0) {
          const itemsOnly = unpaidItems.map((doc: any) => doc.item); // extract `item` from each document
          setItems(itemsOnly);
        } else {
          setItems([]);
          alert("No unpaid items.");
        }
      } else {
        setError("Payment check failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Check Unpaid Items</h2>
      <input
        type="email"
        placeholder="Enter your email"
        className="border p-2 rounded w-full mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleFetch}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Check
      </button>

      {loading && <p className="mt-4">Loading unpaid items...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {items.length > 0 && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">Receipt Summary:</h3>
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item._id} className="border p-3 rounded">
                <p>
                  <strong>Title:</strong> {item.title}
                </p>
                <p>
                  <strong>Location:</strong> {item.location}
                </p>
                <p>
                  <strong>Price:</strong> {item.pricePerMonth}
                </p>
                <p>
                  <strong>Status:</strong> {item.status}
                </p>
                <p>
                  <strong>Requested At:</strong>{" "}
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
