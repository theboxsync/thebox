import React, { useState } from "react";
import ReactDOM from "react-dom";

export default function Hero(){
    return(
        <section className="hero-section" id="hero">
        <div id="carouselExampleCaptions" className="carousel slide">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={0}
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={1}
              aria-label="Slide 2"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={2}
              aria-label="Slide 3"
            />
          </div>
          <div
            className="carousel-inner"
            style={{ backgroundImage: "url(../images/hero-bg.png)" }}
          >
            <div className="carousel-item active">
              <img
                src="dist/images/sliderphoto-1.png"
                className="d-block float-end slides1 "
                alt="..."
              />
              <div className="carousel-caption">
                <div className="container">
                  <div className="row ">
                    <div className="col-lg-7 col-md-7 col-sm-4 text-justify">
                      <h1 className="heading">
                        From Kitchen To Table,
                        <br />
                        Let's Savor The Moments
                      </h1>
                      <p className="subheading">
                        Step into our inviting ambiance, where passion for food
                        and a warm atmosphere blend seamlessly, making every
                        visit memorable.
                      </p>
                      <div className="hero-btn d-flex pt-5">
                        <img
                          src="dist/images/get it on google play.png"
                          alt
                          width={200}
                        />
                         
                        <img src="dist/images/Appstore.png" alt width={200} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-caption" id="carousel-caption-android">
                <div className="container">
                  <div className="row ">
                    <div className="col-sm-7 col-7 text-justify">
                      <h1 className="heading">
                        From Kitchen To Table, Let's Savor The Moments
                      </h1>
                      <p className="subheading">
                        Step into our inviting ambiance, where passion for food
                        and a warm atmosphere blend seamlessly.
                      </p>
                      <div className="hero-android-btn">
                        <img src="dist/images/android hero btn.png" alt />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="dist/images/sliderphoto-1.png"
                className="d-block float-end slides1"
                alt="..."
              />
              <div className="carousel-caption">
                <div className="container">
                  <div className="row ">
                    <div className="col-lg-7 col-md-7 text-justify">
                      <h1 className="heading">
                        From Kitchen To Table,
                        <br />
                        Let's Savor The Moments
                      </h1>
                      <p className="subheading">
                        Step into our inviting ambiance, where passion for food
                        and a warm atmosphere blend seamlessly, making every
                        visit memorable.
                      </p>
                      <div className="hero-btn d-flex pt-5">
                        <img
                          src="dist/images/get it on google play.png"
                          alt
                          width={200}
                        />
                         
                        <img src="dist/images/Appstore.png" alt width={200} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-caption" id="carousel-caption-android">
                <div className="container">
                  <div className="row ">
                    <div className="col-sm-7 col-7 text-justify">
                      <h1 className="heading">
                        From Kitchen To Table, Let's Savor The Moments
                      </h1>
                      <p className="subheading">
                        Step into our inviting ambiance, where passion for food
                        and a warm atmosphere blend seamlessly.
                      </p>
                      <div className="hero-android-btn">
                        <img src="dist/images/android hero btn.png" alt />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="dist/images/sliderphoto-1.png"
                className="d-block float-end slides1"
                alt="..."
              />
              <div className="carousel-caption">
                <div className="container">
                  <div className="row ">
                    <div className="col-lg-7 col-md-7 text-justify">
                      <h1 className="heading">
                        From Kitchen To Table,
                        <br />
                        Let's Savor The Moments
                      </h1>
                      <p className="subheading">
                        Step into our inviting ambiance, where passion for food
                        and a warm atmosphere blend seamlessly, making every
                        visit memorable.
                      </p>
                      <div className="hero-btn d-flex pt-5">
                        <img
                          src="dist/images/get it on google play.png"
                          alt
                          width={200}
                        />
                         
                        <img src="dist/images/Appstore.png" alt width={200} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-caption" id="carousel-caption-android">
                <div className="container">
                  <div className="row ">
                    <div className="col-sm-7 col-7">
                      <h1 className="heading">
                        From Kitchen To Table, Let's Savor The Moments
                      </h1>
                      <p className="subheading">
                        Step into our inviting ambiance, where passion for food
                        and a warm atmosphere blend seamlessly.
                      </p>
                      <div className="hero-android-btn">
                        <img src="dist/images/android hero btn.png" alt />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
          <div className="d-block">
            <img
              className="carousel-control"
              src="dist/images/icon/facebook-1.svg"
              alt
              width={16}
            />
            <img
              className="carousel-control1"
              src="dist/images/icon/instagra-1.svg"
              alt
              width={20}
            />
            <img
              className="carousel-control2"
              src="dist/images/icon/twitter-1.svg"
              alt
              width={20}
            />
            <img
              className="carousel-control3"
              src="dist/images/icon/youtube-1.svg"
              alt
              width={20}
            />
          </div>
        </div>
      </section>
 
    )
}