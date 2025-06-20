import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";

export const TodaysSpecial = ({ itemsA, addToCart }) => (
  <div className="container">
    <Swiper
      slidesPerView={3}
      spaceBetween={10}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      }}
      navigation={true}
      modules={[Autoplay, Navigation]}
      className="mySwiper"
    >
      {itemsA.map((item, index) => (
        <SwiperSlide>
          {" "}
          <div className="food-box" key={item.name}>
            <div className="pic">
              <img className="food-img" src={item.src} alt={item.name} />
            </div>
            <h2 className="food-title">{item.name}</h2>
            <div>
              {item.rate}
              {45}
            </div>
            <div className="pt-2 pb-2">
              <h6 className="card-subtitle">{item.clock}</h6>
            </div>

            <p className="card-text">{item.description}</p>
            <span className="food-price">Rs.{item.price}</span>

            {!item.inCart ? (
              <>
                <FontAwesomeIcon
                  className="add-cart"
                  icon={faShoppingCart}
                  onClick={() => addToCart(index)}
                />
                {/* ,<button onClick={() => addToCart(i)}> add to cart </button> */}
              </>
            ) : (
              <p>
                <b>Item added! Quantity: {item.quantity}</b>
              </p>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);
