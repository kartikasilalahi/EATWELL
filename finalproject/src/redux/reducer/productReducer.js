const INITIAL_STATE = {
    idtransaction: 0,
    idtoko: 0,
    idproduk: 0,
    iduser: 0,
    qty: 0,
    totalharga: 0,
    status: '',
    pesanbuy: '',
    email: '',


    namaproduk: '',
    harganormal: 0,
    diskon: 0,
    taggalmulai: '',
    tanggalakhir: '',
    kuota: '',
    terjual: 0,
    kategoriproduk: '',
    namatoko: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'BUY_PRODUCT':
            console.log('di reducer', action.payload)
            return { ...state, ...action.payload }
        case 'JUMLAH_BUY':
            // console.log('pesan', action.payload)
            return { ...state, pesanbuy: action.payload }
        default:
            return state
    }
}
