const express = require('express')
const app = express()
const BodyParser = require('body-parser')
const cors = require('cors')   // untuk mengubungkan backend ke front end
const fs = require('fs')    // file system

const port = 9002

app.use(cors())
app.use(BodyParser.urlencoded({ extended: false }))
app.use(BodyParser.json())  // untuk client ngirim ke server
app.use(express.static('public'))

const { produkRouter, authRouter, userRouter, transactionRouter, transRestoRouter, adminRouter } = require('./router')

app.use('/produk', produkRouter)
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/transaction/', transactionRouter)
app.use('/transaksiresto/', transRestoRouter)
app.use('/lamanadmin/', adminRouter)


app.get('/', (req, res) => { return res.status(200).send('<h1>API EATWELL</h1>') })
app.listen(port, () => console.log(`API AKTIF DI ${port}`))
