import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel'
import Footer from '../components/footer'
import { APIURL, APIURLimagetoko, URL } from '../helper/apiurl'
import { MdRestaurant } from 'react-icons/md'
import Axios from "axios"
import { Input, Popover, Button, PopoverBody } from 'reactstrap'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Header from '../components/mainheader'
import Zoom from '@material-ui/core/Zoom';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from 'react-reveal/Fade';
import Numeral from 'numeral'
import { Open_Login, Open_Register, PembeliRegister } from '../redux/action'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { MDBIcon } from "mdbreact";
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
import moment from 'moment'


class Home extends Component {
    state = {
        dataProduk: [],
        specialProduk: [],
        currentProduk: [],
        currentPage: null,
        totalPages: null,
        searchfield: '',
        filterby: 'All Category',
        category: [],
        range: false,
        option: 'Sort By',
        opt: false,
        popoverOpenPrice: false,
        popoverOpenOption: false,
        rangeprice: {
            min: 0,
            max: 0
        }
    }

    // COMPONENTDIDMOUNT
    // =================
    componentDidMount() {
        AOS.init({ duration: 1000 })
        Axios.get(`${APIURL}produk/dataprod`)
            .then((res) => {
                this.setState({
                    dataProduk: res.data.dataproduk,
                    max: res.data.max,
                    specialProduk: res.data.specialprod
                })
                console.log(`${APIURL}produk/dataprod`)
            })
            .catch((err) => console.log(err))

        Axios.get(`${APIURL}produk/kategoriproduk`)
            .then(res => this.setState({ category: res.data }))
            .catch((err) => { console.log(err) })

    }

    // RENDER CATEGORY
    // ===============
    renderCategory = () => {
        if (this.state.category) {
            return this.state.category.map((val, i) => {
                return (
                    <option key={i} value={val.namakategori}>{val.namakategori}</option>
                )
            })
        }
    }

    // RENDER SPECIAL PRODUK
    // =====================
    renderCarousel = () => {
        if (this.state.specialProduk) {

            return this.state.specialProduk.map((val, index) => {
                const discount = this.state.specialProduk[index].diskon
                return (
                    <Link key={index} to={'/detailproduk/' + val.id}>
                        <div key={index}>
                            <img style={{ cursor: 'pointer' }} src={`${APIURLimagetoko}` + val.image} alt="image" />

                            <center>
                                <button className="btn mx-auto p-0"
                                    style={{
                                        zIndex: 1,
                                        cursor: 'text',
                                        position: "absolute",
                                        top: -6,
                                        right: 0,
                                        borderRadius: "0px 0px 0px 60px",
                                        fontSize: "20px",
                                        fontWeight: "bolder",
                                        lineHeight: '18px',
                                        height: "45px",
                                        width: "15%",
                                        color: "black",
                                        backgroundColor: "#00FF00"
                                    }}
                                >{discount}%
                                </button>
                            </center>

                        </div>
                    </Link>
                )
            })
        }
    }

