const express = require("express")
const {connection} = require("./config/db")
const {userRouter} = require("./routes/userroute")
const {noteRouter} = require("./routes/noteroute")
const {authentication} = require("./middlewares/authenticator")
const cors = require("cors")

require('dotenv').config()
const app = express()
app.use(cors())
app.use(express.json())

app.use("/user",userRouter)
app.use(authentication)
app.use("/notes",noteRouter)



app.listen(process.env.port,async()=>{
  try {
    await connection
    console.log(`running at port ${4500}`)
  } catch (error) {
    console.log(error)
  }
})