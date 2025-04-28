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
    const flatCollection = db.collection("flat");
    const shopCollection = db.collection("shop");

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
});

app.get("/api/shopi", async (req, res) => {
  try {
    const shopCollection = db.collection("shop");
    const shops = await shopCollection.find({}).toArray();
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shops", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