    // RENDER GALLERY 
    // ===============
    renderallproduct = () => {
        const { dataProduk, range, rangeprice, option, opt } = this.state
        let allproduk = dataProduk
        let datapro = []
        let dataprice = []
        let dataopt = []

        if (range) {
            dataprice = allproduk.filter((val, i) => val.hargadisc >= rangeprice.min && val.hargadisc <= rangeprice.max)
            dataprice = dataprice.sort((a, b) => { return a.hargadisc - b.hargadisc })
        }

        if (opt) {
            console.log(option)
            if (option === 'discount') {
                dataopt = allproduk.sort((a, b) => {
                    return b.diskon - a.diskon
                })

            } else if (option === 'highest-price') {
                dataopt = allproduk.sort((a, b) => {
                    return b.hargadisc - a.hargadisc
                })
            } else if (option === 'lowest-price') {
                dataopt = allproduk.sort((a, b) => {
                    return a.hargadisc - b.hargadisc
                })
            }
        }

        if (range == false && opt === false) datapro = dataProduk
        else if (range) datapro = dataprice
        else if (opt) datapro = dataopt

        if (datapro.length === 0) {
            return <div className="mx-auto" >
                <h6 style={{ color: 'grey' }}>Sorry. Product Not found</h6></div>
        }

        return datapro.map((val, index) => {
            let { roleid } = this.props
            let discount = datapro[index].diskon
            let hargadiskon = 'Rp. ' + Numeral(datapro[index].hargadisc).format('0,0.00')
            let harganormal = 'Rp. ' + Numeral(datapro[index].harganormal).format('0,0.00')
            let sisa = Number(val.kuota) - Number(val.terjual)
            return (
                <Fade key={index} bottom cascade>
                    <div key={index} className="grid">
                        {
                            roleid > 1 ?
                                <figure className="effect-winston">
                                    <img src={`${APIURLimagetoko}` + val.image} alt="image" />
                                    <button className="btn mx-auto p-0"
                                        style={
                                            {
                                                zIndex: 1,
                                                cursor: 'text',
                                                position: "absolute",
                                                top: -6,
                                                right: 0,
                                                borderRadius: "0px 0px 0px 30px",
                                                fontSize: "18px",
                                                fontWeight: "bolder",
                                                lineHeight: '17px',
                                                height: "14%",
                                                width: "23%",
                                                color: "black",
                                                backgroundColor: "#ADFF2F"
                                            }
                                        }>{discount}%
                                </button>
                                    <figcaption style={{ cursor: 'text' }}>
                                        <h5>{val.namakategori}</h5>
                                        <h6><MdRestaurant /> {val.namaproduk}- {val.namatoko}</h6>
                                        <h6><span style={{ textDecoration: 'line-through', marginRight: '5px' }}>{harganormal}</span>
                                            <span style={{ fontWeight: 'bolder', fontSize: '16px' }}>{hargadiskon}</span></h6>
                                        <h6>stock {sisa}</h6>
                                        <h6>valid until {moment(val.tanggalakhir).format('DD-MM-YYYY')}</h6>
                                    </figcaption>
                                </figure> :
                                <Link to={'/detailproduk/' + val.id}>
                                    <figure className="effect-winston" >
                                        <img src={`${APIURLimagetoko}` + val.image} alt="image" />
                                        <button className="btn mx-auto p-0"
                                            style={
                                                {
                                                    zIndex: 1,
                                                    cursor: 'text',
                                                    position: "absolute",
                                                    top: -6,
                                                    right: 0,
                                                    borderRadius: "0px 0px 0px 30px",
                                                    fontSize: "18px",
                                                    fontWeight: "bolder",
                                                    lineHeight: '17px',
                                                    height: "14%",
                                                    width: "23%",
                                                    color: "black",
                                                    backgroundColor: "#ADFF2F"
                                                }
                                            }>{discount}%
                                    </button>
                                        <figcaption>
                                            <h5>{val.namakategori}</h5>
                                            <h6><MdRestaurant /> {val.namaproduk}- {val.namatoko}</h6>
                                            <h6><span style={{ textDecoration: 'line-through', marginRight: '5px' }}>{harganormal}</span>
                                                <span style={{ fontWeight: 'bolder', fontSize: '16px' }}>{hargadiskon}</span></h6>
                                            <h6>stock {sisa}</h6>
                                            <h6>valid until {moment(val.tanggalakhir).format('DD-MM-YYYY')}</h6>
                                        </figcaption>

                                    </figure>
                                </Link>
                        }
                    </div>
                </Fade>
            )
        })
    }


