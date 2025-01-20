import React from "react";

function TableDetails({ tableInfo }) {
  return (
    <div className="d-flex w-100 p-2">
      <div className="w-50">Table Area - {tableInfo.area}</div>
      <div>Table No. - {tableInfo.table_no}</div>
    </div>
  );
}

export default TableDetails;
