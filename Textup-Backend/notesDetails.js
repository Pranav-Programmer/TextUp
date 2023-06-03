const mongoose = require("mongoose");

const NotesDetailsScehma = new mongoose.Schema(
  {
    email: String,
    Pid: String,
    heading: String,
    description: String,
    link: String,
    image: String,
    formattedDate: String,
  },
  {
    collection: "NotesDetails",
  }
);

mongoose.model("NotesDetails", NotesDetailsScehma);
