const express = require('express');

const route = express.Router();
const userController = require("../controller/userController");
const { verifyToken, verifyUser } = require('../verify_token');


// check if the user is authenticated
route.get("/checkAuth", verifyToken, (req, res, next)=>{
    res.send("hello user, you are logged in")
})


// Check if it's the user who logs in or the Admin or if it's an unauterized person
route.get("/checkuser/:id", verifyUser,(req, res, next)=>{
    res.send("hello user, you are logged in and u can delete your account")
})

// Update
route.put("/update/:id", userController.updateUser);

// Delete
route.delete("/delete/:id", userController.deleteUser);

// Get
route.get("/retrive/:id", userController.getUser);

// Get All
route.get("/retrive", userController.getUsers);


module.exports = route; 