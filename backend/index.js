const connectTomongo = require('./db')
const express = require('express')
var cors = require('cors')
connectTomongo();

const app = express()
const port = 5000
app.use(express.json()); // use this middleware to use req.body
// available routes

app.use(cors());
app.use(express.json())

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Hello krish!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
