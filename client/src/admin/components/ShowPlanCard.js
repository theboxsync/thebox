import React, { useEffect } from "react";

const PlanCard = ({plan, buyPlan}) => {
  useEffect(() => {
    console.log(plan);
  }, []);
  return (
    <div
      className="card m-4 box-shadow"
      style={{ width: "20rem" }}
      key={plan._id}
    >
      <div className="card-header">
        <h4 className="my-0 font-weight-normal">{plan.plan_name}</h4>
      </div>
      <div className="card-body">
        <h1 className="card-title pricing-card-title">
          ₹ {plan.plan_price} <small className="text-muted">/ {plan.plan_duration} months</small>
        </h1>
        <div className="mt-5">
          <button
            type="button"
            className="btn btn-lg btn-block btn-primary"
            onClick={() => {
              buyPlan(plan._id);
            }}
          >
            Buy Now
          </button>
        </div>

        <div className="d-flex justify-content-center align-items-center mt-3">
          <ul className="list-unstyled mt-3 mb-4">
            {plan.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
