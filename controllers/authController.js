const jwt = require("jsonwebtoken");
const db = require("../db/db");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const registerUser = (req, res) => {
  const { first_name,last_name, email, password } = req.body;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) return res.status(500).json({ Error: "Error hashing password" });

    const sql =
      "INSERT INTO users (`first_name`,`last_name`,`email`,`password`) VALUES (?, ?, ?, ?)";
    const values = [first_name,last_name, email, hash];

    db.query(sql, values, (err, result) => {
      if (err) return res.status(500).json({ Error: "Error in register" });
      return res.status(201).json({ Status: "Success" });
    });
  });
};

const secretKey = "HTGWEWDWFSDCFSCW";



const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by userName
    const findUserQuery = "SELECT * FROM users WHERE email = ?";
    db.query(findUserQuery, [email], async (err, rows) => {
      if (err) {
        console.error("Error finding user:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (rows.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const user = rows[0];

      // Check password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "password mismatch" });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, "HTGWEWDWFSDCFSCW");
      res.status(200).json({
        token,
        user: { fisrtName: user.first_name,lastName: user.last_name, email: user.email, userId: user.id },
      });
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const checkToken = (req, res) => {
  if (req.userId) {
    return res.json({
      Status: "Authentication Success .Token is valid. ",
      LoggedUserId: req.userId,
    });
  } else {
    return res
      .status(401)
      .json({ Error: "Authentication failed. Token is not valid." });
  }
};

module.exports = { registerUser,loginUser, checkToken };
