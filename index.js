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
const bodyParser = require('body-parser')

//initiate express
const app = express();

//activate cors
app.use(
    cors({
        origin: "*"
    })
)

//set port and db uri
const port = process.env.PORT || 9099
const uri = "mongodb://127.0.0.1:27017/kde"

// process.env.DB_URI 
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

//run server
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})
