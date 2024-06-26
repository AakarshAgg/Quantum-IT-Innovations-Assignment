const express = require("express");
const databaseconnect = require("./config/databaseConfig");
const authRouter = require("./router/authRoute");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

databaseconnect();

app.use(express.json()); // built-in middleware
app.use(cookieParser());

app.use(
    cors({
    origin:[process.env.CLIENT_URL],
    credentials: true,
    optionsSuccessStatus: 204,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }) 
);

app.use("/api/auth", authRouter);

app.use("/", (req, res) => {
  res.json({
    data: "JWT auth server",
  });
});

module.exports = app;