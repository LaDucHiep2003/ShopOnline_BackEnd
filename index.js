const express = require('express')
var cors = require('cors')
const app = express()
const port = 8000

const route = require('./routers/index.route')
const database = require('./config/database')
const bodyParser = require('body-parser')
require('dotenv').config()
app.use(bodyParser.json())

app.use(cors());
app.use(express.json());

database.connect()

route(app)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})