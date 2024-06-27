
const express = require('express')
const router = express.Router()
const controller = require('../Controllers/role.controller')

router.get('/',controller.index)
router.post('/create', controller.create)
router.get('/detail/:id', controller.detail)
router.patch('/edit/:id', controller.edit)
router.patch('/delete/:id', controller.delete)

module.exports = router