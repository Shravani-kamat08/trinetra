const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./utils/dbConnect");

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json());
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/students", require("./routes/studentRoutes"));

app.get('/', (req, res) => {
    res.send('Final year project (Trinetra innovation portal) website backend running...');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Trinetra innovation platform - Server running on port ${PORT}`);
});
// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const path = require("path");

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve uploaded images
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Routes
// app.use("/api/students", require("./routes/studentRoutes"));

// mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => {
//         console.log("MongoDB Connected");
//         app.listen(process.env.PORT, () =>
//             console.log(`Server running on port ${process.env.PORT}`)
//         );
//     })
//     .catch((err) => console.log(err));