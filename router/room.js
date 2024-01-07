const express = require("express")
const db = require("../db")
const router = express.Router()
const utils = require("../utils")

//all room -tested
router.get("/getAllRooms", (request, response) => {
  console.log("inside getallrooms")
  const statement = `SELECT * FROM Room`
  db.query(statement, (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

// API endpoint to check room availability - TSETED
router.post('/availability', (req, res) => {
  console.log(req.body)
  const { checkInDate, checkOutDate, roomType, capacity } = req.body;
  console.log(checkInDate, checkOutDate, roomType, capacity);
  const query = `
  SELECT room_number, room_type, capacity, price_per_night FROM Room WHERE room_type = ? AND capacity >= ? AND room_number NOT IN (     SELECT room_number     FROM Reservation     WHERE (check_in_date <= ? AND check_out_date >= ?) );
  `;

  db.query(query, [roomType, capacity, checkOutDate,checkInDate ], (error, result) => {
    if (error) {
      res.status(500).json({ status: 'error', error: 'Failed to retrieve available rooms' });
    } else {
      console.log(result);
      res.json({ status: 'success', data: result });
    }
  });
});

//Get user bookings -TSETED

router.get("/user/:userId", (request, response) => {
  console.log("inside get use bookings")
  const userId = request.params.userId;

  const statement = `
    SELECT reservation_id AS bookingId, user_id AS userId, room_number AS roomId, check_in_date AS checkInDate, check_out_date AS checkOutDate
    FROM Reservation
    WHERE user_id = ?
  `;

  db.query(statement, [userId], (error, result) => {
    console.log(result);
    if (error) {
      response.status(500).json({ status: "error", error: "Failed to retrieve user bookings" });
    } else {
      response.json({ status: "success", data: result });
    }
  });
});


//add room - tested

router.post("/addroom", (request, response) => {
  console.log("inside post add room")
  console.log(request.body)

  const {room_number,room_type ,capacity , price_per_night ,images , ac_non_ac , bed_type , room_size } = request.body;

  const statement = `
  insert into Room(room_number,room_type ,capacity , price_per_night ,images , ac_non_ac , bed_type , room_size ) 
  values(?,?,?,?,?,?,?,?)
  `;

  db.query(statement, [room_number,room_type ,capacity , price_per_night ,images , ac_non_ac , bed_type , room_size], (error, result) => 
  {
    if (error) 
      {
        console.log(error)
      response.status(500).json({ status: "error", error: "Failed to insert into room" });
      } 
    
    else     {
   
       response.json({ status: "success", data: result });
    }
  });
});

//edit room - tested
router.put("/:roomId", (request, response) => {
  const roomId = request.params.roomId;
  const { room_number, room_type, capacity, price_per_night, images, ac_non_ac, bed_type, room_size } = request.body;

  const statement = `
    UPDATE Room
    SET room_number = ?, room_type = ?, capacity = ?, price_per_night = ?, images = ?, ac_non_ac = ?, bed_type = ?, room_size = ?
    WHERE room_number = ?
  `;

  db.query(statement, [room_number, room_type, capacity, price_per_night, images, ac_non_ac, bed_type, room_size, roomId], (error, result) => {
    if (error) {
      response.status(500).json({ status: "error", error: "Failed to update room" });
      console.log(error)
    } else {
      console.log(result)
      response.json({ status: "success", message: "Room updated successfully" });
    }
  });
});

//room delete - tested
router.delete("/:roomId", (req, res) => {

  const roomId = req.params.roomId;
console.log(roomId)

  // Perform logic to delete the room identified by roomId
  const statement = "DELETE FROM Room WHERE room_number = ?";
  db.query(statement, [roomId], (error, result) => {
    if (error) {
      res.status(500).json({ status: "error", error: "Failed to delete the room" });
      console.log(error)
    } else {
      console.log(result)
      if (result.affectedRows > 0) {
        res.json({ status: "success", message: "Room deleted successfully" ,result});  
      }
      else
      {
        res.status(500).json({ status: "error", error: "Failed to delete the room" });
      }
      
    }
  });
});

router.get("/:room_number", (req, res) => {
  const roomNumber = req.params.room_number;

  const statement = `SELECT * FROM Room WHERE room_number = ?`;
  db.query(statement, [roomNumber], (error, result) => {
    if (error) {
      res.status(500).json({ status: "error", error: "Failed to retrieve room details" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ status: "error", error: "Room not found" });
      } else {
        const roomDetails = result[0];
        res.json({ status: "success", data: roomDetails });
      }
    }
  });
});

module.exports = router