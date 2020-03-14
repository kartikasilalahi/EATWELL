const express = require('express')
const { transactionController } = require('../controller')

const router = express.Router()

router.post('/buyproduct', transactionController.buyProduct)

router.get('/onprocess/:id', transactionController.getOnprocessTransaction)

router.put('/canceled/:kodetransaksi', transactionController.cancelOrder)

router.get('/history/:id', transactionController.getHistory)

router.post('/confirmpayment', transactionController.confirmPayment)

router.get('/overtimepayment/:iduser', transactionController.overtimePayment)

router.get('/getstock/:idproduk', transactionController.getStock)




module.exports = router