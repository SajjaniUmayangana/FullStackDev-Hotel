const express = require('express');
const multer = require('multer');
const route = express.Router();
const roomController = require('../controller/roomController')
const { verifyAdmin } = require("../verify_token");
const bodyparser = require("body-parser")

route.use(express.static(__dirname+"public/"));

// Storage & file name setting 
let storage = multer.diskStorage({
    destination:'public/img/',
    filename: (req,file,callback)=>{
       // callback(null,Date.now(+file+originalname))
        callback(null, file.originalname)
    }
})

let upload = multer({
    storage: storage
}).single('file')

// // Create
route.post("/createroom",upload, roomController.createRoom);
// route.post("/createroom", verifyAdmin, roomController.createRoom);

// // Update
route.put("/update/:id",upload,roomController.updateRoom);
// route.put("/update/:id", verifyAdmin, roomController.updateRoom);

// // Delete
route.delete("/delete/:id", roomController.deleteRoom);
// route.delete("/delete/:id", verifyAdmin, roomController.deleteRoom);

// // Get
route.get("/retrive/:id",roomController.getRoom);

// // Get All
route.get("/retrive",roomController.getRooms);


route.get("/getroombyid/:id", roomController.getRoomById);
// route.post("/getroombyid/:id", roomController.getRoomById);


route.post("/bookroom/:id", roomController.bookRoom);




module.exports = route;