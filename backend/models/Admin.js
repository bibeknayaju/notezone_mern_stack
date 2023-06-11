const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema(
  {
    adminName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "admin" }, // Add the role attribute
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
