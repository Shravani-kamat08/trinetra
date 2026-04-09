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
app.use("/api/ideas", require("./routes/ideaRoutes"));
app.use("/api/problems", require("./routes/problemRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use('/api/file', require('./routes/uploadRoutes'));

app.get('/', (req, res) => {
    res.send('Final year project (Trinetra innovation portal) website backend running...');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Trinetra innovation platform - Server running on port ${PORT}`);
});