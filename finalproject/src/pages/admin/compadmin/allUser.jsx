import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { APIURL, APIURLimagetoko } from '../../../helper/apiurl'
import { Table } from 'reactstrap';

function Alluser() {
    const [dataPembeli, setdataPembeli] = useState([]);
    const [dataResto, setdataResto] = useState([]);
    const [pembeli, setpembeli] = useState('true');
    const [resto, setresto] = useState('false');


    useEffect(() => {
        Axios(`${APIURL}lamanadmin/getuser`)
            .then(res => { setdataPembeli(res.data) })
            .catch(err => { console.log(err) })
        Axios(`${APIURL}lamanadmin/getresto`)
            .then(res1 => { setdataResto(res1.data) })
            .catch(err1 => { console.log(err1) })
    }, [])


    // RENDER PEMBELI
    // ==============
    const renderPembeli = () => {
        if (dataPembeli.length < 1) {
            return <p>Tidak ada user</p>
        }

        return (
            dataPembeli.map((val, i) => {
                return (
                    <tr key={i}>
                        <th>{i + 1}</th>
                        <td>{val.username}</td>
                        <td>{val.email}</td>
                        <td>{val.phone}</td>
                        <td>{val.status}</td>
                        <td>act</td>
                    </tr>
                )
            })
        )
    }


    // RENDER RESTO
    // ============
    const renderResto = () => {
        if (dataResto.length < 1) {
            return <p>Tidak ada user</p>
        }


        return (
            dataResto.map((val, i) => {
                return (
                    <tr key={i}>
                        <th>{i + 1}</th>
                        <td>{val.username}</td>
                        <td>{val.email}</td>
                        <td>{val.phone}</td>
                        <td>{val.status}</td>
                        <td>{val.weekday ? val.weekday : ' - '}</td>
                        <td>{val.weekend ? val.weekend : ' - '}</td>
                        <td>{val.taxservice ? val.taxservice : ' - '}</td>
                        <td>{val.refund ? val.refund : ' - '}</td>
                        <td>{val.takeaway ? val.takeaway : ' - '}</td>
                    </tr>
                )
            })
        )
    }

    // console.log(dataResto)
    return (
        <div>
            <div className="kat-transaksi d-flex pl-0 ml-4" style={{ cursor: 'pointer' }}>
                <div className={`${pembeli} pembeli transaksi mr-4 pl-0`}
                    onClick={() => {
                        setresto('false')
                        setpembeli('true')
                    }}>
                    User
                    </div>
                <div className={`${resto} resto transaksi`}
                    onClick={() => {
                        setresto('true')
                        setpembeli('false')
                    }}>
                    Restaurant
                    </div>
            </div>
            <div>
                {
                    pembeli === "true" ?
                        <div className="mt-4 text-center mx-auto " style={{ width: '85%' }}>
                            <Table className="tabel-user" striped >
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderPembeli()}
                                </tbody>
                            </Table>
                        </div>
                        :
                        resto === "true" ?
                            <div className="mt-4 ml-4 text-center">
                                <Table className="tabel-user" striped >
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Status</th>
                                            <th>Weekday</th>
                                            <th>Weekend</th>
                                            <th>Tax and Service</th>
                                            <th>Refund</th>
                                            <th>Takeaway</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderResto()}
                                    </tbody>
                                </Table>
                            </div>
                            : null
                }

            </div>
        </div>
    )
}

export default Alluser