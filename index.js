const express = require("express")
const database = require("./config/database")
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require("dotenv").config()

const routesApiVer1 = require("./api/routes/admin/index.route")
const routesApiVer2 = require("./api/routes/client/index.route")

const app = express()
const port = process.env.PORT

app.use(cors({
    origin: "http://localhost:5173", // Chỉ cho phép domain frontend
    credentials: true, // Cho phép gửi cookie qua CORS
  }))


database.connect()

app.use(cookieParser());

// parse application/json
app.use(bodyParser.json())

// Routes Version 1
routesApiVer1(app)
routesApiVer2(app)


app.listen(port, ()=>{
    console.log(`App listening on port ${port}`)
})