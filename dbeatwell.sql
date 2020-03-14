use eatwell;
SELECT * FROM eatwell.images;
SELECT * FROM eatwell.kategoriproduk;
SELECT * FROM eatwell.user;
SELECT * FROM eatwell.toko;
SELECT * FROM eatwell.detail;
SELECT * FROM eatwell.jadwaltoko;
SELECT * FROM eatwell.schedules;
SELECT * FROM eatwell.transaction;
SELECT * FROM eatwell.userpayment;
SELECT * FROM eatwell.vouchers;
SELECT * FROM eatwell.wishlist;
SELECT * FROM eatwell.produk;
SELECT 
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
LEFT JOIN images i ON p.id=i.idproduk WHERE i.cover=1 AND kp.namakategori='Aneka Ayam/Daging' ORDER BY p.id DESC;

SELECT t.idtransaction, t.kodetransaksi, t.status, t.tanggalpesan, t.tanggalexp, up.tanggalbayar, p.namaproduk, p.diskon, t.qty, t.totalharga
FROM transaction t LEFT JOIN produk p ON t.idproduk=p.id
LEFT JOIN userpayment up ON t.idpayment=up.id;

SELECT tr.*, 
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
LEFT JOIN images i ON tr.idproduk=i.idproduk WHERE tr.status IN ('CANCELED', 'FINISH')  AND i.cover=1 AND tr.iduser=17;

SELECT tr.*, 
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
LEFT JOIN images i ON tr.idproduk=i.idproduk WHERE tr.status='WAITING PAYMENT' AND i.cover=1  AND tr.iduser=12 ORDER BY tr.idtransaction DESC;

SELECT 
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
LEFT JOIN images i ON p.id=i.idproduk WHERE i.cover=1  ORDER BY p.id DESC;



UPDATE voucher SET status="EXPIRED" WHERE status="BELUM DIGUNAKAN" AND expvoucher < '2020-03-05 21:46:13';

-- 2020-03-11 22:35:38
SELECT * FROM vouchers where kodevoucher = 'c6Cwxo9raD';
UPDATE vouchers SET status = 'SUDAH DIPAKAI' WHERE id=17;

SELECT
	tr.*,
    up.image as imgpayment,
    up.tanggalbayar,
    v.kodevoucher,
    v.expvoucher,
	tk.namatoko,
    v.status as statusvoucher,
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
LEFT JOIN images i ON tr.idproduk = i.idproduk WHERE tr.status='FINISH' AND i.cover=1  AND tr.idtoko=2;

SELECT * FROM produk WHERE tanggalakhir < current_timestamp();

SELECT tr.*, tk.namatoko, tk.alamat, u.phone, p.namaproduk, p.harganormal, p.diskon, i.image
        FROM transaction tr
        LEFT JOIN toko tk ON tr.idtoko = tk.usertokoid 
        LEFT JOIN produk p ON tr.idproduk = p.id
        LEFT JOIN user u ON tr.idtoko = u.id
        LEFT JOIN images i ON tr.idproduk=i.idproduk WHERE tr.status='CANCELED'  AND i.cover=1  AND tr.iduser=1;
        
        SELECT tr.*, tk.namatoko, tk.alamat, u.phone, p.namaproduk, p.harganormal, p.diskon, i.image
        FROM transaction tr
        LEFT JOIN toko tk ON tr.idtoko = tk.usertokoid 
        LEFT JOIN produk p ON tr.idproduk = p.id
        LEFT JOIN user u ON tr.idtoko = u.id
        LEFT JOIN images i ON tr.idproduk=i.idproduk WHERE tr.status IN ('CANCELED', 'FINISH')  AND i.cover=1  AND tr.iduser=1;

SELECT tr.*, tk.namatoko, tk.alamat, u.phone, p.namaproduk, p.harganormal, p.diskon, i.image
FROM transaction tr
LEFT JOIN toko tk ON tr.idtoko = tk.usertokoid 
LEFT JOIN produk p ON tr.idproduk = p.id
LEFT JOIN user u ON tr.idtoko = u.id
LEFT JOIN images i ON tr.idproduk=i.idproduk WHERE tr.status IN ('WAITING PAYMENT', 'FINISH') AND i.cover=1  AND tr.iduser=1;

SELECT tr.*, tk.namatoko, tk.alamat, u.phone, p.namaproduk, p.harganormal, p.diskon, i.image
        FROM transaction tr
        LEFT JOIN toko tk ON tr.idtoko = tk.usertokoid 
        LEFT JOIN produk p ON tr.idproduk = p.id
        LEFT JOIN user u ON tr.idtoko = u.id
        LEFT JOIN images i ON tr.idproduk=i.idproduk WHERE tr.status='CANCELED' AND i.cover=1  AND tr.iduser=1;
        

UPDATE detail SET 
	takeaway='yes', 
	taxservice='yes', 
	refund='yes', 
	weekday='08:00 - 20:00', 
	weekend='12:00 - 20:00', 
	holiday='10:00 - 24:00'  
WHERE idtoko=6;

UPDATE `eatwell`.`detail` SET `takeaway` = 'no' WHERE (`id` = '10');

