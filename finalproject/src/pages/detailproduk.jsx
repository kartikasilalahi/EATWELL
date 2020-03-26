import React, { Component } from 'react'
import { Carousel } from "react-responsive-carousel";
import { MDBCard, MDBCardBody, MDBBtn, MDBCardFooter, MDBCardHeader, MDBAlert } from 'mdbreact'
import Footer from '../components/footer'
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle, IoMdInformationCircleOutline } from 'react-icons/io'
import { GoLocation } from 'react-icons/go'
import { FaRegListAlt, FaPlus, FaMinus } from 'react-icons/fa'
import Sisawaktu from './sisawaktu'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Open_Login, buyProduct } from '../redux/action'
import { connect } from 'react-redux'
import Axios from 'axios'
import { APIURL, APIURLimagetoko } from '../helper/apiurl'
import moment from 'moment'
import Header from '../components/mainheader'
import Numeral from 'numeral'
import Toast from 'light-toast'
import { Redirect } from 'react-router-dom'
import { Modal, ModalBody, Button } from 'reactstrap'



class Detailproduk extends Component {
    state = {
        modalbuy: false,
        dataproduk: {},
        dataimage: [],
        datatoko: [],
        info: true,
        lokasi: false,
        sk: false,
        showjadwal: false,
        trans: false,
        weekday: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        weekend: ['Saturday', 'Sunday'],
        jumlah: 0,
        jumlahmax: 3,
        stock: 0,
        msg: '',
        msgbtn: '',
        wishlist: 'false',
        listwish: []
    }


    componentDidMount() {
        AOS.init({ duration: 700 })
        Axios.get(`${APIURL}produk/getdetailproduk/${this.props.match.params.idproduk}`)
            .then(res => {
                this.setState({ dataproduk: res.data[0], jumlahmax: res.data[0].maxbeli, stock: res.data[0].kuota - res.data[0].terjual })
                Axios(`${APIURL}produk/imgprodresto/${this.props.match.params.idproduk}`)
                    .then(res1 => { this.setState({ dataimage: res1.data }) })
                    .catch(err => { console.log(err) })
                Axios.get(`${APIURL}produk/getdetailresto/${res.data[0].usertokoid}`)
                    .then(res2 => { this.setState({ datatoko: res2.data[0] }) })
                    .catch(err2 => { console.log(err2) })
            })
            .catch(error => { console.log(error) })
        Axios.get(`${APIURL}produk/checkwislist/${this.props.match.params.idproduk}`)
            .then(result => {
                result.data.map(val => {
                    if (val.iduser == localStorage.getItem('id')) {
                        this.setState({ listwish: result.data, wishlist: 'true' })
                    } else {
                        this.setState({ listwish: [], wishlist: 'false' })
                    }
                })
            })
            .catch(error => { console.log(error) })
    }

    buttonPlus = () => {
        console.log('ini stokmya', this.state.stock)
        let stockk = this.state.stock
        var plus = this.state.jumlah + 1
        if (plus > this.state.stock) return this.setState({ jumlah: stockk, msg: 'You cannot order more than the remaining stock' })
        if (plus <= this.state.jumlahmax) this.setState({ jumlah: plus, msg: '', msgbtn: '' })

    }

    buttonMinus = () => {
        var min = this.state.jumlah - 1
        if (min >= 0) this.setState({ jumlah: min, msg: '' })
    }

    renderImage = () => {
        const { dataimage } = this.state
        return dataimage.map((val, i) => {
            return (
                <div key={i}>
                    <img
                        className="d-block w-100"
                        src={`${APIURLimagetoko}` + val.image}
                        alt={`imageke-${i}`}
                    />
                </div>
            )
        })
    }

    renderweekday = () => {
        const { weekday, datatoko } = this.state
        return weekday.map((val, i) => {
            return (
                <div key={i} className="kondisihari">
                    <div>{val}</div>
                    <div style={{ color: "#7bc043" }}>{datatoko.weekday}</div>
                </div>
            )
        })
    }

