import React, { useEffect, useState } from 'react'
import { Table, Input, ModalBody, } from 'reactstrap'
import moment from 'moment'
import Axios from 'axios'
import Numeral from 'numeral'
import Modaltemplate from '../../../components/modaltemplate'
import { APIURL, APIURLimagetoko } from '../../../helper/apiurl'
import Toast from 'light-toast'
import Tooltip from '@material-ui/core/Tooltip';


function Transaksi() {

    const [dataProduk, setdataProduk] = useState();
    const [detailProduk, setdetailProduk] = useState();
    const [searchfield, setsearchfield] = useState('');
    const [modalDetail, setmodalDetail] = useState(false);
    const toggle = () => { setmodalDetail(false) }

    // USE EFFECT
    // ==========
    useEffect(() => {
        let id = parseInt(localStorage.getItem('id'))
        Axios.get(`${APIURL}transaksiresto/expvoucher`)
            .then(result => {
                Axios.get(`${APIURL}transaksiresto/gettransaksiresto/${id}`)
                    .then(res => {
                        console.log('ini dataproduk', res.data)
                        setdataProduk(res.data)
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }, [])


    // RENDER TABEL TRANSAKSI
    // ======================
    const renderTabelTransaksi = () => {
        const filterVoucher = dataProduk.filter(val => {
            return val.kodevoucher.toLowerCase().includes(searchfield.toLowerCase())
        })
        console.log(filterVoucher)
        return filterVoucher.map((val, i) => {
            let kodevoucher = val.kodevoucher
            return (
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{moment(val.tanggalpesan).format("YYYY-MM-DD HH:mm:ss")}</td>
                    <td>{val.kodetransaksi}</td>
                    <td>{val.kodevoucher}</td>
                    <td>{val.statusvoucher}</td>
                    <td>{val.namaproduk}</td>
                    <td>
                        <Tooltip title="Detail" arrow placement="top">
                            <i className="fa fa-list iconlist"
                                onClick={
                                    () => {
                                        setdetailProduk(filterVoucher[i])
                                        setmodalDetail(true)
                                    }}
                            />
                        </Tooltip>
                        {
                            val.statusvoucher === "UNUSED" ?
                                <Tooltip title="Confirm Voucher" arrow placement="top">
                                    <i onClick={
                                        () => {
                                            Toast.loading('loading');
                                            setTimeout(() => {
                                                Axios.put(`${APIURL}transaksiresto/usevoucher/${val.idtoko}`, { kodevoucher })
                                                    .then(res => {
                                                        setdataProduk(res.data)
                                                    })
                                                    .catch(err => {
                                                        console.log(err);
                                                    })
                                                Toast.success('success.. voucher already used', 2000)
                                                Toast.hide();
                                            }, 3000);
                                        }
                                    } className="fa fa-check-square-o iconcheck" ></i>
                                </Tooltip> :
                                val.statusvoucher === "EXPIRED" ?
                                    <Tooltip title="Voucher Expired" arrow placement="top">
                                        <i className="fa fa-times iconcheck" style={{ color: 'crimson', fontWeight: 'bolder', cursor: 'text' }}></i>
                                    </Tooltip>
                                    :
                                    <Tooltip title="Voucher already used" arrow placement="top">
                                        <i className="fa fa-check-square-o iconcheck" style={{ color: 'green', fontWeight: 'bolder', cursor: 'text' }}></i>
                                    </Tooltip>
                        }
                    </td>
                </tr>
            )
        })
    }


    // RENDER DETAIL PRODUCT
    // ======================
    const renderDetailProduk = () => {
        const { namaproduk, tanggalpesan, tanggalbayar, kodetransaksi, kodevoucher, expvoucher, imgpayment, image, pembeli, qty, harganormal, totalharga, statusvoucher } = detailProduk
        let title = `${namaproduk} [Order ${moment(tanggalpesan).format("YYYY-MM-DD HH:mm:ss")}]`
        return (
            < Modaltemplate title={title} modal={modalDetail} toggle={toggle} centered >

                <ModalBody>
                    <div className="p-3 d-flex detail-transaksi-resto">
                        <div className="col-7  d-flex" >
                            <div className="col-5 p-0">
                                <p>Nama Pembeli</p>
                                <p>Kode Transaksi</p>
                                <p>Jumlah Order</p>
                                <p>Total Harga</p>
                                <p>Tanggal Pesan</p>
                                <p>Tanggal Bayar</p>
                                <p>Kode Voucher</p>
                                <p>Exp Voucher</p>
                                <p>Status Voucher</p>
                            </div>
                            <div className="col-7 p-0">
                                <p>{pembeli}</p>
                                <p>{kodetransaksi}</p>
                                <p>{qty}</p>
                                <p>{'Rp.' + Numeral(totalharga).format('0,0.00')}</p>
                                <p>{moment(tanggalpesan).format("YYYY-MM-DD HH:mm:ss")}</p>
                                <p>{moment(tanggalbayar).format("YYYY-MM-DD HH:mm:ss")}</p>
                                <p>{kodevoucher}</p>
                                <p>{moment(expvoucher).format("YYYY-MM-DD HH:mm:ss")}</p>
                                <p>{statusvoucher}</p>
                            </div>
                        </div>
                        <div className="col-5 ">
                            <p className="mr-4">Payment Image</p>
                            <p><img src={`${APIURLimagetoko + imgpayment}`} height='200px' /></p>
                        </div>
                    </div>
                </ModalBody>
            </Modaltemplate >
        )

    }

    // ONSEARCH CAHANGE
    // =================
    const onSearchChange = (e) => {
        console.log(e.target.value)
        setsearchfield(e.target.value)
    }

    if (!dataProduk) {
        return (
            <div className="no-transaksi mx-auto text-center">
                <img className="img-no-transaksi" src={require('../../images/novoucher.svg')} alt="" />
                <p>Belum Ada Transaksi/Penjualan</p>
            </div>
        )
    }

    return (
        <div className="transaksi">
            {
                modalDetail ? renderDetailProduk() : null
            }

            <div className="mt-4">
                <h3>Transaction </h3>
            </div>
            <div className="tabel-transaksi mt-3 p-4" style={{ backgroundColor: 'whitesmoke' }}>
                <div>
                    <Input type="search"
                        className="mb-3"
                        placeholder="search voucher.."
                        onChange={onSearchChange}
                        style={{ width: '27%' }}
                    />
                </div>
                <Table className="mx-auto" striped >
                    <thead>
                        <tr >
                            <th>No</th>
                            <th>Tanggal Order</th>
                            <th>Kode Transaksi</th>
                            <th>Kode Voucher</th>
                            <th>Status</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTabelTransaksi()}
                    </tbody>
                    <tfoot>

                    </tfoot>
                </Table>
            </div>
        </div>
    );

}

export default Transaksi;