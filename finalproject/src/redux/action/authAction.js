import Axios from 'axios'
import {
    OPEN_LOGIN,
    OPEN_REGISTER,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_SUCCESS,
    AUTH_LOADING,
    REGISTER_PEMBELI_SUCCESS,
    REGISTER_PEMBELI_ERROR,
    REGISTER_TOKO_SUCCESS,
    REGISTER_TOKO_ERROR,
} from './types'
import { APIURL } from './../../helper/apiurl'

export const LOADING = act => {
    return {
        type: AUTH_LOADING,
        payload: act
    }
}

/* === modal login === */
export const Open_Login = act => {
    return {
        type: OPEN_LOGIN,
        payload: act
    };
};

/* === modal register === */
export const Open_Register = act => {
    return {
        type: OPEN_REGISTER,
        payload: act
    };
};

export const LoadingRegist = act => {
    return {
        type: 'LOADING_REGIST',
        payload: act
    }
}

/* === render error login === */
export const ERROR_LOGIN = (act) => {
    return {
        type: LOGIN_ERROR,
        payload: act
    }
}

/* === render error register user === */
export const ERROR_REGISTER_PEMBELI = (act) => {
    return {
        type: REGISTER_PEMBELI_ERROR,
        payload: act
    }
}

/* === register pembeli === */
export const PembeliRegister = ({ username, email, phone, password, confpassword }) => {
    return (dispatch) => {
        // dispatch({ type: AUTH_LOADING })
        if (username === '' || email === '' || phone === "" || password === '') {
            return dispatch({ type: REGISTER_PEMBELI_ERROR, payload: "Ops.. Field can't be empty!" })
        }
        if (password !== confpassword) {
            return dispatch({ type: REGISTER_PEMBELI_ERROR, payload: "Ops.. Password must be match!" })
        }
        else {
            Axios.post(APIURL + 'auth/registerver', { username, email, phone, password })
                .then((res) => {
                    console.log('ini akun regist', res.data)
                    if (res.data.status === REGISTER_PEMBELI_ERROR) {
                        return dispatch({ type: REGISTER_PEMBELI_ERROR, payload: res.data.message })
                    } else {
                        return dispatch({ type: REGISTER_PEMBELI_SUCCESS, payload: 'Registered. Please check your email to verification :)' })
                        // console.log('success regist pembeli')
                    }
                }).catch((err) => {
                    console.log(err);
                })
        }
    }
}

/* === register toko === */
export const TokoRegister = ({ username, namatoko, alamat, email, phone, password, confpassword }) => {
    return (dispatch) => {
        // dispatch({ type: AUTH_LOADING })

        if (username === '' || email === '' || phone === "" || password === '' || namatoko === "" || alamat === "") {
            return dispatch({ type: REGISTER_TOKO_ERROR, payload: "Ops.. Field can't be empty!" })
        }
        if (password !== confpassword) {
            return dispatch({ type: REGISTER_TOKO_ERROR, payload: "Ops.. Password must be match!" })
        }
        else {
            Axios.post(APIURL + 'auth/registertoko', { username, email, phone, password, namatoko, alamat })
                .then((res) => {
                    // console.log('ini akun regist', res.data)
                    if (res.data.status === REGISTER_TOKO_ERROR) {
                        dispatch({ type: REGISTER_TOKO_ERROR, payload: res.data.message })
                    } else {
                        console.log('success regist toko')
                        dispatch({ type: REGISTER_TOKO_SUCCESS, payload: res.data })
                    }
                }).catch((err) => {
                    console.log('error disini')
                    console.log(err);
                })
        }
    }
}



/* === login === */
export const Login_User = (username, password) => {
    return (dispatch) => {
        dispatch({ type: AUTH_LOADING })
        Axios.get(`${APIURL}auth/login?username=${username}&password=${password}`)
            .then(res => {
                if (res.data.status === LOGIN_SUCCESS) {
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('id', res.data.id)
                    dispatch({ type: LOGIN_SUCCESS, payload: res.data.result })
                        .then(() => {

                            dispatch({ type: Login_Success, payload: false })
                        })
                } else {
                    // console.log('2')
                    dispatch({ type: LOGIN_ERROR, payload: res.data.message })
                }
            })
            .catch(err => {
                console.log('error catch login', err)
            })
    }
}

export const reLogin = payload => {
    return {
        type: LOGIN_SUCCESS,
        payload
    }
}

export const Login_Success = act => {
    return {
        type: 'LOGIN_NOTIF',
        payload: act
    }
}

export const Regist_Success = act => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: act
    }
}


/* === logout === */
export const Logout_Success = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}
