import React from "react";
import styles from "./styles.module.scss";
import AttributProduct from "../AttributProduct/AttributProduct";
import ProductPhoto from "../ProductPhoto/ProductPhoto";

class ProductInCart extends React.Component {
  render() {
    return (
      <div>
        <div className={styles.productItem}>
          <div className={styles.productInfo}>
            <div className={styles.productName}>
              <div>{this.props.product.brand}</div>
              <div>{this.props.product.name}</div>
            </div>
            <div className={styles.price}>
              <span>
                {
                  this.props.product.prices[this.props.selectedCurrency]
                    .currency.symbol
                }
              </span>
              {this.props.product.prices[this.props.selectedCurrency].amount}
            </div>
            <div className={styles.attributes}>
              {this.props.product.attributes.map((attribut) => (
                <AttributProduct
                  key={attribut.name}
                  attribut={attribut}
                  product={this.props.product}
                />
              ))}
            </div>
          </div>

          <div className={styles.rightBlock}>
            <div className={styles.changeCountProductBtns}>
              <div
                className={styles.plus}
                onClick={() =>
                  this.props.editCountProductInCartAC(this.props.index, 1)
                }
              >
                +
              </div>
              <div>{this.props.product.count}</div>
              <div
                className={styles.minus}
                onClick={() => {
                  this.props.editCountProductInCartAC(this.props.index, -1);
                  if (this.props.product.count === 1) {
                    this.props.deleteProductFromCartAC(this.props.index);
                  }
                }}
              >
                -
              </div>
            </div>
            <ProductPhoto
              product={this.props.product}
              showPhoto={this.props.showPhoto}
              index={this.props.index}
              changePhoto={this.props.changePhoto}
            />
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

export default ProductInCart;
