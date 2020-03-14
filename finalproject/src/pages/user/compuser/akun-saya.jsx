import React, { useState, useEffect } from 'react'
import { Input, Label, Button, Form } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import Axios from 'axios';
import { APIURL } from '../../../helper/apiurl';

let kali = 1

function Akunsaya() {

    // REDUX
    // =====
    const dispatch = useDispatch();
    const State = useSelector(({ authReducer }) => {
        return {
            id: authReducer.id,
            roleid: authReducer.roleid,
            username: authReducer.username,
            phone: authReducer.phone,
            email: authReducer.email
        }
    })

    // USE STATE
    // =========
    const [editUser, seteditUser] = useState({});
    const [message, setmessage] = useState({
        error: ''
    });

    // USE EFFECT
    // ==========
    useEffect(() => {
        const { username, phone, email } = State
        if (State.username !== '' && kali < 3) {
            seteditUser({ ...editUser, username: username, email: email, phone: phone })
            kali++
        }
    }, [State])


    // BTN EDIT AKUN
    // =============
    const btnChange = () => {
        const id = localStorage.getItem('id')
        const datas = {
            username: editUser.username,
            phone: editUser.phone
        }
        Axios.put(`${APIURL}user/edituser/${id}`, datas)
            .then(res => {
                console.log(res.data.status)
                // setmessage({ ...message, [res.data.status]: res.data.message })
                if (res.data.status) {
                    // console.log('error sis')
                    setmessage({ ...message, error: res.data.message })
                } else {
                    alert('Berhasil')
                    setmessage({ ...message, error: '' })
                }
            }).catch(err => {
                // console.log(err)
            })
    }

    // RENDER ERROR
    // ============
    const renderError = () => {
        if (message.error) {
            // console.log('error sis ...')
            return (
                <div className="d-flex alert alert-danger mt-3 mb-2 pb-0" style={{ fontSize: '10px' }} >
                    <div >
                        <p style={{ lineHeight: '7px' }}>{message.error}</p>
                    </div>
                    <div style={{ marginLeft: 'auto', fontWeight: 'bolder' }} >
                        <p onClick={() => setmessage({ ...message, error: '' })} style={{ lineHeight: '7px', cursor: 'pointer' }}>x</p>
                    </div>
                </div>
            )
        }
        else return null
    }

    // CHANGE EMAIL
    // ============
    const changeEmail = () => {
        const id = localStorage.getItem('id')
        const { email } = editUser
        Axios.put(`${APIURL}user/editemail/${id}`, { email })
            .then(res => {
                // console.log(res.data)
            }).catch(err => {
                // console.log(err)
            })
    }


    // console.log(editUser)
    // console.log('message', message)
    // RETURN
    return (
        <div className="akun-saya d-flex">
            <div className="left col-6 mr-3 py-3" style={{ backgroundColor: "whitesmoke", }}>
                {/* --- edit akun --- */}
                <div>
                    <Label style={{ fontSize: '13px', color: 'green' }}>My account's name</Label>
                    <Input type="text" defaultValue={editUser.username}
                        onChange={e => seteditUser({ ...editUser, username: e.target.value })} />
                    <Label className="mt-3" style={{ fontSize: '13px', color: 'green' }}>Phone</Label>
                    <Input type="text" defaultValue={editUser.phone}
                        onChange={e => seteditUser({ ...editUser, phone: e.target.value })} />
                    {renderError()}
                    <Button onClick={btnChange} className="btn btn-green mt-3 mb-5" size="md">Edit</Button>
                </div>
                {/* --- change email --- */}
                <div>
                    <Form inline>
                        <Input className="w-75" type="email" defaultValue={editUser.email} onChange={e => seteditUser({ ...editUser, email: e.target.value })} />
                        <Button className="btn btn-grey ml-4 mr-0" style={{ fontSize: '10px' }} size="sm" >change</Button>
                    </Form>
                </div>
            </div>
            {/* --- ganti pass --- */}
            <div className="right col-6 py-3" style={{ backgroundColor: "whitesmoke" }}>
                <Label style={{ fontSize: '13px', color: 'green' }}>current password</Label>
                <Input type="password" placeholder="input current password" />
                <Label className="mt-3" style={{ fontSize: '13px', color: 'green' }}>new password</Label>
                <Input type="password" placeholder="input new password" />
                <Label className="mt-3" style={{ fontSize: '13px', color: 'green' }}>confirm new password</Label>
                <Input type="password" placeholder="confirm new password" />
                <Button className="btn btn-green mt-3" style={{ fontSize: '10px', marginLeft: '68%' }} size="sm">change password</Button>
            </div>
        </div>
    )
}

export default Akunsaya;

























    // // USEEFFECT
    // // =========
    // useEffect(() => {
    //     const id = localStorage.getItem('id')
    //     Axios.get(`${APIURL}user/profileuser/${id}`)
    //         .then(res => {
    //             seteditUser({ ...editUser, username: res.data[0].username, phone: res.data[0].phone, email: res.data[0].email })
    //         }).catch(err => {
    //             console.log(err)
    //         })
    // }, [])