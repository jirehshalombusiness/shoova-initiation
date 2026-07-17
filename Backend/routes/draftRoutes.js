import express from "express";
import Draft from "../models/Draft.js";

const router = express.Router();

router.post("/save", async (req, res) => {
  try {
    const { subject, message, imageUrl } = req.body;

    const draft = await Draft.findOneAndUpdate(
      {}, 
      { subject, message, imageUrl },
      { upsert: true, returnDocument: "after" }
    );

    res.json({ success: true, draft });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save draft" });
  }
});

router.get("/get", async (req, res) => {
  try {
    const draft = await Draft.findOne();

    res.json({ success: true, draft });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch draft" });
  }
});

router.delete("/clear", async (req, res) => {
  try {
    await Draft.deleteMany({});
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to clear draft" });
  }
});

export default router;