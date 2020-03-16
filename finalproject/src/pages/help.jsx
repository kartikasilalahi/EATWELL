import React, { Component } from 'react';
import Header from '../components/mainheader'
import Footer from '../components/footer'
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";


class Help extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="help1">
                    <div className="judulhelp">
                        HELP CENTER
                        <p className="teks">Come and eat well with our delicious & healthy foods.</p>
                    </div>
                </div>
                <div className="lamanadmin">
                    <Tabs defaultTab="vertical-tab-one" vertical>
                        <TabList>
                            <div className="nama-resto w-auto">
                                <h6>HI, THERE</h6>
                            </div>
                            <Tab tabFor="vertical-tab-one">
                                <p>How to get voucher?</p>
                            </Tab>
                            <Tab tabFor="vertical-tab-two">
                                <p>Where can I use vouchers?</p>
                            </Tab>
                            <Tab tabFor="vertical-tab-three">
                                <p>Do I need to print vouchers?</p>
                            </Tab>
                            <Tab tabFor="vertical-tab-four">
                                <p>Others</p>
                            </Tab>
                        </TabList>
                        <TabPanel style={{ width: "100%" }} tabId="vertical-tab-one">
                            <div className="mx-3 px-4 py-3">
                                <h6>HOW TO SHOP AT EATWELL </h6>
                                1. Login or Register first <br />
                                2. Tap or click icon cart on the desired promos produk<br />
                                3. Read the promo info and conditions about the desired promo first <br />
                                4. Click the "Buy" button <br />
                                5. Check your email. Invoice was sent on your email. you can also see it ini 'my transaction' menu. <br />
                                6. Use transaction code to make payment. <br />
                                7. Then upload your payment. <br />
                                8. Check again your email. Voucher code has been sent to your email. You get the voucher <br />
                                9. Bring the voucher code to restaurant, the restauran will check the validation of the code. if correct, you can eatwell :) <br />
                                <p className="font-weight-bolder">If payment has been made, make sure the transaction was successful in 'my transaction' section.</p>
                            </div>
                        </TabPanel>
                        <TabPanel style={{ width: "100%" }} tabId="vertical-tab-two">
                            <div className="mx-3 px-4 py-3">
                                <h6>Where can I use vouchers?</h6>
                                At the location you chose when you bought the voucher. If you buy vouchers from Restaurant A, for branches in Mall X, you can only use vouchers in Restaurant A in Mall X branches, vouchers cannot be used in Restaurant A in Mall Z branches even though both restaurants are the same restaurant.
                            </div>
                        </TabPanel>
                        <TabPanel style={{ width: "100%" }} tabId="vertical-tab-three">
                            <div className="mx-3 px-4 py-3">
                                <h6>Do I need to print vouchers?</h6>
                                No, the voucher is enough to be displayed from your gadget / cellphone
                            </div>
                        </TabPanel>
                        <TabPanel style={{ width: "100%" }} tabId="vertical-tab-four">
                            <div className="mx-3 px-4 py-3">
                                <h6>Join with Us</h6>
                                Register Your Business with Eatwell, An Effective Media To Promote Your Business, to increase sales and get new customers. For more details, click <a style={{ textDecoration: 'none', color: 'green', fontWeight: 'bold' }} href='/join'>here</a>
                            </div>
                        </TabPanel>

                    </Tabs>
                </div>

                <Footer />
            </div >
        );
    }
}

export default Help;