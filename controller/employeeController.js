const employeedb = require("../model/employee_schema")


// Create room
exports.createEmployee = async (req, res, next) => {

    // const { firstname, lastname} = req.body;

    // if (!(firstname && lastname)) {
    //     res.status(400).send("firstname and lastname is required");
    //   }
    
    // const checkroomnumber = await roomdb.find({roomNumber});
    // if (checkroomnumber){
    //     return res.status(400).send("Room number already in use");
    // }

    try{

        const newEmployee = new employeedb({
           firstname: req.body.firstname,
           lastname: req.body.lastname,
           email: req.body.email,
           jobDescription: req.body.jobDescription,
           address: req.body.address,
           salary: req.body.salary,
        }) ;

        await newEmployee.save();
       
        req.flash('message','Employee created successfully');
        res.redirect("/adminEmployee");

    }catch (err){
        next(err);
       console.log(err);
    }
}

// Update 
exports.updateEmployee = async (req, res) => {

    try {
            const id = req.params.id;
            const updateEmployee = await employeedb.findByIdAndUpdate(
              id,
              { $set: req.body },
              { new: true } // returns the new version of the document
            );
            res.status(200).json(updateEmployee);

          } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
}

// Delete 
exports.deleteEmployee = async (req, res) => {
    try{
        const id = req.params.id;
        const deleteEmployee = await employeedb.findByIdAndDelete(id);
        req.flash('message','Employee deleted!');
        res.status(200).json("Employee deleted");

    }catch (err){
        res.status(500).json(err);
    }
}

// Get 
exports.getEmployee = async (req,res) =>{
    try{
        const id = req.params.id;
        const retriveEmployee = await employeedb.findById(id);
        res.status(200).json(retriveEmployee);
    } catch(err){
        res.status(500).json(err);
    }
}

// Get All 
exports.getEmployees = async (req, res) => {
    try {
        const retriveEmployees = await employeedb.find();
        res.status(200).json(retriveEmployees);
      } catch (err) {
        res.status(500).json(err);
      }
}

