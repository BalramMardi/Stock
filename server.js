import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import Watchlist from "./routes/Watchlist.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

//config
dotenv.config();

//database
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build")));

//routes
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/stock", Watchlist);

//rest api
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`.bgCyan.white);
});
