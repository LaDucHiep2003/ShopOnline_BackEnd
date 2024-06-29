const express = require('express')

const router = express.Router()
const controller = require('../Controllers/dashboard.controller')

router.get('/', controller.index)
              

module.exports = router;