const validateform = require("../functions/validateForm")


test("returns true if inputs are empty",()=>{
    expect(validateform("","","")).toBe(true)
})

// test("returns true if inputs are not empty",()=>{
//     expect(validateform("vbwbiptriyb")).toBe(true)
// })
