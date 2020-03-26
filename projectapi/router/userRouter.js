const express = require('express')
const { userController } = require('../controller')

const router = express.Router()

router.get('/profileuser/:id', userController.getProfileUser)

router.put('/edituser/:id', userController.editUser)
router.put('/editemail', userController.editEmail)
router.put('/verifynewemail', userController.verifyNewEmail)
router.put('/editpassword', userController.editPassword)


module.exports = router
