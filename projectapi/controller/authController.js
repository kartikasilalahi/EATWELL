const cryptogenerate = require('../helper/encrypt')
const { mysql } = require('../connection')
const fs = require('fs')
const transporter = require('../helper/mailer')
const { createJWTToken } = require('./../helper/jwt')

module.exports = {

    crypto: (req, res) => {
        console.log(req.query)
        const hashpassword = cryptogenerate(req.query.password)
        res.send({ encryptan: hashpassword, panjangencrypt: hashpassword.length })
    },

    // =======================
    // LOGIN PEMEBELI DAN TOKO
    // =======================
    login: (req, res) => {
        const { id } = req.params
        const { username, password } = req.query

        if (username || password) {
            // console.log('ini user login ', username)
            var hashpassword = cryptogenerate(password)
            var sql = `SELECT * FROM user WHERE username='${username}' AND password='${hashpassword}'`
            mysql.query(sql, (err, result) => {
                // if (err) res.status(500).send({ status: 'error', err })
                if (err) res.status(500).send({ err })

                if (result[0] !== undefined) {
                    if (result[0].status === "verified") {
                        console.log('ver')
                        // console.log(result[0].roleid)
                        let token = createJWTToken({ id: result[0].id, username: result[0].username, email: result[0].email })
                        res.send({
                            status: "LOGIN_SUCCESS",
                            result: { username, roleid: result[0].roleid, id: result[0].id, phone: result[0].phone, email: result[0].email },
                            token,
                            id: result[0].id
                        })
                    }
                    else {
                        console.log('unver')
                        res.status(200).send({ status: "LOGIN_ERROR", message: "your account not verified" })
                    }
                }
                else {
                    console.log('incorect')
                    res.status(200).send({ status: "LOGIN_ERROR", message: "username or password incorrect" })
                }
            })
        } else
            if (id) {
                // ----------- ini buat keeplogin
                var sql = `SELECT * FROM user WHERE id=${id}`
                mysql.query(sql, (err, result) => {
                    if (err) res.status(500).send({ status: 'error', err })

                    // console.log("re-login")
                    // console.log('ini user re-login ', result[0].username)
                    let token = createJWTToken({ id: result[0].id, username: result[0].username })
                    res.send({
                        result: { username: result[0].username, roleid: result[0].roleid, id: result[0].id, phone: result[0].phone, email: result[0].email },
                        token,
                        id: result[0].id
                    })

                })
            } else {
                console.log('koosng')
                res.status(200).send({ status: "ERROR_LOGIN", message: "Field can't be empty" })
            }
    },

    // ================
    // VERIFIKASI EMAIL
    // ================
    emailverifikasi: (req, res) => {
        var { username, password } = req.body
        var sql = `SELECT * FROM user WHERE username='${username}'`
        mysql.query(sql, (err, results) => {
            if (err) return res.status(500).send({ status: 'error', err })

            if (results.length === 0) {
                return res.status(500).send({ status: 'error', err1: 'user not found' })
            }
            sql = `UPDATE user SET status='verified' WHERE username='${username}' AND password='${password}'`
            mysql.query(sql, (err, results2) => {
                if (err) {
                    return res.status(500).send({ status: 'error', err })
                }
                return res.status(200).send({
                    username: results[0].username,
                    status: 'verified'
                })
            })
        })
    },

    // ================
    // REGISTER PEMBELI
    // ================
    registerPembeli: (req, res) => {
        var { username, email, phone, password } = req.body

        var sql = `SELECT * FROM user WHERE username='${username}'`
        mysql.query(sql, (err, results) => {
            if (err) return res.status(500).send({ err })

            if (results.length > 0) {
                return res.status(200).send({ status: 'REGISTER_PEMBELI_ERROR', message: 'Account has been taken' })
            } else {
                var hashpassword = cryptogenerate(password)
                var dataUser = {
                    username,
                    password: hashpassword,
                    email,
                    phone,
                    status: 'unverified',
                    roleid: 1
                    // lastlogin: new Date(),
                }
                sql = `INSERT INTO user SET ?`
                mysql.query(sql, dataUser, (err1, res1) => {
                    if (err1) return res.status(500).send({ err })
                    console.log('ini id pembeli yg baru regist', res1.insertId)

                    var LinkVerifikasi = `http://localhost:3000/verified?username=${username}&password=${hashpassword}`
                    var mailoptions = {
                        from: 'eatwell <tikasilalahi.test@gmail.com>',
                        to: email,
                        subject: `verifikasi email anda di eatwell`,
                        html: `klik link ini untuk verifikasi :
                                <a href=${LinkVerifikasi}>Join to Eatwell</a>`
                    }

                    transporter.sendMail(mailoptions, (err2, res2) => {
                        if (err2) {
                            console.log(err2)
                            return res.status(500).send({ err2 })
                        }
                        console.log(`success regist user`)
                        return res.status(200).send({ username, email, status: 'unverified' })
                    })
                })
            }
        })
    },

    // =============
    // REGISTER TOKO
    // =============
    registerToko: (req, res) => {
        var { namatoko, username, email, alamat, phone, password, confpassword } = req.body
        var sql = `SELECT * FROM user WHERE username='${username}'`
        mysql.query(sql, (err, results) => {
            if (err) return res.status(500).send({ err })

            if (results.length > 0) {
                return res.status(200).send({ status: 'REGISTER_TOKO_ERROR', message: 'Account has been taken' })
            } else {
                var hashpassword = cryptogenerate(password)
                var dataUser = {
                    username,
                    password: hashpassword,
                    email,
                    phone,
                    status: 'unverified',
                    roleid: 2
                }
                sql = `INSERT INTO user SET ?`
                mysql.query(sql, dataUser, (err1, res1) => {
                    if (err1) return res.status(500).send({ err1 })
                    console.log('ini id toko yg baru regist', res1.insertId)
                    // console.log(res1)
                    var dataToko = {
                        alamat,
                        namatoko,
                        usertokoid: res1.insertId
                    }

                    sql = `INSERT INTO toko SET ? `
                    mysql.query(sql, dataToko, (err3, res3) => {
                        // console.log('masuk insert toko')
                        if (err1) return res.status(500).send({ err3 })
                        // console.log(res3)
                        var LinkVerifikasi = `http://localhost:3000/verified?username=${username}&password=${hashpassword}`

                        var mailoptions = {
                            from: 'eatwell <tikasilalahi.test@gmail.com>',
                            to: email,
                            subject: `verifikasi  email anda di eatwell`,
                            html: `klik link ini untuk verifikasi :
                                    <a href=${LinkVerifikasi}>Join to Eatwell</a>`
                        }
                        transporter.sendMail(mailoptions, (err2, res2) => {
                            if (err2) {
                                console.log(err2)
                                return res.status(500).send({ err2 })
                            }
                            return res.status(200).send({ username, email, status: 'unverified' })
                            // return res.status(200).send(res1)
                        })

                        var detailToko = {
                            idtoko: res1.insertId
                        }
                        sql = `INSERT INTO detail SET ?`
                        mysql.query(sql, detailToko, (err4, res4) => {
                            if (err1) return res.status(500).send(err4)
                            console.log(res4);

                        })
                    })
                })
            }
        })
    },
}











































    // resendEmailVer: (req, res) => {
    //     var { nama, email } = req.body
    //     var sql = `select username,password,email from users where username='${username}' and email='${email}'`
    //     mysql.query(sql, (err, result) => {
    //         if (err) return res.status(500).send({ status: 'error select user', err })
    //         if (result.length === 0) {
    //             return res.status(500).send({ status: 'error', err: 'user not found' })
    //         }
    //         var LinkVerifikasi = `http://localhost:3000/verified?username=${result[0].username}&password=${result[0].password}`
    //         var mailoptions = {
    //             from: 'Eatwell <tikasilalahi.test@gmail.com>',
    //             to: result[0].email,
    //             subject: `verifikasi ulang Email Anda`,
    //             html: `klik kembali link ini untuk verifikasi :
    //                     <a href=${LinkVerifikasi}>Join to Eatwell</a>`
    //         }
    //         transporter.sendMail(mailoptions, (err2, res2) => {
    //             if (err2) {
    //                 console.log(err2)
    //                 return res.status(500).send({ status: 'error', err: err2 })
    //             }
    //             console.log(`success ver`)
    //             // return res.status(200).send({ username, email, status: 'unverified' })
    //             return res.status(200).send({ message: 'berhasil' })

    //         })
    //     })
    // },




