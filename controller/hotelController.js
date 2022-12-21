const hoteldb = require('../model/hotel_schema')

//create 
exports.createHotel = async (req, res) =>{
    const newHotel = new hoteldb(req.body);

  try {
    const saveHotel = await newHotel.save();
    res.status(200).json(saveHotel);
  } catch (err) {
    res.status(500).json(err);
  }
}

//update

exports.updateHotel = async (req, res) =>{
    try {
        const id = req.params.id;
        const updateHotel = await hoteldb.findByIdAndUpdate(
          id,
          { $set: req.body },
          { new: true } // returns the new version of the document
        );
        res.status(200).json(updateHotel);
      } catch (err) {
        res.status(500).json(err);
      }
}

 
//delete

exports.deleteHotel = async (req, res) =>{
    try {
        const id = req.params.id;
        const updateHotel = await hoteldb.findByIdAndDelete(id);
        res.status(200).json("Hotel deleted");
      } catch (err) {
        res.status(500).json(err);
      }
}

// get

exports.getHotel = async (req,res) => {
    try {
        const id = req.params.id;
        const retriveHotel = await hoteldb.findById(id);
        res.status(200).json(retriveHotel);
      } catch (err) {
        res.status(500).json(err);
      }
}

// get all 
exports.getHotels = async (req, res) => {
    try {
        const retriveHotels = await hoteldb.find();
        res.status(200).json(retriveHotels);
      } catch (err) {
        res.status(500).json(err);
      }
}