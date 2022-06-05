//Packages
const model = require("../models/producto")

//Product Routes
class productsController {
    async getAllProduct() {
        return await model.find({})
    }

    async addNewProduct(producto) {
        return await model.insertMany(producto)
    }
}

//Export
module.exports = new productsController()