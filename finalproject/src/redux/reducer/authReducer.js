import {
    AUTH_LOADING,
    LOGIN_LOADING,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    OPEN_LOGIN,
    OPEN_REGISTER,
    LOGOUT_SUCCESS,
    REGISTER_PEMBELI_ERROR,
    REGISTER_PEMBELI_SUCCESS,
    REGISTER_TOKO_ERROR,
    REGISTER_TOKO_SUCCESS
} from './../action/types'

const INITIAL_STATE = {
    id: 0,
    username: '',
    email: '',
    phone: '',
    namaresto: '',
    emailresto: '',
    status: '',
    roleid: 0,

    errorregist: '',
    register: false,

    loginnotif: false,

    // registerToko:false,

    loading: false,

    login: false,
    errorlogin: '',
    loginStatus: false,

    modallogin: false,
    modalregister: false,

    errorregistToko: '',
    registerToko: false,

    loadingregist: false

}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        /* === login === */
        case LOGIN_SUCCESS:
            return { ...state, ...action.payload, modallogin: false, login: true, loading: false, errorlogin: '', loginnotif: true }
        case "LOGIN_NOTIF":
            console.log('iniii')
            console.log({ loginnotif: action.payload })
            return { ...state, loginnotif: action.payload }
        case LOGIN_ERROR:
            console.log('error login', action.payload)
            return { ...state, errorlogin: action.payload, loading: false }
        case LOGOUT_SUCCESS:
            return { ...INITIAL_STATE }

        /* === modal === */
        case OPEN_LOGIN:
            return { ...state, modallogin: action.payload }
        case OPEN_REGISTER:
            return { ...state, modalregister: action.payload }

        /* === register pembeli === */
        case REGISTER_PEMBELI_SUCCESS:
            return { ...state, ...action.payload, errorregist: '', register: true, modalregister: false, loadingregist: false }
        case REGISTER_PEMBELI_ERROR:
            return { ...state, errorregist: action.payload, modalregister: true, loadingregist: false }

        /* === register toko === */
        case REGISTER_TOKO_SUCCESS:
            console.log('direducer', action.payload)
            return { ...state, ...action.payload, registerToko: true, errorregistToko: '', loadingregist: false }
        case REGISTER_TOKO_ERROR:
            return { ...state, errorregistToko: action.payload, loadingregist: false }
        case "LOADING_REGIST":
            return { ...state, loadingregist: true, errorregistToko: '', errorregist: '' }
        default:
            return state
    }
}