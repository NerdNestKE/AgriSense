import User from "../src/models/User.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //  Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //  Create new user
    const user = await User.create({ username, email, password });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};