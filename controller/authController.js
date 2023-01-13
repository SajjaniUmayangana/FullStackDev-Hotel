const userdb = require("../model/user_schema");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jsonwebtoken = require("jsonwebtoken");

dotenv.config();

// Registering User
exports.register = async (req, res, next) => {
  // Get user input
  const { username, email, password } = req.body;

  // Validate user input
  if (!(username && email && password)) {
    res.status(400).send("All input is required");
  }

  // check if user already exist / Validate if user exist in our database
  const oldUser = await userdb.findOne({ email });

  if (oldUser) {
    return res.status(409).send("User Already Exist. Please Login");
  }

  try {
    // To has the password using bcrypt
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(req.body.password, salt);

    const newUser = new userdb({
      username: req.body.username,
      email: req.body.email,
      password: hashPass,
    });

    await newUser.save();
    res.redirect("/");
    // res.status(200).send("User created successfully");
  } catch (err) {
    next(err);
    res.redirect("/registerpage");
  }
};

// Login User
/*
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
    } else {
      // Authorization of the user using JWT token
      // if password is correct create a new token using JWT for each request to verify the identiy
      const newToken = jsonwebtoken.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.jwtSecretKey
      );

      /*
    // To prevent sending the password
    const { password, isAdmin, ...otherDetails } = user._doc;
    res.cookie("access_token", newToken,{httpOnly: true})
    .status(200)
    .json({...otherDetails})

    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};
*/

exports.login = async (req, res) => {

   // Get user input
   const { username, password } = req.body;

   // Validate user input
   if (!(username && password)) {
     res.status(400).send("All input is required");
   }

  try {
    const user = await userdb.findOne({ username: req.body.username });

    // if no user is found
    if (!user) {
      return res.status(404).send("User not found, Please Register");
    }

    // Now compare the password with the password saved in the Database
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      // Authorization of the user using JWT token
      // if password is correct create a new token using JWT for each request to verify the identiy
      const newToken = jsonwebtoken.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.jwtSecretKey
      );

      // saves the new token
      user.newToken = newToken;
      
      res.redirect("/");
    }

  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};
