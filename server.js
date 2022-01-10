// Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Store = require('./models/product');
const methodOverride = require("method-override")
const storeController = require('./controllers/store')
const usersController = require('./controllers/users');
const expressSession = require('express-session')
require('dotenv').config();

// Database connection
const { PORT=3000, DATABASE_URL, SECRET } = process.env
mongoose.connect(DATABASE_URL);
app.set('view engine', '.ejs');

const db = mongoose.connection
db
    .on("error", (err) => console.log(err.message + " is mongo not running?"))
    .on("connected", () => console.log("mongo connected"))
    .on("disconnected", () => console.log("mongo disconnected"))

//middleware
app.set('view engine', '.ejs');
app.use(express.urlencoded({
    extended: true
}));
app.use(methodOverride("_method"))
app.use('/public/', express.static('public'));
app.use(expressSession({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))


// Routes / Controllers
app.use('/', storeController)
app.use('/', usersController)


//listeners
app.listen(PORT, () => console.log('the server is listening on ' + PORT));