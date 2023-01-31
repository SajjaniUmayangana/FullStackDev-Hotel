
const userdb = require("../model/user_schema");

function emailExists(email){

    let emailInUse = false
    
    const oldUser =  userdb.findOne({ email });

    if (oldUser ) {
      emailInUse = true 
    }

   
    return emailInUse
}



module.exports = emailExists
