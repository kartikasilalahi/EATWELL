import React, { Component } from 'react'
import queryString from 'query-string'
import Fade from 'react-reveal/Fade';
import Numeral from 'numeral'
import Axios from 'axios'
import 'aos/dist/aos.css'
import moment from 'moment'
import { MdRestaurant } from 'react-icons/md'
import { MDBIcon, MDBPagination, MDBPageItem, MDBPageNav } from "mdbreact";
import { APIURL, APIURLimagetoko, URL } from '../helper/apiurl'
import { Input } from 'reactstrap'
import Header from '../components/mainheader'
import Loadingspinner from 'react-spinners/PulseLoader'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

class searchResult extends Component {

    state = {
        searchfield: 'All Product',
        filterby: '',
        newsearchfield: '',
        newfilterby: 'All Category',
        listcategory: [],
        allproduct: null,
        jumlahProduk: 0,
        currentpage: 0,
    }

    componentDidMount() {
        let search = queryString.parse(this.props.location.search)
        console.log(search.category)
        Axios.get(`${APIURL}produk/kategoriproduk`)
            .then(res => this.setState({ listcategory: res.data }))
            .catch((err) => { console.log(err) })
        Axios.get(`${APIURL}produk/search-product?keyword=${search.keyword}&page=${search.page}&category=${search.category}`)
            .then(res1 => {
                if (res1.data.produklength === 0) {
                    console.log('masuk sini')
                    this.setState({
                        allproduct: res1.data.produk,
                        jumlahProduk: res1.data.jumlahprod.jumlah,
                        currentpage: parseInt(search.page),
                        filterby: search.category
                    })
                }
                else {
                    if (search.page != 0) {
                        if (search.keyword) this.setState({ searchfield: search.keyword })

                        this.setState({
                            allproduct: res1.data.produk,
                            jumlahProduk: res1.data.jumlahprod.jumlah,
                            currentpage: parseInt(search.page),
                            filterby: search.category
                        })

                    } else {
                        this.setState({
                            allproduct: res1.data.produk,
                            jumlahProduk: res1.data.jumlahprod.jumlah,
                            currentpage: parseInt(search.page)
                        })

                    }
                }
            })
            .catch((err1) => { console.log(err1) })
    }


    // RENDER CATEGORY
    // ===============
    renderCategory = () => {
        if (this.state.listcategory) {
            return this.state.listcategory.map((val, i) => {
                if (this.state.filterby == val.namakategori) {
                    return <option key={i} value={val.namakategori} selected > {val.namakategori}</option >
                }
                return <option key={i} value={val.namakategori} > {val.namakategori}</option >
            })
        }
    }

