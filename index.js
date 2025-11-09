require("dotenv").config();

const express = require("express");
const cors = require("cors"); // ✅ import cors
const app = express();

const chatRoutes = require("./src/routes/chatRoutes");

// ✅ Gunakan CORS middleware sebelum routes
app.use(cors({
  origin: "*", // atau bisa diganti dengan alamat frontend kamu, misal: "http://localhost:3000"
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.get("/ping", (req, res) => res.json({ message: "pong" }));
app.use("/api", chatRoutes);

const PORT = process.env.PORT || 9001;
app.listen(PORT, () =>
  console.log(`✅ Server berjalan di http://localhost:${PORT}`)
);
