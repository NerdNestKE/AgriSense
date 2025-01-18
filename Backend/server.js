const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const fs = require("fs");

const app = express();
const port = 3000;
const dbFile = "users.json";

// Middleware
app.use(bodyParser.json());

// Initialize JSON file if it doesn't exist
if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, JSON.stringify([]));
}

// Load users from JSON file
const loadUsers = () => {
    const data = fs.readFileSync(dbFile);
    return JSON.parse(data);
};

// Save users to JSON file
const saveUsers = (users) => {
    fs.writeFileSync(dbFile, JSON.stringify(users, null, 2));
};

// Registration endpoint
app.post("/register", async (req, res) => {
    const { name, email, password, phone_number } = req.body;

    if (!name || !email || !password || !phone_number) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const users = loadUsers();
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { id: Date.now(), name, email, password: hashedPassword, phone_number };
        users.push(newUser);
        saveUsers(users);
        res.status(201).json({ message: "User registered successfully", userId: newUser.id });
    } catch (error) {
        res.status(500).json({ error: "Failed to register user" });
    }
});

// Login endpoint
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const users = loadUsers();
        const user = users.find(user => user.email === email);
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid password" });
        }

        res.status(200).json({ message: "Login successful", userId: user.id });
    } catch (error) {
        res.status(500).json({ error: "Failed to log in" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
});
