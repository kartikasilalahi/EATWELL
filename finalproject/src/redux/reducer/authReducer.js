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

    resgistsucces: '',
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
            return { ...state, ...action.payload, modallogin: false, login: true, loading: false, errorlogin: '', loginnotif: true, resgistsucces: '' }
        case "LOGIN_NOTIF":
            return { ...state, loginnotif: action.payload, resgistsucces: '' }
        case LOGIN_ERROR:
            console.log('error login', action.payload)
            return { ...state, errorlogin: action.payload, loading: false, resgistsucces: '' }
        case LOGOUT_SUCCESS:
            return { ...INITIAL_STATE }

        /* === modal === */
        case OPEN_LOGIN:
            return { ...state, modallogin: action.payload, resgistsucces: '' }
        case OPEN_REGISTER:
            return { ...state, modalregister: action.payload, resgistsucces: '' }

        /* === register pembeli === */
        case REGISTER_PEMBELI_SUCCESS:
            // console.log(action.payload)
            return { ...state, resgistsucces: action.payload, errorregist: '', register: true, modalregister: false, loadingregist: false }
        case REGISTER_PEMBELI_ERROR:
            return { ...state, errorregist: action.payload, modalregister: true, loadingregist: false, resgistsucces: '' }

        /* === register toko === */
        case REGISTER_TOKO_SUCCESS:
            // console.log('direducer', action.payload)
            return { ...state, ...action.payload, registerToko: true, errorregistToko: '', loadingregist: false, resgistsucces: '' }
        case REGISTER_TOKO_ERROR:
            return { ...state, errorregistToko: action.payload, loadingregist: false, resgistsucces: '' }
        case "LOADING_REGIST":
            return { ...state, loadingregist: true, errorregistToko: '', errorregist: '', resgistsucces: '' }
        default:
            return state
    }
}