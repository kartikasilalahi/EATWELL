import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import moment from 'moment'
import { APIURL, APIURLimagetoko } from '../../../helper/apiurl'
import { Table, Button } from 'reactstrap';

function Alltransaction() {

    const [dataTransaction, setdataTransaction] = useState([]);

    useEffect(() => {
        Axios(`${APIURL}lamanadmin/getalltransaction`)
            .then(res => {
                setdataTransaction(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])

    const renderTransaction = () => {
        return dataTransaction.map((val, i) => {
            return (
                <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{val.idtransaction}</td>
                    <td>{val.kodetransaksi}</td>
                    <td>{val.status}</td>
                    <td>{moment(val.tanggalpesan).format("YYYY-MM-DD HH:mm:ss")}</td>
                    <td>
                        {
                            val.tanggalbayar ? moment(val.tanggalbayar).format("YYYY-MM-DD HH:mm:ss")
                                : 'No Payment'
                        }

                    </td>
                    <td>{val.namaproduk}</td>
                    <td>{val.diskon}</td>
                    <td>{val.qty}</td>
                    <td>{val.totalharga}</td>
                </tr>
            )
        })
    }

    console.log('trans', dataTransaction)
    return (
        <div className="ml-4 manage-transaction">
            <div className="mt-4 text-center mx-auto" >
                <Table className="tabel-user" striped >
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th> Id</th>
                            <th>Transaction Code</th>
                            <th>Status</th>
                            <th>Order</th>
                            <th>Payment</th>
                            <th>Product</th>
                            <th>Disc</th>
                            <th>Qty</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTransaction()}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
export default Alltransaction