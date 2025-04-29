import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ManageUsers = ({
  users,
  carts,
  verifyUser,
  cancelVerifyUser,
  approveCart,
}) => {
  return (
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

            {/* Verification Controls */}
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

            {/* User Cart Orders */}
            <div className="mt-4 space-y-2">
              <h3 className="text-md font-semibold">Cart Orders:</h3>
              {carts.filter((cart) => cart.email === user.email).length ===
              0 ? (
                <p className="text-gray-400 text-sm">No Cart Items</p>
              ) : (
                carts
                  .filter((cart) => cart.email === user.email)
                  .map((cartItem) => (
                    <div
                      key={cartItem._id}
                      className="p-2 border rounded flex justify-between items-center"
                    >
                      <div>
                        <p>
                          <strong>Title:</strong> {cartItem.title}
                        </p>
                        <p>
                          <strong>Status:</strong> {cartItem.status}
                        </p>
                      </div>
                      {cartItem.status === "process" && (
                        <Button
                          size="sm"
                          className="bg-blue-500 hover:bg-blue-600"
                          onClick={() => approveCart(cartItem._id)}
                        >
                          Approve
                        </Button>
                      )}
                    </div>
                  ))
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ManageUsers;
