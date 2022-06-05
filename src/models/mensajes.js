const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mensajesSchema = new Schema({
    user: {type: String, require: true, max: 100},
    messageText: {type: String, require: true}
})

module.exports = mongoose.model("mensajes", mensajesSchema)