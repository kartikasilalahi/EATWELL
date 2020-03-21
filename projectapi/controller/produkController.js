const { mysql } = require('../connection')
const fs = require('fs')
const { uploader } = require('../helper/uploader')
const moment = require('moment')

module.exports = {
    // ===============
    // GET PRODUK ALL
    // ===============
    getProduk: (req, res) => {
        let now = moment().format("YYYY-MM-DD")
        let sql = `SELECT 
                    p.id, 
                    p.namaproduk, 
                    p.harganormal, 
                    p.diskon,  
                    p.kuota,
                    p.terjual,
                    kp.namakategori,
                    t.namatoko,
                    i.image FROM 
                produk p LEFT JOIN kategoriproduk kp ON p.idkategoriproduk = kp.id
                LEFT JOIN toko t ON p.idtoko = t.usertokoid
                LEFT JOIN images i ON p.id=i.idproduk WHERE i.cover=1 AND tanggalakhir > '${now}' AND tanggalmulai <= '${now}' ORDER BY p.id DESC`
        mysql.query(sql, (err, result) => {
            if (err) return res.status(500).send(err);

            mysql.query(`SELECT max(harganormal-(harganormal*diskon/100)*2) as maxprice FROM produk`, (err1, res1) => {
                if (err1) return res.status(500).send(err1);
                return res.status(200).send({ dataproduk: result, max: res1 }); // ==== dataproduk DISINI  HARUS SAMA di front end ===== 
            })

        })
    },


    // ==============
    // EXPIRED PRODUK
    // ==============
    getEXpProduk: (req, res) => {
        let now = moment().format("YYYY-MM-DD")
        console.log(now)
        let sql = `SELECT * FROM produk`
        mysql.query(sql, (err, result) => {
            if (err) return res.status(500).send(err);
            console.log(result)
            sql = `UPDATE produk SET expired='YES' WHERE tanggalakhir < '${now}' AND idtoko=${req.params.idtoko}'`
            mysql.query(sql, (err1, result1) => {
                if (err1) return res.status(500).send(err1);
                // if (err1) throw err1
            })
        })

    },


    // =================
    // GET PRODUK RESTO
    // =================
    getProdukResto: (req, res) => {
        let tokoid = req.params.id
        let sql = `SELECT * from produk WHERE idtoko=${tokoid}`
        mysql.query(sql, (err, result) => {
            if (err) throw err
            res.status(200).send(result)
        })
    },


    // =======================
    // GET IMAGE PRODUK RESTO
    // =======================
    getImageProdukResto: (req, res) => {
        let { idproduk } = req.params
        let sql = `SELECT * FROM images WHERE idproduk=${idproduk}`
        mysql.query(sql, (err, result) => {
            if (err) return err
            res.status(200).send(result)
        })
    },


    // ===================
    // GET KATEGORI PRODUK
    // ===================
    getKategoriProduk: (req, res) => {
        let sql = `SELECT * FROM kategoriproduk WHERE namakategori != 'Lainnya..' ORDER BY namakategori `
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
    },


    // ===============
    // DETAIL PRODUCT
    // ===============
    getDetailProduk: (req, res) => {
        let { idproduk } = req.params
        let sql = `SELECT 
            p.id, 
            p.namaproduk, 
            p.harganormal, 
            p.diskon, 
            p.tanggalmulai, 
            p.tanggalakhir, 
            p.kuota, 
            p.terjual,
            p.maxbeli,
            kp.namakategori,
            t.namatoko,
            t.usertokoid,
            t.alamat FROM 
        produk p LEFT JOIN kategoriproduk kp ON p.idkategoriproduk = kp.id
        LEFT JOIN toko t ON p.idtoko = t.usertokoid WHERE p.id=${idproduk}`
        mysql.query(sql, (err, result) => {
            if (err) res.status(500).send(err);
            res.status(200).send(result)
        })
    },


    // =================
    // ADD PRODUK RESTO
    // =================
    addProdukResto: (req, res) => {
        try {
            const path = '/toko/produk'
            const upload = uploader(path, 'IMAGEPRODUK').fields([{ name: 'image' }])

            upload(req, res, err => {
                if (err) return res.status(500).json({ message: 'Upload gagal', error: err.message })

                /* ------- foto baru telah terupload ------- */
                // console.log('masuk upload')
                const { image } = req.files;
                // console.log('ini img', image)

                const data = JSON.parse(req.body.data)
                // console.log('id toko', data)

                /* ------- masuk post dataproduk ------- */
                let sql = `INSERT INTO produk SET ?`
                mysql.query(sql, data, (err, result) => {
                    if (err) res.status(500).send(err)

                    console.log(result);

                    let dataImages = []
                    image.forEach((val, i) => {
                        if (i === 0) {
                            dataImages.push([result.insertId, (path + '/' + val.filename), 1])
                        } else {
                            dataImages.push([result.insertId, (path + '/' + val.filename), 0])
                        }
                    })
                    // console.log('ini data img', dataImages)

                    /* ------- masuk insert images ke tabel ------- */
                    sql = `INSERT INTO images (idproduk, image, cover) VALUES ? `
                    mysql.query(sql, [dataImages], (err1, result1) => {
                        if (err1) res.status(500).json({ message: 'gagal di insert img', error: err1.message })

                        /* ------- select produk toko/resto ------- */
                        sql = `SELECT * FROM produk WHERE idtoko=${data.idtoko}`
                        mysql.query(sql, (err2, result2) => {
                            if (err) res.status(500).json({ message: 'gagal di select', error: err2.message })
                            res.status(200).send(result2)
                        })
                    })
                })
            })
        } catch (error) {
            console.log("errornya", error)
        }
    },


    // ====================
    // DELETE PRODUK RESTO
    // ====================
    deleteProdukResto: (req, res) => {
        let sql = `DELETE FROM produk WHERE id=${req.params.id}`
        mysql.query(sql, (err, result) => {
            if (err) res.status(500).send(err);
            sql = `DELETE  FROM images WHERE idproduk=${req.params.id}`
            mysql.query(sql, (err1, res1) => {
                if (err1) res.status(500).send(err1);
                res.status(200).send(result)
            })
        })
    },


    // =========================
    // DELETE IMAGE PRODUK RESTO
    // =========================
    deleteImgProdresto: (req, res) => {
        let sql = `SELECT * FROM images WHERE id=${req.params.id}`
        mysql.query(sql, (err, result) => {
            if (err) return res.status(500).send(err);
            // console.log(result[0].image)
            console.log(req.body)
            sql = `DELETE FROM images WHERE id=${req.params.id}`
            mysql.query(sql, (err2, result2) => {
                if (err2) return res.status(500).send(err2)
                if (result2) {
                    fs.unlinkSync('./public' + result[0].image);
                    console.log('sinii')
                }
                sql = `SELECT * FROM images WHERE id=${req.params.id}`
                mysql.query(sql, (err2, result2) => {
                    if (err2) throw err2
                    res.status(200).send(result2)
                })
            })
        })
    },


    // ==================
    // EDIT PRODUK RESTO
    // ==================
    editProdukResto: (req, res) => {
        let sql = `UPDATE produk SET ? WHERE id=${req.params.idproduk}`
        console.log(req.params.idproduk)
        console.log(req.body)
        mysql.query(sql, req.body, (err, result) => {
            if (err) return res.status(500).json({ message: "Ada salah query update", error: err.message })
            console.log(req.body)
            sql = `SELECT * FROM produk WHERE idtoko=${req.body.idtoko}`
            mysql.query(sql, (err2, result2) => {
                if (err2) throw err2
                res.status(200).send(result2)
            })
        })
    },


    // =======================
    // EDIT IMAGE PRODUK RESTO
    // =======================
    editImageProdukResto: (req, res) => {
        let sql = `SELECT * FROM images WHERE id=${req.params.idimage}`
        mysql.query(sql, (err, results) => {
            if (err) throw err
            // console.log('ini results', results)
            if (results.length) {
                const path = '/toko/produk'
                const upload = uploader(path, 'IMAGEPRODUK').fields([{ name: 'image' }])

                upload(req, res, (err) => {
                    if (err) {
                        return res.status(500).json({ message: 'Upload gagal', error: err.message })
                    }
                    const data = JSON.parse(req.body.data)
                    console.log(data)
                    const { image } = req.files;
                    const imagePath = image ? path + '/' + image[0].filename : null

                    try {
                        console
                        sql = `UPDATE images SET image='${imagePath}' WHERE id=${req.params.idimage}`
                        mysql.query(sql, (err, result) => {
                            if (err) {
                                console.log('salah query')
                                if (imagePath) {
                                    fs.unlinkSync('./public' + imagePath);
                                }
                                return res.status(500).json({ message: "There's an error on the server..", error: err.message });
                            }

                            if (imagePath) {  // jika berhasil, hapus foto yg lama
                                // console.log('benar query')
                                if (results[0].image) {
                                    fs.unlinkSync('./public' + results[0].image);
                                }
                                sql = `SELECT * FROM produk WHERE idtoko=${data.idtoko}`
                                mysql.query(sql, (err, result) => {
                                    if (err) return err
                                    res.status(200).send(result)
                                })
                            }
                        })
                    } catch (err) {
                        return res.status(500).json({ message: "There's an error on the server.", error: err.message });
                    }
                })
            }
        })
    },


    // =====================
    // GET DETAIL TOKO/RESTO
    // =====================
    getDetailResto: (req, res) => {
        let tokoid = req.params.id
        let sql = `SELECT 
                    t.namatoko, 
                    t.alamat, 
                    d.idtoko, 
                    d.taxservice,
                    d.takeaway,
                    d.refund,
                    d.weekend,
                    d.weekday,
                    d.holiday,
                    u.phone
                FROM toko t LEFT JOIN detail d  ON d.idtoko = t.usertokoid
                LEFT JOIN user u ON t.usertokoid = u.id
                WHERE d.idtoko=${tokoid}`
        mysql.query(sql, (err, result) => {
            if (err) res.status(500).send(err);
            res.status(200).send(result)
        })
    },


    // ============
    // GET SCHEDULE
    // ============
    getSchedule: (req, res) => {
        let sql = `SELECT * FROM schedules ORDER BY schedule`
        mysql.query(sql, (err, result) => {
            if (err) res.status(500).send(err);
            res.status(200).send(result)
        })
    },


    // ===================
    // EDIT PROFILE RESTO
    // ===================
    editProfileResto: (req, res) => {
        let { idtoko, takeaway, taxservice, refund, weekday, weekend, holiday } = req.body

        /* ------ update di tabel detail ------ */
        let sql = `UPDATE detail SET 
                    takeaway='${takeaway}', 
                    taxservice='${taxservice}', 
                    refund='${refund}', 
                    weekday='${weekday}', 
                    weekend='${weekend}', 
                    holiday='${holiday}'  
                WHERE idtoko=${idtoko}`

        mysql.query(sql, (err, result) => {
            if (err) return res.status(500).json({ message: " update detail", error: err.message })
            console.log('yaa')

            /* ------ update di tabel toko ------ */
            let { namatoko, alamat } = req.body
            sql = `UPDATE toko SET namatoko = '${namatoko}', alamat = '${alamat}' WHERE usertokoid=${req.params.id}`
            console.log(sql)
            mysql.query(sql, (err1, result1) => {
                if (err) return res.status(500).json({ message: " update toko", error: err1.message })

                /* ------ update di tabel user ------ */
                let phone = req.body.phone
                sql = `UPDATE user SET phone='${phone}' WHERE id=${req.params.id}`
                mysql.query(sql, (err2, result2) => {
                    console.log(sql)
                    if (err) return res.status(500).json({ message: " update user", error: err2.message })
                    console.log('yes')
                    console.log(result2)

                    sql = `SELECT  t.namatoko, t.alamat,  
                                    d.idtoko,  d.taxservice, 
                                    d.takeaway, d.refund, 
                                    d.weekend, d.weekday, 
                                    d.holiday, u.phone
                        FROM toko t LEFT JOIN detail d  ON d.idtoko = t.usertokoid
                        LEFT JOIN user u ON t.usertokoid = u.id
                        WHERE d.idtoko=${req.params.id}`
                    mysql.query(sql, (err3, result3) => {
                        if (err) res.status(500).send(err3);
                        res.status(200).send(result3)
                    })
                })
            })
        })
    },


    // ===================
    // EDIT JADWAL RESTO
    // ===================
    editJadwalResto: (req, res) => {
        let sql = `INSERT INTO jadwaltoko SET ? `
        let jadwaltoko = req.body
        mysql.query(sql, jadwaltoko, (err, result) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send(result)
        })
    },


    // ===============
    // ADD TO WISHLIST
    // ===============
    addWishlist: (req, res) => {
        console.log(req.body)
        let sql = `INSERT INTO wishlist (idproduk, iduser) VALUES (${req.body.idproduk}, ${req.body.iduser})`
        mysql.query(sql, (err, result) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send(result)
        })
    },


    // ============
    // GET WISHLIST
    // ============
    getWishlist: (req, res) => {
        let sql = `SELECT w.id, 
                    w.idproduk,
                    p.namaproduk, 
                    p.harganormal, 
                    p.diskon,  
                    p.kuota, 
                    kp.namakategori, 
                    t.namatoko, 
                    i.image
            FROM wishlist w
            LEFT JOIN produk p ON w.idproduk=p.id 
            LEFT JOIN kategoriproduk kp ON p.idkategoriproduk = kp.id
            LEFT JOIN toko t ON p.idtoko = t.usertokoid
            LEFT JOIN images i ON p.id=i.idproduk 
            WHERE i.cover=1 AND w.iduser = ${req.params.id} ORDER BY p.id DESC`
        mysql.query(sql, (err, result) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send(result)
        })
    },


    // ==============
    // FILTER PRODUCT
    // ==============
    filterProduct: (req, res) => {
        let now = moment().format("YYYY-MM-DD")
        let sql = `SELECT 
                    p.id, 
                    p.namaproduk, 
                    p.harganormal, 
                    p.diskon,  
                    p.kuota,
                    p.terjual,
                    kp.namakategori,
                    t.namatoko,
                    i.image FROM 
                produk p LEFT JOIN kategoriproduk kp ON p.idkategoriproduk = kp.id
                LEFT JOIN toko t ON p.idtoko = t.usertokoid
                LEFT JOIN images i ON p.id=i.idproduk WHERE i.cover=1 AND tanggalakhir > '${now}' AND tanggalmulai <= '${now}' AND kp.id='${req.params.filterby}' ORDER BY p.id DESC`
        mysql.query(sql, (err, result) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send(result)
        })
    },


    // ==============
    // SEARCH PRODUCT
    // ==============
    searchProduct: (req, res) => {
        let now = moment().format("YYYY-MM-DD")
        let { keyword, page, category } = req.query
        var offset = (page * 12) - 12
        if (!page) {
            offset = 0
        }
        if (!keyword) {
            keyword = ''
        }
        let sql = `SELECT 
                    p.id, 
                    p.namaproduk, 
                    p.harganormal, 
                    p.diskon,  
                    p.kuota,
                    p.terjual,
                    kp.namakategori,
                    t.namatoko,
                    i.image FROM 
                produk p LEFT JOIN kategoriproduk kp ON p.idkategoriproduk = kp.id
                LEFT JOIN toko t ON p.idtoko = t.usertokoid
                LEFT JOIN images i ON p.id=i.idproduk WHERE  p.namaproduk LIKE '%${keyword}%' AND i.cover=1 AND tanggalakhir > '${now}' AND tanggalmulai <= '${now}' ORDER BY p.id DESC limit ${offset},12;`
        if (category !== 'All Category') {
            sql = `SELECT 
                    p.id, 
                    p.namaproduk, 
                    p.harganormal, 
                    p.diskon,  
                    p.kuota,
                    p.terjual,
                    kp.namakategori,
                    t.namatoko,
                    i.image FROM 
                produk p LEFT JOIN kategoriproduk kp ON p.idkategoriproduk = kp.id
                LEFT JOIN toko t ON p.idtoko = t.usertokoid
                LEFT JOIN images i ON p.id=i.idproduk WHERE kp.namakategori='${category}' AND p.namaproduk like '%${keyword}%' AND i.cover=1 AND tanggalakhir > '${now}' AND tanggalmulai <= '${now}'ORDER BY p.id DESC limit ${offset},12 ;`
        }

        mysql.query(sql, (err, result) => {
            if (err) return res.status(500).send(err)
            sql = `SELECT count(*) AS jumlah FROM produk WHERE namaproduk LIKE '%${keyword}%' AND tanggalakhir > '${now}' AND tanggalmulai <= '${now}'`
            if (category !== 'All Category') {
                sql = `SELECT count(*) AS jumlah 
                FROM produk p LEFT JOIN kategoriproduk kp ON p.idkategoriproduk = kp.id
                WHERE p.namaproduk LIKE '%${keyword}%' 
                AND kp.namakategori = '${category}'
                AND tanggalakhir > '${now}' 
                AND tanggalmulai <= '${now}'`
            }
            mysql.query(sql, (err1, result1) => {
                if (err1) return res.status(500).send(err1)
                return res.status(200).send({ produk: result, produklength: result.length, jumlahprod: result1[0] })
            })
        })
    },

    getProductbyPrice: (req, res) => {
        let now = moment().format("YYYY-MM-DD")
        let { min, max, range } = req.query
        console.log(min)
        console.log(max)
        if (range === true) {
            console.log('iniii');

            let sql = `SELECT 
                        p.id, 
                        p.namaproduk, 
                        p.harganormal, 
                        p.diskon, 
                        p.harganormal-(p.harganormal*p.diskon/100) as hargadisc,
                        p.kuota,
                        p.terjual,
                        kp.namakategori,
                        t.namatoko,
                        i.image FROM 
                    produk p LEFT JOIN kategoriproduk kp ON p.idkategoriproduk = kp.id
                    LEFT JOIN toko t ON p.idtoko = t.usertokoid
                    LEFT JOIN images i ON p.id=i.idproduk 
                    WHERE i.cover=1 AND tanggalakhir > '${now}' 
                    AND tanggalmulai <= '${now}' 
                    AND p.harganormal-(p.harganormal*p.diskon/100) between ${min} AND ${max} 
                    ORDER BY p.harganormal-(p.harganormal*p.diskon/100) ASC`
            mysql.query(sql, (err, result) => {
                if (err) return res.status(500).send(err)
                mysql.query(`SELECT max(harganormal-(harganormal*diskon/100)*2) as maxprice FROM produk`, (err1, res1) => {
                    if (err1) return res.status(500).send(err1);
                    return res.status(200).send({ dataproduk: result, max: res1 })
                })
            })
        } else {
            console.log('sininnn')
            sql = `SELECT 
                    p.id, 
                    p.namaproduk, 
                    p.harganormal, 
                    p.diskon,  
                    p.kuota,
                    p.terjual,
                    kp.namakategori,
                    t.namatoko,
                    i.image FROM 
                produk p LEFT JOIN kategoriproduk kp ON p.idkategoriproduk = kp.id
                LEFT JOIN toko t ON p.idtoko = t.usertokoid
                LEFT JOIN images i ON p.id=i.idproduk WHERE i.cover=1 AND tanggalakhir > '${now}' AND tanggalmulai <= '${now}' ORDER BY p.id DESC`
            mysql.query(sql, (err, result) => {
                if (err) return res.status(500).send(err);

                mysql.query(`SELECT max(harganormal-(harganormal*diskon/100)*2) as maxprice FROM produk`, (err1, res1) => {
                    if (err1) return res.status(500).send(err1);
                    return res.status(200).send({ dataproduk: result, max: res1 }); // ==== dataproduk DISINI  HARUS SAMA di front end ===== 
                })

            })
        }
    }
}
