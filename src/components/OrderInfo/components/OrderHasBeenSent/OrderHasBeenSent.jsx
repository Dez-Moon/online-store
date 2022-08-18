import React from "react";
import { Link } from "react-router-dom";

class OrderHasBeenSent extends React.Component {
  render() {
    return (
      <div>
        <p>Your order has been successfully sent.</p>
        <Link to={`/`}>
          <button>TO MAIN PAGE</button>
        </Link>
      </div>
    );
  }
}

export default OrderHasBeenSent;
