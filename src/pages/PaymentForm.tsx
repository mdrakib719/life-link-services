import React, { useState } from "react";

interface ItemDetails {
  title: string;
  description: string;
  price: string;
  pricePerMonth?: string; // Added optional property
  category: string;
  distanceFromCampus?: string; // Added optional property
}

interface RentalRecord {
  _id: string;
  email: string;
  item: ItemDetails;
  status: string;
  paid: boolean;
  createdAt: string;
}

const PaymentForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [items, setItems] = useState<RentalRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/api/pay?email=${email}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch carts");

      setItems(data); // ✅ Correctly store rental records
      setError("");
    } catch (error: any) {
      console.error("Failed to fetch carts:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const getNumericPrice = (price: string | number): number => {
    if (typeof price === "string") {
      const parsed = parseFloat(price.replace(/[^\d.]/g, ""));
      return isNaN(parsed) ? 0 : parsed;
    }
    if (typeof price === "number") {
      return price;
    }
    return 0;
  };

  const calculateTotal = () => {
    let total = 0;
    items.forEach((entry) => {
      const priceValue = entry.item.price || entry.item.pricePerMonth || 0;
      const numericPrice = getNumericPrice(priceValue);
      if (!entry.paid) total += numericPrice;
    });
    return `৳${total.toFixed(2)}`;
  };

  const handlePrint = () => {
    window.print();
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
        <div>
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Receipt Summary:</h3>
            <ul className="space-y-3">
              {items.map((entry) => (
                <li key={entry._id} className="border p-3 rounded">
                  <p>
                    <strong>Title:</strong> {entry.item?.title}
                  </p>
                  <p>
                    <strong>Description:</strong> {entry.item?.description}
                    {entry.item?.distanceFromCampus}
                  </p>
                  <p>
                    <strong>Price:</strong> {entry.item?.price}
                    {entry.item?.pricePerMonth}
                  </p>
                  {/* <p>
                    <strong>Price for Flat:</strong> {entry.item?.pricePerMonth}
                  </p> */}
                  <p>
                    <strong>Category:</strong> {entry.item?.category}
                    {"N/A"}
                  </p>
                  <p>
                    <strong>Status:</strong> {entry.status}
                  </p>
                  <p>
                    <strong>Paid:</strong> {entry.paid ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Requested At:</strong>{" "}
                    {new Date(entry.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-right mb-4">
            <p className="text-lg font-bold">Total Due: {calculateTotal()}</p>
          </div>
          <div className="flex justify-between print:hidden">
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              Pay Now
            </button>
            <button
              onClick={handlePrint}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              Print Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
