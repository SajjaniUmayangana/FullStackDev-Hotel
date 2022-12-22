const roomdb = require("../model/room_schema");
const hoteldb = require("../model/hotel_schema");
// const errorCreated = require("./error");

// Create room
exports.createRoom = async (req, res, next) => {

  const hotelID = req.params.hotelid;
  const room = new roomdb(req.body);

  try {
    const saveRoom = await room.save();

    // this try catch is to update the hotel
    try {
      await hoteldb.findByIdAndUpdate(hotelID, {
        $push: { room: saveRoom._id }, //push method allows to push any item in an array
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(saveRoom);
  } catch (err) {
    next(err);
  }
};

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
  }
};

// Delete
exports.deleteRoom = async (req, res) => {

  const hotelID = req.params.hotelid;

  try {
    const id = req.params.id;
    const updateRoom = await roomdb.findByIdAndDelete(id);

    try {
      await hoteldb.findByIdAndUpdate(hotelID, {
        $pull: { room: req.params.id}, // pull methods
      });
    } catch (err) {
      next(err);
    }

    res.status(200).json("room deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get
exports.getRoom = async (req, res) => {
  try {
    const id = req.params.id;
    const retriveRoom = await roomdb.findById(id);
    res.status(200).json(retriveRoom);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get all
exports.getRooms = async (req, res) => {
  try {
    const retriveRooms = await roomdb.find();
    res.status(200).json(retriveRooms);
  } catch (err) {
    res.status(500).json(err);
  }
};
