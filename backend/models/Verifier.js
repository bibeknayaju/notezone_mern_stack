const mongoose = require("mongoose");

const VerifierSchema = mongoose.Schema(
  {
    fullName: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, unique: true, required: true },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    role: { type: String, required: true, default: "verifier" }, // Add the role attribute
  },
  { timestamps: true }
);

const Verifier = mongoose.model("Verifier", VerifierSchema);

module.exports = Verifier;
