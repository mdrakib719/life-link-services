import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";

// Initialize express app
const app = express();
const PORT = 3000;

// Middleware to allow frontend connection
app.use(cors());
app.use(express.json());

// MongoDB Connection URI
const url =
  "mongodb+srv://scm:123456scm@scm.ez2lk.mongodb.net/scm?retryWrites=true&w=majority&appName=scm"; // Replace with your database name
let db;

// Connect to MongoDB
const client = new MongoClient(url);
client
  .connect()
  .then(() => {
    db = client.db("test"); // Make sure this is the correct database name
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Add User Function
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
      res
        .status(201)
        .json({
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