    render() {
        console.log('kategori', this.state.dataProduk)
        let { searchfield, filterby, popoverOpenPrice, popoverOpenOption, max, rangeprice, option, opt } = this.state
        return (
            <div className="homepage">
                <Header />
                {/* -- popver range price -- */}
                <Popover placement="bottom" isOpen={popoverOpenPrice} target="price" toggle={() => this.setState({ popoverOpenPrice: !popoverOpenPrice })
                }>
                    <PopoverBody>
                        <div className="mt-4 p-4">
                            <InputRange
                                draggableTrack
                                step={1000}
                                maxValue={max}
                                minValue={0}
                                onChange={value => this.setState({ rangeprice: value })}
                                onChangeComplete={value => console.log('itu', value)}
                                value={this.state.rangeprice} />
                        </div>
                        <div className='btnpopover d-flex justify-content-between'>
                            <Tooltip TransitionComponent={Zoom} title="cancel" arrow placement="top">
                                <img src={require('./images/icons/error.png')} height='25px'
                                    onClick={() => { this.setState({ popoverOpenPrice: !popoverOpenPrice }) }} />
                            </Tooltip>
                            <Tooltip TransitionComponent={Zoom} title="reset" arrow placement="top">
                                <img src={require('./images/icons/reset.png')} height='25px'
                                    onClick={() => { this.setState({ range: false, popoverOpenPrice: !popoverOpenPrice, rangeprice: { max: 0, min: 0 }, opt: false, option: 'Sort By' }) }} />
                            </Tooltip>
                            <Tooltip TransitionComponent={Zoom} title="apply!" arrow placement="top">
                                <img src={require('./images/icons/yes.png')} height='25px'
                                    onClick={() => this.setState({ range: true, popoverOpenPrice: !popoverOpenPrice, opt: false, option: 'Sort By' })} />
                            </Tooltip>
                        </div>
                    </PopoverBody>
                </Popover>

                {/* -- popover filter option -- */}
                <Popover placement="bottom" isOpen={popoverOpenOption} target="filterOption" toggle={() => this.setState({ popoverOpenOption: !popoverOpenOption })}>
                    <PopoverBody>
                        <div className='p-2 filteropt'>
                            <div onClick={() => this.setState({ option: 'highest-price', opt: true, range: false, rangeprice: { max: 0, min: 0 } })} className='filteroption'>Highest Price</div>
                            <div onClick={() => this.setState({ option: 'lowest-price', opt: true, range: false, rangeprice: { max: 0, min: 0 } })} className='filteroption'>Lowest Prize</div>
                            <div onClick={() => this.setState({ option: 'discount', opt: true, range: false, rangeprice: { max: 0, min: 0 } })} className='filteroption'>Discount</div>
                        </div>
                        <div className='d-flex justify-content-between px-2 py-1'>
                            <Button onClick={() => this.setState({ popoverOpenOption: !popoverOpenOption, rangeprice: { max: 0, min: 0 } })} size='sm' className="btn btn-grey py-1">ok</Button>
                        </div>
                    </PopoverBody>
                </Popover>

                <div className="section1">
                    <div className="kontentjudul" >
                        <h3 data-aos="zoom-in" data-aos-duration='2000' className="wellcome" style={{ fontWeight: 'bold' }}>- Hello there,</h3>
                        <h2 className="judul">Find the best promos around you<br />and let's eat well</h2>

                        <ul className="home-social">
                            <li data-aos="zoom-in" data-aos-duration='1000'><a href="https://www.instagram.com/kartikasilalahi" target="_blank"><i className="fa fa-instagram" ></i><span>Instagram</span></a></li>
                            <li data-aos="zoom-in" data-aos-duration='1000'><a href="https://twitter.com/kartikasilalahi" target="_blank"><i className="fa fa-twitter" ></i><span>Twitter</span></a></li>
                            <li data-aos="zoom-in" data-aos-duration='1000'><a href="https://github.com/kartikasilalahi" target="_blank"><i className="fa fa-github" ></i><span>Github</span></a></li>
                        </ul>
                    </div>
                </div>


                <div data-aos="fade-up" className="specials mx-5">
                    <div className="isi-specials d-flex">
                        <div className="section3 col-7 text-center">
                            <p data-aos="fade-up" className="offers mb-2">OUR OFFERS</p>
                            <p data-aos="fade-up" className="mostitems mt-0 ">Specials for you</p>
                            <Carousel className="carosel mx-auto" infiniteLoop showThumbs={false} showStatus={false} autoPlay>
                                {this.renderCarousel()}
                            </Carousel>
                        </div>
                        <div className="text-specials col-5 ">
                            <p >
                                Looking for Restaurant Coupons? You've come to the right place!
                                EATWELL is the #1 resource for get restaurant  or cafe coupons, offering the latest coupons for over 250 popular restaurants. Just find the restaurant you are looking for below and click on the logo to get the latest coupons. Then just eat & save!
                            </p>
                        </div>
                    </div>
                </div>

                <div data-aos="fade-up" className="section4 p-5 mx-5" style={{ paddingLeft: "3%", paddingRight: "3%" }}>
                    <p data-aos="fade-up" className="allpromos text-center">All Promos Item</p>

                    {/* -- search box -- */}
                    <div className=" w-75 d-flex mx-auto mb-5" style={{ paddingRight: '12%', paddingLeft: '12%' }}>
                        <div style={{ width: '30%' }}>
                            <Input style={{ backgroundColor: 'whitesmoke' }} type='select' onChange={(e) => this.setState({ filterby: e.target.value })}>
                                <option value={'All Category'}>All Category</option>
                                {this.renderCategory()}
                            </Input>
                        </div>
                        <div className="ml-0" style={{ width: '60%' }}>
                            <Input type="search"
                                className="mb-3"
                                placeholder="search product.."
                                onChange={(e) => { this.setState({ searchfield: e.target.value }) }}
                            />
                        </div>
                        <div className="mx-0 input-group-prepend" >
                            <a href={`${URL}search_result?keyword=${searchfield}&page=1&category=${filterby}`} style={{ height: '45px', textDecoration: 'none' }} >
                                <span className="input-group-text gray lighten-3" id="basic-text1" style={{ cursor: 'pointer', height: '38px' }}>
                                    <MDBIcon className="text-grey" icon="search" />
                                </span>
                            </a>
                        </div>
                    </div>

                    <div className="section-sort d-flex " style={{ paddingLeft: "3%", paddingRight: "3%" }}>
                        {/* -- filter by price only -- */}
                        <div className="priceonly mr-auto pl-2">
                            <Button className="btn btn-grey" size='sm' id="price" >
                                {
                                    rangeprice.min == 0 && rangeprice.max == 0 ? 'All Price' :
                                        `${rangeprice.min}- ${rangeprice.max}`
                                }
                            </Button>
                        </div>

                        {/* -- filter by many options -- */}
                        <div className="filter-option ml-auto pr-2">
                            <Button className="btn btn-grey" size='sm' id="filterOption" >
                                {
                                    option ? `${option}` : 'Sort By'
                                }
                            </Button>
                        </div>
                    </div>
                    <div data-aos="fade-up" className="row gallery" style={{ paddingLeft: "3%", paddingRight: "3%" }}>
                        {this.renderallproduct()}
                    </div>
                </div >
                <Footer />
            </div >
        );
    }
}


