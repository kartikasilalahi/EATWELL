import React, { Component } from 'react'
import Header from '../components/mainheader'
import { APIURL, APIURLimagetoko, URL } from '../helper/apiurl'
import { Input } from 'reactstrap'
import queryString from 'query-string'
import Axios from 'axios'
import 'aos/dist/aos.css'
import { Link } from 'react-router-dom';
import Zoom from '@material-ui/core/Zoom';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from 'react-reveal/Fade';
import Numeral from 'numeral'
import { MdRestaurant } from 'react-icons/md'
import Toast from 'light-toast'
import { MDBIcon } from "mdbreact";
import AOS from 'aos'

export default class searchResult extends Component {

    state = {
        searchfield: '',
        filterby: 0,
        category: [],
        allproduct: [],
        jumlahProduk: 0
    }

    componentDidMount() {
        const search = queryString.parse(this.props.location.search)
        Axios.get(`${APIURL}produk/kategoriproduk`)
            .then(res => this.setState({ category: res.data }))
            .catch((err) => { console.log(err) })
        Axios.get(`${APIURL}produk/search-product?keyword=${search.keyword}&page=1&category=${search.category}`)
            .then(res1 => this.setState({ allproduct: res1.data.produk, jumlahProduk: res1.data.jumlahprod.jumlah }))
            .catch((err1) => { console.log(err1) })
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

    // RENDER RESULT SEARCH
    // ====================
    renderResultsearch = () => {
        let { allproduct } = this.state
        return allproduct.map((val, index) => {
            const discount = allproduct[index].diskon
            const harganormal = allproduct[index].harganormal
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

    render() {
        const result = queryString.parse(this.props.location.search)
        console.log('INIIIIII', this.state.jumlahProduk)
        const { filterby, searchfield } = this.state
        return (
            <div>
                <div style={{ height: '75px', backgroundColor: 'black' }}><Header /></div>
                <div className="m-4">
                    <div className=" w-75 d-flex mx-auto mb-3" style={{ paddingRight: '12%', paddingLeft: '12%' }}>
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
                </div>

                <div className="jumlahprod" style={{ paddingLeft: "10%", paddingRight: "10%", color: 'gray' }}>
                    <h6>Result ({this.state.jumlahProduk} Products)</h6>
                </div>
                <div className="row gallery px-5 mx-5 my-1" style={{ paddingLeft: "3%", paddingRight: "3%" }}>
                    {this.renderResultsearch()}
                </div>
            </div >
        )
    }
}
