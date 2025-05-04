import React, { useState, useEffect } from "react";
import axios from "axios";

interface OrderItem {
  _id: string;
  title: string;
  description: string;
  price: number;
  rating: string;
  status: string;
  createdAt: string;
}

interface OrderData {
  items: OrderItem[];
  promoCode: string;
  subtotal: number;
  discount: number;
  total: number;
  cartId: string;
}

const OrderForm: React.FC = () => {
  const [cartId, setCartId] = useState<string>("680fc607b9d6fae6cd7fb4eb"); // Example cart ID
  const [items, setItems] = useState<OrderItem[]>([]);
  const [promoCode, setPromoCode] = useState<string>("");
  const [subtotal, setSubtotal] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [cartStatus, setCartStatus] = useState<string>("");

  // Fetch Cart Details on Component Mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`/api/cart/${cartId}`);
        const cart = res.data;
        setItems(cart.item ? [cart.item] : []);
        setSubtotal(cart.item ? cart.item.price : 0);
        setCartStatus(cart.status);
      } catch (error) {
        setMessage("Failed to load cart details.");
      }
    };

    if (cartId) {
      fetchCart();
    }
  }, [cartId]);

  const handlePromoApply = async () => {
    try {
      const response = await axios.post("/api/promocode", { code: promoCode });
      const discountRate = response.data.discount;
      const discountAmount = subtotal * (discountRate / 100);
      setDiscount(discountAmount);
      setTotal(subtotal - discountAmount);
      setMessage("Promo applied successfully!");
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Invalid promo code");
    }
  };

  const handleSubmit = async () => {
    try {
      const orderData: OrderData = {
        items,
        promoCode,
        subtotal,
        discount,
        total,
        cartId,
      };

      const res = await axios.post("/api/create-order", orderData);
      if (res.status === 200) {
        setMessage("Order created successfully. Proceed to payment.");
      }
    } catch (err) {
      setMessage("Failed to create order.");
    }
  };

  const handlePayment = async () => {
    try {
      const res = await axios.post(`/api/cart/pay`, { cartId });
      if (res.status === 200) {
        setMessage("Payment successful! Your order is confirmed.");
      }
    } catch (err) {
      setMessage("Payment failed, please try again.");
    }
  };

  return (
    <div>
      <h2>Order Your Meal</h2>

      {/* Cart Info Display */}
      {cartStatus && <p>Status: {cartStatus}</p>}
      <div>
        {items.map((item, index) => (
          <div key={index}>
            <p>
              <strong>{item.title}</strong>
            </p>
            <p>{item.description}</p>
            <p>Price: ৳{item.price}</p>
            <p>Rating: {item.rating}</p>
          </div>
        ))}
      </div>

      {/* Promo Code Input */}
      <input
        type="text"
        placeholder="Promo Code"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)}
      />
      <button onClick={handlePromoApply}>Apply Promo</button>

      {/* Pricing Info */}
      <p>Subtotal: ৳{subtotal.toFixed(2)}</p>
      <p>Discount: ৳{discount.toFixed(2)}</p>
      <p>Total: ৳{total.toFixed(2)}</p>

      {/* Order and Payment */}
      <button onClick={handleSubmit}>Submit Order</button>

      {cartStatus === "confirm" && (
        <button onClick={handlePayment}>Proceed to Payment</button>
      )}

      <p>{message}</p>
    </div>
  );
};

export default OrderForm;
