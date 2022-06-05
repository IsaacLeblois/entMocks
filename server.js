const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/ecommerce'
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const messagesController = require('./src/helpers/messagesController')
const productsController = require('./src/helpers/productsController')
const ApiMock = require('./api/productos.js')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const apiProductos = new ApiMock()

//Middlewares
app.set('views', 'src/views')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Routes
app.get('/test/productos', async (req, res) => {
    res.json(await apiProductos.get())
})

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})

httpServer.listen(8080, () => console.log('Server ONLINE'))

async function dbConnection() {
    try {
        await mongoose.connect(url, {
            useUnifiedTopology: true
        })
        console.log('Base de datos conectada')
    } catch(err) {
        console.log(err)
    }
}

dbConnection()

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado:', socket.id)
    socket.emit('socketConnected', 'success')

    socket.on('productListRequest', async () => {
        const allProducts = await productsController.getAllProduct()
        socket.emit('updateProductList', allProducts)
    })

    socket.on('chatMessagesRequest', async () => {
        const allMessages = await messagesController.getAllMessages()
        socket.emit('updateChat', allMessages)
    })

    socket.on('addNewProduct', async (newProduct) => {
        await productsController.addNewProduct(newProduct)
        const allProducts = await productsController.getAllProduct()
        socket.emit('updateProductList', allProducts)
    })

    socket.on('addNewMessage', async (newMessage) => {
        await messagesController.addNewMessage(newMessage)
        const allMessages = await messagesController.getAllMessages()
        socket.emit('updateChat', allMessages)
    })
})