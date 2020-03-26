import React from 'react';
import Axios from 'axios'
import queryString from 'query-string'
import { APIURL } from '../helper/apiurl';

class Verified extends React.Component {
    state = {
        laoding: true,
        status: 'unverified',

    }
    componentDidMount() {
        console.log(this.props.location.search)
        var params = queryString.parse(this.props.location.search)
        console.log(params)
        var username = params.username
        var email = params.email
        Axios.put(`${APIURL}user/verifynewemail`, {
            username, email
        }).then((res) => {
            console.log(res.data)
            this.setState({ status: 'berhasil' })
        }).catch((err) => {
            console.log(err)
            this.setState({ status: 'gagal' })
        })
    }
    render() {
        if (this.state.status === 'berhasil') {
            return (
                <div>
                    <center style={{ paddingTop: "10%" }}>
                        <h1>Selamat email baru anda sukses terverifikasi</h1>
                        <h2>Selamat bergabung di Eatwell</h2>
                        <div>
                            kembali ke <a href='/'>Eatwell</a>!
                        </div>
                    </center>
                </div>
            );
        } else if (this.state.status === 'gagal') {
            return (
                <div>
                    <center>
                        <h1>Gagal memverifikasi email anda</h1>
                        <h1>mohon refresh kembali</h1>
                    </center>
                </div>
            )
        }
        return (
            <div>
                <center>
                    <h1>sedang memverifikasi</h1>
                </center>
            </div>
        )
    }
}

export default Verified;