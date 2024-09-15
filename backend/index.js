const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')
const path = require('path')


const app = express()
app.use(cors({
    // origin: process.env.FRONTEND_URL,
    origin: 'https://e-commerce-mbnu.onrender.com',
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


// app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// // Serve the frontend application for all other routes
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
// });








connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("connnect to DB")
        console.log(`Server is running localhost: ${PORT}`)
    })
})
