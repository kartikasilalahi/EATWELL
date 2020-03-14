import React from 'react';
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import Manageproduct from './compmitra/manageproduk'
import Transaksi from './compmitra/transaksi'
import Profile from './compmitra/profile'
import Header from '../../components/header'
import Footer from '../../components/footer'

class Lamanmitra extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="lamanmitra">
                    <Tabs defaultTab="vertical-tab-one" vertical>
                        <TabList>
                            <div className="nama-resto w-auto">
                                <h6>HI, THERE</h6>
                            </div>
                            <Tab tabFor="vertical-tab-one">
                                <i className="fa fa-user-circle-o"></i>
                                <p>Profile</p>
                            </Tab>
                            <Tab tabFor="vertical-tab-two">
                                <i className="fa fa-tasks"></i>
                                <p>Product</p>
                            </Tab>
                            <Tab tabFor="vertical-tab-three">
                                <i className="fa fa-money" ></i>
                                <p>Transaction</p>
                            </Tab>
                        </TabList>
                        <TabPanel style={{ width: "100%" }} tabId="vertical-tab-one">
                            <Profile />
                        </TabPanel>
                        <TabPanel style={{ width: "100%" }} tabId="vertical-tab-two">
                            <Manageproduct />
                        </TabPanel>
                        <TabPanel style={{ width: "100%" }} tabId="vertical-tab-three">
                            <Transaksi />
                        </TabPanel>
                    </Tabs>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Lamanmitra;
