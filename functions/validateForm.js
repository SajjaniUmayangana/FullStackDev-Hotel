
function validateform(username, password, email){

     let isEmpty = false;
     // Validate user input
     if (!(username && email && password)) {
       isEmpty = true;
    }

    return isEmpty

}

module.exports = validateform
