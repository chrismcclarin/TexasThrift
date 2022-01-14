// Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Store = require('./models/product');
const methodOverride = require("method-override")
const expressSession = require('express-session')
const auth = require('./middleware/auth');
require('dotenv').config();

const usersController = require('./controllers/users');
const storeController = require('./controllers/store');

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
app.use('/Public', express.static('Public'));
app.use(expressSession({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(auth.handleLoggedInUser);


// Routes / Controllers
app.use('/', usersController)
app.use('/', storeController)


//listeners
app.listen(PORT, () => console.log('the server is listening on ' + PORT));