import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
  role: string;
  verified: boolean;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
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
              onClick={() => {
                localStorage.removeItem("user");
                navigate("/");
              }}
            >
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
