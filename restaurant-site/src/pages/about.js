import React from "react";

export default function About() {
  return (
    <div>
      <section id="about" className="about">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-6 order-md-1 order-2 align-items-stretch">
              <a
                className="order play-btn mb-4"
                data-vbtype="video"
                data-autoplay="true"
              >
                <img src="dist/images/order photo.png" alt />
              </a>
            </div>
            <div className="col-lg-6 col-md-6 order-md-2 order-1 d-flex flex-column justify-content-center align-items-stretch">
              <div className="content">
                <h1 className="heading">
                  Every Bite Tells a Story
                  <br />
                  of Love and Dedication
                </h1>
                <p className="subheading pt-2">
                  Discover a world of flavors meticulously crafted by our
                  talented chefs, using the finest locally-sourced ingredients.{" "}
                </p>
                <div className="d-flex pt-4">
                  <a href="#booktable" className="btn btn-outline-warning">
                    Book a Table
                  </a>
                   
                  <a href="#" className="btn btn-warning">
                    Order Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
