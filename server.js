// Dependencies
const express = require('express');
const app = express();
const Store = require('./models/products');
const methodOverride = require("method-override")
const storeController = require('./controllers/store')
require('dotenv').config();

// Database connection
mongoose.connect(process.env.DATABASE_URL);

app.set('view engine', '.ejs');

const db = mongoose.connection
db
    .on("error", (err) => console.log(err.message + " is mongo not running?"))
    .on("connected", () => console.log("mongo connected"))
    .on("disconnected", () => console.log("mongo disconnected"))

//middleware
app.use(express.urlencoded({
    extended: true
}));
app.use(methodOverride("_method"))
app.use('/public/', express.static('public'));

// Routes / Controllers
app.use('/', storeController)


//listeners
const PORT = process.env.PORT
app.listen(PORT, () => console.log('the server is listening on ' + PORT));