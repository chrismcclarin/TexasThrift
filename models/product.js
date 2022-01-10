const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoreSchema = new Schema ({
    image_url: String,
    description: String,
    title: { type: String, required: true},
    sizes: String,
    price: Number,
}, {timestamps: true});

const Store = mongoose.model('Store', StoreSchema);
module.exports = Store