import React from "react";
import styles from "./styles.module.scss";
import { apolloClient } from "../..";
import { connect } from "react-redux";
import { addProductToCartAC } from "../../state/app-reducer";
import { withRouter } from "../../HOC/HOC";
import AttributProduct from "./components/AttributProduct/AttributProduct";
import parse from "html-react-parser";
import { getProducts } from "../../Сonstants for server requests/con";

class PDP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      attributes: new Map(),
      indexForBigPhoto: 0,
    };
  }
  componentDidMount() {
    const categories = JSON.parse(getProducts);
    categories.forEach((category) => {
      category.products.forEach((product) => {
        if (product.id === this.props.router.params.id) {
          this.setState({
            product,
          });
          product.attributes.forEach((attribut) => {
            this.state.attributes.set(attribut.name, attribut.items[0].value);
          });
        }
      });
    });
  }
  changeValue(name, index) {
    let a = this.state.attributes;
    a.set(name, index);
    this.setState({ attributes: a });
  }
  addProductToCart() {
    let product = { ...this.state.product };
    product.selectedAttributes = new Map(this.state.attributes);
    product.attributsForLocalstorage = [];
    this.state.attributes.forEach((value, key) => {
      product.attributsForLocalstorage.push(`${key}-${value}`);
    });
    product.count = 1;
    this.props.addProductToCartAC(product);
  }
  render() {
    if (this.state.product) {
      const productItem = this.state.product.inStock
        ? styles.PDP
        : styles.PDP + " " + styles.outOfStock;
      return (
        <div className={productItem}>
          <div className={styles.productPhotos}>
            {this.state.product.gallery.map((photo, index) => (
              <div key={index} className={styles.productPhoto}>
                <img
                  src={photo}
                  alt={photo}
                  onClick={() => this.setState({ indexForBigPhoto: index })}
                />
              </div>
            ))}
          </div>
          <div className={styles.bigProductPhoto}>
            <img
              src={this.state.product.gallery[this.state.indexForBigPhoto]}
              alt={this.state.product.gallery[this.state.indexForBigPhoto]}
            />
            {!this.state.product.inStock && (
              <div className={styles.availabilityProduct}>OUT OF STOCK</div>
            )}
          </div>
          <div className={styles.aboutProduct}>
            <div className={styles.nameProduct}>
              <div className={styles.brand}>{this.state.product.brand}</div>
              <div>{this.state.product.name}</div>
            </div>
            <div className={styles.details}>
              <div className={styles.attributes}>
                {this.state.product.attributes.map((attribut) => (
                  <AttributProduct
                    key={attribut.name}
                    attribut={attribut}
                    attributes={this.state.attributes}
                    changeValue={this.changeValue.bind(this)}
                  />
                ))}
              </div>
              <div>
                <div className={styles.caption}>Price:</div>
                <div className={styles.price}>
                  <span>
                    {
                      this.state.product.prices[this.props.selectedCurrency]
                        .currency.symbol
                    }
                  </span>
                  <span>
                    {
                      this.state.product.prices[this.props.selectedCurrency]
                        .amount
                    }
                  </span>
                </div>
              </div>
            </div>
            <button
              className={styles.addToCartBtn}
              onClick={() => {
                if (this.state.product.inStock) this.addProductToCart();
              }}
            >
              ADD TO CART
            </button>
            {parse(this.state.product.description)}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    selectedCurrency: state.app.selectedCurrency,
  };
};
export default connect(mapStateToProps, { addProductToCartAC })(
  withRouter(PDP)
);
