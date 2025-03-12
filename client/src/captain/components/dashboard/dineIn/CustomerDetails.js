import React from "react";

function CustomerDetails({ orderInfo, setOrderInfo, customerInfo, setCustomerInfo }) {
  return (
    <div className="form-group row w-100 p-2">
      <div className="col-md-4">
        <label className="form-label">Customer Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Customer Name"
          value={customerInfo.name}
          onChange={(e) => {
            setOrderInfo({ ...orderInfo, customer_name: e.target.value });
            setCustomerInfo({ ...customerInfo, name: e.target.value });
          }}
        />
      </div>
      <div className="col-md-4">
        <label className="form-label">Phone Number</label>
        <input
          type="number"
          className="form-control"
          placeholder="Phone Number"
          value={customerInfo.phone}
          onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
        />
      </div>
      <div className="col-md-4">
        <label className="form-label">Email Address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={customerInfo.email}
          onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
        />
      </div>
    </div>
  );
}

export default CustomerDetails;
