const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');
const bucketlist = require('./controllers/bucketlist');
// const MongoClient = require('mongodb').MongoClient;
//Initialize our app variable
const app = express();

//Declaring Port
const port = 3000;

//DB connection
mongoose.connect(config.database).catch((error) => { console.log(error); });
var dbready = mongoose.connection.readyState
if(dbready == 0)
	console.log("DB Disconnected");
if(dbready == 1)
	console.log("DB Connected");
if(dbready == 2)
	console.log("DB Connecting");
if(dbready == 3)
	console.log("DB Disconnecting");

//Middleware for CORS
app.use(cors());

//Middleware for bodyparsing using both json and urlencoding
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/*express.static is a built in middleware function to serve static files.
 We are telling express server public folder is the place to look for the static files
*/
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    res.send("All your fish died");
})

//Routing all HTTP requests to /bucketlist to bucketlist controller
app.use('/bucketlist',bucketlist);

//Listen to port 3000
app.listen(port, () => {
    console.log(`Starting the server at port ${port}`);
});