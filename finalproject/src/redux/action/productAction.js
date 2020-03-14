import Axios from 'axios'
import { APIURL } from '../../helper/apiurl'


export const buyProduct = ({ iduser, idtoko, idproduk, qty, totalharga, email }) => {
    console.log('qty', qty)
    return (dispatch) => {
        Axios.post(`${APIURL}transaction/buyproduct`, { iduser, idtoko, idproduk, qty, totalharga, email })
            .then(res => {
                console.log(res.data[0])
                dispatch({ type: 'BUY_PRODUCT', payload: res.data[0] })
            }).catch(err => {
                console.log(err)
            })
    }
}