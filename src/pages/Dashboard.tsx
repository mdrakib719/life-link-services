import { useEffect, useState, FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input"; // Adjust the path based on your project structure
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
  paid?: boolean; // in here by defult it will be false
  paidAt?: string; // it will by defult be empty
}

interface ContactMessage {
  _id: string;
  email: string;
  message: string;
  subject: string;
  date: string;
  answered?: boolean;
  adminReply?: string;
  timestamp?: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [customMeal, setCustomMeal] = useState({ title: "", description: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchCartItems(parsedUser.email);
      fetchMessages(parsedUser.email);
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

  const fetchMessages = async (email: string) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/messages?email=${email}`
      );
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch messages", error);
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
        if (user) fetchCartItems(user.email);
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to cancel cart item");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    }
  };

  const handleCustomMealSubmit = async () => {
    if (!customMeal.title || !customMeal.description) {
      toast.error("Please fill out both Title and Description.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/add-custom-meal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        setCustomMeal({ title: "", description: "" });
      } else {
        toast.error(data.message || "Failed to submit meal.");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    }
  };

  if (!user) return null;

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();

    if (!user) return;

    const subject = (document.getElementById("subject") as HTMLInputElement)
      .value;
    const message = (document.getElementById("message") as HTMLInputElement)
      .value;

    if (!subject || !message) {
      toast.error("Please fill out subject and message.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          subject,
          message,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Message sent successfully!");
        (document.getElementById("subject") as HTMLInputElement).value = "";
        (document.getElementById("message") as HTMLInputElement).value = "";
      } else {
        toast.error(data.message || "Failed to send message.");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    }
  };
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
          <div className="text-center text-gray-600">
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
            <h2 className="text-xl font-semibold text-center mb-4">
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
                    className="p-4 bg-white border relative"
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

                    {cartItem.status === "process" && (
                      <Button
                        onClick={() => handleCancelCart(cartItem._id)}
                        className="mt-2 bg-red-500 hover:bg-red-600"
                      >
                        Cancel Item
                      </Button>
                    )}

                    {cartItem.status === "confirm" && !cartItem.paid && (
                      <Button
                        onClick={() => navigate(`/confirm`)}
                        className="mt-2 bg-green-500 hover:bg-green-600"
                      >
                        Pay Now 💳
                      </Button>
                    )}

                    {cartItem.paid && (
                      <p className="mt-2 text-green-600 font-medium">Paid ✅</p>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Custom Meal Form */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-center mb-4">
              Create Your Own Meal 🍽️
            </h2>
            <input
              type="text"
              placeholder="Meal Title"
              value={customMeal.title}
              onChange={(e) =>
                setCustomMeal({ ...customMeal, title: e.target.value })
              }
              className="w-full p-2 border rounded mb-2"
            />
            <textarea
              placeholder="Meal Description"
              value={customMeal.description}
              onChange={(e) =>
                setCustomMeal({ ...customMeal, description: e.target.value })
              }
              className="w-full p-2 border rounded mb-2"
              rows={3}
            />
            <Button
              onClick={handleCustomMealSubmit}
              className="w-full bg-life-blue-500 hover:bg-life-blue-600"
            >
              Submit Meal
            </Button>
          </div>

          {/* Messages Section */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-center mb-4">
              Your Messages 💬
            </h2>
            {messages.length === 0 ? (
              <p className="text-center text-gray-500">No messages yet.</p>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <Card key={msg._id} className="p-4 bg-white border">
                    <h4 className="font-semibold">{msg.subject}</h4>
                    <p className="text-sm text-gray-600">{msg.message}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      Date:{" "}
                      {msg.timestamp
                        ? new Date(msg.timestamp).toLocaleString()
                        : "N/A"}
                    </p>
                    {msg.answered && msg.adminReply && (
                      <div className="mt-2 p-2 bg-green-50 border-l-4 border-green-400 text-green-700">
                        <strong>Admin Reply:</strong> {msg.adminReply}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>
          <Card>
            <CardContent className="p-6">
              <form className="space-y-4" onSubmit={handleSendMessage}>
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Subject
                  </label>
                  <Input id="subject" placeholder="Enter subject" />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Type your message here"
                    className="w-full p-2 border rounded"
                    rows={4}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-life-blue-500 hover:bg-life-blue-600"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
