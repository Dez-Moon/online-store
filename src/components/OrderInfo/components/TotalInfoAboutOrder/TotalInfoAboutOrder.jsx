import React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

class TotalInfoAboutOrder extends React.Component {
  render() {
    return (
      <div className={styles.lastBlockInComponent}>
        <div className={styles.totalInfo}>
          <div className={styles.totalMeaning}>
            <div>Tax 21%:</div>
            <div>Quantity:</div>
            <div>Total:</div>
          </div>
          <div className={styles.totalValue}>
            <div>
              <span>{this.props.currencySymbol}</span>
              {(this.props.totalCost * 0.21).toFixed(2)}
            </div>
            <div>{this.props.countProductsInCart}</div>
            <div>
              <span>{this.props.currencySymbol}</span>
              {this.props.totalCost.toFixed(2)}
            </div>
          </div>
        </div>
        <div className={styles.buttons}>
          <button
            onClick={() => {
              this.props.setState({ orderIsSend: true });
              this.props.cartClearAC();
              localStorage.setItem("cart", []);
            }}
          >
            SEND ORDER
          </button>
          <Link to='/'>
            <button>CONTINUE SHOPING</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default TotalInfoAboutOrder;
