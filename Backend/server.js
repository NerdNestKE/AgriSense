require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const uri = process.env.MONGO_URI;

if (!uri) {
    console.error("MONGO_URI is not defined. Check your .env file.");
    process.exit(1);
}

console.log("Mongo URI:", uri);

const client = new MongoClient(uri);
let db;

async function startServer() {
    try {
        console.log("Connecting to MongoDB...");
        await client.connect();
        db = client.db("AgriSenseDB");
        console.log("Connected to MongoDB");

        // Define your routes after the database connection
        app.post("/register", async (req, res) => {
            const { name, email, password, phone_number } = req.body;

            if (!name || !email || !password || !phone_number) {
                return res.status(400).json({ error: "All fields are required" });
            }

            try {
                const existingUser = await db.collection("users").findOne({ email });
                if (existingUser) {
                    return res.status(400).json({ error: "User already exists" });
                }

                const result = await db.collection("users").insertOne({ name, email, password, phone_number });
                res.status(201).json({ message: "User registered successfully", userId: result.insertedId });
            } catch (error) {
                console.error("Error during registration:", error);
                res.status(500).json({ error: "Failed to register user" });
            }
        });

        // Start the server after successful DB connection
        app.listen(port, () => {
            console.log(`Server is running on http://127.0.0.1:${port}`);
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    }
}

// Call the function to start the server
startServer();
