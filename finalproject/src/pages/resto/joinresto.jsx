import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import Footer from '../../components/footer'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { TokoRegister, LoadingRegist } from '../../redux/action'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Toast from 'light-toast'
import Loadingspinner from 'react-spinners/PulseLoader'

class Lamanmitra extends Component {
    state = {
        register: false,
        error: ''
    }

    componentDidMount() {
        AOS.init({ duration: 1000 })
    }

    btnRegister = () => {
        var namatoko = this.namatoko.value
        var username = this.username.value
        var email = this.email.value
        var alamat = this.alamat.value
        var phone = this.phone.value
        var password = this.password.value
        var confpassword = this.confpassword.value
        this.props.LoadingRegist(true)

        this.props.TokoRegister({
            namatoko,
            username,
            email,
            alamat,
            phone,
            password,
            confpassword
        })
    }

    renderErrorRegister = () => {
        if (this.props.errorregistToko === '' || this.props.errorregistToko === undefined) {
            return null
        } else {
            return <p className="alert alert-danger" style={{ fontSize: "11.5px" }}>{this.props.errorregistToko}</p>;
        }
    }

    render() {
        console.log('LOAD', this.props.loadingregist)

        if (this.props.registerToko) {
            Toast.success('Success register, check your mail to verification', 2000)
            return <Redirect to={'/'} />
        }
        return (
            <div className="jointoeatwell">
                {/* content atas */}
                <div style={{ backgroundColor: '#b3ffb3', height: "700px" }}>
                    <div className="headermitra w-auto pt-4 pl-5">
                        <h4 className="brand " ><a className="mitra" href="/">
                            &nbsp;EATWELL</a></h4>
                    </div>

                    <div className="kontentmitra d-flex mt-5" data-aos="fade-up" data-aos-duration="900" >
                        <div className="text-right" style={{ paddingLeft: "6%", paddingTop: "2%" }} >
                            <img src={require('../images/finance.svg')} height="420px" alt="" />
                        </div>

                        <div className="" style={{ paddingTop: "6%" }}>
                            <h1 style={{ fontSize: "40px" }}>Register your business</h1>
                            <p style={{ fontSize: "24px" }}>" An effective and efficient way to promote your product in the digital era "</p>
                            <p style={{ fontSize: "20px", color: 'green' }}> Interesting, flexible and viral - it's the most advanced sales platform in the market today...</p>
                            <div className="btnjoin">
                                <button className="btn btn-outline-dark-green" style={{ borderRadius: "25px", scrollBehavior: 'smooth' }}><a className="regist" href="#toregister">Register now</a></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="aboutus d-flex">
                    <div style={{ marginRight: '4%', marginLeft: '9%', paddingTop: '2%' }} >
                        <img src={require('../images/icons/e1.jpeg')} height='130px' />
                    </div>
                    <div className="mr-5">
                        <p>Established in 2013, EATWELL has become the leading online food shopping platform with the best vouchers in Indonesia, offering the food you want at the best prices. Reaching thousands of our customers every day, EATWELL continues to look for ways and better offers to satisfy savvy shoppers like you!</p>
                        <p>EATWELL remains unrivaled in providing good experiences that you never knew of customers and traders in Indonesia. We value the extraordinary partnership we have with our traders and are proud to provide large savings directly to our valued customers.</p>
                    </div>
                </div>

                <div className="quotes mx-auto text-center">
                    <p>“we do everything with our core values of honestly, hard work, and trust. “</p>
                </div>

                {/* image manfaat */}
                <div className="manfaat my-5 text-center">
                    <div>
                        <h1>Benefits of Cooperation</h1>
                    </div>

                    <div className="imagekonter w-50 mt-4 d-flex mx-auto">
                        <div data-aos="zoom-in" className="img1 m-2 col-4">
                            <img src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes-3/3/73-512.png" height="100px" alt="" />
                            <div className="titleimage1 mt-2">
                                Sales increased significantly
                            </div>
                        </div>

                        <div data-aos="zoom-in" className="img2 m-2 col-4">
                            <img src="https://cdn2.iconfinder.com/data/icons/advertising-vol-2-2/32/SocialMedia_advertising_digitalMarketing_branding_facebook_twitter_10-512.png" height="100px" alt="" />
                            <div className="titleimage2 mt-2">
                                Brands are increasingly known
                            </div>
                        </div>

                        <div data-aos="zoom-in" className="img3 m-2 col-4">
                            <img src="https://www.newsprout.com.au/wp-content/uploads/2015/10/referral-icon.png" height="100px" alt="" />
                            <div className="titleimage3 mt-2">
                                More effective to get customers
                            </div>
                        </div>
                    </div>

                    <div className="imagekonter w-50 mt-4 d-flex mx-auto">
                        <div data-aos="zoom-in" className="img1 m-2 col-4">
                            <img src="https://i.ya-webdesign.com/images/leadership-transparent-team-building-15.png" height="100px" alt="" />
                            <div className="titleimage1 mt-2">
                                Marketing team work is more efficient
                            </div>
                        </div>


                        <div data-aos="zoom-in" className="img3 m-2 col-4">
                            <img src="http://www.drentequipment.com/wp-content/uploads/2017/11/green-team.png" height="100px" alt="" />
                            <div className="titleimage3 mt-2">
                                Competent marketing team
                            </div>
                        </div>

                        <div data-aos="zoom-in" className="img3 m-2 col-4">
                            <img src="https://www.pngkey.com/png/full/301-3016920_risk-adjustment-safety-first-icon-png.png" height="100px" alt="" />
                            <div className="titleimage3 mt-2">
                                There is no loss / No risk
                            </div>
                        </div>
                    </div>
                </div>

                {/* form register mitra */}
                <div className="start my-5" id="toregister" style={{ scrollBehavior: 'smooth' }}>
                    <div className="text-center mt-5 pt-5 pb-4">
                        <h1>Let's Start Promos</h1>
                    </div>
                    <div className="registermitra">
                        <MDBContainer className="my-3">
                            <MDBRow>
                                <MDBCol md="6 mx-auto ">
                                    <MDBCard>
                                        <MDBCardBody>
                                            <form>
                                                <p className="h3 text-center py-2">Register</p>
                                                <div className="grey-text">
                                                    <MDBInput className="mb-3" label="Your business name" icon="user" group type="text" inputRef={ref => this.namatoko = ref} />
                                                    <MDBInput className="mb-3" label="Your business  username" icon="user" group type="text" inputRef={ref => this.username = ref} />
                                                    <MDBInput className="mb-3" label="Your business email" icon="envelope" group type="email" inputRef={ref => this.email = ref} />
                                                    <MDBInput className="mb-3" label="Your business address" icon="map-marker" group type="text" inputRef={ref => this.alamat = ref} />
                                                    <MDBInput className="mb-3" label="Your business phone" icon="address-book" group type="text" inputRef={ref => this.phone = ref} />
                                                    <MDBInput className="mb-3" label="Your password" icon="lock" group type="password" inputRef={ref => this.password = ref} />
                                                    <MDBInput className="mb-3" label="Confirm your password" icon="exclamation-triangle" group type="password" inputRef={ref => this.confpassword = ref} />
                                                </div>
                                                <div>
                                                    {this.renderErrorRegister()}
                                                </div>

                                                <div className="text-center py-3 mt-2">
                                                    <div>
                                                        {
                                                            this.props.loadingregist ?
                                                                <Loadingspinner
                                                                    size={8}
                                                                    color={"#31332F"}
                                                                    margin={2}
                                                                />
                                                                :
                                                                <MDBBtn color="cyan" onClick={this.btnRegister}>
                                                                    Register
                                                                </MDBBtn>
                                                        }
                                                    </div>
                                                </div>
                                            </form>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </div>
                </div>
                {/* end form register mitra */}
                <Footer />
            </div >
        );
    }
}

const MapStateToProps = (state) => {
    return {
        registerToko: state.authReducer.registerToko,
        errorregistToko: state.authReducer.errorregistToko,
        roleid: state.authReducer.roleid,
        loadingregist: state.authReducer.loadingregist
    }
}

export default connect(MapStateToProps, { TokoRegister, LoadingRegist })(Lamanmitra);