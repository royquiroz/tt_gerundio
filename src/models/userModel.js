import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: "Campo de nombre es obligatorio",
    },
    last_name: {
      type: String,
      required: "Campo de apellido es obligatorio",
    },
    email: {
      type: String,
      unique: true,
      required: "Campo de email es obligatorio",
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Masculino", "Femenino", "Otro"],
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
