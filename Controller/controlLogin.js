const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const authSchema = require("../Model/model");

dotenv.config();

const user_login = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
      return;
    }
    // Validate if user exist in our database
    const user = await authSchema.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.secretKey,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // return success response with token and user object
      res.status(200).json({
        message: "Successfully logged in",
        user,
      });
    } else {
      // return error response if email or password is incorrect
      res.status(401).json({
        message: "Incorrect email or password",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Error logging in: ${err.message}`,
    });
  }
};

module.exports = {
  user_login,
};
