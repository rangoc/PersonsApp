import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import personRouter from "./routes/personRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

mongoose
  .connect("mongodb+srv://goranc:mirwo069@my-app.ubixgga.mongodb.net/test")
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.log(`MongoDB Connection Error: ${err}`);
  });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  app.use("/persons", personRouter);

  app.listen(3001, () => {
    console.log("Server listening on port 3001");
  });
});
