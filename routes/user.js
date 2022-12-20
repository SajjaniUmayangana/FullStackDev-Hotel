const express = require('express');
const route = express.Router();

route.get('/',(req, res) =>{
   res.send("Hello, this is USER endpoint");
})

module.exports = route; 