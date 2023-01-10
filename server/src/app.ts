import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

mongoose
  .connect("mongodb+srv://goranc:mirwo069@my-app.ubixgga.mongodb.net/test", {
    autoIndex: true,
  })
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.log(`MongoDB Connection Error: ${err}`);
  });

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
