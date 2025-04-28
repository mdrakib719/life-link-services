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

// Connect to MongoDB
const client = new MongoClient(url);
let db;

client
  .connect()
  .then(async () => {
    db = client.db("test");
    const collection = db.collection("flat");
    const flats = await collection.find({}).toArray();
    const flat = flats.map((flat) => ({
      id: flat._id,
      name: flat.name,
      location: flat.location,
    }));
    console.log("Data:", flat);

    // Change 'scm' to your database name
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.get("/api/data", async (req, res) => {
  try {
    const collection = db.collection("flat");
    const flats = await collection.find({}).toArray();
    res.json(flats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching flats", error });
  }
  try {
    const collection = db.collection("shop");
    const shops = await collection.find({}).toArray();
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shops", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
