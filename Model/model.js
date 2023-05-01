const mongoose = require("mongoose");
const passwordValidator = require("password-validator");

const passwordSchema = new passwordValidator();

passwordSchema
  .is()
  .min(8) // Minimum length 8
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits() // Must have digits
  .has()
  .not()
  .spaces(); // Should not have spaces

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  email: {
    type: String,
    required: [true, "Email address is required"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value) => {
        // Basic email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email address",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: {
      validator: (value) => {
        // Password validation using password-schema
        return passwordSchema.validate(value);
      },
      message: `Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and no spaces`,
    },
  },
  token: {
    type: String,
  },
});

const authSchema = mongoose.model("authentication", userSchema);

module.exports = authSchema;
