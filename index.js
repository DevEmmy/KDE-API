const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
require("dotenv").config()
const usersRoute = require("./routes/usersRoute");
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
const port = process.env.PORT || "9890";
const uri = process.env.DB_URI || "mongodb://127.0.0.1:27017/KDE"

// connect mongodb
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection
connection.once('open', ()=>{console.log('Database running Successfully')})

app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: false}));

app.use("/users", usersRoute)

//run server
app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`)
})
