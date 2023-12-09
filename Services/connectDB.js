const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const databaseConnection = async () => {
  try {
    const options = {
      dbName: "password_saver",
    };

    mongoose.set("strictQuery", false);
    console.log("Connecting to Database.....");
    mongoose.connect(
      process.env.DB_URL,
      options,
      { useUnifiedTopology: true, useNewUrlParser: true },
      () => {
        console.log("Connected to Database");
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = databaseConnection;
