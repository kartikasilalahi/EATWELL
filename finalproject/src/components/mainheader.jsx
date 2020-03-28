import React, { Component } from 'react';
import 'mdbreact/dist/css/mdb.css'
import { Modal, ModalBody } from 'reactstrap'
import { Carousel } from 'react-responsive-carousel'
import { Link } from 'react-router-dom'
import { MDBBtn, MDBInput } from 'mdbreact'
import Swal from "sweetalert2";
import {
    Open_Login,
    Open_Register,
    PembeliRegister,
    Login_User,
    Logout_Success,
    ERROR_LOGIN,
    ERROR_REGISTER_PEMBELI,
    LoadingRegist,
    Login_Success,
    Regist_Success
} from '../redux/action'
import { connect } from 'react-redux'
import Loadingspinner from 'react-spinners/PulseLoader'
import Toast from 'light-toast'
// import Lamanresto from '../pages/resto/lamanresto'


class Header extends Component {
    state = {
        slide: 0,  // How much should the Navbar slide up or down
        lastScrollY: 0,
        background: '',
        role: 0,
        logout: false
    }

    componentWillMount() {
        // When this component mounts, begin listening for scroll changes
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        // If this component is unmounted, stop listening
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        const { lastScrollY } = this.state;
        const currentScrollY = window.scrollY;
        // console.log("ini last", lastScrollY)
        // console.log("itu currebt", currentScrollY)
        if (currentScrollY <= 7) {
            this.setState({ background: "transparent" })
        } else if (currentScrollY > lastScrollY) {
            this.setState({ slide: '-75px' });
        } else {
            this.setState({ slide: '0px', background: "rgba(0,0,0,.9)" })
        }
        this.setState({ lastScrollY: currentScrollY });
    };

