import React from "react";
import styles from "./styles.module.scss";
import EmptyCart from "../../../../assets/empty cart white.svg";
import { Link } from "react-router-dom";

class ProductForPLP extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showButton: false };
  }
  addProductToCart(product) {
    let productCopy = { ...product };
    let newArray = [];
    productCopy.attributsForLocalstorage = [];
    productCopy.attributes.forEach((attribut) => {
      newArray.push([attribut.name, attribut.items[0].value]);
      productCopy.attributsForLocalstorage.push(
        `${attribut.name}-${attribut.items[0].value}`
      );
    });
    productCopy.selectedAttributes = new Map(newArray);
    productCopy.count = 1;
    this.props.addProductToCartAC(productCopy);
  }
  render() {
    const productItem = this.props.product.inStock
      ? styles.productItem
      : styles.productItem + " " + styles.outOfStock;
    return (
      <div
        className={productItem}
        onMouseOver={() => {
          this.setState({ showButton: true });
        }}
        onMouseOut={() => {
          this.setState({ showButton: false });
        }}
      >
        <Link to={`/product/${this.props.id}`}>
          <div className={styles.productPhoto}>
            <img
              src={this.props.product.gallery[0]}
              alt={this.props.product.name}
            />
            {!this.props.product.inStock && (
              <div className={styles.availabilityProduct}>OUT OF STOCK</div>
            )}
          </div>
        </Link>

        {this.state.showButton && this.props.product.inStock && (
          <div
            className={styles.addToCartBtn}
            onClick={() => this.addProductToCart(this.props.product)}
          >
            <img src={EmptyCart} alt='cart' color='white' />
          </div>
        )}
        <Link to={`/product/${this.props.id}`}>
          <div className={styles.productName}>
            {this.props.product.brand} {this.props.product.name}
          </div>
        </Link>

        <div className={styles.costOfProduct}>
          <div>
            {
              this.props.product.prices[this.props.selectedCurrency].currency
                .symbol
            }
          </div>
          <div>
            {this.props.product.prices[this.props.selectedCurrency].amount}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductForPLP;
