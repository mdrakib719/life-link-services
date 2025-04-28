import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
const url =
  "mongodb+srv://scm:123456scm@scm.ez2lk.mongodb.net/scm?retryWrites=true&w=majority&appName=scm"; // Replace with your database name
const client = new MongoClient(url);
let db;

client
  .connect()
  .then(async () => {
    db = client.db("test");
    const flatCollection = db.collection("flat");
    const shopCollection = db.collection("shop");
    const mealCollection = db.collection("meal");

    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.get("/api/data", async (req, res) => {
  try {
    const flatCollection = db.collection("flat");
    const flats = await flatCollection.find({}).toArray();
    res.json(flats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching flats", error });
  }
  try {
    const shopCollection = db.collection("shop");
    const shops = await shopCollection.find({}).toArray();
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shops", error });
  }
  try {
    const mealCollection = db.collection("meal");
    const meals = await shopCollection.find({}).toArray();
    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching meals", error });
  }
});

app.get("/api/data", async (req, res) => {
  try {
    const flatCollection = db.collection("flat");
    const flats = await flatCollection.find({}).toArray();
    res.json(flats); // ✅ Only one response here
  } catch (error) {
    res.status(500).json({ message: "Error fetching flats", error });
  }
});

// Fetch all shops
app.get("/api/shopi", async (req, res) => {
  try {
    const shopCollection = db.collection("shop");
    const shops = await shopCollection.find({}).toArray();
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shops", error });
  }
});

// Fetch all meals
app.get("/api/food", async (req, res) => {
  try {
    const mealCollection = db.collection("meal");
    const meals = await mealCollection.find({}).toArray();
    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching meals", error });
  }
});

app.post("/api/add-cart", async (req, res) => {
  try {
    const { email, item, status } = req.body;
    const cartCollection = db.collection("cart");

    await cartCollection.insertOne({
      email,
      item,
      status,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "Added to cart successfully" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Error adding to cart" });
  }
});

//singup
async function addUser({ name, email, password, role }) {
  try {
    // Log to see the data
    console.log("Adding user with data:", { name, email, password, role });

    const collection = db.collection("user");

    const newUser = {
      name,
      email,
      password, // Ensure password is included
      role: role || "user", // Default to 'user' if role is not provided
      createdAt: new Date(),
      updatedAt: new Date(),
      verified: false,
      submit: false,
    };

    const result = await collection.insertOne(newUser); // Insert the correct object

    // Log the result
    console.log("User added:", result);
    return result;
  } catch (error) {
    console.log("There is a problem adding the user", error);
    throw new Error("Error adding user");
  }
}

// POST Route to handle user sign-up
app.post("/api/submitForm", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Log the incoming data
    console.log("Received form data:", { name, email, password, role });

    // Validate data (basic example)
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Call addUser function
    const result = await addUser({ name, email, password, role });
    if (result) {
      res.status(201).json({
        message: "User created successfully",
        user: { name, email, role },
      });
    } else {
      res.status(500).json({ message: "Error creating user" });
    }
  } catch (error) {
    console.error("Error in /submitForm:", error);
    res.status(500).json({ message: "Error storing user", error });
  }
});

//Logging the server start
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const collection = db.collection("user");
    const user = await collection.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // If match, send full user info
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
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Dashbroad

app.get("/api/use", async (req, res) => {
  try {
    const collection = db.collection("user");
    const users = await collection.find({}).toArray();
    res.status(200).json(users); // Send the list of users
  } catch (error) {
    console.error("Error fetching users:", error); // Log detailed error
    res.status(500).json({ message: "Error fetching users", error });
  }
});

// Approve (verify) user by ID
import { ObjectId } from "mongodb"; // Ensure you import ObjectId

// Approve (verify) user by ID
app.put("/api/verify-user/:id", async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const collection = db.collection("user");

    // Update the user's 'verified' status to true
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { verified: true } }
    );

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "User not found or already verified" });
    }

    res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    console.error("Error verifying user:", error);
    res.status(500).json({ message: "Error verifying user", error });
  }
});

// Cancel (unverify) user by ID
app.put("/api/cancel-verify-user/:id", async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const collection = db.collection("user");

    // Update the user's 'verified' status to false
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { verified: false } }
    );

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "User not found or already unverified" });
    }

    res.status(200).json({ message: "User unverified successfully" });
  } catch (error) {
    console.error("Error cancelling verification:", error);
    res.status(500).json({ message: "Error cancelling verification", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Add a new flat
app.post("/api/add-flat", async (req, res) => {
  const { title, location, distanceFromCampus, pricePerMonth } = req.body;

  try {
    const collection = db.collection("flat");
    const result = await collection.insertOne({
      title,
      location,
      distanceFromCampus,
      pricePerMonth,
    });

    res.status(201).json({ message: "Flat added successfully", result });
  } catch (error) {
    console.error("Error adding flat:", error);
    res.status(500).json({ message: "Error adding flat", error });
  }
});
// Add a new shop
app.post("/api/add-shop", async (req, res) => {
  const { title, location, distance, rating } = req.body;

  try {
    const collection = db.collection("shop");
    const result = await collection.insertOne({
      title,
      location,
      distance,
      rating,
    });

    res.status(201).json({ message: "Shop added successfully", result });
  } catch (error) {
    console.error("Error adding shop:", error);
    res.status(500).json({ message: "Error adding shop", error });
  }
});
// Add a new meal (example: simple meal data)
app.post("/api/add-meal", async (req, res) => {
  const { title, description, price, rating } = req.body;

  try {
    const collection = db.collection("meal");
    const result = await collection.insertOne({
      title,
      description,
      price,
      rating,
    });

    res.status(201).json({ message: "Meal added successfully", result });
  } catch (error) {
    console.error("Error adding meal:", error);
    res.status(500).json({ message: "Error adding meal", error });
  }
});
