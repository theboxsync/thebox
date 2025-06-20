import React from "react";
import ScrollToTop from "react-scroll-to-top"
import "../styles.css";
export default function Footer() {
  return (
    <div>
      <footer className="main-footer">
        <section className="footer">
          <div className="container">
            <div className="row text-justify">
              <div className="col-6 col-md-2 mb-3">
                <h5>ABOUT</h5>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      Who We Are
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      Our Story
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      Blog
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-6 col-md-2 mb-3">
                <h5>LOCATIONS</h5>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      Marathahalli
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      HSR Layout
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      Electonic City
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      Whitefield
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-6 col-md-2 mb-3">
                <h5>LEARN MORE</h5>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      Privacy
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      Terms
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      Sitemap
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-6 col-md-2 mb-3">
                <h5>CONTACT</h5>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      Head Branch : 22th main road, Marathalli, Bangalore - 37
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      +91 123456789
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      spicekitchen@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-3 offset-md-1 mb-3">
                <form>
                  <h5>SEND US YOUR FEEDBACK</h5>
                  <div className="d-flex flex-column flex-sm-row w-100 gap-2 footerform">
                    <label htmlFor="newsletter1" className="visually-hidden">
                      Email address
                    </label>
                    <input
                      id="newsletter1"
                      type="text"
                      className="form-control"
                      placeholder="type here..."
                    />
                    <button
                      className="btn btn-warning"
                      id="footerbtn"
                      type="button"
                    >
                      submit
                    </button>
                  </div>
                </form>
                <div className="pt-4">
                  <h5 className="pb-3">SOCIAL LINKS</h5>
                  <img src="dist/images/icon/facebook.svg" alt="facebook" /> 
                  <img src="dist/images/icon/instagram.svg" alt="insta" /> 
                  <img src="dist/images/icon/twitter.svg" alt="twitter" /> 
                  <img src="dist/images/icon/youtube.svg" alt="youtube" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="copyright pt-2 pb-1">
          <div className="container">
            <div className="d-flex justify-content-center">
              <span />
              <span>Spice Kitchen, Inc. All Rights Reserved</span>

              {/* <ScrollToTop smooth className="scroll-to-top-button">
                ↑
              </ScrollToTop> */}
            <ScrollToTop />
            </div>
          </div>
        </section>
        <section className="footer-android">
          <div className="container">
            <hr />
            <div className="row">
              <h5>Support</h5>
              <div className="col-sm-6 col-6">
                <ul className="nav flex-column">
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      Contact us
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      Promotion &amp; sale
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      Track order
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      Privacy policy
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      Initiate return
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-sm-6 col-6">
                <ul className="nav flex-column">
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      FAQs
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      My account
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      Return policy
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      Terms &amp; conditions
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <hr />
            <div className="row">
              <h5>About</h5>
              <div className="col-sm-6 col-6">
                <ul className="nav flex-column">
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      Company
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      Press center
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      Sustainability
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      Store finder
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-sm-6 col-6">
                <ul className="nav flex-column">
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      Corporate news
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      Investors
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-12">
                <img src="dist/images/icon/facebook-1.svg" alt /> 
                <img src="dist/images/icon/twitter-1.svg" alt /> 
                <img src="dist/images/icon/instagra-1.svg" alt />
              </div>
            </div>
            <hr />
            {/* copyright */}
            <div className="row">
              <div className="col-sm-12">
                <a
                  href="#"
                  style={{
                    textDecoration: "none",
                    color: "#949494",
                    fontSize: 10,
                  }}
                >
                  Designed by Digitaltripolystudio.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </footer>
    </div>
  );
}
