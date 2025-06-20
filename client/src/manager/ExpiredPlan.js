import React from "react";
import { Link } from "react-router-dom";

import "../style.css";

function ExpiredPlan() {
  const styles = {
    container: {
      margin: "0 auto",
      padding: "2rem",
      textAlign: "center",
    },
    heading: {
      fontSize: "6rem",
      color: "#FF6B6B",
    },
    subheading: {
      margin: "1rem 0",
    },
    paragraph: {
      fontSize: "1.2rem",
      color: "#666",
    },
  };

  return (
    <div className="d-flex align-items-center" style={{ height: "80vh" }}>
      <div style={styles.container} className="container">
        <div className="d-flex justify-content-center">
          <Link to={"/"} className="brand-link">
            <span
              className="brand-text text-center"
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "50px",
              }}
            >
              THE BOX
            </span>
          </Link>
        </div>
        <h1 style={styles.heading}>Expired</h1>
        <h3 style={styles.subheading}>Oops! May be your plan is expired</h3>
        <p style={styles.paragraph}>
          Please contact your administrator.
        </p>
      </div>
    </div>
  );
}

export default ExpiredPlan;
