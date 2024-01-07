const express = require("express")
const db = require("../db")
const utils = require("../utils")

const router = express.Router()

//Get all confirmations:TESTED
router.get("/", (req, res) => {
    const query = `SELECT * FROM Confirmation`;
    db.query(query, (error, result) => {
      if (error) {
        res.status(500).json({ status: "error", error: "Failed to retrieve confirmations" });
      } else {
        res.json({ status: "success", data: result });
      }
    });
  });

  //Get confirmation by ID: TESTED
  router.get("/:id", (req, res) => {
    const confirmationId = req.params.id;
    const query = `SELECT * FROM Confirmation WHERE confirmation_id = ?`;
    db.query(query, [confirmationId], (error, result) => {
      if (error) {
        res.status(500).json({ status: "error", error: "Failed to retrieve confirmation" });
      } else {
        if (result.length === 0) {
          res.status(404).json({ status: "error", error: "Confirmation not found" });
        } else {
          res.json({ status: "success", data: result[0] });
        }
      }
    });
  });

  //Create a new confirmation: TSETED
  router.post("/confirmations", (req, res) => {
    const { reservationId, amount, paymentDate } = req.body;
    const query = `INSERT INTO Confirmation (reservation_id, amount, payment_date) VALUES (?, ?, ?)`;
    db.query(query, [reservationId, amount, paymentDate], (error, result) => {
      if (error) {
        res.status(500).json({ status: "error", error: "Failed to create confirmation" });
      } else {
        const confirmationId = result.insertId;
        const confirmationData = { confirmationId, reservationId, amount, paymentDate };
        res.json({ status: "success", data: confirmationData });
      }
    });
  });
  
module.exports = router
