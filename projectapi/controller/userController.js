const { mysql } = require('../connection')
const transporter = require('../helper/mailer')

module.exports = {

    // ===================
    // GET PROFILE PEMBELI
    // ===================
    getProfileUser: (req, res) => {
        let sql = `SELECT * FROM user WHERE id=${req.params.id}`
        mysql.query(sql, (err, result) => {
            if (err) return res.status(500).send(err)

            return res.status(200).send(result)
        })
    },

    // =========
    // EDIT USER
    // =========
    editUser: (req, res) => {
        const { username } = req.body
        let sql = `SELECT * FROM user WHERE username='${username}'`
        mysql.query(sql, (err, result) => {
            if (err) return res.status(500).send(err)

            console.log('sat')
            if (result.length === 1 && result[0].id !== Number(req.params.id)) {
                return res.status(200).send({ status: 'editUserFailed', message: 'Sorry account has been taken' })
            }

            sql = `UPDATE user SET ? WHERE id=${req.params.id}`
            mysql.query(sql, req.body, (err1, result1) => {
                if (err1) return res.status(500).send(err1)

                console.log(result1)
                sql = `SELECT * FROM user WHERE id=${req.params.id}`
                mysql.query(sql, (err2, result2) => {
                    if (err2) return res.status(500).send(err2)

                    return res.status(200).send(result2)
                })

            })

        })
    },

    // ============
    // EDIT EMAIL
    // ============
    editEmail: (req, res) => {
        const { username, email } = req.body
        let sql = `SELECT * FROM user WHERE username='${username}'`
        mysql.query(sql, (err, result) => {
            if (err) return res.status(500).send(err)
            // return res.status(200).send(result)

            var LinkVerifikasi = `http://localhost:3000/newverified?username=${username}&email=${email}`
            var mailoptions = {
                from: 'eatwell <tikasilalahi.test@gmail.com>',
                to: email,
                subject: `verifikasi email baru anda di eatwell`,
                html: `klik link ini untuk verifikasi :
                                <a href=${LinkVerifikasi} >Verifikasi email baru</a>`
            }
            transporter.sendMail(mailoptions, (err2, res1) => {
                if (err2) {
                    console.log(err2)
                    // return res.status(500).send({ err2 })
                    throw err
                }
                console.log(`success regist user`)
                return res.status(200).send({ username, email, id: result.id })
            })
        })
    },

    verifyNewEmail: (req, res) => {
        const { username, email } = req.body
        let sql = `SELECT * FROM user WHERE username='${username}'`
        mysql.query(sql, (err, result) => {
            if (err) return res.status(500).send(err)
            sql = `UPDATE user SET email = '${email}' WHERE username='${username}'`
            mysql.query(sql, (err1, result1) => {
                if (err1) throw err1

                console.log(result1)
                sql = `SELECT * FROM user WHERE username='${username}'`
                mysql.query(sql, (err3, result2) => {
                    if (err3) return res.status(500).send(err3)
                    return res.status(200).send(result2)
                })

            })

        })
    }

}