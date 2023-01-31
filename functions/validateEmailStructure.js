

function emailFormat(email){

  let emailStructure = true
    let emailFormat =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(emailFormat)){
      emailStructure = true
    }else {
      emailStructure = false
    }

    return emailStructure
}


module.exports = emailFormat