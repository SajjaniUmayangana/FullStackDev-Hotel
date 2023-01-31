const userdb = require("../model/user_schema");

function checkIfUserLoginFound(username){

    const user = userdb.findOne(username);

    let userFound = false

    // if user found then true
    if (user) {
        userFound = true
    }

    return userFound
}

module.exports = checkIfUserLoginFound