    // LOGOUT
    // ======
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
                            this.props.Logout_Success()
                            this.setState({ logout: true })

                        })
                    })
            }
        })
    }

    // OPPEN MODAL LOGIN
    // =================
    LoginClick = () => {
        this.props.Open_Login(true)
    }

    togglelogin = () => {
        this.props.Open_Login(false)
        this.props.ERROR_LOGIN('')
    }

    // BUTTON LOGIN
    // ============
    btnLogin = () => {
        var username = this.username.value
        var password = this.pass.value
        this.props.Login_User(username, password)
        this.props.Open_Register(false)

    }

    // REGISTER
    // ========
    btnRegister = () => {
        var username = this.username.value
        var email = this.email.value
        var phone = this.phone.value
        var password = this.pass.value
        var confpassword = this.confpass.value
        this.props.LoadingRegist(true)
        this.props.PembeliRegister({
            username,
            email,
            phone,
            password,
            confpassword
        });
        this.props.ERROR_LOGIN('')
        this.props.Regist_Success('')


    }

    // ERROR REGISTER
    // ==============
    renderErrorRegister = () => {
        if (this.props.errorregist === '') {
            return null
        } else {
            return <p className="alert alert-danger" style={{ fontSize: "11.5px" }}>{this.props.errorregist}</p>;
        }
    }

    // ERROR LOGIN
    // ===========
    renderErrorLogin = () => {
        if (this.props.errorlogin === '') {
            return null
        } else {
            console.log(this.props.errorlogin)
            return <p className="alert alert-danger" style={{ fontSize: "11.5px" }}>{this.props.errorlogin}</p>;
        }
    }

    // OPEN MODAL REGISTER
    // ===================
    openregist = () => {
        this.props.Open_Login(false)
        this.props.Open_Register(true)
        this.props.ERROR_LOGIN('')
        this.props.ERROR_REGISTER_PEMBELI('')
    }

    render() {
        // console.log(this.props.loginnotif)
        if (this.props.resgistsucces.length > 0) {
            Toast.success(`${this.props.resgistsucces}`, 2000)
        }
        return (
            <div>
                {/* ===== start modal =====*/}
                {/* modal login */}
                <Modal className="modallogin" style={{ borderRadius: "100px" }} centered isOpen={this.props.modallogin} toggle={this.togglelogin}>
                    <ModalBody className="d-flex">
                        <div className="gbr_login" style={{ width: "45%", height: "auto" }}>
                            <Carousel infiniteLoop showArrows={false} showThumbs={false} showStatus={false} showIndicators={false} autoPlay>
                                <div>
                                    <img src="https://images.unsplash.com/photo-1554679665-f5537f187268?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
                                </div>
                                <div>
                                    <img src="https://images.unsplash.com/photo-1501959915551-4e8d30928317?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
                                </div>
                                <div>
                                    <img src="https://images.unsplash.com/photo-1514773897744-c63156ebcd94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
                                </div>
                                <div><img src="https://images.unsplash.com/photo-1543807669-0d0730e95cb3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" /></div>
                            </Carousel>
                        </div>
                        <div className="formlogin px-4 mt-2" style={{ width: "55%" }}  >
                            <h3 className="text-center judul_form">Login</h3>
                            {/* form login */}
                            <form>
                                <div className="grey-text">
                                    <MDBInput autofocus size="sm" label="Type your username" icon="user" group type="text" inputRef={ref => this.username = ref} className="mb-2" />
                                    <MDBInput size="sm" label="Type your password" icon="lock" group type="password" inputRef={ref => this.pass = ref} />
                                </div>
                                <div>
                                    {this.renderErrorLogin()}
                                </div>

                                <div className="text-center my-1">
                                    <MDBBtn size="sm" onClick={this.btnLogin}>Login</MDBBtn>

                                </div>

                                <div className="mt-1 text-right" style={{ fontSize: "13px" }}>
                                    Don't have an Account?
                                    <br />Register <a className='blue-text font-weight-bold' onClick={this.openregist}>here!</a>{" "}
                                </div>
                                {/* end form login */}
                            </form>
                        </div>
                    </ModalBody>
                </Modal>

                {/* register pembeli */}
                <Modal size='lg' centered isOpen={this.props.modalregister} toggle={() => this.props.Open_Register(false)}>
                    <ModalBody className="d-flex">
                        <div className="gbr_login" style={{ width: "45%", height: "100%" }}>
                            <Carousel infiniteLoop showArrows={false} showThumbs={false} showStatus={false} showIndicators={false} autoPlay>
                                <div>
                                    <img src="https://images.unsplash.com/photo-1543807669-0d0730e95cb3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
                                </div>
                                <div>
                                    <img src="https://images.unsplash.com/photo-1554679665-f5537f187268?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
                                </div>
                                <div>
                                    <img src="https://images.unsplash.com/photo-1501959915551-4e8d30928317?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
                                </div>
                                <div>
                                    <img src="https://images.unsplash.com/photo-1514773897744-c63156ebcd94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
                                </div>

                            </Carousel>
                        </div>
                        <div className="formlogin px-4" style={{ width: "55%" }}  >
                            <h4 className="text-center judul_form mt-3">Register</h4>

                            {/* form register */}
                            <form>
                                <div className="grey-text">
                                    <MDBInput size="sm" label="Your username" icon="user" group type="text" inputRef={ref => this.username = ref} className=" mt-1" />
                                    <MDBInput size="sm" label="Your email" icon="envelope" group type="email" inputRef={ref => this.email = ref} />
                                    <MDBInput size="sm" label="Your phone" icon="phone" group type="text" inputRef={ref => this.phone = ref} />
                                    <MDBInput size="sm" label="Your password" icon="lock" group type="password" inputRef={ref => this.pass = ref} />
                                    <MDBInput size="sm" label="Confirm your password" icon="exclamation-triangle" group type="password" inputRef={ref => this.confpass = ref} />
                                </div>
                                <div>
                                    {this.renderErrorRegister()}
                                </div>

                                <div className="text-center mt-2">
                                    {
                                        this.props.loadingregist ?
                                            <Loadingspinner
                                                size={4}
                                                color={"#31332F"}
                                                margin={2}
                                            />
                                            :
                                            <MDBBtn size="sm" onClick={this.btnRegister} color="cyan">Register</MDBBtn>
                                    }
                                </div>

                                <div className="mt-2 text-right" style={{ fontSize: "12px" }}>
                                    You have an Account?
                                    <br />Login <a onClick={() => {
                                        this.props.Open_Register(false)
                                        this.props.Open_Login(true)
                                    }}
                                        className='blue-text font-weight-bold' >here!</a>{" "}
                                </div>

                                {this.props.loading ? <div>Loading...</div> : null}
                            </form>
                            {/* end form register */}

                        </div>
                    </ModalBody>
                </Modal>
                {/* ===== end modal ===== */}

                {/* ===== header ===== */}
                <div className="header d-flex " style={{
                    transform: `translate(0, ${this.state.slide})`,
                    transition: 'transform 150ms linear',
                    backgroundColor: `${this.state.background}`
                }}>
                    <div >
                        <h5 className="brandlogo" style={{ textAlign: "center" }}><a href="/">EATWELL</a></h5>
                    </div>
                    <div className="menu ml-auto">
                        {
                            this.props.roleid === 1 ?
                                (
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
                                ) :
                                this.props.roleid === 2 ?
                                    (
                                        <nav>
                                            <ul>
                                                <li><a onClick={this.logoutClick} >Logout</a></li>
                                                <Link to={'/lamanmitra'}>
                                                    <button className="btnakun btn-outline-light px-4"
                                                        style={{ borderRadius: "25px", cursor: "pointer" }}>
                                                        <span className="akun" >Hi, {this.props.username}</span>
                                                    </button>
                                                </Link>
                                            </ul>
                                        </nav>
                                    ) :
                                    this.props.roleid === 3 ?
                                        (
                                            <nav>
                                                <ul>
                                                    <li><a onClick={this.logoutClick} >Logout</a></li>
                                                    <Link to={'/admin'}>
                                                        <button className="btnakun btn-outline-light px-4"
                                                            style={{ borderRadius: "25px", cursor: "pointer" }}>
                                                            <span className="akun" >Hi, {this.props.username}</span>
                                                        </button>
                                                    </Link>
                                                </ul>
                                            </nav>
                                        )
                                        :
                                        (
                                            <nav>
                                                <ul>
                                                    <li><a onClick={this.LoginClick}>Sign In</a></li>
                                                    <li><a href="/help">Help</a></li>
                                                    <li><a href="/join">Join with us</a></li>
                                                </ul>
                                            </nav>
                                        )
                        }
                    </div>
                </div>
            </div >
        );
    }
}

const MapStateToProps = (state) => {
    return {
        modallogin: state.authReducer.modallogin,
        modalregister: state.authReducer.modalregister,
        errorregist: state.authReducer.errorregist,
        errorlogin: state.authReducer.errorlogin,
        login: state.authReducer.login,
        username: state.authReducer.username,
        loadingregist: state.authReducer.loadingregist,
        roleid: state.authReducer.roleid,
        register: state.authReducer.register,
        resgistsucces: state.authReducer.resgistsucces
    }
}

export default connect(MapStateToProps,
    {
        Open_Login,
        Open_Register,
        PembeliRegister,
        Login_User,
        Logout_Success,
        ERROR_LOGIN,
        ERROR_REGISTER_PEMBELI,
        LoadingRegist,
        Login_Success,
        Regist_Success
    })
    (Header);
