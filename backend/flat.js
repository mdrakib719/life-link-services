import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Initialize express app
const app = express();
const PORT = 8080;

// Middleware to allow frontend connection
app.use(cors());
app.use(express.json());

// MongoDB Connection URI
const dbURI =
  "mongodb+srv://scm:123456scm@scm.ez2lk.mongodb.net/scm?retryWrites=true&w=majority&appName=scm"; // Replace with your database name

// Connect to MongoDB
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Flat model
const Flat = mongoose.model(
  "Flat",
  new mongoose.Schema({
    title: String,
    location: String,
    distanceFromCampus: String,
    pricePerMonth: String,
  })
);

// API to get flats
app.get("/api/flats", async (req, res) => {
  try {
    const flats = await Flat.find();
    res.json(flats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching flats", error });
  }
});

// Endpoint for adding flat data (if needed)
app.post("/api/flats", async (req, res) => {
  const { title, location, distanceFromCampus, pricePerMonth } = req.body;
  const newFlat = new Flat({
    title,
    location,
    distanceFromCampus,
    pricePerMonth,
  });

  try {
    await newFlat.save();
    res.status(201).json({ message: "Flat added successfully!", newFlat });
  } catch (error) {
    res.status(500).json({ message: "Error adding flat", error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
