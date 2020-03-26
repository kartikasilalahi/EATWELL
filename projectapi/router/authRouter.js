const express = require('express')
const { authController } = require('../controller')

const router = express.Router()


router.get('/hashpassword', authController.crypto)

router.get('/login', authController.login)  // login pembeli dan penjual
router.get('/login/:id', authController.login)

router.post('/registerver', authController.registerPembeli)
router.post('/registertoko', authController.registerToko)

router.put('/verifikasiemail', authController.emailverifikasi)
// router.post('/resendmailver', authController.resendEmailVer)

// router.put('/verifikasiemail', auth, authController.emailverifikasi)


module.exports = router