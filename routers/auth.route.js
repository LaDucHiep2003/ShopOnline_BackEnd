const express = require('express')

const router = express.Router()
const controller = require('../Controllers/auth.controller')

router.post('/login', controller.login)
router.get('/detailAcc', controller.detailAcc)
router.get('/logout', controller.logout)
// router.get('/logout', controller.logout)
              

module.exports = router;