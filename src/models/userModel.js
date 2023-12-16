import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    username: {
      type: String,
      minLength: 4,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum: ["Masculino", "Femenino"],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "update_at",
    },
  }
);

export default mongoose.model("User", userSchema);
