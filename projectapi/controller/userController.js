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
        let sql = `UPDATE user SET ? WHERE WHERE id=${req.params.id}`
        mysql.query(sql, req.body, (err, result) => {
            if (err) return res.status(500).send(err)

            sql = `SELECT * FROM user WHERE id=${req.params.id}`
            mysql.query(sql, (err2, result2) => {
                if (err2) return res.status(500).send(err2)
                return res.status(200).send(result2)
            })
        })
    }

}