    // RENDER RESULT SEARCH
    // ====================
    renderResultsearch = () => {
        let { roleid } = this.props
        let { allproduct } = this.state
        return allproduct.map((val, index) => {
            let discount = allproduct[index].diskon
            let hargadiskon = 'Rp. ' + Numeral(allproduct[index].hargadisc).format('0,0.00')
            let harganormal = 'Rp. ' + Numeral(allproduct[index].harganormal).format('0,0.00')
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

    // RENDER PAGINATION
    // =================
    renderPagination = () => {
        // this.state.jumlahProduk
        let { currentpage, filterby } = this.state
        let search = queryString.parse(this.props.location.search)
        let lastitem = Math.ceil(this.state.jumlahProduk / 12)
        console.log('last', lastitem)
        let paging = []
        if (lastitem === 1) {
            paging.push(
                <div>
                    <MDBPageItem active={currentpage === 1 ? true : false}>
                        <MDBPageNav href={`${URL}search_result?keyword=${search.keyword}&page=${1}`}>
                            {1}
                        </MDBPageNav>
                    </MDBPageItem>
                </div>
            )
        }
        else {
            for (let i = currentpage; i < currentpage + 2; i++) {
                if (currentpage === lastitem) {
                    paging.push(
                        <div>
                            <MDBPageItem active={currentpage === i - 1 ? true : false}>
                                <MDBPageNav href={`${URL}search_result?keyword=${search.keyword}&page=${i - 1}&category=${filterby}`}>
                                    {i - 1}
                                </MDBPageNav>
                            </MDBPageItem>
                        </div>
                    )
                } else {
                    paging.push(<div>
                        <MDBPageItem active={this.state.currentpage === i ? true : false}>
                            <MDBPageNav href={`${URL}search_result?keyword=${search.keyword}&page=${i}&category=${filterby}`}>
                                {i}
                            </MDBPageNav>
                        </MDBPageItem>
                    </div>
                    )

                }
            }
        }
        return paging
    }

    render() {
        let { allproduct, filterby, searchfield, currentpage, jumlahProduk, newfilterby, newsearchfield } = this.state
        let search = queryString.parse(this.props.location.search)
        let lastitem = Math.ceil(jumlahProduk / 12)

        if (allproduct === null) {
            return <Loadingspinner
                size={8}
                color={"#31332F"}
                margin={2}
            />
        }
        return (
            <div>
                <div style={{ height: '75px', backgroundColor: 'black' }}><Header /></div>
                <div className="m-4">
                    <div className=" w-75 d-flex mx-auto mb-3" style={{ paddingRight: '12%', paddingLeft: '12%' }}>
                        <div style={{ width: '30%' }}>
                            <Input style={{ backgroundColor: 'whitesmoke' }} type='select' onChange={(e) => this.setState({ newfilterby: e.target.value })}>
                                <option value={'All Category'}>All Catgeory</option>
                                {this.renderCategory()}
                            </Input>
                        </div>
                        <div className="ml-0" style={{ width: '60%' }}>
                            <Input type="search"
                                className="mb-3"
                                placeholder="search product.."
                                onChange={(e) => { this.setState({ newsearchfield: e.target.value }) }}
                            />
                        </div>
                        <div className="mx-0 input-group-prepend" >
                            <a href={`${URL}search_result?keyword=${newsearchfield}&page=1&category=${newfilterby}`} style={{ height: '45px', textDecoration: 'none' }} >
                                <span className="input-group-text gray lighten-3" id="basic-text1" style={{ cursor: 'pointer', height: '38px' }}>
                                    <MDBIcon className="text-grey" icon="search" />
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="jumlahprod" style={{ paddingLeft: "10%", paddingRight: "10%", color: 'gray' }}>
                    <h6>Search results for '{searchfield}' with the category '{filterby}'</h6>
                    <h6>Result ({jumlahProduk} Products)</h6>
                </div>
                {
                    jumlahProduk ?
                        <div>
                            <div className="row gallery px-5 mx-5 my-1" style={{ paddingLeft: "3%", paddingRight: "3%" }}>
                                {this.renderResultsearch()}
                            </div>
                            <div className="pagination d-flex justify-content-center pb-5">
                                <MDBPagination circle color='teal'>
                                    <MDBPageItem disabled={currentpage === 1 ? true : false}>
                                        <MDBPageNav href={`${URL}search_result?keyword=${search.keyword}&page=${1}&category=${filterby}`} >
                                            <span>first</span>
                                        </MDBPageNav>
                                    </MDBPageItem>
                                    <MDBPageItem disabled={currentpage === 1 ? true : false}>
                                        <MDBPageNav href={`${URL}search_result?keyword=${search.keyword}&page=${parseInt(search.page) - 1}&category=${filterby}`} >
                                            <span aria-hidden="true">&laquo;</span>
                                            <span className="sr-only">Previous</span>
                                        </MDBPageNav>
                                    </MDBPageItem>
                                    {this.renderPagination()}
                                    <MDBPageItem disabled={currentpage === lastitem ? true : false}>
                                        <MDBPageNav href={`${URL}search_result?keyword=${search.keyword}&page=${parseInt(search.page) + 1}&category=${filterby}`} >
                                            &raquo;
                                        </MDBPageNav>
                                    </MDBPageItem>
                                    <MDBPageItem disabled={currentpage === lastitem ? true : false}>
                                        <MDBPageNav href={`${URL}search_result?keyword=${search.keyword}&page=${lastitem}&category=${filterby}`} >
                                            <span>last</span>
                                        </MDBPageNav>
                                    </MDBPageItem>
                                </MDBPagination>
                            </div>
                        </div>
                        : <div className="text-center mx-auto w-100 font-weight-bold" style={{ color: 'grey', fontSize: '20px' }}>Product not found<br />
                        Please try other or more general keywords :)</div>
                }
            </div >
        )
    }
}
const MapStateToProps = (state) => {
    return {
        roleid: state.authReducer.roleid
    }
}

export default connect(MapStateToProps, {})(searchResult);