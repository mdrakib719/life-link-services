import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  verified: boolean;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
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
            All Registered Users
          </h2>

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
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
