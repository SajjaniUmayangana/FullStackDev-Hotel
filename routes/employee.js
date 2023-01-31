const express = require('express');
const route = express.Router();
const employeeController = require('../controller/employeeController');


route.use(express.static(__dirname+"public/"));


// // Create
route.post("/createEmployee", employeeController.createEmployee);

// // Update
route.put("/update/:id", employeeController.updateEmployee);

// // Delete
route.delete("/delete/:id",employeeController.deleteEmployee);

// // Get
route.get("/retrive/:id", employeeController.getEmployee);

// // Get All
route.get("/retrive", employeeController.getEmployees);



module.exports = route;