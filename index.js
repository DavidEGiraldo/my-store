const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello, my server on Express.js')
})

app.get('/new-route', (req, res) => {
  res.send('Hello, I am a new route')
})

app.get('/products', (req, res) => {
  res.json([
    {
      name: 'Test Product 1',
      price: 100
    },
    {
      name: 'Test Product 2',
      price: 200
    }
  ])
})

app.get('/products/:id', (req, res) => {
  const { id } = req.params
  res.json({
    id,
    name: 'Test Product',
    price: 100
  })
})

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params
  res.json({
    categoryId,
    productId
  })
})

app.listen(port, () => {
  console.log('Listening on port:', port)
})
