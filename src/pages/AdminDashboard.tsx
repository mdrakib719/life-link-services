import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
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
  const [flats, setFlats] = useState([]);
  const [shops, setShops] = useState([]);
  const [meals, setMeals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/");
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== "admin") {
      navigate("/");
      return;
    }

    fetchUsers();
    fetchFlats();
    fetchShops();
    fetchMeals();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/use");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  const fetchFlats = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/flats");
      const data = await res.json();
      setFlats(data);
    } catch (error) {
      toast.error("Failed to fetch flats");
    }
  };

  const fetchShops = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/shops");
      const data = await res.json();
      setShops(data);
    } catch (error) {
      toast.error("Failed to fetch shops");
    }
  };

  const fetchMeals = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/meals");
      const data = await res.json();
      setMeals(data);
    } catch (error) {
      toast.error("Failed to fetch meals");
    }
  };

  // Handle Flat Form Submission
  const handleFlatSubmit = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/add-flat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFlat),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Flat added successfully!");
        setFlats((prevFlats) => [...prevFlats, newFlat]); // Update state directly
      } else {
        toast.error(data.message || "Failed to add flat");
      }
    } catch (error) {
      toast.error("Error adding flat");
    }
  };

  // Handle Shop Form Submission
  const handleShopSubmit = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/add-shop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newShop),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Shop added successfully!");
        setShops((prevShops) => [...prevShops, newShop]); // Update state directly
      } else {
        toast.error(data.message || "Failed to add shop");
      }
    } catch (error) {
      toast.error("Error adding shop");
    }
  };

  // Handle Meal Form Submission
  const handleMealSubmit = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/add-meal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMeal),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Meal added successfully!");
        setMeals((prevMeals) => [...prevMeals, newMeal]); // Update state directly
      } else {
        toast.error(data.message || "Failed to add meal");
      }
    } catch (error) {
      toast.error("Error adding meal");
    }
  };

  // Approve and Cancel Verification Functions...
  const verifyUser = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/verify-user/${id}`, {
        method: "PUT",
      });

      if (res.ok) {
        toast.success("User verified successfully!");
        fetchUsers(); // Refresh user list
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to verify user");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    }
  };

  const cancelVerifyUser = async (id: string) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/cancel-verify-user/${id}`,
        {
          method: "PUT",
        }
      );

      if (res.ok) {
        toast.success("User verification cancelled!");
        fetchUsers(); // Refresh user list
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to cancel verification");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      <Card className="w-full max-w-5xl">
        <CardHeader>
          <CardTitle className="text-3xl text-center text-life-blue-500">
            Admin Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <h2 className="text-center text-xl font-semibold text-gray-700">
            Manage Users
          </h2>

          {/* User list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {users.map((user) => (
              <Card key={user._id} className="p-4 border">
                <h3 className="font-bold text-lg">{user.name}</h3>
                <p className="text-gray-600 text-sm">{user.email}</p>
                <p className="text-gray-600 text-sm">Role: {user.role}</p>
                <p className="text-gray-600 text-sm">
                  Verified: {user.verified ? "Yes ✅" : "No ❌"}
                </p>

                {!user.verified && (
                  <Button
                    onClick={() => verifyUser(user._id)}
                    className="mt-2 bg-green-500 hover:bg-green-600"
                  >
                    Approve Verification
                  </Button>
                )}

                {user.verified && (
                  <Button
                    onClick={() => cancelVerifyUser(user._id)}
                    className="mt-2 bg-red-500 hover:bg-red-600"
                  >
                    Cancel Verification
                  </Button>
                )}
              </Card>
            ))}
          </div>

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
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
