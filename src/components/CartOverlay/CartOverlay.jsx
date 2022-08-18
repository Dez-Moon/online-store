import React from "react";
import styles from "./styles.module.scss";
import { connect } from "react-redux";
import {
  editCountProductInCartAC,
  deleteProductFromCartAC,
} from "../../state/app-reducer";
import { Link } from "react-router-dom";
import ProductInCartOverlay from "./components/ProductInCartOverlay/ProductInCartOverlay";

class CartOverlay extends React.Component {
  render() {
    window.scrollTo(0, 0);
    let totalCost = 0;
    this.props.cart.forEach((product) => {
      totalCost +=
        product.prices[this.props.selectedCurrency].amount * product.count;
    });
    if (this.props.cart.length !== 0)
      return (
        <div className={styles.cartOverlay}>
          <div className={styles.header}>
            <span>My Bag</span>{" "}
            {this.props.countProductsInCart +
              " " +
              (this.props.countProductsInCart === 1 ? "item" : "items")}
          </div>
          <div className={styles.productsInCart}>
            {this.props.cart.map((product, index) => (
              <ProductInCartOverlay
                key={product.id + index}
                product={product}
                index={index}
                selectedCurrency={this.props.selectedCurrency}
                editCountProductInCartAC={this.props.editCountProductInCartAC}
                deleteProductFromCartAC={this.props.deleteProductFromCartAC}
              />
            ))}
            <div className={styles.totalCost}>
              <div>Total</div>
              <div>
                <span>
                  {
                    this.props.cart[0].prices[this.props.selectedCurrency]
                      .currency.symbol
                  }
                </span>
                {totalCost.toFixed(2)}
              </div>
            </div>
          </div>
          <div className={styles.bigBtns}>
            <Link to='/cart'>
              <button
                onClick={() => {
                  this.props.cartOverlayClose();
                }}
              >
                VIEV BAG
              </button>
            </Link>
            <Link to='/order-info'>
              <button
                onClick={() => {
                  this.props.cartOverlayClose();
                }}
              >
                CHECK OUT
              </button>
            </Link>
          </div>
        </div>
      );
  }
}
const mapStateToProps = (state) => {
  return {
    cart: state.app.cart,
    selectedCurrency: state.app.selectedCurrency,
  };
};
export default connect(mapStateToProps, {
  editCountProductInCartAC,
  deleteProductFromCartAC,
})(CartOverlay);
