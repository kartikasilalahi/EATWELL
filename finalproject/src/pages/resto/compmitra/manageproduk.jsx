import React, { useEffect, useState, useRef } from 'react'
import { Table, Input, Button, FormGroup, Label, CustomInput } from 'reactstrap'
import moment from 'moment'
import Axios from "axios"
import Modaltemplate from '../../../components/modaltemplate'
import { APIURL, APIURLimagetoko } from '../../../helper/apiurl'
import Tooltip from '@material-ui/core/Tooltip';
import Toast from 'light-toast'

function Manageproduk() {
    const [dataProduk, setdataProduk] = useState([])
    const [dataProdukEdit, setdataProdukEdit] = useState([]);
    const [dataProdukDelete, setdataProdukDelete] = useState([]);
    const [kategoriProduk, setkategoriProduk] = useState([]);
    const [dataImage, setdataImage] = useState([]);
    const [dataImageResto, setdataImageResto] = useState([]);
    const [idProduk, setidProduk] = useState();
    const [imageEdit, setimageEdit] = useState();
    const [imageDelete, setimageDelete] = useState();
    const [dataImageEdit, setdataImageEdit] = useState();
    const [searchfield, setsearchfield] = useState('');
    const [filterProduct, setfilterProduct] = useState([]);

    const [modalAdd, setModalAdd] = useState(false)
    const toggleModalAdd = () => { setModalAdd(!modalAdd) }

    const [modalEdit, setModaledit] = useState(false)
    const toggleModalEdit = () => { setModaledit(!modalEdit) }   // togel yang ini utk modal editnya

    const [modalDelete, setmodalDelete] = useState(false)
    const togglemodalDelete = () => { setmodalDelete(!modalDelete) }

    const [editImage, seteditImage] = useState(false)

    const [addnewimage, setaddnewimage] = useState(false);

    const [modalImage, setmodalImage] = useState(false)
    const togglemodalImage = () => {
        setmodalImage(!modalImage)
        seteditImage(false)
    }


    // STATE ADD PRODUK
    // ================
    const [addProduk, setaddProduk] = useState({
        namaproduk: useRef(),
        diskon: useRef(),
        harganormal: useRef(),
        tanggalmulai: useRef(),
        tanggalakhir: useRef(),
        kuota: useRef(),
        idkategoriproduk: '',
        maxbeli: useRef()
    })

    // HANDLE IMAGES
    // =============
    const HandleImages = (e) => {
        setdataImage([...dataImage, ...e.target.files])
    }

    // HANDLE EDIT IMAGE
    // =================
    const HandleEditImages = (e) => {
        setdataImageEdit(e.target.files[0])
    }

    // HANDLE KATEGORI
    // ===============
    const HandleKategori = (e) => {
        const { name, value } = e.target
        setaddProduk({ ...addProduk, [name]: value })
    }



    // USE EFFECT
    // ==========
    useEffect(() => {
        let id = parseInt(localStorage.getItem('id'))
        Axios.get(`${APIURL}produk/dataprodresto/${id}`)
            .then(result => {
                setdataProduk(result.data)
                Axios.get(`${APIURL}produk/kategoriproduk`)
                    .then(res => {
                        setkategoriProduk(res.data)
                        Axios.get(`${APIURL}produk/imgprodresto/${idProduk}`)
                            .then(res1 => { setdataImageResto(res1.data) })
                            .catch(err => { console.log(err) })
                    })
                    .catch(err => { console.log(err) })
            })

    }, [idProduk])



    // FUNCTION ADD PRODUK
    // ===================
    const addNewProduk = () => {
        // console.log('ini img yg di add', dataImage)
        let id = parseInt(localStorage.getItem('id'))
        var formdata = new FormData()
        const { namaproduk, harganormal, diskon, kuota, tanggalmulai, tanggalakhir, idkategoriproduk, maxbeli } = addProduk
        const addnewProduk = {
            namaproduk: namaproduk.current.value,
            harganormal: parseInt(harganormal.current.value),
            diskon: parseInt(diskon.current.value),
            kuota: parseInt(kuota.current.value),
            tanggalmulai: tanggalmulai.current.value,
            tanggalakhir: tanggalakhir.current.value,
            idkategoriproduk: parseInt(idkategoriproduk),
            idtoko: id,
            terjual: 0,
            maxbeli: parseInt(maxbeli.current.value)
        }

        console.log(maxbeli.current.value)
        var Headers = {
            headers:
            {
                'Content-Type': 'multipart/form-data'
            }
        }
        for (var i = 0; i < dataImage.length; i++) {
            formdata.append('image', dataImage[i])
        }
        console.log('DATAIMG', dataImage)

        formdata.append('data', JSON.stringify(addnewProduk))
        Axios.post(`${APIURL}produk/addprodukresto`, formdata, Headers)
            .then(res => {
                Toast.success('success..', 1000)
                setdataProduk(res.data)
                setModalAdd(!modalAdd)
            }).catch(err => console.log(err))
        setdataImage([])
    }

    // EDIT PRODUK
    // ===========
    const editProdukResto = () => {
        const editproduk = {
            namaproduk: dataProdukEdit.namaproduk,
            diskon: dataProdukEdit.diskon,
            harganormal: dataProdukEdit.harganormal,
            kuota: dataProdukEdit.kuota,
            tanggalmulai: moment(dataProdukEdit.tanggalmulai).format('YYYY-MM-DD'),
            tanggalakhir: moment(dataProdukEdit.tanggalakhir).format('YYYY-MM-DD'),
            idtoko: localStorage.getItem('id')

        }
        const idproduk = dataProdukEdit.id
        Axios.put(`${APIURL}produk/editprodukresto/${idproduk}`, editproduk)
            .then(res => { setdataProduk(res.data) })
            .catch(err => { console.log(err); })
        setModaledit(!modalEdit)
    }

    // DELETE PRODUK
    // =============
    const deleteProdukResto = () => {
        console.log(dataProdukDelete)
        var idtoko = parseInt(localStorage.getItem('id'))
        const idproduk = dataProdukDelete.id
        Axios.delete(`${APIURL}produk/deleteprodukresto/${idproduk}`)
            .then(() => {
                setmodalDelete(!modalDelete)
                Axios.get(`${APIURL}produk/dataprodresto/${idtoko}`)
                    .then(res1 => {
                        Toast.success('deleted..', 1500)
                        setdataProduk(res1.data)
                    })
                    .catch(err => { console.log(err) })
            }).catch(err => { console.log(err) })
    }

    // RENDER KATEGORI PRODUK
    // ======================
    const renderKategoriProduk = () => {
        return kategoriProduk.map((val, i) => {
            if (dataProdukEdit.idkategoriproduk === val.id) {
                return <option key={i} value={val.id} selected>{val.namakategori}</option>
            }
            return <option key={i} value={val.id}>{val.namakategori}</option>
        })
    }

    // RENDER PRODUK
    // =============
    const renderProduk = () => {
        const filterProduct = dataProduk.filter(val => {
            return val.namaproduk.toLowerCase().includes(searchfield.toLowerCase())
        })
        // setfilterProduct
        return filterProduct.map((val, i) => {
            return (
                <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{val.namaproduk}</td>
                    <td>{val.diskon}%</td>
                    <td>{val.harganormal}</td>
                    <td>{moment(val.tanggalmulai).format('DD MMMM YYYY')}</td>
                    <td>{moment(val.tanggalakhir).format('DD MMMM YYYY')}</td>
                    <td>{val.kuota}</td>
                    <td>{val.terjual}</td>
                    <td>
                        <Tooltip title="Open image" arrow placement="top">
                            <img style={{ cursor: "pointer" }} onClick={() => {
                                setidProduk(filterProduct[i].id)
                                setmodalImage(!modalImage)
                            }} width="25px" src={require('../../../pages/images/icons/openimg.svg')}></img>
                        </Tooltip>
                    </td>
                    <td>
                        <Tooltip title="Edit" arrow placement="top">
                            <img style={{ cursor: "pointer" }} className="mx-3" onClick={() => {
                                setdataProdukEdit(filterProduct[i])
                                setModaledit(!modalEdit)
                            }} width="22px" src={require('../../../pages/images/icons/content.svg')}></img>
                        </Tooltip>
                        <Tooltip title="Delete produk?" arrow placement="top">
                            <img style={{ cursor: "pointer" }} onClick={() => {
                                setdataProdukDelete(filterProduct[i])
                                setmodalDelete(!modalDelete)
                            }} width="25px" src={require('../../../pages/images/icons/bin.svg')}></img>
                        </Tooltip>
                    </td>
                </tr>
            )
        })
    }

    // RENDER PRODUK IMAGE
    // ===================
    const renderProdukImage = () => {
        let idtoko = localStorage.getItem('id')
        let idToko = {
            idtoko: idtoko
        }
        console.log('dataImgrsto', dataImageResto.length)
        return (
            dataImageResto.map((val, i) => {
                return (
                    <div key={i} className="col-2 m-2">

                        <img src={`${APIURLimagetoko + val.image}`} width="130px" height="86.6" alt="" />
                        <div>
                            <img onClick={() => editImageClick(i)} className="ml-5 mt-3 edit" style={{ cursor: "pointer" }} width="18px" src={require('../../../pages/images/icons/content.svg')}></img>
                            {

                                dataImageResto.length > 1 ?
                                    <Tooltip title="Are you sure to delete the image? click if you sure" arrow placement="top">
                                        <img
                                            /* --- delete image ----*/
                                            onClick={() => {
                                                Axios.get(`${APIURL}produk/deleteimgprodresto/${dataImageResto[i].id}`, { idtoko })
                                                    .then(() => {
                                                        Toast.loading(`Delete image. Please wait a moment`);
                                                        setTimeout(() => {
                                                            Axios.get(`${APIURL}produk/imgprodresto/${idProduk}`)
                                                                .then(res1 => { setdataImageResto(res1.data) })
                                                                .catch(err => { console.log(err) })
                                                            Toast.success('deleted..', 1500)
                                                            Toast.hide();
                                                        }, 2000);
                                                    })
                                                    .catch(err => { console.log(err) })
                                            }}
                                            className="mt-3 ml-2 delete" style={{ cursor: "pointer" }} width="20px"
                                            src={require('../../../pages/images/icons/bin.svg')}>
                                        </img>
                                    </Tooltip>
                                    :
                                    dataImageResto.length == 0 ? null
                                        :
                                        null
                            }

                        </div>
                    </div>
                )
            })
        )
    }

    // KLIK EDIT IMAGE
    // ==============
    const editImageClick = (i) => {
        seteditImage(true)
        setaddnewimage(false)
        setimageEdit(dataImageResto[i])
    }

    // INPUT EDIT IMAGE
    // ================
    const renderEditImage = () => {
        return (
            <div className="col-6 d-flex my-3 pl-4">
                <CustomInput type='file' label='Select Image..' onChange={HandleEditImages} className='form-control' />
                <img className="pt-1 pl-2 cancel" onClick={() => seteditImage(false)} style={{ cursor: "pointer" }} src={require('../../../pages/images/icons/close.svg')} alt="cancel" height="28px" />
                <img className="pt-1 pl-2" onClick={uploadEditImage} style={{ cursor: "pointer" }} src={require('../../../pages/images/icons/upload.svg')} alt="upload" height="28px" />
            </div>
        )
    }

    // UPLOAD IMAGE EDIT
    // =================
    const uploadEditImage = () => {
        let idtoko = parseInt(localStorage.getItem('id'))
        let idimage = imageEdit.id
        var formdata = new FormData()
        // console.log('yg akan diupload', dataImageEdit)
        let dataimg = {
            idProduk,
            idimage,
            idtoko
        }
        console.log('idproduk', idProduk)
        var Headers = {
            headers:
            {
                'Content-Type': 'multipart/form-data'
            }
        }
        formdata.append('data', JSON.stringify(dataimg))

        formdata.append('image', dataImageEdit)
        Axios.put(`${APIURL}produk/editimageprodukresto/${dataimg.idimage}`, formdata, Headers)
            .then(() => {
                Toast.loading(`Update image. Please wait a moment`);
                setTimeout(() => {
                    Axios.get(`${APIURL}produk/imgprodresto/${idProduk}`)
                        .then(res1 => {
                            setdataImageResto(res1.data)
                            seteditImage(false)
                        }).catch(err => { console.log(err) })
                    Toast.success('success edit..', 1500)
                    Toast.hide();
                }, 2000);
            }).catch(err => {
                console.log('NO')
                console.log(err);
            })
    }

    // ONSEARCH CAHANGE
    // =================
    const onSearchChange = (e) => {
        console.log(e.target.value)
        setsearchfield(e.target.value)
    }

    // ADD NEW IMAGE PRODUCT 
    // =====================
    const addNewimage = () => {

    }


    // RETURN FUNCTION
    // ===============
    return (
        <div className="manageproduk">
            {/* -------- modal add -------- */}
            <Modaltemplate tombol={true} buttonName="ADD" title='Add Product' toggle={toggleModalAdd} modal={modalAdd} actionFunc={addNewProduk}>
                <div className="d-flex mt-3">
                    <div className="col-6">
                        <Input className="mb-3" type="text" placeholder="Input Product Name" innerRef={addProduk.namaproduk} />
                        <Input className="mb-3" type="number" placeholder="Input Discount" innerRef={addProduk.diskon} />
                        <Input className="mb-3" type="number" placeholder="Input Normal Price" innerRef={addProduk.harganormal} />
                        <Input className="mb-3" type="number" placeholder="Input Product Kuota" innerRef={addProduk.kuota} />
                        <FormGroup>
                            <Label> Tanggal Mulai</Label>
                            <Input type="date" innerRef={addProduk.tanggalmulai} />
                        </FormGroup>
                        <FormGroup>
                            <Label> Tanggal Berakhir</Label>
                            <Input type="date" innerRef={addProduk.tanggalakhir} />
                        </FormGroup>
                    </div>
                    <div className="col-6">
                        <FormGroup>
                            <select name="idkategoriproduk" className="form-control" onChange={HandleKategori}>
                                <option hidden value="">Select Category..</option>
                                {renderKategoriProduk()}
                            </select>
                        </FormGroup>
                        <Input className="mb-3" type="number" placeholder="Input maximum purchase" innerRef={addProduk.maxbeli} />

                        <FormGroup >
                            <Label> Product Images</Label>
                            <CustomInput type='file' label='Select Image..' multiple='true' onChange={HandleImages} className='form-control' />
                            <CustomInput type='file' label='Select Image..' multiple='true' onChange={HandleImages} className='form-control' />
                            <CustomInput type='file' label='Select Image..' multiple='true' onChange={HandleImages} className='form-control' />
                            <CustomInput type='file' label='Select Image..' multiple='true' onChange={HandleImages} className='form-control' />
                            <CustomInput type='file' label='Select Image..' multiple='true' onChange={HandleImages} className='form-control' />
                        </FormGroup>
                    </div>
                </div>
            </Modaltemplate>

            {/* -------- modal edit -------- */}
            <Modaltemplate tombol={true} buttonName="SAVE" title='Edit Product' toggle={toggleModalEdit} modal={modalEdit} actionFunc={editProdukResto} >
                <div className="d-flex mt-3" >
                    <div className="col-6">
                        <Label> Edit Product Name:</Label>
                        <Input className="mb-3" type="text"
                            value={dataProdukEdit.namaproduk}
                            onChange={e => setdataProdukEdit({ ...dataProdukEdit, namaproduk: e.target.value })} />
                        <Label> Edit Product Discount: </Label>
                        <Input className="mb-3" type="number"
                            value={dataProdukEdit.diskon}
                            onChange={e => setdataProdukEdit({ ...dataProdukEdit, diskon: e.target.value })} />
                        <Label> Edit Normal Price: </Label>
                        <Input className="mb-3" type="number"
                            value={dataProdukEdit.harganormal}
                            onChange={e => setdataProdukEdit({ ...dataProdukEdit, harganormal: e.target.value })} />
                        <Input type="select" name="idkategoriproduk"
                            onChange={HandleKategori}>
                            <option disabled selected hidden>Select Category..</option>
                            {renderKategoriProduk()}
                        </Input>
                    </div>
                    <div className="col-6">
                        <Label> Edit Product Kuota</Label>
                        <Input className="mb-3" type="number"
                            value={dataProdukEdit.kuota}
                            onChange={e => setdataProdukEdit({ ...dataProdukEdit, kuota: e.target.value })} />
                        <FormGroup>
                            <Label> Edit tanggal mulai</Label>
                            <Input type="date"
                                defaultValue={moment(dataProdukEdit.tanggalmulai).format('YYYY-MM-DD')}
                                onChange={e => setdataProdukEdit({ ...dataProdukEdit, tanggalmulai: e.target.value })} />
                        </FormGroup>
                        <FormGroup>
                            <Label> Edit tanggal berakhir</Label>
                            <Input type="date"
                                defaultValue={moment(dataProdukEdit.tanggalakhir).format('YYYY-MM-DD')}
                                onChange={e => setdataProdukEdit({ ...dataProdukEdit, tanggalakhir: e.target.value })} />
                        </FormGroup>
                    </div>
                </div>
            </Modaltemplate>

            {/* -------- modal delete -------- */}
            <Modaltemplate tombol={true} buttonName="delete" title='Delete Product' toggle={togglemodalDelete} modal={modalDelete} actionFunc={deleteProdukResto} >
                <div className="pl-3">
                    Are you sure to delete this product?
                </div>
            </Modaltemplate>

            {/* -------- modal product images -------- */}
            <Modaltemplate title='Product Image' toggle={togglemodalImage} modal={modalImage} style={{ width: "auto" }} >
                <div className="p-3">
                    {/* <div className="d-flex">
                        <Button size='sm' className="btn btn-green py-1" style={{ marginLeft: '4%' }} onClick={() => {
                            setaddnewimage(true)
                            seteditImage(false)
                        }} >New image</Button>
                        {
                            addnewimage ?
                                <div style={{ marginLeft: '4%', width: '60%', display: 'flex' }}>
                                    <CustomInput type='file' label='Select Image..' className='form-control' />
                                    <img className="pt-1 pl-2 cancel" onClick={() => setaddnewimage(false)} style={{ cursor: "pointer" }} src={require('../../../pages/images/icons/close.svg')} alt="cancel" height="28px" />
                                    <img className="pt-1 pl-2" style={{ cursor: "pointer" }} src={require('../../../pages/images/icons/upload.svg')} alt="upload" height="28px" />
                                </div> : null
                        }
                    </div> */}
                    <div className="row pl-4" style={{ width: "830px" }}>
                        {renderProdukImage()}
                    </div>
                    {
                        editImage ? renderEditImage() : null
                    }

                </div>
            </Modaltemplate>

            {/* -------- BUTTON add product -------- */}
            <div className="menu-manageproduk">
                <Button size="md" onClick={toggleModalAdd} className="btn btn-green my-3">Add Product</Button>
            </div>

            {/* -------- tabel produk -------- */}
            <center>
                <div className=" mx-auto produk-saya text-center row gallery" >
                    <div>
                        <Input type="search"
                            className="mb-3"
                            placeholder="search product.."
                            onChange={onSearchChange}
                        />
                    </div>
                    {
                        dataProduk.length > 0 ?
                            (
                                <Table className="tabelprod" striped >
                                    <thead >
                                        <tr >
                                            <th>No</th>
                                            <th>Name</th>
                                            <th>Discount</th>
                                            <th>Normal Price</th>
                                            <th>Tanggal Mulai</th>
                                            <th>Tanggal Berakhir</th>
                                            <th>Kuota</th>
                                            <th>Terjual</th>
                                            <th>Product Images</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderProduk()}
                                    </tbody>
                                </Table>
                            ) :
                            // <div style={{ width: "100%" }}>
                            //     <img className="text-center" src={require('../../../pages/images/noprod.gif')} width='900rem' alt="" />
                            // </div>
                            <div className="no-transaksi-user text-center">
                                <img className="img-no-transaksi" height='300px' src={require('../../../pages/images/novoucher.svg')} alt="" />
                                <p>There are no products. Please click add product</p>
                            </div>
                    }

                </div>
            </center>
        </div >
    )


}

export default Manageproduk;

