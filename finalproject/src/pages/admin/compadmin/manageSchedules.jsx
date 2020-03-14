import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { APIURL, APIURLimagetoko } from '../../../helper/apiurl'
import { Table, Button, Modal, ModalBody, Input } from 'reactstrap';


function CategoryProduct() {
    const [dataSchedule, setdataSchedule] = useState([]);
    const [modalADD, setmodalADD] = useState(false);
    const [newSchedule, setnewSchedule] = useState('');
    const toggle = () => {
        setmodalADD(!modalADD)
    }

    useEffect(() => {
        Axios(`${APIURL}produk/getschedule`)
            .then(res => { setdataSchedule(res.data) })
            .catch(err => { console.log(err) })
    }, [])

    // RENDER SCHEDULE
    // ===============
    const renderSchedule = () => {
        return dataSchedule.map((val, i) => {
            return (
                <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{val.id}</td>
                    <td>{val.schedule}</td>
                    {/* <td>
                        <Button size="sm" className="btn btn-grey p-1">Edit</Button>
                    </td> */}
                </tr>
            )
        })
    }

    // ADD  CATEGORY 
    // =============
    const addSchedule = () => {
        console.log(newSchedule)
        Axios.post(`${APIURL}lamanadmin/addnewschedule`, { newSchedule })
            .then(res => {
                console.log(res.data)
                setdataSchedule(res.data)
                toggle()
            }).catch(err => { console.log(err) })
    }

    // console.log(dataSchedule)
    return (
        <div className="ml-4">
            <Modal isOpen={modalADD} toggle={toggle} centered>
                <ModalBody >
                    <div className="px-4 py-4">
                        <h6>Add New Schedule</h6>
                        <Input className="my-3" size='md' placeholder="Input New Schedule"
                            onChange={e => setnewSchedule(e.target.value)} />
                        <div className="text-right">
                            <Button size='sm' className="btn btn-green" onClick={addSchedule}> ADD </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
            <Button size="md" className="btn btn-green p-2 mx-auto" onClick={toggle}>Add Schedule</Button>

            <div className="mt-4 text-center mx-auto w-50" >
                <Table className="tabel-user" striped >
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Id Schedule</th>
                            <th>Schedule</th>
                            {/* <th>Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {renderSchedule()}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default CategoryProduct;