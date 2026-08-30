import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

const db = client.db("movieApp");
const users = db.collection("users");


const app = express();

app.use(cors())
app.use(express.json());


const startServer = async () => {
  try {
    await client.connect();

    console.log("MongoDB connected");

    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

startServer();

app.get("/", (req, res) => {
  res.json({
    message: "Movie App API is working",
  });
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "This email is already registered.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await users.insertOne({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
    });

  } catch (error) {
    console.log("REGISTER ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

app.post("/login", async (req, res) => {
  console.log("LOGIN ROUTE IS WORKING");

  const { email, password } = req.body;

  const user = await users.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Incorrect email or password.",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({
      message: "Incorrect email or password.",
    });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({
    message: "Login successful",
    token,
  });

  console.log(isPasswordCorrect);
});

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await users.findOne(
    {
      _id: new ObjectId(decoded.userId),
    },
    {
      projection: { password: 0 },
    },
  );

  if (!user) {
    return res.status(401).json({
        message: "User not found",
    })
  }

  req.user = user;

  next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized",
        })
    }
};

app.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Profile route is working",
    user: req.user,
  });
});

