const userdb = require("../model/user_schema");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jsonwebtoken = require("jsonwebtoken");

dotenv.config()

// Registering User
exports.register = async (req, res) => {
  try {
    // To has the password using bcrypt
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new userdb({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User created successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const user = await userdb.findOne({ username: req.body.username });

    // if no user is found
    if (!user) {
      return res.status(404).send("User not found, Please Register");
    }

    // Now compare the password with the password saved in the Database
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).send("Password or username is incorrect");
    }

    // if password is correct create a new token using JWT for each request to verify the identiy 
    const newToken = jsonwebtoken.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.jwtSecretKey);

    // To prevent sending the password
    const { password, isAdmin, ...otherDetails } = user._doc;
    res.cookie("access_token", newToken,{httpOnly: true})
    .status(200)
    .json({...otherDetails});

  } catch (err) {
    res.status(500).json(err);
    console.log(err)
    
  }
};
