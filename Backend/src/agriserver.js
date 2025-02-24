import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/agridatabase.js"; // Ensure this file also uses ES module syntax
import "./models/User.js"; // Import the User model to ensure it's registered with Sequelize
import userRoutes from "./routes/userRoutes.js"; // Import routes

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

//user routes
app.use("/api/users", userRoutes);

// Database Connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to PostgreSQL successfully!");
    return sequelize.sync({ alter: true }); // Ensures tables are updated
  })
  .then(() => {
    console.log("Database synchronized!");

    // Start server *AFTER* database syncs successfully
    app.listen(port, () => console.log(`Server running on ${port}`));
   // app.listen(port, () => console.log(' Server running on ${port} '));
  })
  .catch((error) => {
    console.error("Database connection error:", error.message);
    process.exit(1);
  });