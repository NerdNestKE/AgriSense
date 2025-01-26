const express = require("express");
const bodyParser = require("body-parser");
const connectToDatabase = require("./config/agridatabase");
const routes = require("./routes");

const app = express();

// Connect to MongoDB
connectToDatabase();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api", routes);

module.exports = app;
