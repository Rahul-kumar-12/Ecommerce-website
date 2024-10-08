const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')
const path = require('path')


const app = express()
app.use(cors({
    origin: 'https://ecommerce-website-f4o2.onrender.com',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api", router)
const PORT = process.env.PORT || 8000

//----------------------- code for deployement----------------------

if (process.env.NODE_ENV === "production") {
    const dirPath = path.resolve()
    app.use(express.static("./frontend/build"))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(dirPath, "./frontend/build", "index.html"));
    })
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("connnect to DB")
        console.log(`Server is running localhost: ${PORT}`)
    })
})

// .this is index File.apply........
