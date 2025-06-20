import React, { useState } from "react";

// Import Swiper styles

export default function Menu() {
  return (
    <div>
      <section className="menu-section" id="menu">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="d-flex justify-content-between">
                <h1 className="heading">Menu for you</h1>
                <div className="d-flex search-menu">
                  <div className="input-group mb-3 me-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="search by name"
                      aria-label="name"
                    />
                    <span className="input-group-text">
                      <img src="dist/images/icon/search.svg" alt />
                    </span>
                  </div>
                  <img
                    src="dist/images/icon/filter.svg"
                    alt="filter"
                    style={{ height: "fit-content" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
