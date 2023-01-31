const userdb = require('../model/user_schema')


//update
exports.updateUser = async (req, res) =>{
    try {
        const id = req.params.id;
        const updateUser = await userdb.findByIdAndUpdate(
          id,
          { $set: req.body },
          { new: true } // returns the new version of the document
        );
        res.status(200).json(updateUser);
      } catch (err) {
        res.status(500).json(err);
      }
}

 
//delete

exports.deleteUser = async (req, res) =>{
    try {
        const id = req.params.id;
        const updateUser = await userdb.findByIdAndDelete(id);
        res.status(200).json("User deleted");
      } catch (err) {
        res.status(500).json(err);
      }
}

// get

exports.getUser = async (req,res) => {
    try {
        const id = req.params.id;
        const retriveUser = await userdb.findById(id);
        
        res.status(200).json(retriveUser);
      } catch (err) {
        res.status(500).json(err);
      }
}

// get all 
exports.getUsers = async (req, res) => {
    try {
        const retriveUsers = await userdb.find();
        res.status(200).json(retriveUsers);
      } catch (err) {
        res.status(500).json(err);
      }
}