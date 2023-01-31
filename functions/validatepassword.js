function validatePassword(password) {
  // Password should at least 4 characters long
  const passwordLength = password.length >= 4;

  // has at least one letter and at least one number
  let hasLetter = false;
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  for (const letter of alphabet) {
    if (password.toLowerCase().includes(letter)) {
      hasLetter = true;
    }
  }

  let hasNumber = false;
  const numbers = "0123456789";
  for (const number of numbers) {
    if (password.includes(number)) {
      hasNumber = true;
    }
  }

  const validPassword = hasNumber && hasLetter && passwordLength;
  return validPassword;
}

module.exports = validatePassword
