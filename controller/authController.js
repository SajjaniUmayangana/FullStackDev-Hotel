const userdb = require("../model/user_schema");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jsonwebtoken = require("jsonwebtoken");

dotenv.config();

const validatePassword = require("../functions/validatepassword")
const validateform = require("../functions/validateForm")
const validateEmail = require("../functions/validateEmail")
const emailFormat = require("../functions/validateEmailStructure")


/////////// Registering User //////////////
exports.register = async (req, res, next) => {

       // Get user input
        const { username, email, password} = req.body;

       // Validate user input
     const validForm = validateform(username, password, email)
       if((validForm)){
        res.status(400).send("All input is required");
       }
        

        // Validate password 
      const validPassword = validatePassword(password)

          if (validPassword){
             res.send({message:"Valid User"})
       }else{
              res.send({error: "Invalid password"})
       }
       

  //       // Password should at least 4 characters long 
  //        const passwordLength = password.length >= 4

  //      // has at least one letter and at least one number 
  //        let hasLetter = false
  //         const alphabet = "abcdefghijklmnopqrstuvwxyz"
  //          for (const letter of alphabet){
  //                 if(password.includes(letter)){
  //                         hasLetter = true
  //                   }
  //                }

  //      let hasNumber = false
  //      const numbers = "0123456789"
  //      for(const number of numbers){
  //             if(password.includes(number)){
  //                   hasNumber = true
  //               }
  //             }

  // const validPassword = hasNumber && hasLetter && passwordLength
  //      if (validPassword){
  //            res.send({message:"Valid User"})
  //      }else{
  //             res.send({error: "Invalid password"})
  //         }

  // check if user already exist / Validate if user exist in our database
 
  const validEmail = validateEmail(email)
    if (validEmail){
      return res.status(409).send("User Already Exist. Please Login");
    }
    
// const oldUser = await userdb.findOne({ email });
  //       if (oldUser) {
  //             return res.status(409).send("User Already Exist. Please Login");
  //          }

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
            // res.redirect("/loginpage");
            res.status(200).send("User created successfully");
         } catch (err) {
         next(err);
           res.redirect("/registerpage");
         }
      };






/////////////// Registering User by admin ////////////////

exports.registerUserByAdmin = async (req, res, next) => {
  // Get user input
  const { username, email, password, isAdmin } = req.body;

  // Validate user input

     const validForm = validateform(username, password, email)
      if((validForm)){
            res.status(400).send("All input is required");
       }

  // if (!(username && email && password && isAdmin)) {
  // res.status(400).send("All input is required");
  // }

   // // const oldUser = await userdb.findOne({ email });
  // if (oldUser) {
  //   return res.status(409).send("User Already Exist. Please Login");
  // }

      // Validate password 
      const validPassword = validatePassword(password)
          if (validPassword){
             res.send({message:"Valid User"})
       }else{
              res.send({error: "Invalid password"})
        }

       // Check if user already exist / Validate if user exist in our database
        const validEmail = validateEmail(email)
        if (validEmail){
          return res.status(409).send("User Already Exist. Please Login");
        }
      
        // Check if email format is correct 
        const validEmailFormat = emailFormat(email)

        if (!(validEmailFormat)){
          return res.send("Email address format incorrect");
        }

  try {
    // To has the password using bcrypt
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(req.body.password, salt);

    const newUser = new userdb({
      username: req.body.username,
      email: req.body.email,
      password: hashPass,
      isAdmin: req.body.isAdmin,
    });

    await newUser.save();
 
   req.flash('message','User created successfully');
   res.redirect("/adminUsers");

    //  res.redirect("/admin");
    // res.status(200).send("User created successfully");

  } catch (err) {
    next(err);
   // res.redirect("/admin");
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


///////// Login User ///////////////

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
    }}catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
}