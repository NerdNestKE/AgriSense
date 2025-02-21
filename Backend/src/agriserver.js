import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/agridatabase.js"; // Ensure this file also uses ES module syntax

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Start the server after the database syncs
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to PostgreSQL successfully!");
    return sequelize.sync();
  })
  .then(() => {
    console.log("Database synchronized!");
    app.listen(port, () => console.log(`Server running on ${port}`));
  })
  .catch((error) => {
    console.error("Database connection error:", error.message);
    process.exit(1);
  });
