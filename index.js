const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const cors = require('cors')
const { notFound, errorHandeler } = require("./middlewarer/errorHandelere");
const app = express()
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000
const authRouters = require("./routers/auth")
const uploasRouters = require("./routers/upload") 


dbConnect()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())
app.use(morgan('dev'))


app.use("/api/user",authRouters)
app.use("/api/upload",uploasRouters)




app.use(notFound)
app.use(errorHandeler)
app.listen(PORT,()=>{
    console.log(`Server is running at PORT ${PORT}`)
})