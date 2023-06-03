const mongoose = require("mongoose");

const FeedbackDetailsScehma = new mongoose.Schema(
  {
    feedback: String,
    rating: Number,
  },
  {
    collection: "FeedbackDetails",
  }
);

mongoose.model("FeedbackDetails", FeedbackDetailsScehma);
