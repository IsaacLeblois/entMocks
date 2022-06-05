const ContenedorMemoria = require("../container/memoryContainer.js")
const { generateNewId, generateNewProduct } = require("../utils/productGen.js")

class ApiMock extends ContenedorMemoria {
    constructor() { super() }

    popular(cant = 5) {
        const nuevos = []
        for(let i = 0; i<cant; i++) {
            const nuevoUsuario = generateNewProduct(generateNewId())
            const guardado = this.guardar(nuevoUsuario)
            nuevos.push(guardado)
        }
        return nuevos
    }

    get() {
        const productos = this.popular()
        return productos
    }
}

module.exports = ApiMock