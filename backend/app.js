import express from "express";
const app = express();
import dotenv from "dotenv";
import { connectDatabase } from "./config/dbConnect.js";
import errorsMiddleware from "./middlewares/errors.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// importing all routes
import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/order.js";

// Handle Uncaught Exeptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR : ${err}`);
  console.log("Shutting down due to Uncaught exeption");
  process.exit(1);
});

// dotenv Config
dotenv.config({ path: "backend/config/config.env" });

//Connecting to Database
connectDatabase();

// middleware
app.use(express.json({limit : "10mb"}));
app.use(cookieParser());
app.use(cors());



// All Routes
app.use("/api/v1/", productRoutes);
app.use("/api/v1/", authRoutes);
app.use("/api/v1/", orderRoutes);
app.use("/api/v1/", (req, res) => {
  const htmlContent = "<h1>FlipCart Backend running</h1>";
  res.send(htmlContent);
});


// Using error middleware
app.use(errorsMiddleware);



const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} IN ${process.env.NODE_ENV} mode`
  );
});

// handle unhadled Promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`ERROR ${err}`);
  console.log("Shutting down server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});

//
