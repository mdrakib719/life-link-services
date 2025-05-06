import express from "express";
import { MongoClient, ObjectId } from "mongodb"; // Import ObjectId
import cors from "cors";

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
const url =
  "mongodb+srv://scm:123456scm@scm.ez2lk.mongodb.net/scm?retryWrites=true&w=majority&appName=scm";
const client = new MongoClient(url);
let db;
let flatCollection;
let shopCollection;
let mealCollection;
let cartCollection;
let userCollection;
let paymentCollection;
let homeCollection;

client
  .connect()
  .then(() => {
    db = client.db("test");
    flatCollection = db.collection("flat");
    shopCollection = db.collection("shop");
    mealCollection = db.collection("meal");
    cartCollection = db.collection("cart");
    userCollection = db.collection("user");
    paymentCollection = db.collection("payments");
    homeCollection = db.collection("home");

    console.log("✅ Connected to MongoDB");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });

// ------------------------------------------------
// 🏡 Flat, 🍽️ Shop, 🍛 Meal routes
// ------------------------------------------------

// Fetch Flats
app.get("/api/data", async (req, res) => {
  try {
    const flats = await flatCollection.find({}).toArray();
    res.json(flats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching flats", error });
  }
});

// Fetch Shops
app.get("/api/shopi", async (req, res) => {
  try {
    const shops = await shopCollection.find({}).toArray();
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shops", error });
  }
});
app.get("/api/home", async (req, res) => {
  try {
    const homes = await homeCollection.find({}).toArray();
    res.json(homes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching homes", error });
  }
});
// Fetch Meals
app.get("/api/food", async (req, res) => {
  try {
    const meals = await mealCollection.find({}).toArray();
    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching meals", error });
  }
});

app.get("/api/home", async (req, res) => {
  try {
    const home = await homeCollection.find({}).toArray();
    res.json(home);
  } catch (error) {
    res.status(500).json({ message: "Error fetching home", error });
  }
});

app.delete("/api/delete-user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await userCollection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: "user deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});
// ------------------------------------------------
// ➕ Add Flat, Shop, Meal
// ------------------------------------------------

app.post("/api/add-flat", async (req, res) => {
  const { title, location, distanceFromCampus, pricePerMonth } = req.body;
  try {
    await flatCollection.insertOne({
      title,
      location,
      distanceFromCampus,
      pricePerMonth,
    });
    res.status(201).json({ message: "Flat added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding flat", error });
  }
});

app.post("/api/add-shop", async (req, res) => {
  const { title, location, distance, rating } = req.body;
  try {
    await shopCollection.insertOne({ title, location, distance, rating });
    res.status(201).json({ message: "Shop added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding shop", error });
  }
});

app.post("/api/add-home", async (req, res) => {
  const { title, description, price, category } = req.body;
  try {
    await homeCollection.insertOne({ title, description, price, category });
    res.status(201).json({ message: "home added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding home", error });
  }
});
app.post("/api/add-meal", async (req, res) => {
  const { title, description, price, rating } = req.body;
  try {
    await mealCollection.insertOne({ title, description, price, rating });
    res.status(201).json({ message: "meal added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding meal", error });
  }
});

app.post("/api/add-custom-meal", async (req, res) => {
  const { title, description, price, rating } = req.body;
  try {
    await mealCollection.insertOne({ title, description, price, rating });
    res.status(201).json({ message: "Meal added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding meal", error });
  }
});

// ------------------------------------------------
// 🛒 Cart System
// ------------------------------------------------

// Add to cart
app.post("/api/add-cart", async (req, res) => {
  const { email, item, status } = req.body;
  try {
    await cartCollection.insertOne({
      email,
      item,
      status,
      paid: false,
      paidAt: null,
      createdAt: new Date(),
    });
    await paymentCollection.insertOne({
      email,
      item,
      status,
      paid: false,
      paidAt: null,
      createdAt: new Date(),
    });
    res.status(201).json({ message: "Added to cart successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
});

// Get all carts
// Example in Node.js (Express) using MongoDB
// Example Express route to fetch carts by email
app.get("/api/carts", async (req, res) => {
  const { email } = req.query;

  try {
    let carts;
    if (email) {
      carts = await cartCollection.find({ email }).toArray(); // ✅ fix here
    } else {
      carts = await cartCollection.find().toArray(); // ✅ fix here
    }

    return res.json(carts); // ✅ Now this is a plain JS array — no circular refs
  } catch (err) {
    console.error("Error fetching carts:", err);
    return res.status(500).json({ message: "Failed to fetch carts" });
  }
});

// Approve cart
app.put("/api/approve-cart/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await cartCollection.updateOne(
      { _id: new ObjectId(id), status: "process" },
      { $set: { status: "confirm" } }
    );

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "Cart not found or already approved" });
    }

    res.status(200).json({ message: "Cart approved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error approving cart", error });
  }
});

// Cancel cart (only if status = process)
app.delete("/api/delete-cart/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await cartCollection.findOne({ _id: new ObjectId(id) });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    if (cart.status === "confirm") {
      return res.status(400).json({ message: "Cannot cancel confirmed order" });
    }

    await cartCollection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling cart", error });
  }
});