SELECT * FROM detail where idtoko=6;



SELECT 
		t.namatoko, 
		t.alamat, 
		d.idtoko, 
		d.taxservice,
		d.takeaway,
		d.refund,
		u.username,
		u.email,
		u.phone
	FROM toko t LEFT JOIN detail d  ON d.idtoko = t.usertokoid
	LEFT JOIN user u ON t.usertokoid = u.id
	WHERE d.idtoko=7;
                

SELECT 
	p.id, 
    p.namaproduk,
    i.idproduk,
    i.image 
FROM produk p LEFT JOIN images i ON p.id=i.idproduk;


SELECT 
	p.id, 
	p.namaproduk, 
	p.harganormal, 
	p.diskon, 
	p.tanggalmulai, 
	p.tanggalakhir, 
	p.kuota, 
	kp.namakategori,
    t.namatoko,
    t.alamat FROM 
produk p LEFT JOIN kategoriproduk kp ON p.idkategoriproduk = kp.id
LEFT JOIN toko t ON p.idtoko = t.usertokoid;

SELECT 
	p.id, 
	p.namaproduk, 
	p.harganormal, 
	p.diskon, 
	p.tanggalmulai, 
	p.tanggalakhir, 
	p.kuota, 
	kp.namakategori,
    t.namatoko,
    t.alamat,
    i.image FROM 
produk p LEFT JOIN kategoriproduk kp ON p.idkategoriproduk = kp.id
LEFT JOIN toko t ON p.idtoko = t.usertokoid
LEFT JOIN images i ON p.id=i.idproduk;

SELECT * FROM produk pro 
LEFT JOIN resto res ON pro.idresto=res.id
LEFT JOIN images im ON pro.id = im.idproduk 
LEFT JOIN kategoriproduk kp ON pro.idkategoriproduk = kp.id
WHERE res.id=5;

select * from produk where tanggalakhir > current_timestamp();

SELECT 
	p.id, 
	p.namaproduk, 
	p.harganormal, 
	p.diskon, 
	p.tanggalmulai, 
	p.tanggalakhir, 
	p.kuota, 
	kp.namakategori,
	t.namatoko,
	t.alamat,
	i.image FROM 
produk p LEFT JOIN kategoriproduk kp ON p.idkategoriproduk = kp.id
LEFT JOIN toko t ON p.idtoko = t.usertokoid
LEFT JOIN images i ON p.id=i.idproduk WHERE i.cover=1;

SELECT 
	p.id, 
	p.namaproduk, 
	p.harganormal, 
	p.diskon, 
	p.tanggalmulai, 
	p.tanggalakhir, 
	p.kuota, 
	kp.namakategori,
	t.namatoko,
	t.alamat FROM 
produk p LEFT JOIN kategoriproduk kp ON p.idkategoriproduk = kp.id
LEFT JOIN toko t ON p.idtoko = t.usertokoid WHERE p.id=1;


SELECT * FROM eatwell.days;
SELECT * FROM eatwell.jadwaltoko;
SELECT * FROM eatwell.schedules;
SELECT * FROM eatwell.detail;

SELECT t.namatoko, t.alamat, d.idtoko, d.harilibur, d.taxservice,d.takeaway, d.refund, u.username, u.email, u.phone
FROM toko t LEFT JOIN detail d  ON d.idtoko = t.usertokoid
LEFT JOIN user u ON t.usertokoid = u.id
WHERE d.idtoko=5;

SELECT j.id, j.tokoid, s.schedule, d.day
FROM jadwaltoko j LEFT JOIN schedules s on j.idschedule = s.id
LEFT JOIN days d on j.idday = d.id 
LEFT JOIN toko t on j.tokoid = t.usertokoid where j.tokoid=2 AND d.day="weekday";

SELECT j.id, j.tokoid, s.schedule, d.day
FROM jadwaltoko j LEFT JOIN schedules s on j.idschedule = s.id
LEFT JOIN days d on j.idday = d.id 
LEFT JOIN toko t on j.tokoid = t.usertokoid where j.tokoid=2 AND d.day="weekend";

SELECT j.id, j.tokoid, s.schedule, d.day
FROM jadwaltoko j LEFT JOIN schedules s on j.idschedule = s.id
LEFT JOIN days d on j.idday = d.id 
LEFT JOIN toko t on j.tokoid = t.usertokoid where j.tokoid=2 AND d.day="holiday";

SELECT j.id, j.tokoid, t.namatoko, s.schedule, d.day
FROM jadwaltoko j LEFT JOIN schedules s on j.idschedule = s.id
LEFT JOIN days d on j.idday = d.id 
LEFT JOIN toko t on j.tokoid = t.usertokoid;

SELECT j.id, j.tokoid, t.namatoko, s.schedule, d.day, de.taxservice, de.refund
FROM jadwaltoko j LEFT JOIN schedules s on j.idschedule = s.id
LEFT JOIN days d on j.idday = d.id 
LEFT JOIN toko t on j.tokoid = t.usertokoid
LEFT JOIN detail de on de.idtoko = j.tokoid;


