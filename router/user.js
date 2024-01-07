const express = require("express")
const db = require("../db")
const utils = require("../utils")
//crpto included
const crypto = require('crypto-js');


const router = express.Router()

// Middleware function to log request details
function logRequest(req, res, next) {
  console.log(`Received ${req.method} request to ${req.path}`);
  console.log("Request Body:", req.body);
  next();
} 


router.post("/crp/register", (request, response) => {
  const { firstName, lastName, email, phoneNumber, password, role } = request.body;

  // Hash the password using crypto-js
  const hashedPassword = crypto.SHA256(password).toString();

  db.query(
    "INSERT INTO User (firstName, lastName, Role, email, phoneNumber, password) VALUES (?, ?, ?, ?, ?, ?)",
    [firstName, lastName, role, email, phoneNumber, hashedPassword], // Store the hashed password
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

//crpto included
router.post("/crp/react_user_login", (request, response) => {
  console.log("inside login");
  const { email, password } = request.body;
  
  // Hash the provided password using crypto-js
  const hashedPassword = crypto.SHA256(password).toString();

  const statement = "SELECT * FROM User WHERE email=? and password=?";
  db.query(statement, [email, hashedPassword], (error, result) => {
    console.log(result);
    console.log(error);

    response.send(utils.createResult(error, result));
  });
});

router.post("/register", (request, response) => {
  const { firstName, lastName, email, phoneNumber, password ,role} = request.body;

  console.log("First Name:", firstName,lastName, email, phoneNumber, password ,role);
  db.query(
    "INSERT INTO User (firstName, lastName, Role, email, phoneNumber, password) VALUES (?, ?, ?, ?, ?, ?)",
    [firstName, lastName, role, email, phoneNumber, password],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

//login user- mobile 
router.post("/login/mobile", (request, response) => {
  const { email, password } = request.body
  const statement = "SELECT * FROM User WHERE email=? and password=?"
  console.log(email);
  console.log(password);

  db.query(statement, [email, password], (error, result) => {
    console.log(result);
    console.log(error);

    response.send(utils
      .createResult(error, result))
  })
})


router.post("/login", (request, response) => {
  const { email, password } = request.body

  

  const statement = 'SELECT * FROM User WHERE email=? and password=?'
  db.query(statement, [email, password], (error, users) => {
    if (users.length == 0) {
      // if user does not exist, users array will be empty
      response.send(utils.createResult('user does not exist'))
    } else {
      // if user exists, the users will be an array with one user entry
      const user = users[0]

      response.send(
        utils.createResult(null, {
          name: `${user['firstName']} ${user['lastName']}`,
          Role  : user['Role'],
         userId : user['user_id']
          
        })
      )
    }
  })
})


//all users DON TESTING
router.get("/all", (request, response) => {
  const statement = "SELECT * FROM User";
  db.query(statement, (error, result) => {
    console.log(result);
    response.send(utils.createResult(error, result));
  });
});

// User Profile Retrieval
router.get("/:id", logRequest , (req, res) => {
  console.log("inside get of profile Retrival");
  const userId = req.params.id;
  
  console.log(userId);

  const statement = `
  select * from User where user_id = ?
  `;

  db.query(statement, [userId], (error, result) => {

    if (error) {
      res.status(500).json({ status: "error", error: "Failed to retrieve user profile" });
    } else {
      if (result.length > 0) {
        const userProfile = result[0];
        res.json({ status: "success", data: userProfile });
      } else {
        res.status(404).json({ status: "error", error: "User not found" });
      }
    }
  });
});



// User Profile Update - testing done
router.put("/update/:id", logRequest, (req, res) => 
{
  console.log("inside User Profile Update");

  const userId = req.params.id;
  const { firstName, lastName, email, phoneNumber } = req.body;

  const statement = `
    UPDATE User
    SET firstName = ?, lastName = ?, email = ?, phoneNumber = ?
    WHERE user_id = ?
  `;

  db.query(statement, [firstName, lastName, email, phoneNumber, userId], (error, result) => {
    if (error) {
      res.status(500).json({ status: "error", error: "Failed to update user profile" });
    } else {
      if (result.affectedRows > 0) {
        const userProfile = { userId, firstName, lastName, email };
        res.json({ status: "success", data: userProfile });
      } else {
        res.status(404).json({ status: "error", error: "User not found" });
      }
    }
  });


});


// Request to update password
router.put("/change_password/:id", logRequest, (req, resp) => {
  console.log("inside change password");
  console.log("inside change password");

  const user_id = req.params.id;
  const { password } = req.body;

  const statement = `
    UPDATE User
    SET password = ?
    WHERE user_id = ?
  `; 
 
  db.query(statement, [password, user_id], (error, result) => {
    if (error) {
      resp.status(500).json({ status: "error", error: "Failed to update user's password" });
    } else {
      if (result.affectedRows > 0) {
        resp.json({ status: "success", message: "Password updated successfully" });
      } else {
        resp.status(404).json({ status: "error", error: "User not found" }); 
      }
    }
  });
});
 

// Delete User - testing done
router.delete("/:id", logRequest, (req, res) => {
  console.log("inside Delete User");

  const userId = req.params.id;

  const statement = `
    DELETE FROM User
    WHERE user_id = ?
  `;

  db.query(statement, [userId], (error, result) => {
    if (error) {
      res.status(500).json({ status: "error", error: "Failed to delete user" });
    } else {
      if (result.affectedRows > 0) {
        res.json({ status: "success", message: "User deleted successfully" });
      } else {
        res.status(404).json({ status: "error", error: "User not found" });
      }
    }
  });
});


module.exports = router
