import React, { useState } from "react";

import { MdTableBar, MdPerson, MdNoteAlt } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import { IoIosRestaurant } from "react-icons/io";

import TableDetails from "./dineIn/TableDetails";
import CustomerDetails from "./dineIn/CustomerDetails";
import TotalPersonOnTable from "./dineIn/TotalPersonOnTable";
import AddNotes from "./dineIn/AddNotes";
import AssignWaiter from "./dineIn/AssignWaiter";

function DineInSection({
  tableInfo,
  orderInfo,
  setOrderInfo,
  customerInfo,
  setCustomerInfo,
}) {
  const [orderConfiguration, setOrderConfiguration] = useState("");

  const handleChangeConfiguration = (value) => {
    if (value === orderConfiguration) {
      setOrderConfiguration("");
    } else {
      setOrderConfiguration(value);
    }
  };
  const displayOrderConfiguration = () => {
    switch (orderConfiguration) {
      case "TableDetails":
        return <TableDetails tableInfo={tableInfo} />;
      case "CustomerDetails":
        return (
          <CustomerDetails
            orderInfo={orderInfo}
            setOrderInfo={setOrderInfo}
            customerInfo={customerInfo}
            setCustomerInfo={setCustomerInfo}
          />
        );
      case "TotalPersonOnTable":
        return <TotalPersonOnTable orderInfo={orderInfo} setOrderInfo={setOrderInfo} />;
      case "AddNotes":
        return <AddNotes orderInfo={orderInfo} setOrderInfo={setOrderInfo} />;
      case "AssignWaiter":
        return <AssignWaiter orderInfo={orderInfo} setOrderInfo={setOrderInfo} />;
      case "":
        return null;
      default:
        return null;
    }
  };
  return (
    <div>
      <div
        className="d-flex justify-content-between align-items-center mr-2"
        style={{ border: "2px solid lightgrey" }}
      >
        <div className="d-flex">
          <div
            className={`text-center order-dash-menu ${
              orderConfiguration === "TableDetails" ? "active-dinein" : ""
            }`}
            onClick={() => handleChangeConfiguration("TableDetails")}
          >
            <MdTableBar size={30} />
          </div>
          <div
            className={`text-center order-dash-menu ${
              orderConfiguration === "CustomerDetails" ? "active-dinein" : ""
            }`}
            onClick={() => handleChangeConfiguration("CustomerDetails")}
          >
            <MdPerson size={30} />
          </div>
          <div
            className={`text-center order-dash-menu ${
              orderConfiguration === "TotalPersonOnTable" ? "active-dinein" : ""
            }`}
            onClick={() => handleChangeConfiguration("TotalPersonOnTable")}
          >
            <TiGroup size={30} />
          </div>
          <div
            className={`text-center order-dash-menu ${
              orderConfiguration === "AddNotes" ? "active-dinein" : ""
            }`}
            onClick={() => handleChangeConfiguration("AddNotes")}
          >
            <MdNoteAlt size={30} />
          </div>
          <div
            className={`text-center order-dash-menu ${
              orderConfiguration === "AssignWaiter" ? "active-dinein" : ""
            }`}
            onClick={() => handleChangeConfiguration("AssignWaiter")}
          >
            <IoIosRestaurant size={30} />
          </div>
        </div>
      </div>

      {displayOrderConfiguration()}
    </div>
  );
}

export default DineInSection;
