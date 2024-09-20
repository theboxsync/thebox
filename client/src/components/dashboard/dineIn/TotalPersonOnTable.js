import React from "react";


function TotalPersonOnTable2({ orderInfo, setOrderInfo }) {
  return (
    <div className="form-group row w-100 p-2">
      <div className="col-md-4">
        <label className="form-label">Total Persons on Table</label>
        <input
          type="number"
          className="form-control"
          placeholder="Total Persons"
          value={orderInfo.total_persons}
          onChange={(e) => setOrderInfo({ ...orderInfo, total_persons: e.target.value })}
        />
      </div>
    </div>
  );
}

export default TotalPersonOnTable2;
