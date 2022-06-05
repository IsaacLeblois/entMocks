const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductosSchema = new Schema({
    title: {type: String, require: true, max: 100},
    price: {type: Number, require: true},
    thumbnail: {type: String, require: true, max: 100},
})

module.exports = mongoose.model("productos", ProductosSchema)