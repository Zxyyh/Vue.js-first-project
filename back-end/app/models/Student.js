const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let studentSchema = new Schema(
  {
    nis: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    age: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  {
    collection: "students",
  }
);

module.exports = mongoose.model("Student", studentSchema);
