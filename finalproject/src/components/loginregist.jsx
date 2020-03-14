import React, { Component } from 'react'
import {Open_Login, Open_Register} from '../redux/action'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {Modal, ModalBody} from 'reactstrap'
import {Carousel} from 'react-responsive-carousel'

import {connect} from 'react-redux'


class Loginregist extends Component {
    render() {
        return (
            <div>

                {/* MODAL LOGIN */}
                <Modal className="modallogin" style={{borderRadius:"100px"}} centered isOpen={this.props.modalLogin} toggle={()=>this.props.Open_Login(false)}> 
                    <ModalBody className="d-flex">
                        <div className="gbr_login" style={{width:"45%", height:"100%"}}>
                            <Carousel infiniteLoop showArrows={false} showThumbs={false} showStatus={false} showIndicators={false} autoPlay>
                                <div>
                                    <img src="https://images.unsplash.com/photo-1554679665-f5537f187268?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt=""/>
                                </div>
                                <div>
                                    <img src="https://images.unsplash.com/photo-1501959915551-4e8d30928317?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt=""/>
                                </div>
                                <div>
                                    <img src="https://images.unsplash.com/photo-1514773897744-c63156ebcd94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt=""/>
                                </div>
                                <div><img src="https://images.unsplash.com/photo-1543807669-0d0730e95cb3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt=""/></div>
                            </Carousel>
                        </div>
                        <div className="formlogin px-4 mt-4"style={{width:"55%"}}  >
                            <h1 className="text-center judul_form">Login</h1>

                            <Form className="mt-3">
                                <FormGroup>
                                    <Label for="exampleEmail">Email</Label>
                                    <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="examplePasssword">Password</Label>
                                    <Input type="email" name="email" id="examplePasssword" placeholder="Password" />
                                </FormGroup>
                                {/* <FormGroup check>
                                    <Input type="checkbox" name="check" id="exampleCheck"/>
                                    <Label for="exampleCheck" check> I agree to the Terms and Conditions</Label>
                                </FormGroup> */}
                                <Button className='btn btn-blue-grey mt-4'>Login</Button>
                                <FormGroup className="mt-3">
                                    <p>Belum punya akun? Daftar <a style={{color:"darkgreen"}} onClick={()=>this.setState({modalregist:true})}>disini!</a></p>
                                </FormGroup>
                            </Form>


                            {/* <Form>
                                <Form.Field>
                                <label>Username/Email</label>
                                <input icon='user' placeholder='Username/Email' />
                                </Form.Field>
                                <Form.Field>
                                <label>Password</label>
                                <input placeholder='Password' />
                                </Form.Field>
                                <Form.Field>
                                <Checkbox label='I agree to the Terms and Conditions' />
                                </Form.Field>
                                <Button type='submit'>Submit</Button>
                                <Form.Field className="pt-2" >Belum punya akun? Daftar <a style={{color:"darkgreen"}} onClick={()=>this.setState({modalregist:true})}>disini!</a></Form.Field>
                            </Form> */}
                        </div>
                    </ModalBody>
                </Modal>   

                {/* MODAL REGIST */}
                <Modal size='lg' centered isOpen={this.state.modalregist} toggle={()=>this.setState({modalregist:false})}> 
                    <ModalBody className="d-flex">
                        <div className="gbr_login" style={{width:"45%", height:"100%"}}>
                            <Carousel infiniteLoop showArrows={false} showThumbs={false} showStatus={false} showIndicators={false} autoPlay>
                                <div>
                                    <img src="https://images.unsplash.com/photo-1543807669-0d0730e95cb3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt=""/>
                                </div>
                                <div>
                                    <img src="https://images.unsplash.com/photo-1554679665-f5537f187268?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt=""/>
                                </div>
                                <div>
                                    <img src="https://images.unsplash.com/photo-1501959915551-4e8d30928317?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt=""/>
                                </div>
                                <div>
                                    <img src="https://images.unsplash.com/photo-1514773897744-c63156ebcd94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt=""/>
                                </div>
                                
                            </Carousel>
                        </div>
                        <div className="formlogin px-4"style={{width:"55%"}}  >
                            <h1 className="text-center judul_form mt-3">Register</h1>
                            
                            <Form>
                                <FormGroup>
                                    <Label for="exampleEmail">Nama Lengkap</Label>
                                    <Input type="email" name="email" id="exampleEmail" placeholder="Nama" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleEmail">Email</Label>
                                    <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="tophone">Phome</Label>
                                    <Input type="email" name="email" id="tophone" placeholder="Phome" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="topassword">Password</Label>
                                    <Input type="email" name="email" id="topassword" placeholder="Password" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="toconfirmpass">Confirm Password</Label>
                                    <Input type="email" name="email" id="toconfirmpass" placeholder="Confirm Password" />
                                </FormGroup>
                                <FormGroup check>
                                    <Input type="checkbox" name="check" id="exampleCheck"/>
                                    <Label for="exampleCheck" check> I agree to the Terms and Conditions</Label>
                                </FormGroup>
                                <Button className='btn btn-blue-grey mt-4'>Register</Button>
                                
                            </Form>
                            </div>
                    </ModalBody>
                </Modal>  

            </div>
        )
    }
}
const MapStateToProps =(state)=>{
    return {
        modalLogin:state.modalLogin
    }
}
export default connect(MapStateToProps, {Open_Login}) (Loginregist);