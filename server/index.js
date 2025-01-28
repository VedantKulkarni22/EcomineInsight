const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// MySQL Database Connection
const con = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

con.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database!");
  }
});

// Register Route
app.post("/register", (req, res) => {
  const { name, email, password, mobile, gender } = req.body;

  const query = "INSERT INTO users (name, email, mobile, gender, password) VALUES (?, ?, ?, ?, ?)";
  con.query(query, [name, email, mobile, gender, password], (err, result) => {
    if (err) {
      console.error("Error during registration:", err);
      res.status(500).send({ message: "Error registering user" });
    } else {
      res.send({ message: "Registration successful", result });
    }
  });
});

// Login Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM users WHERE email = ? AND password = ?";

  con.query(query, [email, password], (err, result) => {
    if (err) {
      console.error("Login error:", err);
      res.status(500).send({ message: "Server error" });
    } else if (result.length > 0) {
      res.send(result);
    } else {
      res.status(401).send({ message: "Wrong email or password!" });
    }
  });
});

// Store Carbon Footprint History
app.post("/cfhistorystored", (req, res) => {
    const { email, calculatedValue, calculationType } = req.body;
  
    const query =
      "INSERT INTO carbon_footprint_history (email, calculated_value, calculation_type) VALUES (?, ?, ?);";
  
    con.query(query, [email, calculatedValue, calculationType], (err, result) => {
      if (err) {
        console.error("Error storing carbon footprint history:", err);
        res.status(500).send({ message: "Error storing carbon footprint history" });
      } else {
        res.status(200).send({ message: "Carbon footprint history stored successfully" });
      }
    });
  });


  app.get("/cfhistory/:email", (req, res) => {
    const email = req.params.email;
    console.log("Fetching history for email:", email);

    const query = `
        SELECT * FROM carbon_footprint_history WHERE email = ? ORDER BY created_at DESC;
    `;

    con.query(query, [email], (err, results) => {
        if (err) {
            console.error("Error fetching carbon footprint history:", err);
            return res.status(500).send("Server error");
        }
        // console.log("Results fetched:", results);  // Check if results are fetched
        return res.status(200).json(results);
    });
});
  
  // Fetch Carbon Footprint History
  app.get("/fetchHistory", (req, res) => {
    const email = req.query.email;
    const limit = parseInt(req.query.limit) || 5;
  
    const query =
      "SELECT calculated_value AS value, created_at AS date, calculation_type FROM carbon_footprint_history WHERE email = ? ORDER BY created_at DESC LIMIT ?;";
  
    con.query(query, [email, limit], (err, results) => {
      if (err) {
        console.error("Error fetching history:", err);
        res.status(500).send({ message: "Error fetching history" });
      } else {
        res.status(200).json(results);
      }
    });
  });
  
  // Update User Information
  app.put("/updateUserInfo", (req, res) => {
    const { name, email, mobile, gender } = req.body;
  
    const query =
      "UPDATE users SET name = ?, mobile = ?, gender = ? WHERE email = ?;";
    con.query(query, [name, mobile, gender, email], (err, result) => {
      if (err) {
        console.error("Error updating profile:", err);
        res.status(500).send({ message: "Error updating profile" });
      } else {
        res.send({ message: "Profile updated successfully" });
      }
    });
  });
  
  // Get User Info
  app.get("/getUserInfo", (req, res) => {
    const loginStatus = req.query.loginStatus;
  
    if (!loginStatus) {
      return res.status(400).send({ message: "Login status (email) not provided" });
    }
  
    const query =
      "SELECT name, email, mobile, gender, password FROM users WHERE email = ?;";
    con.query(query, [loginStatus], (err, result) => {
      if (err) {
        console.error("Error fetching user info:", err);
        res.status(500).send({ message: "Server error" });
      } else if (result.length > 0) {
        res.status(200).send(result[0]);
      } else {
        res.status(404).send({ message: "User not found" });
      }
    });
  });
  

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
