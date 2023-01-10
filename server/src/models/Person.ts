import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const PersonSchema: Schema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  city: { type: String },
  address: { type: String },
  phone: { type: String },
});

export interface IPerson extends mongoose.Document {
  name: string;
  surname: string;
  createdDate: Date;
  city?: string;
  address?: string;
  phone?: string;
}

export default model<IPerson>("Person", PersonSchema);
