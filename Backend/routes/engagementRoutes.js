import express from "express";

const router = express.Router();

router.post("/track-download", (req, res) => {
  console.log("📄 Fact sheet downloaded");

  res.json({ success: true });
});

router.post("/track-share", (req, res) => {
  console.log(" Share button clicked");

  res.json({ success: true });
});

export default router;