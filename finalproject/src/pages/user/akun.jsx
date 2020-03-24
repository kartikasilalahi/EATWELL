import React, { Component } from 'react';
import Header from '../../components/header'
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import Akunsaya from './compuser/akun-saya'
import Transaksisaya from './compuser/transaksi-saya'
import Wishlist from './compuser/favorit-saya'
import { connect } from 'react-redux'
import Notfound from '../../components/notfound'

class Akun extends Component {

    render() {
        console.log('iniiii', this.props.roleid)
        if (this.props.roleid !== 1) {
            return <Notfound />
        }
        return (
            <div>
                <div style={{ height: "78px", backgroundColor: "rgba(0,0,0,.9)" }}>
                    <Header />
                </div>
                <div>
                    <Tabs defaultTab="vertical-tab-one" vertical>
                        <TabList className="ml-5 mt-5">
                            <Tab tabFor="vertical-tab-one">
                                <i className="fa fa-money" ></i>
                                <p>My Transaction</p>
                            </Tab>
                            <Tab tabFor="vertical-tab-two">
                                <i className="fa fa-heart"></i>
                                <p>Wishlist</p>
                            </Tab>
                            <Tab tabFor="vertical-tab-four">
                                <i className="fa fa-user-circle-o"></i>
                                <p>Account</p>
                            </Tab>
                        </TabList>
                        <TabPanel className="mt-5 mr-5" style={{ width: "100%" }} tabId="vertical-tab-one">
                            <Transaksisaya />
                        </TabPanel>
                        <TabPanel className="mt-5 mr-3" style={{ width: "100%" }} tabId="vertical-tab-two">
                            <Wishlist />
                        </TabPanel>
                        <TabPanel className="mt-5 mr-3" style={{ width: "100%" }} tabId="vertical-tab-four">
                            <Akunsaya />
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        )
    }

}

const MapStateToProps = (state) => {
    return {
        roleid: state.authReducer.roleid
    }
}

export default connect(MapStateToProps)(Akun)
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux'
// import Header from '../../components/header'
// import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
// import Akunsaya from './compuser/akun-saya'
// import Transaksisaya from './compuser/transaksi-saya'
// import Wishlist from './compuser/favorit-saya'
// import { Redirect } from 'react-router-dom';

// let loop = 1
// function Akunuser() {

//     const State = useSelector(({ authReducer }) => {
//         return {
//             roleid: authReducer.roleid
//         }
//     })

//     // useEffect(() => {
//     //     let id = localStorage.getItem('id')
//     //     if (loop < 2) {
//     //         setroleid(State.roleid)
//     //     }
//     // })

//     console.log(roleid)
    // if (roleid !== 1) {
    //     return <Redirect to={'/notfound'} />
    // }
//     return (
//         <div>
//             <div style={{ height: "78px", backgroundColor: "rgba(0,0,0,.9)" }}>
//                 <Header />
//             </div>
//             <div>
//                 <Tabs defaultTab="vertical-tab-one" vertical>
//                     <TabList className="ml-5 mt-5">
//                         <Tab tabFor="vertical-tab-one">
//                             <i className="fa fa-money" ></i>
//                             <p>My Transaction</p>
//                         </Tab>
//                         <Tab tabFor="vertical-tab-two">
//                             <i className="fa fa-heart"></i>
//                             <p>Wishlist</p>
//                         </Tab>
//                         <Tab tabFor="vertical-tab-four">
//                             <i className="fa fa-user-circle-o"></i>
//                             <p>Account</p>
//                         </Tab>
//                     </TabList>
//                     <TabPanel className="mt-5 mr-5" style={{ width: "100%" }} tabId="vertical-tab-one">
//                         <Transaksisaya />
//                     </TabPanel>
//                     <TabPanel className="mt-5 mr-3" style={{ width: "100%" }} tabId="vertical-tab-two">
//                         <Wishlist />
//                     </TabPanel>
//                     <TabPanel className="mt-5 mr-3" style={{ width: "100%" }} tabId="vertical-tab-four">
//                         <Akunsaya />
//                     </TabPanel>
//                 </Tabs>
//             </div>
//         </div>
//     )
// }

// export default Akunuser;