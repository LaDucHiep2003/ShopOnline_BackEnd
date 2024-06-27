
const express = require('express')
const router = express.Router()
const controller = require('../Controllers/category.controller')

router.get('/',controller.index)
router.patch('/change-status/:id', controller.changeStatus)
router.patch('/delete/:id', controller.delete)

module.exports = router