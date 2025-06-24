import React, { useEffect } from "react";

const PlanCard = ({ plan, buyPlan }) => {
  useEffect(() => {
    console.log(plan);
  }, []);
  return (
    <div className="col-md-4">

      <div
        className="card m-2 box-shadow"
        style={{backgroundColor: "lightgrey"}}
        key={plan._id}
      >
        <div className="card-header" style={{borderBottom: "1px solid grey"}}>
          <h5 className="my-0 font-weight-bold">{plan.plan_name}</h5>
        </div>
        <div className="card-body">

          <div className="d-flex justify-content-center align-items-center mt-3">
            <ul className="list-unstyled">
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="mt-3">
            <button
              type="button"
              className="btn btn-lg btn-block btn-primary"
              onClick={() => {
                buyPlan(plan._id);
              }}
            >
              ₹ {plan.plan_price} <small className="text-light">/ {plan.plan_duration} months</small>
            </button>
          </div>


        </div>
      </div>

    </div>
  );
};

export default PlanCard;
