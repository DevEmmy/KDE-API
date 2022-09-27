const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
require("dot-env").config

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

//run server
app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`)
})
