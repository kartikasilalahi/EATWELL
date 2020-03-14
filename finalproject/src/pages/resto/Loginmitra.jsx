import React, { Component } from 'react'
import { MDBBtn, MDBInput } from 'mdbreact'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

class Loginmitra extends Component {

    btnLogin = () => {
        var emailresto = this.emailresto.value
        var password = this.pass.value
        // this.props.onMitraLogin({ emailresto, password })
    }

    // renderErrorLogin = () => {
    //     if (this.props.errorloginResto === '') {
    //         return null
    //     } else {
    //         console.log(this.props.errorloginResto)
    //         return <p className="alert alert-danger">{this.props.errorloginResto}</p>;
    //     }
    // }

    render() {
        // if (this.props.login) {
        //     return <Redirect to='/lamanmitra' />
        // }
        return (
            <div style={{ backgroundColor: '#F0F8FF', height: '50rem' }}>
                <div className="headermitra w-auto pt-4 pl-5">
                    <h4 className="brand " ><a className="mitra" href="/">
                        &nbsp;EATWELL</a></h4>
                </div>
                <div className="d-flex">
                    <div className="col-7" >
                        <img
                            className="rounded mx-auto d-block"
                            src={require('../images/img1.svg')}
                            width="70%"
                            style={{
                                paddingTop: '13%'
                            }}
                        />
                    </div>
                    <div className="col-5 px-4" style={{ paddingTop: "10%" }}>
                        {/* form login */}
                        <form className="pr-5 mt-5" style={{ width: "500px" }} >
                            <div className="text-center pb-5" style={{ fontSize: "40px", fontWeight: "bolder" }}>
                                Login Mitra
                            </div>
                            <div className="grey-text">
                                <MDBInput
                                    label="Type your email"
                                    icon="user"
                                    group
                                    type="text"
                                    inputRef={ref => this.emailresto = ref}
                                    className="mb-5"
                                />
                                <MDBInput
                                    label="Type your password"
                                    icon="lock"
                                    group
                                    type="password"
                                    inputRef={ref => this.pass = ref}
                                />
                            </div>
                            <div>
                                {/* {this.renderErrorLogin()} */}
                            </div>

                            <div className="text-center mt-3">
                                <MDBBtn color="light-green" onClick={this.btnLogin}>Login</MDBBtn>
                            </div>

                            <div className="mt-4 text-right">
                                Don't have an Account?
                                <br />Register <a className='green-text font-weight-bold '>here!</a>{" "}
                            </div>
                        </form>
                        {/* end form login */}
                    </div>
                </div>
            </div>
        )
    }
}
// const MapStateToProps = (state) => {
//     return {
//         login: state.mitraReducer.login,
//         errorloginResto: state.mitraReducer.errorloginResto
//     }
// }

// export default connect(MapStateToProps, { onMitraLogin })(Loginmitra)
export default Loginmitra;
