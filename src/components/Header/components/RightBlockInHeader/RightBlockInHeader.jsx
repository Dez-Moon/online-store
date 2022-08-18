import React from "react";
import styles from "./styles.module.scss";
import Pointer from "../../../../assets/vector.svg";
import EmptyCart from "../../../../assets/empty cart.svg";
import CurrencySelectionBlock from "../CurrencySelectionBlock/CurrencySelectionBlock";
import CartOverlay from "../../../CartOverlay/CartOverlay";

class RightBlockInHeader extends React.Component {
  render() {
    return (
      <div className={styles.actions}>
        <div onClick={this.props.showСurrencies} className={styles.currencies}>
          <div className={styles.currencySign}>
            {this.props.selectedCurrency.symbol}
          </div>
          <img
            src={Pointer}
            alt='pointer'
            className={
              !this.props.selectedMode
                ? styles.pointer
                : styles.pointer + " " + styles.active
            }
          />
        </div>
        <div
          className={styles.emptyCart}
          onClick={() => {
            if (this.props.countProductsInCart !== 0 && !this.props.disabled) {
              this.props.setCartOverlayState();
            }
          }}
        >
          <img src={EmptyCart} alt='cart' />
          {this.props.countProductsInCart !== 0 && (
            <div className={styles.countProductInCart}>
              {this.props.countProductsInCart}
            </div>
          )}
        </div>
        {this.props.cartOverlayIsOpen && (
          <CartOverlay
            countProductsInCart={this.props.countProductsInCart}
            cartOverlayClose={this.props.cartOverlayClose}
          />
        )}
        {this.props.selectedMode && (
          <div className={styles.currencySelectionBlock}>
            {this.props.currencies.map((currency, index) => (
              <CurrencySelectionBlock
                key={currency.label}
                id={index}
                currency={currency}
                showСurrencies={this.props.showСurrencies}
                setSelectedCurrencyAC={this.props.setSelectedCurrencyAC}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default RightBlockInHeader;
