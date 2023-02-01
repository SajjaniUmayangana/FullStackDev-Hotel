const validatePassword = require("../functions/validatepassword")

test("returns true for password with numbers, letters and has 4 characters or more ",()=>{
    expect(validatePassword("rosa29")).toBe(true)
})

test("returns false for empty password",()=>{
    expect(validatePassword("")).toBe(false)
})

test("returns false for password without numbers",()=>{
    expect(validatePassword("avifvouysfvouer")).toBe(false)
})

test("returns false for password wihtout letters",()=>{
    expect(validatePassword("123793659")).toBe(false)
})

test("returns false for password with numbers, letters and less than 4 characters",()=>{
    expect(validatePassword("s1")).toBe(false)
})

test("returns true for password with numbers and uppercase letters ",()=>{
    expect(validatePassword("ANNA123478BU")).toBe(true)
})


test("returns true for password with numbers and uppercase and lowercase letters ",()=>{
    expect(validatePassword("Annawilliom1231")).toBe(true)
})
