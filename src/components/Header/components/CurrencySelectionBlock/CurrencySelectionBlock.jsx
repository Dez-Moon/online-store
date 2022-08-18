import React from "react";
import styles from "./styles.module.scss";

class CurrencySelectionBlock extends React.Component {
  render() {
    return (
      <div
        className={styles.currencyItem}
        onClick={() => {
          this.props.setSelectedCurrencyAC(this.props.id);
          this.props.showСurrencies();
        }}
      >
        <span>{this.props.currency.symbol} </span>
        <span>{this.props.currency.label}</span>
      </div>
    );
  }
}
export default CurrencySelectionBlock;
