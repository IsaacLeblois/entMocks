const faker = require('faker')

let id = 1
function generateNewId() {
  return id++
}

function generateNewProduct(id) {
  return {
    id,
    title: faker.commerce.product(),
    price: faker.commerce.price(2500, 50000),
    thumbnail: faker.image.image(),
  }
}

module.exports = { generateNewId, generateNewProduct }
