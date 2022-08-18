import React from "react";
import styles from "./styles.module.scss";

class AttributProduct extends React.Component {
  render() {
    return (
      <div>
        <div className={styles.caption}>{this.props.attribut.name}:</div>
        <div
          className={
            (this.props.attribut.type === "text" && styles.attributText) ||
            (this.props.attribut.type === "swatch" && styles.attributSwatch)
          }
        >
          {this.props.attribut.items.map((item) => {
            if (this.props.attribut.type === "text") {
              const isChecked =
                item.value ===
                this.props.attributes.get(this.props.attribut.name)
                  ? styles.text + " " + styles.selected
                  : styles.text;
              return (
                <div
                  key={item.value}
                  className={isChecked}
                  onClick={() => {
                    this.props.changeValue(
                      this.props.attribut.name,
                      item.value
                    );
                  }}
                >
                  {item.value}
                </div>
              );
            }
            if (this.props.attribut.type === "swatch") {
              const swatchStyle = {
                backgroundColor: `${item.value}`,
              };
              const isChecked =
                item.value ===
                this.props.attributes.get(this.props.attribut.name)
                  ? styles.swatchContainer + " " + styles.selected
                  : styles.swatchContainer;

              return (
                <div key={item.value} className={isChecked}>
                  <div
                    className={styles.swatch}
                    style={swatchStyle}
                    onClick={() =>
                      this.props.changeValue(
                        this.props.attribut.name,
                        item.value
                      )
                    }
                  ></div>
                </div>
              );
            } else {
              return <div></div>;
            }
          })}
        </div>
      </div>
    );
  }
}
export default AttributProduct;
