const express = require('express')

const router = express.Router()
const controller = require('../Controllers/account.controller')


router.get('/', controller.index)
router.post('/create',controller.create)
router.patch('/edit/:id',controller.edit)
router.get('/detail/:id',controller.detail)

module.exports = router;