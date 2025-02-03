const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, unique: true },
    password: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" ,required: true}, // to make relationship between models 
    status: { type: String, enum: ["active", "inactive", "banned"], default: "active" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

module.exports = User;