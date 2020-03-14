const { mysql } = require('../connection')
var moment = require('moment')

module.exports = {
    getTransaksi: (req, res) => {
        let sql = `SELECT
                        tr.*,
                        up.image as imgpayment,
                        up.tanggalbayar,
                        v.kodevoucher,
                        v.expvoucher,
                        v.status as statusvoucher,
                        tk.namatoko, 
                        tk.alamat, 
                        u.phone,
                        us.username as pembeli,
                        p.namaproduk, 
                        p.harganormal, 
                        p.diskon, 
                        p.kuota,
                        p.terjual,
                        i.image
                    FROM transaction tr
                    LEFT JOIN userpayment up ON tr.idpayment = up.id
                    LEFT JOIN vouchers v ON v.idpayment=up.id
                    LEFT JOIN toko tk ON tr.idtoko = tk.usertokoid
                    LEFT JOIN produk p ON tr.idproduk = p.id
                    LEFT JOIN user us ON tr.iduser= us.id
                    LEFT JOIN user u ON tr.idtoko = u.id
                    LEFT JOIN images i ON tr.idproduk = i.idproduk WHERE tr.status='FINISH' AND i.cover=1  AND tr.idtoko=${req.params.id}`

        mysql.query(sql, (err, result) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send(result)
        })
    },


    // ===============
    // EXPIRED VOUCHER 
    // ===============
    expiredVoucher: (req, res) => {
        let now = moment().format("YYYY-MM-DD HH:mm:ss")
        let sql = `SELECT * FROM vouchers WHERE status="UNUSED" AND expvoucher < '${now}' `
        mysql.query(sql, (err, result) => {
            if (err) return res.status(500).send(err)
            // return res.status(200).send(result)
            sql = `UPDATE vouchers SET status="EXPIRED" WHERE status="UNUSED" AND expvoucher < '${now}'`
            mysql.query(sql, (err1, result1) => {
                if (err1) return res.status(500).send(err1)
                return res.status(200).send(result1)
            })
        })
    },


    // ===========
    // USE VOUCHER
    // ===========
    useVoucher: (req, res) => {
        let { kodevoucher } = req.body
        // console.log(req.body)
        let sql = `SELECT * FROM vouchers WHERE kodevoucher = '${kodevoucher}'`
        mysql.query(sql, (err, result) => {
            if (err) return res.status(500).send(err)
            // console.log('ID', result[0].id)
            sql = `UPDATE vouchers SET status = 'USED' WHERE id=${result[0].id}`
            mysql.query(sql, (err1, result1) => {
                if (err1) return res.status(500).send(err1)

                sql = `SELECT
                        tr.*,
                        up.image as imgpayment,
                        up.tanggalbayar,
                        v.kodevoucher,
                        v.expvoucher,
                        v.status as statusvoucher,
                        tk.namatoko, 
                        tk.alamat, 
                        u.phone,
                        us.username as pembeli,
                        p.namaproduk, 
                        p.harganormal, 
                        p.diskon, 
                        p.kuota,
                        p.terjual,
                        i.image
                    FROM transaction tr
                    LEFT JOIN userpayment up ON tr.idpayment = up.id
                    LEFT JOIN vouchers v ON v.idpayment=up.id
                    LEFT JOIN toko tk ON tr.idtoko = tk.usertokoid
                    LEFT JOIN produk p ON tr.idproduk = p.id
                    LEFT JOIN user us ON tr.iduser= us.id
                    LEFT JOIN user u ON tr.idtoko = u.id
                    LEFT JOIN images i ON tr.idproduk = i.idproduk WHERE tr.status='FINISH' AND i.cover=1  AND tr.idtoko=${req.params.id}`

                mysql.query(sql, (err2, result2) => {
                    if (err2) return res.status(500).send(err2)
                    return res.status(200).send(result2)
                })
            })
        })
    }
}