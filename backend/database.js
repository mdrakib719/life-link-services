import { MongoClient } from "mongodb";

const url =
  "mongodb+srv://scm:123456scm@scm.ez2lk.mongodb.net/scm?retryWrites=true&w=majority&appName=scm";

export default async function connectToDatabase() {
  const client = new MongoClient(url);
  try {
    await client.connect();
    console.log("Connected to the database");
    console.log("Data loaded successfully");
    return client.db("test");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

connectToDatabase(); // <-- Add this line
