const mongoose = require("mongoose")

// const db = "mongodb+srv://rahulkumar:rahul1234@cluster1.wdbxwjd.mongodb.net/e-commerce?retryWrites=true&w=majority"

// const mongodb="mongodb://0.0.0.0:27017/amazon"
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB