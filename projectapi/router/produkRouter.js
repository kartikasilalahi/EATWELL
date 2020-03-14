const express = require('express')
const { produkController } = require('../controller')

const router = express.Router()

router.get('/dataprod', produkController.getProduk)

router.get('/filterproduct/:filterby', produkController.filterProduct)

router.get('/expprod/:idtoko', produkController.getEXpProduk)

router.get('/dataprodresto/:id', produkController.getProdukResto)
router.get('/imgprodresto/:idproduk', produkController.getImageProdukResto)
router.get('/kategoriproduk', produkController.getKategoriProduk)
router.get('/getdetailproduk/:idproduk', produkController.getDetailProduk)


router.post('/addprodukresto', produkController.addProdukResto)

router.put('/editprodukresto/:idproduk', produkController.editProdukResto)
router.put('/editimageprodukresto/:idimage', produkController.editImageProdukResto)

router.delete('/deleteprodukresto/:id', produkController.deleteProdukResto)
router.get('/deleteimgprodresto/:id', produkController.deleteImgProdresto)

router.get('/getdetailresto/:id', produkController.getDetailResto)

router.get('/getschedule/', produkController.getSchedule)

router.post('/editprofileresto/:id', produkController.editProfileResto)
router.post('/editjadwalresto', produkController.editJadwalResto)

router.post('/addtowishlist', produkController.addWishlist)
router.get('/getwishlist/:id', produkController.getWishlist)



module.exports = router