    renderweekend = () => {
        const { weekend, datatoko } = this.state
        return weekend.map((val, i) => {
            return (
                <div key={i} className="kondisihari">
                    <div>{val}</div>
                    <div style={{ color: "#7bc043" }}>{datatoko.weekend}</div>
                </div>
            )
        })
    }

    klikwishlist = () => {
        const { wishlist, listwish } = this.state
        console.log('ini wislist', wishlist)
        let idproduk = this.props.match.params.idproduk
        let iduser = localStorage.getItem('id')
        let datawishlist = {
            idproduk, iduser
        }
        if (wishlist === "false") {
            Axios.post(`${APIURL}produk/addtowishlist`, datawishlist)
                .then(() => {
                    Toast.loading(`Add to Wishlist. Please wait a moment`);
                    setTimeout(() => {
                        Toast.success('Success. Product already add to my wishlist', 2000)
                        this.setState({ wishlist: 'true' })
                        Toast.hide();
                    }, 1500);
                }).catch((err) => { console.log(err) })
        } else {
            console.log('inii')
            Axios.get(`${APIURL}produk/deletefromwishlist?idproduk=${datawishlist.idproduk}&iduser=${datawishlist.iduser}`)
                .then(res1 => {
                    this.setState({ wishlist: 'false' })
                    Toast.success('remove from my wishlist', 2000)
                })
                .catch(err => { console.log(err) })
        }
    }




