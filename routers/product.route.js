
const express = require('express')
const router = express.Router()
const productController = require('../Controllers/product.controller')

router.get('/',productController.index)
router.patch('/change-status/:id', productController.changeStatus)
router.post('/create',productController.create)
router.delete('/delete/:id',productController.delete)
router.patch('/edit/:id',productController.edit)
router.get('/detail/:id',productController.detail)
module.exports = router