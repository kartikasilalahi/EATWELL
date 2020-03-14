const express = require('express')
const { transRestoController } = require('../controller')

const router = express.Router()

router.get('/gettransaksiresto/:id', transRestoController.getTransaksi)

router.get('/expvoucher', transRestoController.expiredVoucher)

router.put('/usevoucher/:id', transRestoController.useVoucher)


module.exports = router

