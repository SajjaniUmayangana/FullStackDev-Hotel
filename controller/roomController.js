const roomdb = require("../model/room_schema");

// Create room
exports.createRoom = async (req, res, next) => {
    const { roomNumber,roomType} = req.body;

    if (!(roomNumber && roomType)) {
        res.status(400).send("room number and room type required");
      }
    
    // const checkroomnumber = await roomdb.find({roomNumber});
    // if (checkroomnumber){
    //     return res.status(400).send("Room number already in use");
    // }

    try{

        const newRoom = new roomdb({
            roomNumber: req.body.roomNumber,
            roomType: req.body.roomType,
            description: req.body.description,
            price: req.body.price,
            img: req.file.filename,
        }) ;

        await newRoom.save();
       
        req.flash('message','Room created successfully');
        res.redirect("/adminRooms");

        //  res.status(200).send("Room created successfully");
    }catch (err){
        next(err);
       console.log(err);
    }
}

// Update 
exports.updateRoom = async (req, res) => {

    try {
            const id = req.params.id;
            const updateRoom = await roomdb.findByIdAndUpdate(
              id,
              { $set: req.body },
              { new: true } // returns the new version of the document
            );
            res.status(200).json(updateRoom);

          } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
}

// Delete 
exports.deleteRoom = async (req, res) => {
    try{
        const id = req.params.id;
        const updateRoom = await roomdb.findByIdAndDelete(id);
        req.flash('message','Room deleted!');
        res.status(200).json("Room deleted");

    }catch (err){
        res.status(500).json(err);
    }
}

// Get 
exports.getRoom = async (req,res) =>{
    try{
        const id = req.params.id;
        const retriveRoom = await roomdb.findById(id);
        res.status(200).json(retriveRoom);
    } catch(err){
        res.status(500).json(err);
    }
}

// Get All 
exports.getRooms = async (req, res) => {
    try {
        const retriveRooms = await roomdb.find();
        res.status(200).json(retriveRooms);
      } catch (err) {
        res.status(500).json(err);
      }
}


// Get room by id
exports.getRoomById = async (req, res) => {

    const roomid = req.body.id

    try {
        const room = await roomdb.findOne({id : roomid})
        console.log(room);
        res.redirect("/roomdetails")
      } catch (err) {
        res.status(400).json(err);
      }
}