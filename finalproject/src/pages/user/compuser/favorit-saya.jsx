import React, { useState } from 'react'
import { useEffect } from 'react';
import Axios from 'axios';
import Fade from 'react-reveal/Fade';
import Numeral from 'numeral'
import { MdRestaurant } from 'react-icons/md'
import { Redirect, Link } from 'react-router-dom';
import { APIURL, APIURLimagetoko } from '../../../helper/apiurl';

function Wishlist() {

    const [dataProduk, setdataProduk] = useState([]);

    useEffect(() => {
        let id = localStorage.getItem('id')
        Axios.get(`${APIURL}produk/getwishlist/${id}`)
            .then(res => {
                // console.log('result', res.data)
                setdataProduk(res.data)
            }).catch(err => {
                console.log(err)
            })

    }, [])


    // RENDER WISHLIST
    // ===============
    const wishlist = () => {
        return dataProduk.map((val, i) => {
            const discount = dataProduk[i].diskon
            const harganormal = dataProduk[i].harganormal
            const hargadiskon = 'Rp.' + Numeral(harganormal - Math.round(harganormal * discount / 100)).format('0,0.00')
            return (
                <Fade key={i} bottom cascade>
                    <div key={i} className="grid wish">
                        <Link to={'/detailproduk/' + val.idproduk}>
                            <figure className="effect-winston wishlist">
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
                                </figcaption>
                            </figure>
                        </Link>

                    </div>
                </Fade>
            )
        })
    }


    if (dataProduk.length < 1) {
        return (
            <div >
                <div className="no-transaksi-user text-center">
                    <img className="img-no-transaksi" height='300px' src={require('../../../pages/images/novoucher.svg')} alt="" />
                    <p>No Wishlist</p>
                </div>
            </div>
        )
    }
    return (
        <div className="mx-3">
            <div className="row">
                {wishlist()}
            </div>
        </div>
    )
}

export default Wishlist
