const { mysql } = require('../connection')
var moment = require('moment')
var Kodetransaksi = require('../helper/kodetransaksi')
var Kodevoucher = require('../helper/kodevoucher')
const { uploader } = require('../helper/uploader')
const transporter = require('../helper/mailer')
const Numeral = require('numeral')


module.exports = {

    // ===========
    // BUY PRODUCT
    // ===========
    buyProduct: (req, res) => {
        let sql = `INSERT INTO transaction SET ?`
        let { iduser, idtoko, idproduk, qty, totalharga, email } = req.body
        let datatrans = {
            iduser, idtoko, idproduk, qty, totalharga
        }
        datatrans.status = 'WAITING PAYMENT'
        datatrans.tanggalpesan = moment().format("YYYY-MM-DD HH:mm:ss")
        datatrans.tanggalexp = moment().add(1, 'hours').format("YYYY-MM-DD HH:mm:ss")
        let kodetransaksi = Kodetransaksi()
        datatrans.kodetransaksi = kodetransaksi

        mysql.query(sql, datatrans, (err, result) => {
            if (err) return res.status(500).send(err)

            sql = `SELECT 
                        tr.*, 
                        tk.namatoko, 
                        p.namaproduk, 
                        p.harganormal, 
                        p.diskon
                    FROM transaction tr
                    LEFT JOIN toko tk ON tr.idtoko = tk.usertokoid 
                    LEFT JOIN produk p ON tr.idproduk = p.id WHERE tr.kodetransaksi='${kodetransaksi}' `
            mysql.query(sql, (err2, result2) => {
                if (err2) throw err2

                // ---------------- EMAIL -----------------------
                let totalHarga = 'Rp.' + Numeral(totalharga).format('0,0.00')
                let hargaNormal = 'Rp. ' + Numeral(result2[0].harganormal).format('0,0.00')
                let mailoptions = {
                    from: 'eatwell <tikasilalahi.test@gmail.com>',
                    to: email,
                    subject: `EATWELL - Transaction Code ${kodetransaksi}`,
                    html: `<h3>Eatwell - Invoice Transaction </h3> 
                            <p style="color:grey;font-size:18px;">
                                Terima Kasih telah melakukan pemesanan di <span style="color:green;">Eatwell</span><br/>
                                Selesaikan Pembayaran dalam waktu 1 x 24 jam yang ditentukan
                            </p>
                            <div style="font-size:14px;">
                                <p>${result2[0].namatoko} || kode transaksi ${kodetransaksi}</p>
                                <p>${result2[0].namaproduk} disc ${result2[0].diskon} - ${hargaNormal} x ${qty}</p>
                                <p>Total Bayar ${totalHarga} </p>
                                <p>Tanggal Pesan: ${datatrans.tanggalpesan}</p>
                                <p>Batas Pembayaran: ${datatrans.tanggalexp}</p><p></p>
                            </div>`
                }

                transporter.sendMail(mailoptions, (err1, result1) => {
                    if (err1) return res.status(500).send({ message: err1 })
                    return res.status(200).send({ message: 'berhasil kirim', result1 })
                })
                // ---------------- EMAIL -----------------------

                sql = `SELECT 
                        tr.*, 
                        tk.namatoko, 
                        p.namaproduk, 
                        p.harganormal, 
                        p.diskon
                    FROM transaction tr
                    LEFT JOIN toko tk ON tr.idtoko = tk.usertokoid 
                    LEFT JOIN produk p ON tr.idproduk = p.id WHERE tr.iduser=${datatrans.iduser}`
                mysql.query(sql, (err3, result3) => {
                    if (err3) throw err3
                    return res.status(200).send(result3)
                })
            })
        })
    },


    // ==========================
    // GET ON PROCESS TRANSACTION
    // ==========================
    getOnprocessTransaction: (req, res) => {
        let sql = `SELECT tr.*, 
                        tk.namatoko, 
                        tk.alamat, 
                        u.phone, 
                        p.namaproduk, 
                        p.harganormal, 
                        p.diskon,
                        p.kuota,
                        p.terjual,
                        i.image
                    FROM transaction tr
                    LEFT JOIN toko tk ON tr.idtoko = tk.usertokoid 
                    LEFT JOIN produk p ON tr.idproduk = p.id
                    LEFT JOIN user u ON tr.idtoko = u.id
                    LEFT JOIN images i ON tr.idproduk=i.idproduk WHERE tr.status='WAITING PAYMENT' AND i.cover=1  AND tr.iduser=${req.params.id} ORDER BY tr.idtransaction DESC`
        mysql.query(sql, (err, result) => {
            // if (err) throw err
            if (err) return res.status(500).send(err)
            return res.status(200).send(result)
        })
    },


    // =============
    // CANCEL ORDER
    // ============
    cancelOrder: (req, res) => {
        let sql = `UPDATE transaction SET status='CANCELED' WHERE kodetransaksi='${req.params.kodetransaksi}'`
        let dataorder = req.body
        // dataorder.status = 'CANCELED'
        mysql.query(sql, (err, result) => {
            if (err) return res.status(500).send(err)
            sql = `SELECT tr.*, 
                        tk.namatoko, 
                        tk.alamat, 
                        u.phone, 
                        p.namaproduk, 
                        p.harganormal, 
                        p.diskon,
                        p.kuota,
                        p.terjual,
                        i.image
                    FROM transaction tr
                    LEFT JOIN toko tk ON tr.idtoko = tk.usertokoid 
                    LEFT JOIN produk p ON tr.idproduk = p.id
                    LEFT JOIN user u ON tr.idtoko = u.id
                    LEFT JOIN images i ON tr.idproduk=i.idproduk WHERE tr.status='WAITING PAYMENT' AND i.cover=1  AND tr.iduser=${dataorder.iduser} ORDER BY tr.idtransaction DESC`
            mysql.query(sql, (err1, result1) => {
                // if (err1) throw err1
                if (err1) return res.status(500).send(err1)
                return res.status(200).send(result1)
            })
        })
    },


    // =======================
    // GET HISTORY TRANSACTION
    // =======================
    getHistory: (req, res) => {
        let sql = `SELECT tr.*, 
                        tk.namatoko, 
                        tk.alamat, 
                        u.phone, 
                        p.namaproduk, 
                        p.harganormal, 
                        p.diskon, 
                        p.kuota,
                        p.terjual,
                        i.image
                    FROM transaction tr
                    LEFT JOIN toko tk ON tr.idtoko = tk.usertokoid 
                    LEFT JOIN produk p ON tr.idproduk = p.id
                    LEFT JOIN user u ON tr.idtoko = u.id
                    LEFT JOIN images i ON tr.idproduk=i.idproduk WHERE tr.status IN ('CANCELED', 'FINISH')  AND i.cover=1 AND tr.iduser=${req.params.id}`

        mysql.query(sql, (err, result) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send(result)
        })
    },

    // =================
    // OVERTIME PAYMENT
    // =================
    overtimePayment: (req, res) => {
        let sql = `SELECT * FROM transaction WHERE tanggalexp < current_timestamp() AND iduser=${req.params.iduser} AND status="WAITING PAYMENT"`
        mysql.query(sql, (err, result) => {
            if (err) return res.status(500).send(err)
            // return res.status(200).send(result)

            /* --- jika ada tgl exp yang sudah lewat --- */
            if (result.length) {
                sql = `UPDATE transaction SET status='CANCELED' WHERE tanggalexp < current_timestamp()  AND status="WAITING PAYMENT" AND iduser=${req.params.iduser}`
                mysql.query(sql, (err2, result2) => {
                    if (err2) return res.status(500).send(err2)
                    // return res.status(200).send(result2)
                })
            }
            sql = `SELECT tr.*, 
                    tk.namatoko, 
                    tk.alamat, 
                    u.phone, 
                    p.namaproduk, 
                    p.harganormal, 
                    p.diskon, 
                    i.image
                FROM transaction tr
                LEFT JOIN toko tk ON tr.idtoko = tk.usertokoid 
                LEFT JOIN produk p ON tr.idproduk = p.id
                LEFT JOIN user u ON tr.idtoko = u.id
                LEFT JOIN images i ON tr.idproduk=i.idproduk WHERE tr.status='WAITING PAYMENT' AND i.cover=1  AND tr.iduser=${req.params.iduser} ORDER BY tr.idtransaction DESC`
            mysql.query(sql, (err3, result3) => {
                if (err3) throw err3
                return res.status(200).send(result3)
            })
        })
    },


    // ===============
    // CONFIRM PAYMENT
    // ===============
    confirmPayment: (req, res) => {
        try {
            const path = '/user/payment'
            const upload = uploader(path, 'IMGPAYMENT').fields([{ name: 'image' }])

            upload(req, res, err => {
                if (err) {
                    return res.status(500).json({ message: 'Upload gagal', error: err.message })
                }

                const { image } = req.files;
                const imagePath = image ? path + '/' + image[0].filename : null
                const data = JSON.parse(req.body.data)
                const confirmdata = {
                    idproduk: data.idproduk,
                    iduser: data.iduser,
                    totalharga: data.totalharga,
                    idtransaction: data.idtransaction
                }
                confirmdata.image = imagePath
                confirmdata.tanggalbayar = moment().format("YYYY-MM-DD HH:mm:ss")
                let expvoucher = moment().add(1, 'days').format("YYYY-MM-DD HH:mm:ss")
                let kodevoucher = Kodevoucher()

                confirmdata.status = 'FINISH'
                let idtransaction = parseInt(confirmdata.idtransaction)

                console.log('ini confirmdata', confirmdata)
                console.log('qty', data.qty);

                console.log('terjual total', data.terjual)

                /* --- insert into user payment --- */
                var sql = `INSERT INTO userpayment SET ? `;
                mysql.query(sql, confirmdata, (err, result) => {
                    if (err) return res.status(500).json({ message: "salah di insert payment", error: err.message })

                    /* --- insert idpayment and status on transaction --- */
                    console.log('insertid', result.insertId)
                    sql = `UPDATE transaction SET idpayment = ${result.insertId}, status = '${confirmdata.status}' WHERE idtransaction = ${idtransaction} `
                    mysql.query(sql, (err1, result1) => {
                        if (err1) return res.status(500).send(err1)
                        // console.log('disini')

                        sql = `INSERT INTO vouchers (kodevoucher, expvoucher, idpayment, status) VALUES ('${kodevoucher}', '${expvoucher}', ${result.insertId}, 'UNUSED')`
                        mysql.query(sql, (err2, reult2) => {
                            if (err2) return res.status(500).send(err2)

                            sql = `UPDATE produk SET terjual=${data.terjual} WHERE id=${confirmdata.idproduk}`
                            mysql.query(sql, (err4, result4) => {
                                if (err4) return res.status(500).send(err4)

                                /* --- select all from transaction selain on process --- */
                                sql = `SELECT
                                        tr.*,
                                        tk.namatoko,
                                        tk.alamat,
                                        u.phone,
                                        p.namaproduk,
                                        p.harganormal,
                                        p.diskon,
                                        i.image
                                    FROM transaction tr
                                    LEFT JOIN toko tk ON tr.idtoko = tk.usertokoid
                                    LEFT JOIN produk p ON tr.idproduk = p.id
                                    LEFT JOIN user u ON tr.idtoko = u.id
                                    LEFT JOIN images i ON tr.idproduk = i.idproduk WHERE tr.status = 'WAITING PAYMENT'  AND i.cover = 1 AND tr.iduser = ${ data.iduser} ORDER BY tr.idtransaction DESC`
                                mysql.query(sql, (err3, result3) => {
                                    if (err3) return res.status(500).send(err3)
                                    return res.status(200).send(result3)
                                })
                            })
                        })
                    })
                })
            })
        } catch (error) {
            console.log(error)
        }
    },

    // =====================
    // GET KUOTA DAN TERJUAL 
    // =====================
    getStock: (req, res) => {
        let sql = `SELECT p.id, p.kuota, p.terjual FROM produk p WHERE id=${req.params.idproduk}`
        mysql.query(sql, (err, result) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send(result)
        })
    }

}