    render() {
        const { jumlah, listwish, wishlist } = this.state
        console.log(listwish)
        console.log(wishlist)
        const { namaproduk, tanggalakhir, tanggalmulai, harganormal, diskon, kuota, terjual, maxbeli, id } = this.state.dataproduk
        const { namatoko, alamat, phone, taxservice, takeaway, refund, holiday, idtoko } = this.state.datatoko
        let hargadiskon = 'Rp.' + Numeral(harganormal - Math.round(harganormal * diskon / 100)).format('0,0.00')
        let totalharga = (this.state.jumlah * (harganormal - Math.round(harganormal * diskon / 100)))
        let iduser = Number(localStorage.getItem('id'))
        let email = this.props.email

        if (this.state.trans) {
            return <Redirect to='/akun' />
        }
        return (

            <div>
                {/* ----------------------------- Start Modal Buy ----------------------------- */}
                <Modal centered isOpen={this.state.modalbuy} toggle={() => this.setState({ modalbuy: false })}>
                    <ModalBody className="mx-5 my-3">
                        <div>
                            <h4>{namaproduk}</h4>
                            <h6>{namatoko} || {alamat}</h6>
                            {hargadiskon}
                        </div>
                        <div>
                            <div className="jumlah w-25 my-3 d-flex pb-2">
                                <FaMinus className="plusminus" onClick={this.buttonMinus} />
                                <div >{jumlah}</div>
                                <FaPlus className="plusminus" onClick={this.buttonPlus} />
                            </div>
                            {
                                this.state.msg.length > 0 ?
                                    <p className="alert alert-danger" style={{ fontSize: '10px', lineHeight: '10px' }}>{this.state.msg}</p>
                                    : null
                            }
                        </div>
                        <div>
                            <p>Total Bayar: {'Rp.' + Numeral(totalharga).format('0,0.00')}</p>
                            {
                                this.state.msgbtn.length ?
                                    <p className="alert alert-danger" style={{ fontSize: '10px', lineHeight: '10px' }}>{this.state.msgbtn}</p> : null
                            }

                            {/* ----- button buy ----- */}
                            <Button className="btn btn-green ml-auto"
                                onClick={() => {
                                    if (jumlah === 0) {
                                        this.setState({ msgbtn: 'Please specify the amount..' })
                                    } else {
                                        this.props.buyProduct({ iduser, idtoko, idproduk: id, qty: jumlah, totalharga, email })
                                    }

                                    if (jumlah > 0) {
                                        Toast.loading('loading');
                                        setTimeout(() => {
                                            this.setState({ modalbuy: false, trans: true })
                                            Toast.success('Order has been made. Please check your email and make payment', 2000)
                                            Toast.hide();
                                        }, 3000);
                                    }
                                }}
                            > buy
                            </Button>

                        </div>
                    </ModalBody>
                </Modal>
                {/* ----------------------------- Start Modal Buy ----------------------------- */}

                <div style={{ height: "78px", backgroundColor: "rgba(0,0,0,.9)" }}>
                    <Header />
                </div>

                {/* ----------------------------- Start Detail Produk ----------------------------- */}
                <div className="detailproduk">
                    <div className="img col-7 ">
                        <Carousel infiniteLoop autoPlay>
                            {this.renderImage()}
                        </Carousel>
                        <div className="titleproduk">
                            <h3>{namaproduk} - {namatoko}</h3>
                        </div>
                    </div>

                    <div>
                        <div data-aos="fade-up" data-aos-duration="3000" className="buyme col-5 text-center ">
                            <MDBCard style={{ width: "33rem" }}>
                                <MDBCardHeader>
                                    <div className="sisawaktu text-center">
                                        Time Left : <Sisawaktu tanggal={moment(tanggalakhir).format('YYYY-MM-DD')} />
                                    </div>
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <div className="hargadiskon text-center">
                                        {hargadiskon}
                                    </div>
                                    <div className="detaildiskon text-center d-flex">
                                        <div className="diskon col-4">
                                            Discount <p>{diskon}%</p>
                                        </div>
                                        <div className="normal col-4">
                                            Normal Price <p style={{ textDecoration: "line-through" }}>{'Rp.' + Numeral(harganormal).format('0,0.00')}</p>
                                        </div>
                                        <div className="terjual col-4">
                                            Stock left <p>{kuota - terjual}</p>
                                        </div>
                                    </div>
                                    <div className="buy text-center">
                                        <div className="jumlah w-25 mx-auto mb-3 d-flex pb-2">
                                            <FaMinus className="plusminus" onClick={this.buttonMinus} />
                                            <div >{jumlah}</div>
                                            <FaPlus className="plusminus" onClick={this.buttonPlus} />
                                        </div>
                                        {
                                            this.props.roleid === 1 ?
                                                <MDBBtn onClick={() => this.setState({ modalbuy: true })} color="success"> Buy </MDBBtn> :
                                                <MDBBtn onClick={() => this.props.Open_Login(true)} color="success"> Login first </MDBBtn>
                                        }
                                    </div>
                                    {
                                        iduser > 0 ?
                                            <div className="my-3 fav" onClick={this.klikwishlist}>
                                                <h6 style={{ cursor: 'pointer' }}>
                                                    <i className={`${wishlist} fa fa-fw fa-heart mr-2`}></i>
                                                    Add to Wishlist
                                                </h6>
                                                <div className="strip mx-auto"></div>
                                            </div>
                                            : null
                                    }
                                </MDBCardBody>
                                <MDBCardFooter>
                                    <h3>{namatoko}</h3>

                                </MDBCardFooter>
                            </MDBCard>
                        </div>
                    </div>
                </div>
                {/* ----------------------------- End Detail Produk ----------------------------- */}


                {/* ----------------------------- Start Detail Toko ----------------------------- */}
                <div className="detaillanjutan mb-5" >
                    <div className="sectiondetail d-flex col-7">
                        <div onClick={() => {
                            this.setState({
                                lokasi: false,
                                info: true,
                                sk: false,
                                ubahinfo: "ubah",
                                ubahlokasi: '',
                                ubahsk: ''
                            })
                        }} className={`info ${this.state.ubahinfo} text-center`} >
                            <h1><IoMdInformationCircleOutline /></h1>
                            Info
                        </div>
                        <div onClick={() => {
                            this.setState({
                                lokasi: true,
                                info: false,
                                sk: false,
                                ubahlokasi: "ubah",
                                ubahinfo: "",
                                ubahsk: ""
                            })
                        }} className={`lokasi ${this.state.ubahlokasi} text-center`} >
                            <h1><GoLocation /></h1>
                            Location
                        </div>

                        <div onClick={() => {
                            this.setState({
                                lokasi: false,
                                info: false,
                                sk: true,
                                ubahinfo: "",
                                ubahlokasi: '',
                                ubahsk: 'ubah'
                            })
                        }} className={`lokasi ${this.state.ubahsk} text-center`}>
                            <h1><FaRegListAlt /></h1>
                            Details
                        </div>
                    </div>
                    <div className="isidetail">
                        {
                            this.state.info ?
                                <div>
                                    <h5>Info</h5>
                                    <p><span style={{ fontWeight: "bolder" }}>{diskon}% </span>  promo voucher for <span style={{ fontWeight: "bolder" }}> {namaproduk} </span> valid of <span style={{ fontWeight: "bolder" }}> {moment(tanggalmulai).format('DD MMMM YYYY')} to {moment(tanggalakhir).format('DD MMMM YYYY')}</span>.</p>
                                    <p>Complete payment within 24 hours to avoid automatically cancel the transaction.</p>
                                </div>
                                :
                                this.state.lokasi ?
                                    <div>
                                        <h5>{namatoko}</h5>
                                        <p>{alamat} | {phone}</p>
                                    </div> :
                                    <div >
                                        <h5>Detail</h5>
                                        <div>

                                            <div className="kondisi">
                                                <div >
                                                    <img src={require('./images/icons/tax2.svg')} height="25px" alt="" />
                                                    &nbsp;Include Tax and Service
                                                </div>
                                                <div style={{ color: "#7bc043" }}>{taxservice}</div>
                                            </div>
                                            <div className="kondisi">
                                                <div >
                                                    <img src={require('./images/icons/take_away.svg')} height="25px" alt="" />
                                                    &nbsp;Take Away
                                                </div>
                                                <div style={{ color: "#7bc043" }}>{takeaway}</div>
                                            </div>
                                            <div className="kondisi">
                                                <div >
                                                    <img src={require('./images/icons/refund.svg')} height="25px" alt="" />
                                                    &nbsp;Refund
                                                </div>
                                                <div style={{ color: "#7bc043" }}>{refund}</div>
                                            </div>
                                            <div className="kondisi">
                                                <div >
                                                    <img src={require('./images/icons/masa_berlaku.svg')} height="25px" alt="" />
                                                    &nbsp;Validity
                                        </div>
                                                <div style={{ color: "#7bc043" }}>{moment(tanggalmulai).format('DD MMMM YYYY')} - {moment(tanggalakhir).format('DD MMMM YYYY')}</div>
                                            </div>
                                            <div className="jam">
                                                <div className="jamops">
                                                    <div>
                                                        <img src={require('./images/icons/jam_operasional.svg')} height="25px" alt="" />
                                                        &nbsp;Operational Hours
                                            </div>
                                                    {
                                                        this.state.showjadwal ?
                                                            <div onClick={() => { this.setState({ showjadwal: false }) }} style={{ color: "#7bc043", cursor: "pointer" }}><h1><IoIosArrowDropupCircle /></h1></div>
                                                            :
                                                            <div onClick={() => { this.setState({ showjadwal: true }) }} style={{ color: "#7bc043", cursor: "pointer" }}><h1><IoIosArrowDropdownCircle /></h1></div>
                                                    }
                                                </div>
                                                {
                                                    this.state.showjadwal ?
                                                        <div className="hari">
                                                            {this.renderweekday()}
                                                            {this.renderweekend()}
                                                        </div>
                                                        : null
                                                }
                                            </div>
                                            <div className="kondisi">
                                                <div>
                                                    <img src={require('./images/icons/libur_nasional.svg')} height="25px" alt="" />
                                                    &nbsp;National holiday
                                                </div>
                                                <div style={{ color: "#7bc043" }}>{holiday}</div>
                                            </div>
                                        </div>
                                    </div>
                        }
                    </div>
                </div>
                {/* ----------------------------- End Detail Toko ----------------------------- */}

                <Footer />
            </div>
        )
    }
}
const MapStateToProps = (state) => {
    return {
        modallogin: state.modalLogin,
        roleid: state.authReducer.roleid,
        email: state.authReducer.email,
        pesanbuy: state.productReducer.pesanbuy
    }
}
export default connect(MapStateToProps, { Open_Login, buyProduct })(Detailproduk)