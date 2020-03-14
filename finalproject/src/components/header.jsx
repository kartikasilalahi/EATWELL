import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import Swal from "sweetalert2";
import { Logout_Success } from '../redux/action'

class Header extends Component {
    state = {
        modalregist: false,
        tohome: false
    }

    logoutClick = () => {
        Swal.fire({
            title: 'Are you sure to logout?',
            icon: 'warning',
            showCancelButton: 'true',
            confirmButtonText: "Logout!"
        }).then(result => {
            if (result.value) {
                Swal.fire({
                    title: 'Logging out',
                    text: 'tunggu beberapa detik',
                    timer: 1800,
                    allowOutsideClick: false,
                    timerProgressBar: true,
                    onBeforeOpen: () => {
                        Swal.showLoading()
                    }
                })
                    .then(() => {
                        Swal.fire({
                            title: 'Logout',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1000
                        }).then(() => {
                            localStorage.removeItem("id");
                            localStorage.removeItem("token");
                            this.setState({ tohome: true })
                            this.props.Logout_Success()
                        })
                    })
            }
        })
    }


    render() {
        if (this.props.roleid < 1) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <div className="header d-flex " style={{
                    position: "relative",
                    backgroundColor: `black`,
                    paddingLeft: '4%'
                }}>
                    <div >
                        {
                            this.props.roleid === 2 || this.props.roleid === 3 ?
                                <h5 className="brandlogo" style={{ color: "white" }} > EATWELL </h5> :
                                this.props.roleid === 1 ?
                                    <h5 className="brandlogo" style={{ textAlign: "center" }}><a href="/">EATWELL</a></h5> : null
                        }
                    </div>
                    <div className="menu ml-auto">
                        {
                            this.props.roleid === 2 || this.props.roleid === 3 ?
                                (
                                    <nav>
                                        <ul>
                                            <li><a onClick={this.logoutClick} >Logout</a></li>
                                            {/* <Link to={'/lamanmitra'}> */}
                                            <button className="btnakun btn-outline-light px-4 "
                                                style={{ borderRadius: "25px", cursor: "pointer", fontSize: "15px" }}>
                                                <span className="akun" >Hi, {this.props.username}</span>
                                            </button>
                                            {/* </Link> */}
                                        </ul>
                                    </nav>
                                )
                                :
                                this.props.roleid === 1 ?
                                    <nav>
                                        <ul>
                                            <li><a onClick={this.logoutClick} >Logout</a></li>
                                            <Link to='/akun'>
                                                <button className="btnakun btn-outline-light px-4 "
                                                    style={{ borderRadius: "25px", cursor: "pointer" }}>
                                                    <span className="akun" >Hi, {this.props.username}</span>
                                                </button>
                                            </Link>
                                        </ul>
                                    </nav>
                                    :
                                    null
                        }
                    </div>
                </div>
            </div >
        );
    }
}

const MapStateToProps = (state) => {
    return {
        modalLogin: state.modalLogin,
        roleid: state.authReducer.roleid,
        username: state.authReducer.username
    }
}
export default connect(MapStateToProps, { Logout_Success })(Header);














