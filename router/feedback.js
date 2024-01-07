const express = require("express")
const db = require("../db")
const utils = require("../utils")

const router = express.Router()

// Middleware function to log request details
function logRequest(req, res, next) {
  console.log(`Received ${req.method} request to ${req.path}`);
  console.log("Request Body:", req.body);
  next();
}

// Route to post feedback -tested
router.post("/post", logRequest, (req, res) => {
  const { user_id, reservation_id, feedback_text } = req.body;

  const statement = `
    INSERT INTO Feedback (user_id, reservation_id, feedback_text)
    VALUES (?, ?, ?)
  `;

  db.query(statement, [user_id, reservation_id, feedback_text], (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json({ status: "error", error: "Failed to post feedback" });
    } else {
      const feedbackId = result.insertId;
      const feedbackData = { feedbackId, user_id, reservation_id, feedback_text };
      res.json({ status: "success", data: feedbackData });
    }
  });
});




module.exports = router