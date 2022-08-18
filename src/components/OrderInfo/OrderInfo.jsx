import React from "react";
import styles from "./styles.module.scss";
import { connect } from "react-redux";
import { Navigate } from "react-router";
import { cartClearAC } from "../../state/app-reducer";
import СonfirmationOfOrder from "./components/ConfirmationOfOrder/СonfirmationOfOrder";
import OrderHasBeenSent from "./components/OrderHasBeenSent/OrderHasBeenSent";

class OrderInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orderIsSend: false };
  }
  render() {
    window.scrollTo(0, 0);
    if (this.props.cart.length === 0 && !this.state.orderIsSend) {
      return <Navigate to={`/`} />;
    }
    return (
      <div className={styles.orderInfo}>
        {!this.state.orderIsSend ? (
          <СonfirmationOfOrder
            cart={this.props.cart}
            selectedCurrency={this.props.selectedCurrency}
            cartClearAC={this.props.cartClearAC}
            setState={this.setState.bind(this)}
          />
        ) : (
          <OrderHasBeenSent />
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cart: state.app.cart,
    selectedCurrency: state.app.selectedCurrency,
    categories: state.app.categories,
  };
};
export default connect(mapStateToProps, { cartClearAC })(OrderInfo);
