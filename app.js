const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");


const authRoutes = require("./src/routes/auth.route.js");
const testRoutes = require("./src/routes/test.route.js");
const leadRoutes = require("./src/routes/lead.route.js");
const noteRoutes = require("./src/routes/note.route");

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/notes", noteRoutes);

module.exports = app;