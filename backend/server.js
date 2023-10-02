const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log("server started on port 4000"));
