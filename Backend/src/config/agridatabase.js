// const mongoose = require("mongoose");

// const connectToDatabase = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Connected to MongoDB successfully!");
//   } catch (error) {
//     console.error("Failed to connect to MongoDB:", error.message);
//     process.exit(1); // Exit the app if DB connection fails
//   }
// };

// module.exports = connectToDatabase;


const { Pool } = require("pg");
require("dotenv").config();

// Create a connection pool
const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

pool.connect()
  .then(() => console.log("Connected to PostgreSQL successfully!"))
  .catch(err => console.error("Failed to connect to PostgreSQL:", err.message));

module.exports = pool;