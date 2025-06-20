import React from "react";

export default function Booking(){
    return(
        <div>
            <section className="book_section layout_padding" id="booktable">
            <div className="container">
                <div className="heading_container">
                    <h1>
                        Book A Table
                    </h1>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form_container mt-4 pb-2">
                            <form action>
                                <div>
                                    <input type="text" className="form-control" placeholder="Your Name" />
                                </div>
                                <div>
                                    <input type="text" className="form-control" placeholder="Phone Number" />
                                </div>
                                <div>
                                    <input type="email" className="form-control" placeholder="Your Email" />
                                </div>
                                <div>
                                    <input type="number" className="form-control" placeholder="How Many Persons?" />
                                </div>
                                <div>
                                    <input type="date" className="form-control" />
                                </div>
                                <div className="btn_box">
                                    <button>
                                        Book Now
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="map_container ">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0757382506395!2d77.59319877442769!3d12.967005314980339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16762b09415b%3A0xefcb055d45fdada5!2sLotus%20Pavilion%2C%20ITC%20Gardenia%20-%20Restaurants%20In%20Bengaluru!5e0!3m2!1sen!2sin!4v1740554322520!5m2!1sen!2sin"
                                width={600} height={450} style={{border: 0}} allowFullScreen loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        </div>
    )
}