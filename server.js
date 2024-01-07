const express = require("express")

const cors = require("cors")

const routerUser = require("./router/user")
const routerRoom = require("./router/room")
const routerconfirmation = require("./router/confirmations")
const routerreservation = require("./router/reservation")
const routerfeedback = require("./router/feedback")

const app = express()
app.use(express.json())

app.use(cors("*"))
app.use(express.static("uploads"))
app.use("/user", routerUser)
app.use("/room", routerRoom)
app.use("/confirmation", routerconfirmation)
app.use("/reservation", routerreservation)
app.use("/feedback", routerfeedback)

app.listen(4000, "192.168.0.102", () => {
  console.log("Server started at port  4000")
})
