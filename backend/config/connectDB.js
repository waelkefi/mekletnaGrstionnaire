const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
dotenv.config();
const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() =>
      console.log("MongoDB database connection established successfully ..."),
      addAdmin()
    )
    .catch((err) => console.log("MongoDB database connection failed !!!", err));
};

async function addAdmin() {
  try {
    // find user with role admin
    const user = await User.findOne({ role: "ADMIN" });

    // if user exists, nothing to do else save admin
    if (user) {
      console.log("admin exists");
    } else {
      // crypt the password
      const salt = await bcrypt.genSalt(Number(process.env.SALT_FACTOR));
      const crypt_password = await bcrypt.hash("admin", salt);

      const newUser = new User({
        firstName: "admin",
        lastName: "admin",
        userName: "admin",
        email: "admin",
        phone : "12345",
        password: crypt_password,
        address: {
          country: "admin",
          state: "admin",
          streetBuilding: "admin",
          latitude: 0,
          longitude: 0,
        },
        role: "GESTIONAIRE",
      });

      // save admin in db
      const admin = await newUser.save();
      if (!admin) {
        console.log("Error in saving admin");
      } else {
        console.log("Admin was registered successfully!");
      }
    }
  } catch (err) {
    console.log(`Cannot add admin to the database! Error: ${err}`);
  }
}

module.exports = connectDB;


