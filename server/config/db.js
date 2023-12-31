const mongoose = require("mongoose");

const connectDB = () => {
  console.log("connection url", process.env.MONGO_URI);
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Database connected with ${data.connection.host}`);
    });
};
module.exports = connectDB;
