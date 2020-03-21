import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel'
import Footer from '../components/footer'
import { APIURL, APIURLimagetoko, URL } from '../helper/apiurl'
import { MdRestaurant } from 'react-icons/md'
import Axios from "axios"
import { Input, Popover, Button, PopoverHeader, PopoverBody } from 'reactstrap'
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
import Toast from 'light-toast'
import { MDBIcon } from "mdbreact";
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'


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
        popoverOpenPrice: false,
        popoverOpenOption: false,
        value: 3,
        rangeprice: {
            min: 0,
            max: 500000
        }
    }

    // COMPONENTDIDMOUNT
    componentDidMount() {
        let { range, rangeprice } = this.state
        AOS.init({ duration: 1000 })
        Axios.get(`${APIURL}produk/dataprod`)
            .then((res) => this.setState({
                dataProduk: res.data.dataproduk,
                specialProduk: res.data.dataproduk.filter((val, index) => val.diskon >= 40)
            }))
            .catch((err) => console.log(err))

        Axios.get(`${APIURL}produk/kategoriproduk`)
            .then(res => this.setState({ category: res.data }))
            .catch((err) => { console.log(err) })
        if (range) {
            Axios.get(`${APIURL}produk/range-price?max=${rangeprice.max}&min=${rangeprice.min}`)
                .then(res => this.setState({ category: res.data }))
                .catch((err) => { console.log(err) })
        }
    }


    // ADD TO WISHLIST
    // ==============
    addToWishList = (index) => {
        let idproduk = this.state.dataProduk[index].id
        let iduser = localStorage.getItem('id')
        let datawishlist = {
            idproduk, iduser
        }
        console.log(datawishlist)
        Axios.post(`${APIURL}produk/addtowishlist`, datawishlist)
            .then(() => {
                Toast.loading(`Add to Wishlist. Please wait a moment`);
                setTimeout(() => {
                    Toast.success('Success. Product already add to my wishlist', 2000)
                    Toast.hide();
                }, 3000);
            }).catch((err) => { console.log(err) })
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

    // ON PAGE CHANGE
    // ==============
    onPageChanged = data => {
        console.log('DATAAA', data)
        console.log('brp pages', data.totalPages)
        const { dataProduk } = this.state;
        const { currentPage, totalPages, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentProduk = dataProduk.slice(offset, offset + pageLimit);

        this.setState({ currentPage, currentProduk, totalPages });
    };


    // RENDER SPECIAL PRODUK
    // =====================
    renderCarousel = () => {
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

    // RENDER GALLERY 
    // ===============
    renderallproduct = () => {
        const { dataProduk, range, rangeprice } = this.state
        console.log('range', range)
        console.log('range max', rangeprice.max)

        if (range) {
            // Axios.get(`${APIURL}produk/range-price?max=${rangeprice.max}&min=${rangeprice.min}`)
            //     .then(res => this.setState({ category: res.data }))
            //     .catch((err) => { console.log(err) })
            return (
                <div>
                    adks
                </div>
            )
        }
        else {
            return dataProduk.map((val, index) => {
                const discount = dataProduk[index].diskon
                const harganormal = dataProduk[index].harganormal
                const hargadiskon = 'Rp.' + Numeral(harganormal - Math.round(harganormal * discount / 100)).format('0,0.00')
                return (
                    <Fade key={index} bottom cascade>
                        <div key={index} className="grid">
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
                                    }> {discount}%
                                    </button>
                                <figcaption>
                                    <h5>{val.namakategori}</h5>
                                    <h4>{val.namaproduk} - {hargadiskon}</h4>
                                    <h6> <MdRestaurant />{val.namatoko}</h6>
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
                                </figcaption>
                            </figure>
                        </div>
                    </Fade>
                )
            })
        }
    }


    render() {
        let { searchfield, filterby, popoverOpenPrice, popoverOpenOption, value } = this.state
        return (
            <div className="homepage">
                <Header />
                {/* -- popver range price -- */}
                <Popover placement="bottom" isOpen={popoverOpenPrice} target="price" toggle={() => this.setState({ popoverOpenPrice: !popoverOpenPrice })
                }>
                    <PopoverBody>
                        <div className="mt-4">
                            <InputRange
                                draggableTrack
                                step={20000}
                                maxValue={20}
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
                                    onClick={() => { this.setState({ range: false, popoverOpenPrice: !popoverOpenPrice }) }} />
                            </Tooltip>

                            <Tooltip TransitionComponent={Zoom} title="apply!" arrow placement="top">
                                <img src={require('./images/icons/yes.png')} height='25px'
                                    onClick={() => { this.setState({ range: true, popoverOpenPrice: !popoverOpenPrice }) }} />
                            </Tooltip>

                        </div>
                    </PopoverBody>
                </Popover>

                {/* -- popover filter option -- */}
                <Popover placement="bottom" isOpen={popoverOpenOption} target="filterOption" toggle={() => this.setState({ popoverOpenOption: !popoverOpenOption })}>
                    <PopoverBody>
                        <div className='d-flex justify-content-between'>
                            <Button onClick={() => this.setState({ popoverOpenOption: !popoverOpenOption })} size='sm' className="py-1 btn btn-grey">x</Button>
                            <Button size='sm' className="py-1 btn btn-grey">ok</Button>
                        </div>
                    </PopoverBody>
                </Popover>

                <div className="section1">
                    <div className="kontentjudul" >
                        <h3 data-aos="zoom-in" data-aos-duration='2000' className="wellcome" style={{ fontWeight: 'bold' }}>- Hello there,</h3>
                        <h2 className="judul">Find the best promos around you<br />and let's eat well</h2>

                        <ul className="home-social">
                            <li data-aos="zoom-in" data-aos-duration='1000'><a href=""><i className="fa fa-instagram" ></i><span>Instagram</span></a></li>
                            <li data-aos="zoom-in" data-aos-duration='1000'><a href=""><i className="fa fa-twitter" ></i><span>Twitter</span></a></li>
                            <li data-aos="zoom-in" data-aos-duration='1000'><a href=""><i className="fa fa-github" ></i><span>Github</span></a></li>
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
                                {'Rp.0.00 - Rp.500.000'}
                            </Button>
                        </div>

                        {/* -- filter by many options -- */}
                        <div className="filter-option ml-auto pr-2">
                            <Button className="btn btn-grey" size='sm' id="filterOption" >
                                Sort By
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