// ------------------------------------------------
// 👥 User Authentication
// ------------------------------------------------

// Signup
app.post("/api/submitForm", async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newUser = {
      name,
      email,
      password,
      role: role || "user",
      verified: false,
      createdAt: new Date(),
    };
    await userCollection.insertOne(newUser);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userCollection.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        verified: user.verified,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error during login", error });
  }
});

// Fetch all users
app.get("/api/use", async (req, res) => {
  try {
    const users = await userCollection.find({}).toArray();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

// Approve user
app.put("/api/verify-user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await userCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { verified: true } }
    );
    res.status(200).json({ message: "User verified" });
  } catch (error) {
    res.status(500).json({ message: "Error verifying user", error });
  }
});

// Cancel verify
app.put("/api/cancel-verify-user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await userCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { verified: false } }
    );
    res.status(200).json({ message: "User unverified" });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling verification", error });
  }
});

// ------------------------------------------------
// 🗑️ Delete Flat, Shop, Meal
// ------------------------------------------------

app.delete("/api/delete-flat/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await flatCollection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: "Flat deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting flat", error });
  }
});

app.delete("/api/delete-shop/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await shopCollection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: "Shop deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting shop", error });
  }
});
app.delete("/api/delete-home/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await homeCollection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: "home deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting home", error });
  }
});

app.delete("/api/delete-meal/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await mealCollection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: "Meal deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting meal", error });
  }
});

// Update Meal Price (only if price is 0)
app.put("/api/update-meal-price/:id", async (req, res) => {
  const { id } = req.params;
  const { price } = req.body;
  try {
    const meal = await mealCollection.findOne({ _id: new ObjectId(id) });
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    if (meal.price !== 0) {
      return res
        .status(400)
        .json({ message: "Only meals with price 0 can be updated" });
    }
    await mealCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { price } }
    );
    res.status(200).json({ message: "Meal price updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating meal price", error });
  }
});

// ------------------------------------------------
// Server Listen
// ------------------------------------------------

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// Routes

// Get all discussions
app.get("/api/discussions", async (req, res) => {
  const discussions = await db
    .collection("discussions")
    .find({})
    .sort({ _id: -1 })
    .toArray();
  res.json(discussions);
});

// Post a new discussion
app.post("/api/discussions", async (req, res) => {
  const { title, author, category } = req.body;
  const newDiscussion = {
    title,
    author,
    category,
    time: new Date().toLocaleString(),
    replies: [],
    likes: 0,
  };
  await db.collection("discussions").insertOne(newDiscussion);
  res.json({ message: "Discussion created" });
});

// Add reply to a discussion
app.post("/api/discussions/:id/reply", async (req, res) => {
  const { text, author } = req.body;
  const reply = {
    text,
    author,
    time: new Date().toLocaleString(),
  };
  await db
    .collection("discussions")
    .updateOne(
      { _id: new ObjectId(req.params.id) },
      { $push: { replies: reply } }
    );
  res.json({ message: "Reply added" });
});

// Like a discussion
app.post("/api/discussions/:id/like", async (req, res) => {
  await db
    .collection("discussions")
    .updateOne({ _id: new ObjectId(req.params.id) }, { $inc: { likes: 1 } });
  res.json({ message: "Liked" });
});

// Get support topics
app.get("/api/support", async (req, res) => {
  const topics = await db
    .collection("supportTopics")
    .find({})
    .sort({ _id: -1 })
    .toArray();
  res.json(topics);
});

// Add new support topic (optional)
app.post("/api/support", async (req, res) => {
  const { title, category } = req.body;
  await db.collection("supportTopics").insertOne({
    title,
    category,
    answered: true,
  });
  res.json({ message: "Support topic created" });
});

app.post("/api/discussions/:id/like", async (req, res) => {
  const userId = req.body.userId; // Assume userId comes from frontend (after login)

  const discussion = await db
    .collection("discussions")
    .findOne({ _id: new ObjectId(req.params.id) });

  if (discussion.likedBy.includes(userId)) {
    return res.status(400).json({ message: "Already liked" });
  }

  await db.collection("discussions").updateOne(
    { _id: new ObjectId(req.params.id) },
    {
      $inc: { likes: 1 },
      $push: { likedBy: userId },
    }
  );

  res.json({ message: "Liked" });
});

app.get("/api/support/:id", async (req, res) => {
  const topic = await db
    .collection("supportTopics")
    .findOne({ _id: new ObjectId(req.params.id) });
  if (!topic) return res.status(404).json({ message: "Not found" });
  res.json(topic);
});

app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields required." });
  }

  const contactMessage = {
    name,
    email,
    subject,
    message,
    timestamp: new Date(),
    answered: false,
    adminReply: "",
  };

  try {
    await db.collection("contactMessages").insertOne(contactMessage);
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save message.", error });
  }
});

