import React from "react";

function AddNotes({ orderInfo, setOrderInfo }) {
  return (
    <div className="form-group row w-100 p-2">
      <label className="form-label">Add Notes</label>
      <textarea
        type="number"
        className="form-control"
        placeholder="Add Notes"
        value={orderInfo.comment}
        onChange={(e) => setOrderInfo({ ...orderInfo, comment: e.target.value })}
      />
    </div>
  );
}

export default AddNotes;
