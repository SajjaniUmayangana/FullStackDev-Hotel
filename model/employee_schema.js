const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
    {
      firstname: {
        type: String,

      },
      lastname: {
        type: String,
      },
      email: {
        type: String,
      },
      jobDescription:{
        type: String
      },
      address:{
        type: String,
      },
      salary:{
        type: String,
      }
     },
      { timestamps: true }
  );
  
  const employeedb = mongoose.model("employeedb", employeeSchema);
  module.exports = employeedb;
