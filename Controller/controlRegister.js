const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const authSchema = require("../Model/model");

dotenv.config();

const user_register = async (req, res) => {
   try {
      const { firstName, lastName, email, password } = req.body;

      // Validate user's input
      if (!(firstName && lastName && email && password)) {
         return res.status(400).send("All input fields are required");
      }

      // Validate password
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!password.match(passwordRegex)) {
         return res
            .status(400)
            .send(
               "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            );
      }

      // Validate if user exist in our database
      const checkUser = await authSchema.findOne({ email });

      if (checkUser) {
         return res.status(409).send("User already exist in Database");
      }

      // Encrypt Password
      const encryptPassword = await bcrypt.hash(password, 10);

      // Create user in database
      const user = await authSchema.create({
         firstName,
         lastName,
         email: email.toLowerCase(),
         password: encryptPassword,
      });

      // Create new token
      const token = jwt.sign(
         { user_id: user._id, email }, //Payload
         process.env.secretKey, //Secret Key that is a random string defined to sign a token
         {
            expiresIn: "3h", //Expires
         }
      );

      // Save the token
      user.token = token;
      res.status(201).json(user);
   } catch (error) {
      console.log(error);
      res.status(500).json({
         message: error,
      });
   }
};

const welcome_user = async (req, res) => {
   try {
      res.send("Welcome dear user");
   } catch (error) {
      res.send("Error");
   }
};

module.exports = {
   user_register,
   welcome_user,
};
