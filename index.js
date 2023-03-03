const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
require("dotenv").config
const usersRoute = require("./routes/usersRoute");
const listRoute = require("./routes/listingsRoute")
const transactionRoute = require("./routes/transactionsRoute")
const memberRoute = require("./routes/membersRoute");
const waitListRoute = require("./routes/waitListRoute");
const notificationRoute = require("./routes/notificationsRoute")
const bodyParser = require('body-parser');
const conversationRoute = require("./routes/conversationRoute")
const messagesRoute = require("./routes/messagesRoute");
const http = require('http')
const {Server}= require("socket.io")

//initiate express
const app = express();

//activate cors
app.use(
    cors({
        origin: "*"
    })
)

const server = http.createServer(app)

//Restarting
const io = new Server(server, {
    cors:{
        origin: "*",
        methods: ["GET", "POST", "PATCH","PUT", "DELETE"]
    }
})

let users = []

const addUser = (user, socketId)=>{
    !users.some((user)=> user.user._id === user._id) && user && 
    users.push({user, socketId})
}

const removerUser = (socketId)=>{
    users = users.filter(user => user.socketId !== socketId)
}

const getUser =(userId)=>{
    var index = users.filter(user=> user.user._id == userId)
    // var user = users[index]
    return index[index.length - 1]?.socketId
}

io.on("connection", (socket)=>{
    console.log("A User has been connected " + socket.id)
    

    socket.on("sendMessage", (m)=>{
        var socketId = getUser(m.receiver);
        // console.log(socketId)
        // console.log(users)
        if(socketId){
          io.to(socketId).emit("getMessage", {m})
        }
        // console.log("work abeg")
      })
})




//set port and db uri
const port = process.env.PORT || 9099
const uri = process.env.DB_URI 

// "mongodb://127.0.0.1:27017/kde"
// connect mongodb
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection
connection.once('open', ()=>{console.log('Database running Successfully')})

app.use(bodyParser.json({limit:"50mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"50mb", extended: false}));

app.use("/users", usersRoute)
app.use("/listings", listRoute)
app.use("/transactions", transactionRoute)
app.use("/members", memberRoute)
app.use("/wait-list", waitListRoute)
app.use("/notifications", notificationRoute)
app.use("/conversations", conversationRoute)
app.use("/messages", messagesRoute)

//run server
server.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})
