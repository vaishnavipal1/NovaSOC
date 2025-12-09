import express from "express";
import { MongoClient } from "mongodb";

const router = express.Router();
const mongoUrl = "mongodb://127.0.0.1:27017";
const dbName = "nova_soc";

router.get("/", async (req, res) => {
  try {
    const client = await MongoClient.connect(mongoUrl);
    const db = client.db(dbName);

    const incidents = await db.collection("incidents").find().toArray();
    res.json(incidents);

    client.close();
  } catch (error) {
    console.error("❌ Error fetching incidents:", error);
    res.status(500).json({ message: "Failed to fetch incidents" });
  }
});

export default router;