app.get("/api/contact-messages", async (req, res) => {
  try {
    const messages = await db.collection("contactMessages").find().toArray();
    res.json(messages);
  } catch {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});
app.put("/api/contact-messages/:id/reply", async (req, res) => {
  const { id } = req.params;
  const { reply } = req.body;

  try {
    const result = await db
      .collection("contactMessages")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { adminReply: reply, answered: true } }
      );

    if (result.modifiedCount === 0) {
      return res.status(400).json({ message: "Message not found" });
    }

    res.status(200).json({ message: "Reply sent successfully" });
  } catch {
    res.status(500).json({ message: "Failed to send reply" });
  }
});

// // 1. Route to fetch messages (GET)
// app.get("/api/messages", async (req, res) => {
//   try {
//     const email = req.query.email; // For example, you can filter messages based on the user's email
//     let messages;

//     if (email) {
//       messages = await contactMessagesCollection.find({ email }).toArray();
//     } else {
//       messages = await contactMessagesCollection.find().toArray(); // Fetch all messages for admin
//     }

//     res.status(200).json(messages);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching messages", error });
//   }
// });

app.get("/api/messages", async (req, res) => {
  try {
    const { email } = req.query;
    const filter = email ? { email } : {};

    const messages = await db
      .collection("contactMessages")
      .find(filter)
      .sort({ timestamp: -1 })
      .toArray();

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/reset-password", async (req, res) => {
  const { name, email, verified, newPassword } = req.body;

  if (!name || !email || !verified || !newPassword) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const user = await userCollection.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (
      user.name !== name ||
      String(user.verified).toLowerCase() !== String(verified).toLowerCase()
    ) {
      return res.status(400).json({ message: "Verification failed." });
    }

    // Optionally hash password if you're storing hashed passwords
    // const hashedPassword = await bcrypt.hash(newPassword, 10);
    const result = await userCollection.updateOne(
      { email },
      { $set: { password: newPassword } }
    );

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: "Password reset successfully." });
    } else {
      res.status(500).json({ message: "Failed to reset password." });
    }
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// app.post("/api/pay", async (req, res) => {
//   const { cartId } = req.body;
//   console.log("Received cartId:", cartId); // <-- Add this

//   try {
//     const cartItem = await Cart.findById(cartId);
//     if (!cartItem) {
//       console.log("Cart item not found"); // <-- Add this
//       return res.status(404).json({ message: "Cart item not found." });
//     }

//     const user = await User.findById(cartItem.userId);
//     if (!user) {
//       console.log("User not found");
//       return res.status(404).json({ message: "User not found." });
//     }

//     if (user.balance < cartItem.totalPrice) {
//       return res.status(400).json({ message: "Insufficient balance." });
//     }

//     user.balance -= cartItem.totalPrice;
//     await user.save();

//     await Transaction.create({
//       userId: user._id,
//       type: "debit",
//       amount: cartItem.totalPrice,
//     });

//     await Cart.findByIdAndDelete(cartId);

//     res.json({ message: "Payment successful." });
//   } catch (err) {
//     console.error("Payment failed:", err); // <-- Log error
//     res.status(500).json({ message: "Payment failed." });
//   }
// });
// Add a payment
// app.post("/api/make-payment", async (req, res) => {
//   const { email, item, amount, method } = req.body;
//   if (!email || !item || !amount || !method) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   try {
//     await paymentCollection.insertOne({
//       email,
//       item,
//       amount,
//       method,
//       status: "paid",
//       paidAt: new Date(),
//     });
//     res.status(201).json({ message: "Payment successful" });
//   } catch (error) {
//     res.status(500).json({ message: "Error processing payment", error });
//   }
// });

// // Get all payments (optionally filter by email)
// app.get("/api/payments", async (req, res) => {
//   const { email } = req.query;

//   try {
//     const query = email ? { email } : {};
//     const payments = await paymentCollection.find(query).toArray();
//     res.status(200).json(payments);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching payments", error });
//   }
// });

// app.get("/payment-details/:id", async (req, res) => {
//   try {
//     const paymentId = req.params.id;

//     // Query the database for the payment details with 'paid: false'
//     const payment = await Payment.findOne({ _id: paymentId, paid: false })
//       .populate("item")
//       .exec();

//     if (!payment) {
//       return res.status(404).send("Payment not found or already paid");
//     }

//     res.json({
//       user: {
//         email: payment.email,
//         item: payment.item,
//         paid: payment.paid,
//         status: payment.status,
//         price: payment.item.pricePerMonth,
//       },
//     });
//   } catch (error) {
//     res.status(500).send("Server error");
//   }
// });

// Get payment item
// Get payment by id

// Get all carts
app.get("/api/pay", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const unpaidItems = await cartCollection
      .find({ email, paid: false, status: "confirm" })
      .toArray();
    res.json(unpaidItems);
  } catch (err) {
    console.error("Error fetching unpaid items:", err);
    res.status(500).json({ message: "Failed to fetch unpaid items" });
  }
});

app.delete("/api/delete-carti/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await cartCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Cart not found or already deleted" });
    }

    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting cart", error });
  }
});
