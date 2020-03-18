import React, { Component } from 'react'
import Header from '../components/mainheader'
import { APIURL, APIURLimagetoko, URL } from '../helper/apiurl'
import { Input } from 'reactstrap'
import queryString from 'query-string'
import { MDBIcon } from "mdbreact";
import Axios from 'axios'


export default class searchResult extends Component {

    state = {
        searchfield: '',
        filterby: 0,
        category: []
    }

    componentDidMount() {
        const result = queryString.parse(this.props.location.search)
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
                    <option key={i} value={val.id}>{val.namakategori}</option>
                )
            })
        }
    }

    // RENDER RESULT SEARCH
    // ====================
    renderResultsearch = () => {

    }

    render() {
        const result = queryString.parse(this.props.location.search)
        console.log('INIIIIII', result.keyword)
        const { filterby, searchfield } = this.state
        return (
            <div>
                <div style={{ height: '75px', backgroundColor: 'black' }}><Header /></div>
                < div className="m-4">
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
                </div>

            </div >
        )
    }
}
