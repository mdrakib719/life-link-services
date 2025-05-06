import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [flats, setFlats] = useState([]);
  const [shops, setShops] = useState([]);
  const [meals, setMeals] = useState([]);
  const [homes, setHomes] = useState([]);
  const [carts, setCarts] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [reply, setReply] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  // <-- New State
  const [newFlat, setNewFlat] = useState({
    title: "",
    location: "",
    distanceFromCampus: "",
    pricePerMonth: "",
  });
  const [newShop, setNewShop] = useState({
    title: "",
    location: "",
    distance: "",
    rating: "",
  });
  const [newMeal, setNewMeal] = useState({
    title: "",
    description: "",
    price: "",
    rating: "",
  });

  const [newHome, setNewHome] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    console.log("Parsed user:", parsedUser);

    if (parsedUser.role !== "admin") {
      navigate("/");
      return;
    }

    fetchUsers();
    fetchFlats();
    fetchShops();
    fetchHomes();
    fetchMeals();
    fetchContactMessages();
    fetchCarts(); // ✅ fetch all carts, not just for the admin
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/use");
      setUsers(await res.json());
    } catch {
      toast.error("Failed to fetch users");
    }
  };

  const fetchFlats = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/data");
      setFlats(await res.json());
    } catch {
      toast.error("Failed to fetch flats");
    }
  };
  const fetchHomes = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/home");
      setHomes(await res.json());
    } catch {
      toast.error("Failed to fetch homes");
    }
  };
  const fetchShops = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/shopi");
      setShops(await res.json());
    } catch {
      toast.error("Failed to fetch shops");
    }
  };

  const fetchMeals = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/food");
      setMeals(await res.json());
    } catch {
      toast.error("Failed to fetch meals");
    }
  };

  const fetchCarts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/carts");
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch carts");

      setCarts(data); // or whatever state you're using
    } catch (error) {
      console.error("Failed to fetch carts:", error.message);
    }
  };

  const approveCart = async (cartId: string) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/approve-cart/${cartId}`,
        { method: "PUT" }
      );
      if (res.ok) {
        toast.success("Cart Approved");
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser.email) {
            fetchCarts(); // Refresh cart after approval
          }
        }
      } else {
        toast.error("Failed to approve cart");
      }
    } catch {
      toast.error("Network error");
    }
  };
  const deleteCart = async (cartId: string) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/delete-carti/${cartId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Cart deleted");
        await fetchFlats(); // ensure it's awaited if it's an async function
      } else {
        toast.error(data.message || "Failed to delete cart");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the cart");
      console.error("Delete error:", error);
    }
  };

  const handleFlatSubmit = async () => {
    try {
      if (
        !newFlat.title ||
        !newFlat.location ||
        !newFlat.distanceFromCampus ||
        !newFlat.pricePerMonth
      ) {
        toast.error("Please fill in all fields");
        return;
      }
      const res = await fetch("http://localhost:3000/api/add-flat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFlat),
      });
      if (res.ok) {
        toast.success("Flat added");
        setNewFlat({
          title: "",
          location: "",
          distanceFromCampus: "",
          pricePerMonth: "",
        });
        fetchFlats();
      }
    } catch {
      toast.error("Error adding flat");
    }
  };
  const handleHomeSubmit = async () => {
    try {
      if (!newHome.title || !newHome.description) {
        toast.error("Please fill in all fields");
        return;
      }
      const res = await fetch("http://localhost:3000/api/add-home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newHome),
      });
      if (res.ok) {
        toast.success("home added");
        setNewHome({ title: "", description: "", price: "", category: "" });
        fetchHomes();
      }
    } catch {
      toast.error("Error adding home");
    }
  };

  const handleShopSubmit = async () => {
    try {
      if (!newShop.title || !newShop.location) {
        toast.error("Please fill in all fields");
        return;
      }
      const res = await fetch("http://localhost:3000/api/add-shop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newShop),
      });
      if (res.ok) {
        toast.success("Shop added");
        setNewShop({ title: "", location: "", distance: "", rating: "" });
        fetchShops();
      }
    } catch {
      toast.error("Error adding shop");
    }
  };

  const handleMealSubmit = async () => {
    try {
      if (!newMeal.title || !newMeal.description) {
        toast.error("Please fill in all fields");
        return;
      }
      const res = await fetch("http://localhost:3000/api/add-meal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMeal),
      });
      if (res.ok) {
        toast.success("Meal added");
        setNewMeal({ title: "", description: "", price: "", rating: "" });
        fetchMeals();
      }
    } catch {
      toast.error("Error adding meal");
    }
  };

  const verifyUser = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/verify-user/${id}`, {
        method: "PUT",
      });
      if (res.ok) {
        toast.success("User verified");
        fetchUsers();
      }
    } catch {
      toast.error("Failed to verify user");
    }
  };

  const cancelVerifyUser = async (id: string) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/cancel-verify-user/${id}`,
        { method: "PUT" }
      );
      if (res.ok) {
        toast.success("Verification cancelled");
        fetchUsers();
      }
    } catch {
      toast.error("Failed to cancel verification");
    }
  };

  const deleteFlat = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/delete-flat/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Flat deleted");
        fetchFlats();
      }
    } catch {
      toast.error("Failed to delete flat");
    }
  };

  const deleteuser = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/delete-user/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("user deleted");
        fetchFlats();
      }
    } catch {
      toast.error("Failed to delete user");
    }
  };

  const deleteShop = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/delete-shop/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Shop deleted");
        fetchShops();
      }
    } catch {
      toast.error("Failed to delete shop");
    }
  };

  const deleteMeal = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/delete-meal/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Meal deleted");
        fetchMeals();
      }
    } catch {
      toast.error("Failed to delete meal");
    }
  };

  const deleteHome = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/delete-home/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("home deleted");
        fetchMeals();
      }
    } catch {
      toast.error("Failed to delete home");
    }
  };

  const updateMealPrice = async (id: string) => {
    const newPrice = prompt("Enter new price:");
    if (!newPrice) return;
    try {
      const res = await fetch(
        `http://localhost:3000/api/update-meal-price/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ price: Number(newPrice) }),
        }
      );
      if (res.ok) {
        toast.success("Price updated");
        fetchMeals();
      }
    } catch {
      toast.error("Failed to update meal price");
    }
  };

  const fetchContactMessages = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/contact-messages");
      setContactMessages(await res.json());
    } catch {
      toast.error("Failed to fetch contact messages");
    }
  };

  const handleReply = async (messageId) => {
    if (!reply) return;

    const res = await fetch(
      `http://localhost:3000/api/contact-messages/${messageId}/reply`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply }),
      }
    );

    const data = await res.json();
    if (res.ok) {
      toast.success("Reply sent");
      setReply("");
      fetchContactMessages();
    } else {
      toast.error(data.message || "Failed to send reply");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      <Card className="w-full max-w-6xl">
        <CardHeader>
          <CardTitle className="text-3xl text-center text-life-blue-500">
            Admin Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-12">
          {/* Manage Users */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {users.map((user) => (
                <div key={user._id} className="border p-4 rounded shadow">
                  <p>
                    <strong>Name:</strong> {user.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {user.role}
                  </p>
                  <p>
                    <strong>Verified:</strong> {user.verified ? "✅" : "❌"}
                  </p>
                  {!user.verified ? (
                    <Button
                      onClick={() => verifyUser(user._id)}
                      className="bg-green-500 mt-2"
                    >
                      Approve
                    </Button>
                  ) : (
                    <Button
                      onClick={() => cancelVerifyUser(user._id)}
                      className="bg-red-500 mt-2"
                    >
                      Cancel Verify
                    </Button>
                  )}

                  <Button
                    onClick={() => deleteuser(user._id)}
                    className="bg-red-500"
                  >
                    Delete
                  </Button>

                  {/* User Cart Orders */}
                  <div className="mt-4 space-y-2">
                    <h3 className="text-md font-semibold">Cart Orders:</h3>
                    {carts.filter((cart) => cart.email === user.email)
                      .length === 0 ? (
                      <p className="text-gray-400 text-sm">No Cart Items</p>
                    ) : (
                      carts
                        .filter((cart) => cart.email === user.email)
                        .map((cartItem) => {
                          console.log(cartItem); // Log cartItem to check the structure
                          return (
                            <div
                              key={cartItem._id}
                              className="p-2 border rounded flex justify-between items-center"
                            >
                              <div>
                                <p>
                                  <strong>Title:</strong> {cartItem.item.title}{" "}
                                  {/* Accessing title inside item */}
                                </p>
                                <p>
                                  <strong>price:</strong>{" "}
                                  {cartItem.item.pricePerMonth}{" "}
                                  {cartItem.item.price}{" "}
                                  {/* Accessing title inside item */}
                                </p>
                                <p>
                                  <strong>Status:</strong>{" "}
                                  {cartItem.status || "No Status"}{" "}
                                  {/* Fallback for missing status */}
                                </p>
                              </div>
                              <button
                                className="text-sm text-green-600"
                                onClick={() => approveCart(cartItem._id)}
                              >
                                Approve
                              </button>
                              <button
                                className="text-sm text-green-600"
                                onClick={() => deleteCart(cartItem._id)}
                              >
                                Delete
                              </button>
                            </div>
                          );
                        })
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* Flat Form */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Add Flat</h3>
            <input
              type="text"
              placeholder="Title"
              value={newFlat.title}
              onChange={(e) =>
                setNewFlat({ ...newFlat, title: e.target.value })
              }
              className="input-field"
            />
            <input
              type="text"
              placeholder="Location"
              value={newFlat.location}
              onChange={(e) =>
                setNewFlat({ ...newFlat, location: e.target.value })
              }
              className="input-field"
            />
            <input
              type="text"
              placeholder="Distance From Campus"
              value={newFlat.distanceFromCampus}
              onChange={(e) =>
                setNewFlat({ ...newFlat, distanceFromCampus: e.target.value })
              }
              className="input-field"
            />
            <input
              type="text"
              placeholder="Price Per Month"
              value={newFlat.pricePerMonth}
              onChange={(e) =>
                setNewFlat({ ...newFlat, pricePerMonth: e.target.value })
              }
              className="input-field"
            />
            <Button onClick={handleFlatSubmit}>Add Flat</Button>
          </div>
          {/* Shop Form */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Add Shop</h3>
            <input
              type="text"
              placeholder="Title"
              value={newShop.title}
              onChange={(e) =>
                setNewShop({ ...newShop, title: e.target.value })
              }
              className="input-field"
            />
            <input
              type="text"
              placeholder="Location"
              value={newShop.location}
              onChange={(e) =>
                setNewShop({ ...newShop, location: e.target.value })
              }
              className="input-field"
            />
            <input
              type="text"
              placeholder="Distance"
              value={newShop.distance}
              onChange={(e) =>
                setNewShop({ ...newShop, distance: e.target.value })
              }
              className="input-field"
            />
            <input
              type="number"
              placeholder="Rating"
              value={newShop.rating}
              onChange={(e) =>
                setNewShop({ ...newShop, rating: e.target.value })
              }
              className="input-field"
            />
            <Button onClick={handleShopSubmit}>Add Shop</Button>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Add Home</h3>
            <input
              type="text"
              placeholder="Title"
              value={newHome.title}
              onChange={(e) =>
                setNewHome({ ...newHome, title: e.target.value })
              }
              className="input-field"
            />
            <textarea
              placeholder="Description"
              value={newHome.description}
              onChange={(e) =>
                setNewHome({ ...newHome, description: e.target.value })
              }
              className="input-field"
            />
            <input
              type="text"
              placeholder="Price"
              value={newHome.price}
              onChange={(e) =>
                setNewHome({ ...newHome, price: e.target.value })
              }
              className="input-field"
            />
            <input
              type="text"
              placeholder="Category"
              value={newHome.category}
              onChange={(e) =>
                setNewHome({ ...newHome, category: e.target.value })
              }
              className="input-field"
            />
            <Button onClick={handleHomeSubmit}>Add Home</Button>
          </div>
          {/* Meal Form */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Add Meal</h3>
            <input
              type="text"
              placeholder="Title"
              value={newMeal.title}
              onChange={(e) =>
                setNewMeal({ ...newMeal, title: e.target.value })
              }
              className="input-field"
            />
            <textarea
              placeholder="Description"
              value={newMeal.description}
              onChange={(e) =>
                setNewMeal({ ...newMeal, description: e.target.value })
              }
              className="input-field"
            />
            <input
              type="text"
              placeholder="Price"
              value={newMeal.price}
              onChange={(e) =>
                setNewMeal({ ...newMeal, price: e.target.value })
              }
              className="input-field"
            />
            <input
              type="number"
              placeholder="Rating"
              value={newMeal.rating}
              onChange={(e) =>
                setNewMeal({ ...newMeal, rating: e.target.value })
              }
              className="input-field"
            />
            <Button onClick={handleMealSubmit}>Add Meal</Button>
          </div>
          {/* Flats Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Manage Flats</h2>
            <div className="space-y-4">
              {flats.map((flat) => (
                <div
                  key={flat._id}
                  className="border p-4 rounded shadow flex justify-between items-center"
                >
                  <div>
                    <p>
                      <strong>Title:</strong> {flat.title}
                    </p>
                    <p>
                      <strong>Location:</strong> {flat.location}
                    </p>
                  </div>
                  <Button
                    onClick={() => deleteFlat(flat._id)}
                    className="bg-red-500"
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </section>
          {/* Shops Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Manage Shops</h2>
            <div className="space-y-4">
              {shops.map((shop) => (
                <div
                  key={shop._id}
                  className="border p-4 rounded shadow flex justify-between items-center"
                >
                  <div>
                    <p>
                      <strong>Title:</strong> {shop.title}
                    </p>
                    <p>
                      <strong>Location:</strong> {shop.location}
                    </p>
                  </div>
                  <Button
                    onClick={() => deleteShop(shop._id)}
                    className="bg-red-500"
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">Manage Homes</h2>
            <div className="space-y-4">
              {homes.map((home) => (
                <div
                  key={home._id}
                  className="border p-4 rounded shadow flex justify-between items-center"
                >
                  <div>
                    <p>
                      <strong>Title:</strong> {home.title}
                    </p>
                    <p>
                      <strong>Category:</strong> {home.category}
                    </p>
                  </div>
                  <Button
                    onClick={() => deleteHome(home._id)}
                    className="bg-red-500"
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </section>
          {/* Meals Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Manage Meals</h2>
            <div className="space-y-4">
              {meals.map((meal) => (
                <div
                  key={meal._id}
                  className="border p-4 rounded shadow flex justify-between items-center"
                >
                  <div>
                    <p>
                      <strong>Title:</strong> {meal.title}
                    </p>
                    <p>
                      <strong>Price:</strong> {meal.price}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => deleteMeal(meal._id)}
                      className="bg-red-500"
                    >
                      Delete
                    </Button>
                    {meal.price === 0 && (
                      <Button
                        onClick={() => updateMealPrice(meal._id)}
                        className="bg-blue-500"
                      >
                        Set Price
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* Contact Messages Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">
              Manage Contact Messages
            </h2>
            <div className="space-y-4">
              {contactMessages.map((message) => (
                <div
                  key={message._id}
                  className="border p-4 rounded shadow flex flex-col"
                >
                  <div>
                    <p>
                      <strong>Name:</strong> {message.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {message.email}
                    </p>
                    <p>
                      <strong>Subject:</strong> {message.subject}
                    </p>
                    <p>
                      <strong>Message:</strong> {message.message}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      {message.answered ? "Answered" : "Pending"}
                    </p>
                    {message.answered && (
                      <div>
                        <strong>Reply:</strong> {message.adminReply}
                      </div>
                    )}
                  </div>
                  {!message.answered && (
                    <div className="mt-4">
                      <textarea
                        placeholder="Write a reply..."
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md"
                      ></textarea>
                      <Button
                        onClick={() => handleReply(message._id)}
                        className="mt-2 bg-green-500 hover:bg-green-600"
                      >
                        Send Reply
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
          ;
        </CardContent>
      </Card>
    </div>
  );
};
export default AdminDashboard;
