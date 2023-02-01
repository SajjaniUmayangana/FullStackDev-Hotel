


const bookingdb = require("../model/booking_schema");

// Create room
exports.createBooking = async (req, res, next) => {


    try{

        const newBooking = new bookingdb ({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            address: req.body.address,
            contactNumber: req.body.contactNumber,
        }) ;

        await  newBooking.save();
       
        req.flash('message','Booking Created');
        res.redirect("/adminBooking");

        //  res.status(200).send("Room created successfully");
    }catch (err){
        next(err);
       console.log(err);
    }
}

// Update 
exports.updateBooking = async (req, res) => {

    try {
            const id = req.params.id;
            const updateBooking = await bookingdb.findByIdAndUpdate(
              id,
              { $set: req.body },
              { new: true } // returns the new version of the document
            );
            res.status(200).json(updateBooking);

          } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
}

// Delete 
exports.deleteBooking = async (req, res) => {
    try{
        const id = req.params.id;
        const updateRoom = await bookingdb.findByIdAndDelete(id);
        req.flash('message','Booking deleted!');
        res.status(200).json("Booking deleted");

    }catch (err){
        res.status(500).json(err);
    }
}

// Get 
exports.getBooking = async (req,res) =>{
    try{
        const id = req.params.id;
        const retriveBooking = await bookingdb.findById(id);
        res.status(200).json(retriveBooking);
    } catch(err){
        res.status(500).json(err);
    }
}

// Get All 
exports.getBookings = async (req, res) => {
    try {
        const retriveBookings = await bookingdb.find();
        res.status(200).json(retriveBookings);
      } catch (err) {
        res.status(500).json(err);
      }
}





