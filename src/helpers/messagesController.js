//Packages
const mongoose = require('mongoose')
const model = require("../models/mensajes")

//Product Routes
class messagesController {
    async getAllMessages() {
        return await model.find({})
    }

    async addNewMessage(mensajes) {
        return await model.insertMany(mensajes)
    }
}

//Export
module.exports = new messagesController()