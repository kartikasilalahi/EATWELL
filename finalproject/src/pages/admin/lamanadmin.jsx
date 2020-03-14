import React from 'react'
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import Alluser from './compadmin/allUser'
import Allcategory from './compadmin/manageCategory'
import Allschedule from './compadmin/manageSchedules'
import Alltransaction from './compadmin/allTransaction'


import Header from '../../components/header'
function Lamanadmin() {
    return (
        <div>
            <Header />
            <div className="lamanadmin">
                <Tabs defaultTab="vertical-tab-one" vertical>
                    <TabList>
                        <div className="nama-resto w-auto">
                            <h6>HI, THERE</h6>
                        </div>
                        <Tab tabFor="vertical-tab-one">
                            <i className="fa fa-user-circle-o"></i>
                            <p>All User</p>
                        </Tab>
                        <Tab tabFor="vertical-tab-two">
                            <i className="fa fa-tasks"></i>
                            <p>Manage Category Product</p>
                        </Tab>
                        <Tab tabFor="vertical-tab-three">
                            <i className="fa fa-money" ></i>
                            <p>Manage Schedules</p>
                        </Tab>
                        <Tab tabFor="vertical-tab-four">
                            <i className="fa fa-money" ></i>
                            <p>All Transaction</p>
                        </Tab>
                    </TabList>
                    <TabPanel style={{ width: "100%" }} tabId="vertical-tab-one">
                        <Alluser />
                    </TabPanel>
                    <TabPanel style={{ width: "100%" }} tabId="vertical-tab-two">
                        <Allcategory />
                    </TabPanel>
                    <TabPanel style={{ width: "100%" }} tabId="vertical-tab-three">
                        <Allschedule />
                    </TabPanel>
                    <TabPanel style={{ width: "100%" }} tabId="vertical-tab-four">
                        <Alltransaction />
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    )
}

export default Lamanadmin
