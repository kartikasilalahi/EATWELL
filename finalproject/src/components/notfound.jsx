import React, { Component } from 'react'

export default class notfound extends Component {
    render() {
        return (
            <div>
                <div id="notfound">
                    <div className="notfound">
                        <div className="notfound-bg">
                            <div />
                            <div />
                            <div />
                        </div>
                        <h1>oops!</h1>
                        <h2>Error 404 : Page Not Found</h2>
                        <a className="none" href="/">go back</a>
                        <div className="notfound-social">
                            <a href="#"><i style={{ color: 'white' }} className="none fa fa-facebook" /></a>
                            <a href="#"><i style={{ color: 'white' }} className="none fa fa-twitter" /></a>
                            <a href="#"><i style={{ color: 'white' }} className="none fa fa-pinterest" /></a>
                            <a href="#"><i style={{ color: 'white' }} className="none fa fa-google-plus" /></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
