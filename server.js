const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const http = require("http");
const server = http.createServer(app);
// const path = require("path");
// const axios = require('axios');
var cookieParser = require('cookie-parser');
const message = require("./model/message_schema");

// connecting the config.env with the server.js file
dotenv.config() 

// connecting to MongoDB Database
const connect = async () => {
  try {
    await mongoose.connect(process.env.mongo);
    console.log("Connected to MongoDB")
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB is disconnected")
})


// To send flash messages to the front-end
var session = require('express-session');
var flash = require('connect-flash');

app.use(session({
  secret: 'secret',
  cookie: {maxAge : 3000},
  saveUninitialized : false,
  resave : false
}))

app.use(flash());


// importing route files 
const roomRoute = require('./routes/room')
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth');
const employeeRoute = require('./routes/employee');
const bookRoute = require('./routes/booking');

// middleware 
app.use(express.json())
app.use(cookieParser());

app.use("/room", roomRoute);
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/employee", employeeRoute);
app.use("/booking", bookRoute);

// static files 
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

// set Views
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.json());


// Rendering webpages
app.get('', (req,res)=>{
    res.render('home.ejs')
})

app.get('/aboutpage', (req,res)=>{
  res.render('about.ejs')
})

app.get('/registerpage', (req,res)=>{
  res.render('registerpage.ejs')
})

app.get('/loginpage', (req,res)=>{
  res.render('loginpage.ejs')
})

app.get('/adminUsers', (req,res)=>{
  res.render('admin.ejs', {message : req.flash('message')})
})

app.get('/adminRooms', (req,res)=>{
  res.render('adminRooms.ejs', {message : req.flash('message')})
})

app.get('/adminEmployee', (req,res)=>{
  res.render('adminEmployee.ejs', {message : req.flash('message')})
})

app.get('/adminHome', (req,res)=>{
  res.render('adminHome.ejs')
})

app.get('/adminBooking', (req,res)=>{
  res.render('adminBookings.ejs', {message : req.flash('message')})
})


app.get('/displayrooms', (req,res)=>{
  res.render('displayRooms.ejs', {message : req.flash('message')})
})



app.get('/booking', (req,res)=>{
  res.render('booking.ejs')
})

app.get('/roomdetails', (req,res)=>{
  res.render('roomdetail.ejs')
})

app.get('/reviews', (req,res)=>{
  res.render('userReviews.ejs')
})



// Socket connection
const io = require("socket.io")(server); 

// Socket handeling 
io.on("connection", function (socket) {

       message.find().then(result => {
              socket.emit('output-message', result)
       })

      console.log("User connected", socket.id);

       socket.on('disconnect', ()=> {
               console.log('user disconnected');
        });

       socket.on('chatmessage', msg => {
                const newmessage = new message({ msg:msg});

                newmessage.save().then(()=>{
                io.emit('message', msg)
         })
      })
});





// Error handeling middleware 
app.use((err,req,res,next)=>{
  const errStatus = err.status || 500
  const errMessage = err.message || "Sorry, something went wrong"
  return res.status(errStatus).json(errMessage)
})


server.listen(8800, () => {
  console.log("connected to backend");
  connect();
});
