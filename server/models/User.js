const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  directory: {
    type: String,
    default: "",
  },
  files: [
    {
      name: {
        type: String,
        required: true,
      },
      posterUrl: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
