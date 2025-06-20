import React from "react";
import Card from "./card";

export default function Offer() {
  return (
    <div>
      <section id="offer">
        <div className="container">
          <h1 className="heading text-center">Offer for you</h1>
          <p className="subheading text-center">
            Savor the savings with our offers for you today
          </p>
          <div className="row offer">
            <div className="col-sm-6">
              <img src="dist/images/offer-photo-1.png" alt="offers" />
              <img
                className="pt-2"
                src="dist/images/offer photo-2.png"
                alt="offers"
              />
            </div>
            <div className="col-sm-3">
              <img
                src="dist/images/offer photo-3.png"
                alt="offers"
                height="100%"
              />
            </div>
            <div className="col-sm-3">
              <img
                src="dist/images/offer photo-4.png"
                alt="offers"
                height="100%"
              />
            </div>
          </div>
          <div className="row offer-android">
            <div className="col-sm-12">
              <img src="dist/images/offer-photo-1.png" alt="offers" />
              <img
                className="pt-2"
                src="dist/images/offer photo-2.png"
                alt="offers"
              />
            </div>
            <a
              href="javascrit:void(0);"
              className="view text-center pt-3"
              id="loadore"
              onclick="loadmore()"
            >
              View more <img src="/images/icon/downarrow.svg" alt />
            </a>
            <div className="load-img" id="load-img" style={{ display: "none" }}>
              <div className="col-sm-12 ">
                <img
                  src="dist/images/offer photo-3.png"
                  alt="offers"
                  height="100%"
                />
                <img
                  src="dist/images/offer photo-4.png"
                  alt="offers"
                  height="100%"
                />
              </div>
              <div className="text-center">
                <a
                  href="javascrit:void(0);"
                  className="view text-center pt-3"
                  id="viewless"
                  onclick="viewless()"
                >
                  View less{" "}
                  <img
                    src="/images/icon/downarrow.svg"
                    alt
                    style={{ transform: "rotate(180deg)" }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
