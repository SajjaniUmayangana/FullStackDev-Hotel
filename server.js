const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require("path");
const axios = require('axios');
var cookieParser = require('cookie-parser');

const webSocket = require('ws')
const socketio = require('socket.io')
const io = socketio(server)

// Run when client connects 
io.on('connection', socket => {
  console.log('New WS Connection...');
})
 


/*
// websocket
const wss = new webSocket.Server({server});

// line 18-28 gets triggered when a new connection is made 
wss.on('connection', function connection(ws) {
  console.log('A new client connected')
  ws.send('Welcome new client');

  //this code triggers when the server recives msg from the client 
  ws.on('message', function incoming(message){
    console.log('received: %s', message);
    ws.send('got your msg its: '+ message)
  })  
})
*/



// importing route files 
const hotelRoute = require('./routes/hotel')
const roomRoute = require('./routes/room')
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth');
const { Socket } = require("socket.io");

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


// Error handeling middleware 
app.use((err,req,res,next)=>{
  const errStatus = err.status || 500
  const errMessage = err.message || "Sorry, something went wrong"
  return res.status(errStatus).json(errMessage)
})

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

app.get('/chatRoom', (req,res)=>{
  res.render('chatRoom.ejs')
})

app.get('/chat', (req,res)=>{
  res.render('chat.ejs')
})

app.get('/chatRoomAdmin', (req,res)=>{
  res.render('adminChat.ejs')
})

/*
app.get('/chat', (req,res)=>{
  res.render('loginpage.ejs') // when "Chat with us" is clicked it needs to be taken back to the login page
})
*/



// middleware 
app.use(express.json())
app.use(cookieParser());

app.use("/hotel", hotelRoute);
app.use("/room", roomRoute);
app.use("/user", userRoute);
app.use("/auth", authRoute);

server.listen(8800, () => {
  console.log("connected to backend");
  connect();
});
