import React from "react";
import styles from "./styles.module.scss";
import ProductForOrderInfo from "../ProductForOrderInfo/ProductForOrderInfo";
import TotalInfoAboutOrder from "../TotalInfoAboutOrder/TotalInfoAboutOrder";

class СonfirmationOfOrder extends React.Component {
  render() {
    let totalCost = 0;
    this.props.cart.forEach((product) => {
      totalCost +=
        product.prices[this.props.selectedCurrency].amount * product.count;
    });
    let countProductsInCart = 0;
    this.props.cart.forEach(
      (product) => (countProductsInCart += product.count)
    );
    return (
      <div>
        <h1>Your order :</h1>
        <div className={styles.productsInCart}>
          {this.props.cart.map((product) => (
            <ProductForOrderInfo
              key={product.id}
              product={product}
              selectedCurrency={this.props.selectedCurrency}
            />
          ))}
        </div>
        <hr />
        <TotalInfoAboutOrder
          totalCost={totalCost}
          countProductsInCart={countProductsInCart}
          currencySymbol={
            this.props.cart[0].prices[this.props.selectedCurrency].currency
              .symbol
          }
          cartClearAC={this.props.cartClearAC}
          setState={this.props.setState}
        />
      </div>
    );
  }
}

export default СonfirmationOfOrder;
