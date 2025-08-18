import express from "express";
const app = express();
import dotenv from "dotenv";
import { connectDatabase } from "./config/dbConnect.js";
import errorsMiddleWare from "./middlewares/errors.js";

//Handle uncaught expections
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down due to uncaught expection");
  process.exit(1);
});

dotenv.config({ path: "backend/config/config.env" });

//Connecting to database
connectDatabase();

app.use(express.json());

//Import all routes
import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";

app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);

app.use(errorsMiddleWare);

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

// handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err}`);
  console.log(`Shutting down the server due to unhandled promise rejections`);
  server.close(() => {
    process.exit(1);
  });
});
