const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use("/api/user", userRoutes);
const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log("server started on port 4000".yellow.bold));
