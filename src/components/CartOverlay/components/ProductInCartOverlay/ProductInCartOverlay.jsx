import React from "react";
import styles from "./styles.module.scss";
import AttributProduct from "../AttributProduct/AttributProduct";

class ProductInCartOverlay extends React.Component {
  render() {
    return (
      <div className={styles.productItem}>
        <div className={styles.productInfo}>
          <div>{this.props.product.brand}</div>
          <div>{this.props.product.name}</div>
          <div className={styles.productCost}>
            <span>
              {
                this.props.product.prices[this.props.selectedCurrency].currency
                  .symbol
              }
            </span>
            <span>
              {this.props.product.prices[this.props.selectedCurrency].amount}
            </span>
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
        <div>
          <img
            src={this.props.product.gallery[0]}
            alt='productPhoto'
            className={styles.productPhoto}
          />
        </div>
      </div>
    );
  }
}

export default ProductInCartOverlay;
