import React, { useEffect, useState, useRef } from 'react';
import { Input, FormGroup, Label, Col, Button } from 'reactstrap';
import Axios from 'axios'
import { APIURL, APIURLimagetoko } from '../../../helper/apiurl'
import { AiOutlineWarning } from 'react-icons/ai'
import Tooltip from '@material-ui/core/Tooltip';
import Toast from 'light-toast'

function Profile() {
    const [dataResto, setdataResto] = useState([]);
    const [editResto, seteditResto] = useState([]);
    const [listSchedule, setlistSchedule] = useState([]);
    const [Options, setOptions] = useState(['yes', 'no']);

    // USE EFFECT
    // ==========
    useEffect(() => {
        let id = parseInt(localStorage.getItem('id'))
        Axios.get(`${APIURL}produk/getdetailresto/${id}`)
            .then(res1 => {
                setdataResto(res1.data[0])
                seteditResto(res1.data[0])
            }).catch(err => {
                console.log(err)
            })
        Axios.get(`${APIURL}produk/getschedule`)
            .then(res2 => {
                setlistSchedule(res2.data)
            })
    }, [])


    // --- weekdays ---
    const scheduleweekdays = () => {
        // console.log(editResto)
        if (editResto.weekday === null) {
            return listSchedule.map((val, i) => {
                return <option key={i} value={val.schedule}>{val.schedule}</option>
            })
        }
        return listSchedule.map((val, i) => {
            if (editResto.weekday === val.schedule) return <option key={i} value={val.schedule} selected>{val.schedule}</option>
            return < option key={i} value={val.schedule} > {val.schedule}</option >
        })
    }

    // --- weekend ---
    const scheduleweekend = () => {
        if (editResto.weekend === null) {
            return listSchedule.map((val, i) => {
                return <option key={i} value={val.schedule}>{val.schedule}</option>
            })
        }
        return listSchedule.map((val, i) => {
            if (editResto.weekend === val.schedule) return <option key={i} value={val.schedule} selected>{val.schedule}</option>
            return < option key={i} value={val.schedule} > {val.schedule}</option >
        })
    }

    // --- holiday ---
    const scheduleholiday = () => {
        if (editResto.holiday === null) {
            return listSchedule.map((val, i) => {
                return <option key={i} value={val.schedule}>{val.schedule}</option>
            })
        }
        return listSchedule.map((val, i) => {
            if (editResto.holiday === val.schedule) return <option key={i} value={val.schedule} selected>{val.schedule}</option>
            return < option key={i} value={val.schedule} > {val.schedule}</option >
        })
    }

    // --- handle select ---
    const handleSelect = (e) => {
        const { name, value } = e.target
        seteditResto({ ...editResto, [name]: value })
    }

    // --- render select ----
    const renderSelect = (x) => {
        // console.log(x)
        return Options.map((val, i) => {
            if (val === x) return <option value={val} key={i} selected>{val}</option>
            return <option value={val} key={i}>{val}</option>
        })
    }

    // EDIT PROFILE RESTO
    // ==================
    const editProfileResto = () => {
        const detail = {
            idtoko: editResto.idtoko,
            takeaway: editResto.takeaway,
            taxservice: editResto.taxservice,
            refund: editResto.refund,
            weekday: editResto.weekday,
            weekend: editResto.weekend,
            holiday: editResto.holiday,
            namatoko: editResto.namatoko,
            alamat: editResto.alamat,
            phone: editResto.phone
        }

        // alert('Berhasil ')
        Toast.loading(`Saving. Please wait a moment`);
        setTimeout(() => {
            Axios.post(`${APIURL}produk/editprofileresto/${detail.idtoko}`, detail)
                .then(res => { console.lzog('success', res.data) })
                .catch(err => { console.log(err) })
            Toast.success('success..', 2000)
            Toast.hide();
        }, 2300);

    }

    return (
        <div className="profile-seller mt-4 " >
            <p className="alert alert-warning mr-5 mb-3 pl-2" style={{ fontSize: '12px', marginTop: '0px' }}>
                <AiOutlineWarning /> You must complete your profile before add your product and you can update your restaurant profile here</p>
            <h4 className="pl-2 mt-4">Account</h4>

            <div className="mt-3 d-flex" >
                {/* --- LEFT --- */}
                <div className="col-6 mr-5 py-3" style={{ backgroundColor: 'whitesmoke' }}>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>Restaurant: </Label>
                        <Input size="sm" className="w-100" type="text"
                            value={editResto.namatoko}
                            onChange={e => seteditResto({ ...editResto, namatoko: e.target.value })} />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>Address: </Label>
                        <Input size="sm" type="textarea"
                            value={editResto.alamat}
                            onChange={e => seteditResto({ ...editResto, alamat: e.target.value })} />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>Phone: </Label>
                        <Input size="sm" type="text"
                            value={editResto.phone}
                            onChange={e => seteditResto({ ...editResto, phone: e.target.value })} />
                    </FormGroup>

                    {/* --- BUTTON SAVE --- */}
                    <div>
                        <Button onClick={editProfileResto} className="btn btn-green" size="sm"> save </Button>
                    </div>
                </div>

                {/* --- RIGHT --- */}
                <div className="col-5 pr-4 py-3" style={{ backgroundColor: 'whitesmoke' }}>
                    <div className="d-flex">
                        <Label style={{ fontSize: "15px" }} className="mr-5">Others: </Label>
                        {/* --- taxservice --- */}
                        <FormGroup className="w-50 mr-2">
                            <Label style={{ fontSize: "12px" }}>Tax and Service</Label>
                            <select onChange={handleSelect} name="taxservice" style={{ fontSize: "12px" }} className="form-control" size="sm">
                                <option value='' key={3} hidden>Select..</option>
                                {renderSelect(editResto.taxservice)}
                            </select>
                        </FormGroup>
                        {/* --- takeaway --- */}
                        <FormGroup className="w-50 pr-4">
                            <Label style={{ fontSize: "12px" }}> Take Away</Label>
                            <select onChange={handleSelect} name="takeaway" style={{ fontSize: "12px" }} className="form-control" size="sm">
                                <option value='' key={3} hidden>Select..</option>
                                {renderSelect(editResto.takeaway)}
                            </select>
                        </FormGroup>
                        {/* --- refund --- */}
                        <FormGroup className="w-50">
                            <Label style={{ fontSize: "12px" }}>Refund</Label>
                            <select onChange={handleSelect} name="refund" style={{ fontSize: "12px" }} className="form-control" size="sm">
                                <option value='' key={3} hidden>Select..</option>
                                {renderSelect(editResto.refund)}
                            </select>
                        </FormGroup>
                    </div>
                    {/* --- jadwal --- */}
                    <div className="jadwal">
                        <FormGroup className="w-50 mr-2">
                            <Label style={{ fontSize: "12px" }}>Weekday</Label>
                            <select onChange={handleSelect} name="weekday" style={{ fontSize: "12px" }} className="form-control" size="sm">
                                <option value="" hidden>Select Schedule...</option>

                                {scheduleweekdays()}
                            </select>
                        </FormGroup>
                        <FormGroup className="w-50 mr-2">
                            <Label style={{ fontSize: "12px" }}>Weekend</Label>
                            <select onChange={handleSelect} name="weekend" style={{ fontSize: "12px" }} className="form-control" size="sm">
                                <option value="" hidden>Select Schedule...</option>
                                {scheduleweekend()}
                            </select>
                        </FormGroup>
                        <FormGroup className="w-50 mr-2">
                            <Label style={{ fontSize: "12px" }}>Holiday</Label>
                            <select onChange={handleSelect} name="holiday" style={{ fontSize: "12px" }} className="form-control" size="sm">
                                <option value="" hidden>Select Schedule...</option>
                                {scheduleholiday()}
                            </select>
                        </FormGroup>
                    </div>
                </div>
            </div>

        </div >
    );

}

export default Profile;