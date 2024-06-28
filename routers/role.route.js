
const express = require('express')
const router = express.Router()
const controller = require('../Controllers/role.controller')

router.get('/',controller.index)
router.post('/create', controller.create)
router.get('/detail/:id', controller.detail)
router.patch('/edit/:id', controller.edit)
router.patch('/delete/:id', controller.delete)
router.get('/permissions', controller.permissions)
router.patch('/permissions/addPermissions', controller.addPermissions)

module.exports = router