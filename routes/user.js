const express = require('express');
const route = express.Router();
const userController = require("../controller/userController");
const { verifyToken, verifyUser, verifyAdmin } = require('../verify_token');


// check if the user is authenticated
route.get("/checkAuth", verifyToken, (req, res, next)=>{
   res.send("hello user, you are logged in")
})

// Check if it's the user who logs in is user or admin
route.get("/checkuser/:id",(req, res, next)=>{
  res.send("hello user, you are logged in you can delete any acocunt")
})

// Check Admin
route.get("/checkadmin/:id", (req,res,next)=>{
  res.redirect("/adminHome");
})


// Update
route.put("/update/:id", userController.updateUser);
// route.put("/update/:id", verifyUser, userController.updateUser);

// Delete
route.delete("/delete/:id", userController.deleteUser);
// route.delete("/delete/:id", verifyUser, userController.deleteUser);

// Get
route.get("/retrive/:id",userController.getUser);
// route.get("/retrive/:id", verifyUser, userController.getUser);

// Get All
route.get("/retrive", userController.getUsers);
// route.get("/retrive", verifyAdmin, userController.getUsers);


module.exports = route; 