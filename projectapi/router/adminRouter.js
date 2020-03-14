const express = require('express')
const { adminController } = require('../controller')

const router = express.Router()

router.get('/getuser', adminController.getUser)
router.get('/getresto', adminController.getResto)
router.get('/getalltransaction', adminController.getAllTransaction)

router.post('/addnewcategory', adminController.addNewCategory)
router.post('/addnewschedule', adminController.addNewSchedule)



module.exports = router
