import React, { Component } from 'react';

class Footer extends Component {
  state = {}

  copright = () => {
    var d = new Date();
    return d.getFullYear()
  }

  render() {
    return (
      <footer className="footer-distributed">
        <div className="footer-left">
          <h3>EAT<span>WELL</span></h3>
          {/* <p className="footer-links">
            <a href="#" className="link-1">Home </a>
            <a href="#"> Blog </a>
            <a href="#"> Pricing </a>
            <a href="#"> About </a>
            <a href="#"> Faq </a>
            <a href="#"> Contact </a>
          </p> */}
          <p className="footer-company-name">EATWELL ©{this.copright()}</p>
        </div>
        <div className="footer-center">
          <div>
            <i className="fa fa-map-marker" />
            <p><span>200 . Mammpang</span> Mampang Prapatan, South Jakarta</p>
          </div>
          <div>
            <i className="fa fa-phone" />
            <p>+1.555.555.5555</p>
          </div>
          <div>
            <i className="fa fa-envelope" />
            <p><a href="mailto:support@company.com">support@eatwell.com</a></p>
          </div>
        </div>
        <div className="footer-right">
          <p className="footer-company-about">
            <span>About EATWELL</span>
            Looking for Restaurant Coupons? You've come to the right place! EATWELL is the #1 resource for get restaurant or cafe coupons, offering the latest coupons for over 250 popular restaurants. Just find the restaurant you are looking for below and click on the logo to get the latest coupons. Then just eat & save!
          </p>
          <div className="footer-icons">
            <a href="#"><i className="fa fa-facebook" /></a>
            <a href="https://twitter.com/kartikasilalahi" target="_blank"><i className="fa fa-twitter" /></a>
            <a href="https://www.linkedin.com/in/kartikasilalahi/"><i className="fa fa-linkedin" target="_blank" /></a>
            <a href="https://github.com/kartikasilalahi" target="_blank"><i className="fa fa-github" /></a>
          </div>
        </div>
      </footer>

    );
  }
}

export default Footer;