import React from "react";
import styles from "./styles.module.scss";

class ProductForOrderInfo extends React.Component {
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
              {this.props.product.attributes.map((attribut) => {
                let item = attribut.items.filter(
                  (item) =>
                    item.value ===
                    this.props.product.selectedAttributes.get(attribut.name)
                )[0];
                let swatchStyle = {
                  backgroundColor: `${item.value}`,
                };
                return (
                  <div key={attribut.name}>
                    <div className={styles.caption}>{attribut.name}:</div>
                    <div
                      className={
                        (attribut.type === "text" && styles.attributText) ||
                        (attribut.type === "swatch" && styles.attributSwatch)
                      }
                    >
                      {attribut.type === "text" && (
                        <div key={item.value} className={styles.text}>
                          {item.value}
                        </div>
                      )}
                      {attribut.type === "swatch" && (
                        <div
                          key={item.value}
                          className={styles.swatchContainer}
                        >
                          <div
                            className={styles.swatch}
                            style={swatchStyle}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div>Quantity : {this.props.product.count}</div>
          </div>
          <div className={styles.photoBlock}>
            <div className={styles.productPhoto}>
              <img
                src={this.props.product.gallery[0]}
                alt={this.props.product.gallery[0]}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductForOrderInfo;
