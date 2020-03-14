import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Numeral from 'numeral'
import Moment from 'moment'
import Axios from 'axios'
import Toast from 'light-toast'
import { Button, Modal, ModalBody, CustomInput } from 'reactstrap'
import { APIURL, APIURLimagetoko } from '../../../helper/apiurl';

let kali = 1

function TransaksiUser() {

    const dispatch = useDispatch();
    const State = useSelector(({ authReducer }) => {
        return {
            email: authReducer.email
        }
    })

    const [dataProduct, setdataProduct] = useState([]);
    const [dataHistory, setdataHistory] = useState([]);
    const [onprocess, setonprocess] = useState('true');
    const [history, sethistory] = useState('false');
    const [iconInvoice, seticonInvoice] = useState(false);
    const [invoiceProduct, setinvoiceProduct] = useState();
    const [confirmPayment, setconfirmPayment] = useState(false);
    const [terjual, setterjual] = useState(0);
    const [addImage, setaddImage] = useState({
        addImageFileName: "Select Image..",
        addImageFile: undefined
    });
    const toggle = () => {
        seticonInvoice(false)
        setconfirmPayment(false)
    }

    // USE EFFECT
    // ==========
    useEffect(() => {
        let id = localStorage.getItem('id')
        // if (kali < 2) {
        Axios.get(`${APIURL}transaction/onprocess/${id}`)
            .then(res => {
                setdataProduct(res.data)
                console.log(res.data)
                console.log('1')
            }).catch(err => {
                console.log(err)
            })
        Axios.get(`${APIURL}transaction/overtimepayment/${id}`)
            .then(res => {
                setdataProduct(res.data)
                console.log('2')
            }).catch(err => {
                console.log(err)
            })
        Axios.get(`${APIURL}transaction/history/${id}`)
            .then(res2 => {
                console.log(res2.data)
                console.log('3')

                setdataHistory(res2.data)
            }).catch(err => {
                console.log(err)
            })
        // kali++
        // }
    }, [])


    // RENDER TRANSACTION (ONPROCESS)
    // ==============================
    const renderTransaksi = () => {
        if (dataProduct.length < 1) {
            return (
                <div >
                    <div className="no-transaksi-user text-center">
                        <img className="img-no-transaksi" height='300px' src={require('../../../pages/images/novoucher.svg')} alt="" />
                        <p>Tidak Ada Transaksi yang sedang di proses</p>
                    </div>
                </div>
            )
        } else {
            return dataProduct.map((val, i) => {
                return (
                    <div key={i} className="p-0 my-4 d-flex">
                        {/* -- image section -- */}
                        <div >
                            <img src={`${APIURLimagetoko + val.image}`} height="145px" />
                        </div>

                        {/* --- detail --- */}
                        <div className="ml-3 pt-1" style={{ width: "70%", backgroundColor: 'whitesmoke' }}>
                            <div className="ml-3" style={{ fontSize: '15px' }}>
                                <h6>{val.namaproduk}</h6>
                                <p>{val.namaproduk} - {val.namatoko} {val.qty} x {'Rp.' + Numeral(val.harganormal).format('0,0.00')}</p>
                                <div className="d-flex">
                                    <div style={{ marginRight: '18%', color: 'green', fontWeight: 'bolder' }}>
                                        <p>{'Rp.' + Numeral(val.totalharga).format('0,0.00')}</p>
                                    </div>
                                    <div onClick={() => { invoiceOnProcess(i) }} style={{ marginRight: '10%' }}>
                                        <i className="fa fa-file-text icon-invoice"> Invoice</i>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex">
                                <div className="col-5"></div>
                                <div className="col-7" style={{ textAlign: 'right', paddingRight: 0, paddingBottom: 0 }}>
                                    <Button disabled className="btn btn-light-green "
                                        style={
                                            {
                                                cursor: 'text',
                                                borderRadius: "30px 0px 0px 0px",
                                                fontSize: "13px",
                                                fontWeight: "bolder",
                                                lineHeight: '25px',
                                                height: "80%",
                                                width: "50%",
                                                color: "black",
                                                marginRight: 0,
                                                marginBottom: 0,
                                                border: 'lightgreen'
                                            }
                                        }> {val.status}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }


    // RENDER HISTORY
    // ==============
    const renderHistory = () => {
        console.log(dataHistory)
        if (dataHistory.length < 1) {
            return (
                <div >
                    <div className="no-transaksi-user text-center">
                        <img className="img-no-transaksi" height='300px' src={require('../../../pages/images/novoucher.svg')} alt="" />
                        <p>Belum ada History pembelian anda</p>
                    </div>
                </div>
            )
        } else {
            return dataHistory.map((val, i) => {
                return (
                    <div key={i} className="p-0 my-4 d-flex">
                        {/* -- image section -- */}
                        <div >
                            <img src={`${APIURLimagetoko + val.image}`} height="145px" />
                        </div>

                        {/* --- detail --- */}
                        <div className="ml-3 pt-1" style={{ width: "70%", backgroundColor: 'whitesmoke' }}>
                            <div className="ml-3" style={{ fontSize: '15px' }}>
                                <h6>{val.namaproduk}</h6>
                                <p>{val.namaproduk} - {val.namatoko} {val.qty} x {'Rp.' + Numeral(val.harganormal).format('0,0.00')}</p>
                                <div className="d-flex">

                                    <div style={{ marginRight: '18%', color: 'green', fontWeight: 'bolder' }}>
                                        <p>{'Rp.' + Numeral(val.totalharga).format('0,0.00')}</p>
                                    </div>

                                    <div onClick={() => { invoiceHistory(i) }} style={{ marginRight: '10%' }}>
                                        <i className="fa fa-file-text icon-invoice"> Invoice</i>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex">
                                <div className="col-5">
                                </div>
                                <div className="col-7" style={{ textAlign: 'right', paddingRight: 0, paddingBottom: 0 }}>
                                    <Button disabled className="btn btn-light-green "
                                        style={
                                            {
                                                cursor: 'text',
                                                borderRadius: "30px 0px 0px 0px",
                                                fontSize: "13px",
                                                fontWeight: "bolder",
                                                lineHeight: '25px',
                                                height: "80%",
                                                width: "50%",
                                                color: "black",
                                                marginRight: 0,
                                                marginBottom: 0,
                                                border: 'lightgreen'
                                            }
                                        }> {val.status}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }

    // CLICK ICON INVOICE ON PROCESS
    // =============================
    const invoiceOnProcess = (i) => {
        seticonInvoice(true)
        console.log(dataProduct[i].idproduk)
        setinvoiceProduct(dataProduct[i])
        Axios.get(`${APIURL}transaction/getstock/${dataProduct[i].idproduk}`)
            .then(res => {
                console.log(res.data[0].terjual)
                setterjual(res.data[0].terjual)
            }).catch(err => {
                console.log(err)
            })
    }

    // CLICK ICON INVOICE HISTORY
    // ==========================
    const invoiceHistory = (i) => {
        seticonInvoice(true)
        setinvoiceProduct(dataHistory[i])
    }

    // CANCEL ORDER 
    // ============
    const cancelOrder = () => {
        let dataorder = {
            iduser: localStorage.getItem('id'),
            kodetransaksi: invoiceProduct.kodetransaksi
        }
        Toast.loading('loading');
        setTimeout(() => {
            Axios.put(`${APIURL}transaction/canceled/${dataorder.kodetransaksi}`, dataorder)
                .then(res => {
                    setdataProduct(res.data)
                    seticonInvoice(false)
                    Toast.success('success.. order canceled', 2000, () => {
                        Axios.get(`${APIURL}transaction/history/${dataorder.iduser}`)
                            .then(res1 => {
                                setdataHistory(res1.data)
                            }).catch(err => {
                                console.log(err)
                            })
                        seticonInvoice(false)
                    })
                }).catch(err => {
                    console.log(err)
                })

            Toast.hide();
        }, 3000);
    }

    // ADD IMAGE PAYMENT
    // =================
    const onAddImageFileChange = (event) => {
        console.log(event.target.files[0])
        var file = event.target.files[0]
        if (file) {
            setaddImage({ ...addImage, addImageFileName: file.name, addImageFile: event.target.files[0] })
        } else {
            setaddImage({ ...addImage, addImageFileName: 'Select Image...', addImageFile: undefined })
        }
    }

    // RENDER INVOICE
    // ==============
    const renderInvoice = () => {
        const { idtransaction, idproduk, iduser, namaproduk, namatoko, harganormal, totalharga, qty, tanggalpesan, tanggalexp, alamat, phone, status, kodetransaksi } = invoiceProduct
        const email = State.email

        return (
            <Modal width='900px' centered isOpen={iconInvoice} toggle={toggle} >
                <ModalBody toggle={toggle}>
                    <div className="m-3 p-2" style={{ backgroundColor: 'whitesmoke' }}>
                        <h5 className="invoice-transaction pb-3" style={{ color: 'green' }}>Invoice Transaction</h5>

                        {/* invoice - nama produk */}
                        <div className="detail-invoice">
                            <p style={{ fontWeight: 'bolder' }}>{namaproduk} - {namatoko} </p>
                            <div className="invoice-transaction d-flex">
                                <div className="col-6 pl-0 isi-invoice" >
                                    <p>{namaproduk} - {namatoko} <br /> <span style={{ color: 'gray' }}>{alamat} | {phone}</span></p>
                                </div>
                                <div className="col-3 pl-0">
                                    <p>{qty} x {'Rp.' + Numeral(harganormal).format('0,0.00')}</p>
                                </div>
                                <div className='col-3 pr-0'>
                                    <p style={{ color: 'green', textAlign: 'right' }}>{'Rp.' + Numeral(totalharga).format('0,0.00')}</p>
                                </div>
                            </div>
                        </div>

                        {/* invoice - totalan */}
                        <div className="d-flex invoice-transaction mt-3 pb-3">
                            <div className="col-6 pl-0"></div>
                            <div className="col-3 pl-0 isi-invoice totalaninfo">
                                <p>Subtotal</p>
                                <p>Adm cost</p>
                                <p>Total</p>
                            </div>
                            <div className="col-3 pr-0 isi-invoice totalan">
                                <p>{'Rp.' + Numeral(totalharga).format('0,0.00')}</p>
                                <p>{'Rp.' + Numeral(0).format('0,0.00')}</p>
                                <p style={{ fontWeight: 'bold' }}>{'Rp.' + Numeral(totalharga).format('0,0.00')}</p>
                            </div>
                        </div>

                        {/* invoice - status */}
                        <div className='d-flex invoice-transaction mt-3 pb-3'>
                            <div className="col-6 pl-0">
                                {
                                    status === "WAITING PAYMENT" ?
                                        <div style={{ color: 'grey' }}>
                                            <i style={{ color: 'black' }} className='fa fa-barcode'> Kode Transaksi </i>
                                            <br /> <span style={{ fontWeight: 'bolder', color: 'black' }}>{kodetransaksi}</span>
                                            <br /> hanya berlaku 1 x 24 jam
                                        </div>
                                        : null
                                }

                            </div>
                            <div className="col-2 pl-0 isi-invoice totalaninfo">
                                <p>Status</p>
                                <p>Order</p>
                                <p>Exp</p>
                            </div>
                            <div className="col-4 pr-0 isi-invoice invoicetambahan">
                                <p>{status}</p>
                                <p>{Moment(tanggalpesan).format("YYYY-MM-DD HH:mm:ss")}</p>
                                <p>{Moment(tanggalexp).format("YYYY-MM-DD HH:mm:ss")}</p>
                            </div>
                        </div>

                        {/* invoice - footer */}
                        {
                            status === "WAITING PAYMENT" ?
                                <div className="d-flex mt-3 footer-invoice invoice transaction">
                                    <div className="col-2"></div>
                                    <div className="col-3 p-0 text-center">
                                        <i onClick={() => { seticonInvoice(false) }} className="fa fa-ban icon-invoice"> Close invoice</i>
                                    </div>
                                    <div className="col-3 p-0 text-center">
                                        <i onClick={cancelOrder} className="fa fa-times-circle icon-invoice"> Cancel order</i>
                                    </div>
                                    <div className="col-4 text-right p-0">
                                        <i onClick={() => { setconfirmPayment(true) }} className="fa fa-money icon-invoice"> Confirm your payment</i>
                                    </div>
                                </div> :
                                <div className="d-flex mt-3 footer-invoice invoice transaction">
                                    <div className="col-8"></div>
                                    <div className="col-4 text-right p-0">
                                        <i onClick={() => { seticonInvoice(false) }} className="fa fa-ban icon-invoice"> Close invoice</i>
                                    </div>
                                </div>
                        }

                        {/* invoice input confirm payment */}
                        {
                            confirmPayment ?
                                <div className="mt-2 isi-invoice text-right">
                                    <CustomInput onChange={onAddImageFileChange} className="text-left" size="sm" type="file" label={addImage.addImageFileName} />
                                    <i onClick={() => setconfirmPayment(false)} className="fa fa-times-circle icon-invoice mb-1 mr-2"> cancel</i>

                                    {/* ---- start upload and CONFIRM PAYMENT ---- */}
                                    <i onClick={
                                        () => {
                                            Toast.loading('loading');
                                            setTimeout(() => {

                                                var formdata = new FormData()

                                                const data = {
                                                    idproduk,
                                                    iduser,
                                                    totalharga,
                                                    idtransaction,
                                                    email,
                                                    qty,
                                                    terjual: qty + terjual
                                                }
                                                console.log('qty terjual', terjual)
                                                var Headers = {
                                                    headers:
                                                    {
                                                        'Content-Type': 'multipart/form-data'
                                                    }
                                                }
                                                // console.log(data)
                                                formdata.append('image', addImage.addImageFile)
                                                formdata.append('data', JSON.stringify(data))

                                                Axios.post(`${APIURL}transaction/confirmpayment`, formdata, Headers)
                                                    .then(res => {
                                                        seticonInvoice(false)
                                                        setconfirmPayment(false)
                                                        setdataProduct(res.data)
                                                        Axios.get(`${APIURL}transaction/history/${iduser}`)
                                                            .then(res1 => {
                                                                setdataHistory(res1.data)
                                                            }).catch(err => {
                                                                console.log(err)
                                                            })
                                                    }).catch(err => {
                                                        console.log(err);
                                                    })
                                                Toast.success('success.. check your mail', 2000)
                                                Toast.hide();
                                            }, 3000);
                                        }
                                    } className="fa fa-upload icon-invoice mb-1"> upload</i>
                                    {/* ---- end upload snf CONFIRM PAYMENT ---- */}
                                </div> : null
                        }
                    </div>
                </ModalBody>
            </Modal>
        )
    }



    console.log('ini ', dataProduct)
    console.log('4')

    // RETURN
    // ======
    return (
        <div>
            {
                iconInvoice ?
                    renderInvoice()
                    : null
            }
            <div className="mx-4">
                <div className="kat-transaksi d-flex pl-0" style={{ cursor: 'pointer' }}>
                    <div className={`${onprocess} onprocess transaksi mr-4 pl-0`}
                        onClick={() => {
                            sethistory('false')
                            setonprocess('true')
                        }}>
                        On Process
                    </div>
                    <div className={`${history} history transaksi`}
                        onClick={() => {
                            sethistory('true')
                            setonprocess('false')
                        }}>
                        History
                    </div>
                </div>
                <div>
                    {
                        onprocess === "true" ? renderTransaksi() :
                            history === "true" ? renderHistory() : null
                    }

                </div>
            </div>


        </div>
    )
}

export default TransaksiUser


















                                            // Toast.loading('loadingg...',
                                            //     3000, () => {

                                            // do something after the toast disappears
                                            // () => {
                                            // var formdata = new FormData()

                                            // const data = {
                                            //     idproduk,
                                            //     iduser,
                                            //     totalharga,
                                            //     idtransaction,
                                            //     email
                                            // }
                                            // var Headers = {
                                            //     headers:
                                            //     {
                                            //         'Content-Type': 'multipart/form-data'
                                            //     }
                                            // }
                                            // formdata.append('image', addImage.addImageFile)
                                            // formdata.append('data', JSON.stringify(data))

                                            // Axios.post(`${APIURL}transaction/confirmpayment`, formdata, Headers)
                                            //     .then(res => {
                                            //         seticonInvoice(false)
                                            //         setdataProduct(res.data)
                                            //         Axios.get(`${APIURL}transaction/history/${iduser}`)
                                            //             .then(res1 => {
                                            //                 setdataHistory(res1.data)
                                            //             }).catch(err => {
                                            //                 console.log(err)
                                            //             })
                                            //     }).catch(err => {
                                            //         console.log(err);
                                            //     })
                                            // }
                                            // });