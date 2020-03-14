const express = require('express')
const { userController } = require('../controller')

const router = express.Router()

router.get('/profileuser/:id', userController.getProfileUser)

router.put('/edituser/:id', userController.editUser)
router.put('/editemail/:id', userController.editEmail)


module.exports = router
