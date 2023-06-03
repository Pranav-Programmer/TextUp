const mongoose = require("mongoose");

const VerifyDetailsScehma = new mongoose.Schema(
  {
    email: String,
    otp: Number,
  },
  {
    collection: "VerifyDetails",
  }
);

mongoose.model("VerifyDetails", VerifyDetailsScehma);
