import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface User {
  name: string;
  email: string;
  role: string;
  verified: boolean;
}

interface CartItem {
  _id: string;
  email: string;
  item: any;
  status: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchCartItems(parsedUser.email);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const fetchCartItems = async (email: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/carts?email=${email}`);
      const data = await res.json();
      setCartItems(data);
    } catch (error) {
      console.error("Failed to fetch cart items", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleCancelCart = async (cartId: string) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/delete-cart/${cartId}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        toast.success("Cart item cancelled successfully!");
        // Refresh the cart items
        if (user) fetchCartItems(user.email);
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to cancel cart item");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    }
  };
  // State for custom meal
  const [customMeal, setCustomMeal] = useState({
    title: "",
    description: "",
  });

  const handleCustomMealSubmit = async () => {
    if (!customMeal.title || !customMeal.description) {
      toast.error("Please fill out both Title and Description.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/add-custom-meal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: customMeal.title,
          description: customMeal.description,
          price: 0,
          rating: 0,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Custom meal submitted successfully!");
        setCustomMeal({ title: "", description: "" }); // Clear form
      } else {
        toast.error(data.message || "Failed to submit meal.");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col items-center py-10 px-4 bg-gray-100 min-h-screen">
      <Card className="w-full max-w-2xl mx-auto p-8">
        <CardHeader>
          <CardTitle className="text-3xl text-center text-life-blue-500">
            Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <h2 className="text-center text-2xl font-bold text-gray-700">
            Welcome, {user.name}! 🎉
          </h2>

          <div className="space-y-2 text-center text-gray-600">
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
            <p>
              <strong>Verified:</strong> {user.verified ? "Yes ✅" : "No ❌"}
            </p>
          </div>

          <div className="flex justify-center mt-6">
            <Button
              className="bg-red-500 hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>

          {/* Cart Items */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
              Your Cart Items 🛒
            </h2>
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500">
                No items in your cart yet.
              </p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((cartItem) => (
                  <Card
                    key={cartItem._id}
                    className="p-4 border bg-white relative"
                  >
                    <h3 className="font-bold">
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
                      {cartItem.status === "confirm"
                        ? "Confirmed ✅"
                        : "Processing ⏳"}
                    </p>

                    {/* Only show Cancel button if status === process */}
                    {cartItem.status === "process" && (
                      <Button
                        onClick={() => handleCancelCart(cartItem._id)}
                        className="mt-4 bg-red-500 hover:bg-red-600"
                      >
                        Cancel Item
                      </Button>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
              Create Your Own Meal 🍽️
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Meal Title"
                value={customMeal.title}
                onChange={(e) =>
                  setCustomMeal({ ...customMeal, title: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Meal Description"
                value={customMeal.description}
                onChange={(e) =>
                  setCustomMeal({ ...customMeal, description: e.target.value })
                }
                className="w-full p-2 border rounded"
                rows={3}
              />
              <Button
                onClick={handleCustomMealSubmit}
                className="w-full bg-life-blue-500 hover:bg-life-blue-600"
              >
                Submit Meal
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
