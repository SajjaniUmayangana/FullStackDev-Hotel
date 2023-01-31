const validateEmail = require("../functions/validateEmail")
const validateEmailStructure = require("../functions/validateEmailStructure")


test("returns true if user exsist by checking emails in database ",()=>{
    expect(validateEmail("andy34@gmail.com")).toBe(true)
})

test("returns false if email format is wrong ",()=>{
    expect(validateEmailStructure("andy34gmailcom")).toBe(false)
})