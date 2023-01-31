

const checkIfUserLoginFound = require("../functions/checkIfUserLoginFound")

test("return true if user is already registered",()=>{
   expect(checkIfUserLoginFound("Tenara")).toBe(true)
})

test("return false if user is not registered",()=>{
    expect(checkIfUserLoginFound("targu vjhgvk")).toBe(false)
 })