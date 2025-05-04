import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CartItem {
  _id: string;
  email: string;
  item: {
    title?: string;
    name?: string;
    location?: string;
    price?: number;
    pricePerMonth?: number;
  };
  status: string;
  paid?: boolean;
}

const CartPage = () => {
  const { cartId } = useParams();
  const navigate = useNavigate();
  const [cartItem, setCartItem] = useState<CartItem | null>(null);

  useEffect(() => {
    if (cartId) {
      fetchCartDetails(cartId);
    }
  }, [cartId]);

  const fetchCartDetails = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/cart/${id}`);
      const data = await res.json();
      setCartItem(data);
    } catch (error) {
      toast.error("Failed to fetch cart details.");
    }
  };

  const handlePayNow = async () => {
    if (!cartId) return;

    try {
      const res = await fetch("http://localhost:3000/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartId }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Payment successful!");
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Payment failed");
      }
    } catch (error) {
      toast.error("Payment error. Please try again.");
    }
  };

  if (!cartItem) {
    return (
      <div className="text-center py-10 text-gray-600">
        Loading cart item...
      </div>
    );
  }

  return (
    <div className="flex justify-center py-10 px-4 bg-gray-100 min-h-screen">
      <Card className="w-full max-w-xl p-6 bg-white shadow">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-life-blue-500">
            Cart Item Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="text-lg font-bold">
            {cartItem.item.title || cartItem.item.name}
          </h3>
          {cartItem.item.location && (
            <p className="text-sm text-gray-600">
              Location: {cartItem.item.location}
            </p>
          )}
          {cartItem.item.pricePerMonth && (
            <p className="text-sm text-gray-600">
              Price: {cartItem.item.pricePerMonth}
            </p>
          )}
          {cartItem.item.price && (
            <p className="text-sm text-gray-600">
              Price: {cartItem.item.price}
            </p>
          )}
          <p className="text-sm text-gray-600">
            Status:{" "}
            {cartItem.status === "confirm" ? "Confirmed ✅" : "Processing ⏳"}
          </p>

          {!cartItem.paid ? (
            <Button
              onClick={handlePayNow}
              className="w-full bg-green-500 hover:bg-green-600"
            >
              Pay Now 💳
            </Button>
          ) : (
            <p className="text-green-600 font-medium text-center">Paid ✅</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CartPage;
