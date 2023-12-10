const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const http=require("http");
const mongo=require("mongoose");
const mongoconnection=require("./config/dbconnection.json");
const app = express();
const bodyParser=require("body-parser")
//const geolocation = require('node-geolocation');
const geolocation = require('geolocation');
//const io = require('socket.io');
const dechetRouter=require("./routes/dechet")
const collecteRouter=require("./routes/collecte")
const twig = require('twig');



mongo.connect(mongoconnection.url, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
  })
  .then(()=>console.log('mongo connected'))
  .catch((err)=>console.log(err));

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'twig');
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(bodyParser.urlencoded({extended : true}));
  app.use(bodyParser.json());
  app.use('/dechet',dechetRouter);
  app.use('/collecte',collecteRouter);
  
  const server=http.createServer(app);
  const io=require("socket.io")(server);

  const {
    
    affichesocket,
  } = require("./controller/dechetsController");

  function getGPSLocation() {
    geolocation.getCurrentPosition((err, position) => {
        if (err) throw err;
        console.log('Latitude:', position.coords.latitude);
        console.log('Longitude:', position.coords.longitude);
  
       
        const io = require("socket.io-client");
        const socket = io.connect();
        socket.emit('nouvelleDetection', { latitude: position.coords.latitude, longitude: position.coords.longitude });
    });
  }

//getGPSLocation();
  


io.on("connection", (socket) => {
  console.log("detecteur connected");
  socket.emit( "detecteur is connected");

});



/*socket.on("aff", async (data) => {
  const r = await affichesocket(data);
  console.log("jjjjjj", JSON.stringify(r));
  io.emit("aff", r);
});
*/
app.set('socketio', io);



  
  server.listen(3002, console.log("server run"));

  module.exports = app;
