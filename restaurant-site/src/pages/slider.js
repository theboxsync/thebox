import React from "react";

// Import Swiper styles

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";
export default function Slider() {
  return (
    <div>
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        loop={true}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          {" "}
          <img
            src="dist/images/swiper photo-1.png"
            alt="ClientName"
            title="ClientName1"
            style={{ width: "100%", height: "100%" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img
            src="dist/images/swiper photo-2.png"
            alt="ClientName"
            title="ClientName1"
            style={{ width: "100%", height: "100%" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img
            src="dist/images/swiper photo-3.png"
            alt="ClientName"
            title="ClientName1"
            style={{ width: "100%", height: "100%" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img
            src="dist/images/swiper photo-4.png"
            alt="ClientName"
            title="ClientName1"
            style={{ width: "100%", height: "100%" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img
            src="dist/images/swiper photo-5.png"
            alt="ClientName"
            title="ClientName1"
            style={{ width: "100%", height: "100%" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img
            src="dist/images/swiper photo-3.png"
            alt="ClientName"
            title="ClientName1"
            style={{ width: "100%", height: "100%" }}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
