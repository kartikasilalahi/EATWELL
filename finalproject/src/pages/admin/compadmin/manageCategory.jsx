import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { APIURL, APIURLimagetoko } from '../../../helper/apiurl'
import { Table, Button, Modal, ModalBody, Input } from 'reactstrap';

function CategoryProduct() {
    const [dataKategori, setdataKategori] = useState([]);
    const [modalADD, setmodalADD] = useState(false);
    const [newCategory, setnewCategory] = useState('');
    const toggle = () => {
        setmodalADD(!modalADD)
    }

    useEffect(() => {
        Axios(`${APIURL}produk/kategoriproduk`)
            .then(res => { setdataKategori(res.data) })
            .catch(err => { console.log(err) })
    }, [])


    // RENDER CATEGORY
    // ===============
    const renderCategory = () => {
        return dataKategori.map((val, i) => {
            return (
                <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{val.id}</td>
                    <td>{val.namakategori}</td>
                    {/* <td>
                        <Button size="sm" className="btn btn-grey p-1">Edit</Button>
                    </td> */}
                </tr>
            )
        })
    }

    // ADD  CATEGORY 
    // =============
    const addCategory = () => {
        console.log(newCategory)
        Axios.post(`${APIURL}lamanadmin/addnewcategory`, { newCategory })
            .then(res => {
                setdataKategori(res.data)
                toggle()
            })
            .catch(err => { console.log(err) })
    }


    return (
        <div className="ml-4">
            <Modal isOpen={modalADD} toggle={toggle} centered>
                <ModalBody >
                    <div className="px-4 py-4">
                        <h6>Add New Category</h6>
                        <Input className="my-3" size='md' placeholder="Input New Category"
                            onChange={e => setnewCategory(e.target.value)} />
                        <div className="text-right">
                            <Button size='sm' className="btn btn-green" onClick={addCategory}> ADD </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
            <Button size="md" className="btn btn-green p-2 mx-auto" onClick={toggle}>Add Category</Button>

            <div className="mt-4 text-center mx-auto w-50" >
                <Table className="tabel-user" striped >
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Id Category</th>
                            <th>Category</th>
                            {/* <th>Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {renderCategory()}
                    </tbody>
                </Table>
            </div>
        </div >
    )
}

export default CategoryProduct;