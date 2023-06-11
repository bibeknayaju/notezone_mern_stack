const mongoose = require("mongoose");

const ContributorSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, default: "contributor" }, // Add the role attribute
  },
  { timestamps: true }
);

const Contributor = mongoose.model("Contributor", ContributorSchema);

module.exports = Contributor;
