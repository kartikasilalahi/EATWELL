const { mysql } = require('../connection')
var moment = require('moment')
var Kodetransaksi = require('../helper/kodetransaksi')
var Kodevoucher = require('../helper/kodevoucher')
const { uploader } = require('../helper/uploader')
const transporter = require('../helper/mailer')
const Numeral = require('numeral')

module.exports = {

    // =============
    // GET ALL USERS
    // =============
    getUser: (req, res) => {
        let sql = `SELECT u.username, u.email, u.phone, u.status FROM user u where roleid=1`
        mysql.query(sql, (err, result) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send(result)
        })
    },


    // ====================
    // GET ALL RESTAURANT
    // ====================
    getResto: (req, res) => {
        let sql = `SELECT u.username, 
                        u.email,
                        u.phone, 
                        u.status, 
                        t.namatoko, 
                        t.alamat, 
                        d.weekday, 
                        d.weekend, 
                        d.refund, 
                        d.taxservice,
                        d.takeaway 
                    FROM user u
                    LEFT JOIN toko t ON u.id = t.usertokoid
                    LEFT JOIN detail d on u.id = d.idtoko
                    where u.roleid=2`
        mysql.query(sql, (err, result) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send(result)
        })
    },


    // ====================
    // GET ALL TRANSACTION
    // ====================
    getAllTransaction: (req, res) => {
        let sql = `SELECT t.idtransaction, t.kodetransaksi, t.status, t.tanggalpesan, t.tanggalexp, up.tanggalbayar, p.namaproduk, p.diskon, t.qty, t.totalharga
        FROM transaction t LEFT JOIN produk p ON t.idproduk=p.id
        LEFT JOIN userpayment up ON t.idpayment=up.id;`
        mysql.query(sql, (err, result) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send(result)
        })
    },

    // ================
    // ADD NEW CATEGORY
    // ================
    addNewCategory: (req, res) => {
        let sql = `INSERT INTO kategoriproduk (namakategori) VALUES ('${req.body.newCategory}')`
        mysql.query(sql, (err, result) => {
            if (err) return res.status(500).send(err)
            sql = `SELECT * FROM kategoriproduk WHERE namakategori != 'Lainnya..' ORDER BY namakategori `
            mysql.query(sql, (err1, result1) => {
                if (err1) return res.status(500).send(err1);
                let category = result1.sort()
                sql = `SELECT * FROM kategoriproduk WHERE namakategori = 'Lainnya..'`
                mysql.query(sql, (err2, result2) => {
                    if (err2) return res.status(500).send(err2)
                    let lastcategory = result2[0]
                    category.push(lastcategory)
                    return res.status(200).send(category)
                })
            })
        })
    },

    // =================
    // ADD NEW SCHEDULE
    // =================
    addNewSchedule: (req, res) => {
        let sql = `INSERT INTO schedules (schedule) VALUES ('${req.body.newSchedule}')`
        mysql.query(sql, (err, result) => {
            if (err) return res.status(500).send(err)
            sql = `SELECT * FROM schedules ORDER BY schedule `
            mysql.query(sql, (err1, result1) => {
                if (err1) return res.status(500).send(err1);
                res.status(200).send(result1)
            })
        })
    }
}