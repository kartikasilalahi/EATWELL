import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel'
import Footer from '../components/footer'
import { APIURL, APIURLimagetoko, URL } from '../helper/apiurl'
import { MdRestaurant } from 'react-icons/md'
import Axios from "axios"
import { Input } from 'reactstrap'
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
import Pagination from '../components/pagination'
// import Loadingspinner from 'react-spinners/PulseLoader'
// import querystring from 'query-string'
import { MDBIcon } from "mdbreact";



class Home extends Component {
    state = {
        dataProduk: [],
        specialProduk: [],
        currentProduk: [],
        currentPage: null,
        totalPages: null,
        searchfield: '',
        filterby: 0,
        datafilter: [],
        category: []
    }

    // COMPONENTDIDMOUNT
    componentDidMount() {
        AOS.init({ duration: 1000 })
        Axios.get(`${APIURL}produk/dataprod`)
            .then((res) => {
                this.setState({ dataProduk: res.data.dataproduk, datafilter: res.data.dataproduk })
                var selectedproduk = this.state.datafilter.filter((val, index) => this.state.datafilter[index].diskon >= 40)
                this.setState({ specialProduk: selectedproduk })
            }).catch((err) => { console.log(err) })

        Axios.get(`${APIURL}produk/kategoriproduk`)
            .then(res => this.setState({ category: res.data }))
            .catch((err) => { console.log(err) })
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
                    <option key={i} value={val.id}>{val.namakategori}</option>
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

    klikSearch = () => {
        const { filterby, dataProduk, datafilter, searchfield } = this.state
        console.log('search field', searchfield)
        console.log('seacrhby', filterby)


    }

    // RENDER GALLERY. this.setState({ dataProduk: res.data })
    // ===============
    renderallproduct = () => {
        const { filterby, dataProduk, datafilter, searchfield } = this.state
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

    // render produk with pagination
    // ==============================
    renderpagination = () => {
        const { dataProduk, currentProduk, currentPage, totalPages, searchfield } = this.state;
        var showproduct = currentProduk
        // console.log(currentProduk)
        var filterProduct = dataProduk.filter(val => {
            return val.namaproduk.toLowerCase().includes(searchfield.toLowerCase())
        })
        console.log('TOTAL PAGES', totalPages)

        let length = dataProduk.length
        if (searchfield.length) {
            showproduct = filterProduct
            length = showproduct.length
        }
        if (dataProduk.length === 0) return null;

        const headerClass = [
            "text-dark py-2 pr-4 m-0",
            currentPage ? "border-gray border-right" : ""
        ]
            .join(" ")
            .trim();

        // tab pagination
        return (
            <div className="container mb-5">
                <div className="row d-flex flex-row ">
                    <div className="w-100 px-4  d-flex flex-row flex-wrap align-items-center justify-content-between paginatios">
                        <div className="d-flex flex-row align-items-center">
                            <h6 className={headerClass}>
                                <strong className="text-secondary">
                                    {length}
                                </strong>{" "}
                                Product
							</h6>
                            {currentPage && (
                                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                                    Page {' '}
                                    <span className="font-weight-bold">
                                        {currentPage}
                                    </span>
                                    /
                                    <span className="font-weight-bold">
                                        {totalPages}
                                    </span>
                                </span>
                            )}
                        </div>
                        <div className="d-flex flex-row py-4 align-items-center">
                            <Pagination
                                totalRecords={length}
                                pageLimit={9}
                                pageNeighbours={0}
                                onPageChanged={this.onPageChanged}
                            />
                        </div>
                    </div>

                    {/* ----- render produk ----- */}
                    {
                        showproduct.length < 1 ?
                            <div className="text-center mx-auto w-100 font-weight-bold" style={{ color: 'grey', fontSize: '20px' }}>Product not found<br />
                                Please try other or more general keywords</div>
                            :
                            showproduct.map((val, index) => {
                                const discount = showproduct[index].diskon
                                const harganormal = showproduct[index].harganormal
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
                            }
                            )}
                </div>
            </div>
        )
    }

    render() {
        let { searchfield, filterby } = this.state
        return (
            <div className="homepage">
                <Header />

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
                    <div className=" w-75 d-flex mx-auto mb-5" style={{ paddingRight: '12%', paddingLeft: '12%' }}>
                        <div style={{ width: '30%' }}>
                            <Input style={{ backgroundColor: 'whitesmoke' }} type='select' onChange={(e) => this.setState({ filterby: Number(e.target.value) })}>
                                <option value={0}>All Catgeory</option>
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
                            <a href={`${URL}search_result?keyword=${searchfield}&category=${filterby}`} style={{ height: '45px', textDecoration: 'none' }} >
                                <span className="input-group-text gray lighten-3" id="basic-text1" style={{ cursor: 'pointer', height: '38px' }}>
                                    <MDBIcon className="text-grey" icon="search" />
                                </span>
                            </a>
                        </div>
                    </div>
                    <div data-aos="fade-up" className="row  gallery" style={{ paddingLeft: "3%", paddingRight: "3%" }}>
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













{/* <div className="searchbox px-4 mx-auto pt-1 d-flex">
                            <div>
                                <Input type="search"
                                    className="mb-3"
                                    placeholder="search product.."
                                    onChange={this.onSearchChange}
                                />
                            </div>
                        </div>
                        {
                            this.state.dataProduk ?
                                this.renderpagination()
                                :
                                <Loadingspinner
                                    size={8}
                                    color={"#31332F"}
                                    margin={2}
                                />
                        } */}