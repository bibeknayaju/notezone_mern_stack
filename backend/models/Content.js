const mongoose = require("mongoose");

const ContentSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    semester: { type: String, unique: true, required: true },
    pdfFile: { type: [String], unique: true, required: true },
    contributor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contributor",
      required: true,
    },
  },
  { timestamps: true }
);

const Content = mongoose.model("Content", ContentSchema);

module.exports = Content;