const MapStateToProps = (state) => {
    return {
        auth: state.authReducer,
        modallogin: state.authReducer.modallogin,
        modalregister: state.authReducer.modalregister,
        email: state.authReducer.email,
        errorregist: state.authReducer.errorregist,
        errorlogin: state.authReducer.errorlogin,
        regist: state.authReducer.register,
        login: state.authReducer.login,
        roleid: state.authReducer.roleid
    }
}

export default connect(MapStateToProps, { Open_Login, Open_Register, PembeliRegister })(Home);


{/* {
                                        this.props.roleid === 2 || this.props.roleid === 3 ? null :
                                            <p>
                                                <Link to={'/detailproduk/' + val.id}>
                                                    <Tooltip TransitionComponent={Zoom} title="detail or buy" arrow placement="top">
                                                        <i className="fa fa-shopping-cart" ></i>
                                                    </Tooltip>
                                                </Link>
                                                {
                                                    this.props.roleid === 1 ?
                                                        <Tooltip TransitionComponent={Zoom} title="add wishlist" arrow placement="top">
                                                            <a className="wishlist" onClick={() => this.addToWishList(index)} ><i className="fa fa-fw fa-heart"></i></a>
                                                        </Tooltip> :
                                                        <Tooltip TransitionComponent={Zoom} title="You must login first" arrow placement="top">
                                                            <a className="wishlist" ><i className="fa fa-fw fa-heart"></i></a>
                                                        </Tooltip>
                                                }
                                            </p>
                                    } */}