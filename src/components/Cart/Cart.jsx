import React from "react";
import styles from "./styles.module.scss";
import { connect } from "react-redux";
import {
  editCountProductInCartAC,
  deleteProductFromCartAC,
} from "../../state/app-reducer";
import { Link } from "react-router-dom";
import ProductInCart from "./components/ProductInCart/ProductInCart";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showPhoto: new Map() };
  }

  changePhoto(index, value) {
    let a = this.state.showPhoto;
    a.set(index, value);
    this.setState({ showPhoto: a });
  }
  render() {
    let totalCost = 0;
    if (this.props.cart.length !== 0) {
      this.props.cart.forEach((product) => {
        totalCost +=
          product.prices[this.props.selectedCurrency].amount * product.count;
      });
    }
    let countProductsInCart = 0;
    this.props.cart.forEach(
      (product) => (countProductsInCart += product.count)
    );
    return (
      <div className={styles.cart}>
        <h1>CART</h1>
        <hr />
        {this.props.cart.length === 0 ? (
          <div>Сart is empty</div>
        ) : (
          <div className={styles.productsInCart}>
            {this.props.cart.map((product, index) => {
              if (!this.state.showPhoto.has(index)) {
                this.state.showPhoto.set(index, 0);
              }
              return (
                <ProductInCart
                  key={product.id}
                  product={product}
                  index={index}
                  showPhoto={this.state.showPhoto}
                  selectedCurrency={this.props.selectedCurrency}
                  changePhoto={this.changePhoto.bind(this)}
                  editCountProductInCartAC={this.props.editCountProductInCartAC}
                  deleteProductFromCartAC={this.props.deleteProductFromCartAC}
                />
              );
            })}
            <div className={styles.lastBlockinCart}>
              <div className={styles.totalInfo}>
                <div className={styles.totalMeaning}>
                  <div>Tax 21% :</div>
                  <div>Quantity :</div>
                  <div>Total :</div>
                </div>
                <div className={styles.totalValue}>
                  <div>
                    <span>
                      {
                        this.props.cart[0].prices[this.props.selectedCurrency]
                          .currency.symbol
                      }
                    </span>
                    {(totalCost * 0.21).toFixed(2)}
                  </div>
                  <div>{countProductsInCart}</div>
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
              <Link to='/order-info'>
                <button>CHECK OUT</button>
              </Link>
            </div>
          </div>
        )}
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
})(Cart);
