import React, { Component } from 'react';
import { MDBContainer, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import {Link, Redirect} from 'react-router-dom'
// import Header from '../components/header'
import Swal from 'sweetalert2'
import Axios from 'axios'
import {APIURL} from './../helper/apiurl'

class Register extends Component {
    state = {  
        register:false
    }

    btnRegister=()=>{
        var name= this.name.value
        var username= this.username.value
        var password= this.password.value
        var confpassword= this.confpassword.value
        var role="user"
        var dataregister={
            name,
            username,
            password,
            role
        }
        if (username && password && confpassword !== '') {
            Axios.get(`${APIURL}users?username=${username}`)
            .then(res=>{
                if (res.data.length===0) {
                    if (password!==confpassword) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Password must match!'
                        })
                    }else{
                        Axios.post(`${APIURL}users`, dataregister)
                        .then(()=>{
                            Axios.get(`${APIURL}users`)
                            .then(()=>{
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Success!',
                                    text: 'Registered! You can sign in now'
                                })
                                this.setState({register:true})
                            }).catch(error=>{
                                console.log(error)
                            })
                        }).catch(err=>{
                            console.log(err)
                        })
                    }
                }else{
                    Swal.fire({
                        icon: 'warning',
                        title: 'Oops...',
                        text: `Account with username ${username} is already used, Try using another username`
                    })
                }
            }).catch(err1=>{
                console.log(err1)
            })
        }else{
            Swal.fire({
                icon: "warning",
                title: 'Ooops..',
                text: 'Please fill in the blanks correctly.'
            })
        }
    }


    render() { 
        if (this.state.register) {
            console.log('masuk')
            return <Redirect to={'/login'}/>
        }

        {/* <Header/> */}
        {/* http://cdn.onlinewebfonts.com/svg/img_224457.png */}
        return (  
            <div>
            <h1 className="pt-5 text-center" style={{color:'green', fontWeight:'bolder'}}>EATWELL</h1>
            <div className="d-flex py-5">
                <div className="gambar_register text-right m-0 p-0" style={{width:"40%"}}>
                    <img src='https://cdn.icon-icons.com/icons2/1891/PNG/512/001novo_120744.png' height="70%" alt=""/>
                </div>
                <div className="card_register text-left" style={{width:"60%", paddingRight:"2%"}}>
                        <MDBContainer style={{width:"60%"}} >
                            <MDBCard>
                                <MDBCardBody>
                                <form>
                                    <p className="h2 text-center py-2">Sign up</p>
                                    <div className="grey-text">
                                    <MDBInput
                                        label="Your name"
                                        icon="user"
                                        group
                                        type="text"
                                        inputRef={ref => this.name = ref }
                                    />
                                    <MDBInput
                                        label="Your username"
                                        icon="user"
                                        group
                                        type="text"
                                        inputRef={ref => this.username = ref }
                                    />
                                    <MDBInput
                                        label="Your email"
                                        icon="envelope"
                                        group
                                        type="email"
                                        inputRef={ref => this.username = ref }
                                    />
                                    <MDBInput
                                        label="Your password"
                                        icon="lock"
                                        group
                                        type="password"
                                        inputRef={ref => this.password = ref }
                                    />
                                    <MDBInput
                                        label="Confirm your password"
                                        icon="exclamation-triangle"
                                        group
                                        type="password"
                                        inputRef={ref => this.confpassword = ref }
                                    />
                                    </div>
                                    <div className="text-center py-3 mt-2">
                                    <MDBBtn onClick={this.btnRegister} color="cyan">
                                        Register
                                    </MDBBtn>
                                    </div>
                                    <div className="mt-2 text-right">
                                        You have an Account?
                                        <br/>Login <Link className='blue-text font-weight-bold' to={"/login"} >Here!</Link>
                                    </div>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBContainer>
                </div>
            </div>
            </div>
        );
    }
}
 
export default Register;

































/* 
import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import {Link, Redirect} from 'react-router-dom'
import Header from '../components/header'
import Swal from 'sweetalert2'
import Axios from 'axios'
import {APIURL} from './../components/apiurl'

class Register extends Component {
    state = {  
        register:false
    }

    btnRegister=()=>{
        var name= this.name.value
        var username= this.username.value
        var password= this.password.value
        var confpassword= this.confpassword.value
        var role="user"
        var dataregister={
            name,
            username,
            password,
            role
        }
        if (username && password && confpassword !== '') {
            Axios.get(`${APIURL}users?username=${username}`)
            .then(res=>{
                if (res.data.length===0) {
                    if (password!==confpassword) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Password must match!'
                        })
                    }else{
                        Axios.post(`${APIURL}users`, dataregister)
                        .then(()=>{
                            Axios.get(`${APIURL}users`)
                            .then(()=>{
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Success!',
                                    text: 'Registered! You can sign in now'
                                })
                                this.setState({register:true})
                            }).catch(error=>{
                                console.log(error)
                            })
                        }).catch(err=>{
                            console.log(err)
                        })
                    }
                }else{
                    Swal.fire({
                        icon: 'warning',
                        title: 'Oops...',
                        text: `Account with username ${username} is already used, Try using another username`
                    })
                }
            }).catch(err1=>{
                console.log(err1)
            })
        }else{
            Swal.fire({
                icon: "warning",
                title: 'Ooops..',
                text: 'Please fill in the blanks correctly.'
            })
        }
    }


    render() { 
        if (this.state.register) {
            console.log('masuk')
            return <Redirect to={'/login'}/>
        }
        return (  
            <div>
                <Header/>
                <div className="login1">
                    <div className="judullogin">
                        <p className="judullog mb-0">Login or Register</p>
                        <p className="tekslogin ">Hello, there.. welcome to eatwell</p>
                    </div>
                </div>
                <MDBContainer className="my-3">
                <MDBRow>
                    <MDBCol md="6 mx-auto ">
                    <MDBCard>
                        <MDBCardBody>
                        <form>
                            <p className="h2 text-center py-2">Sign up</p>
                            <div className="grey-text">
                            <MDBInput
                                label="Your name"
                                icon="user"
                                group
                                type="text"
                                inputRef={ref => this.name = ref }
                            />
                            <MDBInput
                                label="Your username"
                                icon="user"
                                group
                                type="text"
                                inputRef={ref => this.username = ref }
                            />
                            <MDBInput
                                label="Your email"
                                icon="envelope"
                                group
                                type="email"
                                inputRef={ref => this.username = ref }
                            />
                            <MDBInput
                                label="Your password"
                                icon="lock"
                                group
                                type="password"
                                inputRef={ref => this.password = ref }
                            />
                            <MDBInput
                                label="Confirm your password"
                                icon="exclamation-triangle"
                                group
                                type="password"
                                inputRef={ref => this.confpassword = ref }
                            />
                            </div>
                            <div className="text-center py-3 mt-2">
                            <MDBBtn onClick={this.btnRegister} color="cyan">
                                Register
                            </MDBBtn>
                            </div>
                            <div className="mt-2 text-right">
                                You have an Account?
                                <br/>Login <Link className='blue-text font-weight-bold' to={"/login"} >Here!</Link>
                            </div>
                        </form>
                        </MDBCardBody>
                    </MDBCard>
                    </MDBCol>
                </MDBRow>
                </MDBContainer>
                </div>
        );
    }
}
 
export default Register;

*/