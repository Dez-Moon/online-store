import React from "react";
import styles from "./styles.module.scss";
import PhotoSwitchLeftImg from "../../../../assets/photoSwitchLeft.svg";
import PhotoSwitchRightImg from "../../../../assets/photoSwitchRight.svg";

class ProductPhoto extends React.Component {
  render() {
    return (
      <div className={styles.productPhoto}>
        <img
          src={
            this.props.product.gallery[
              this.props.showPhoto.get(this.props.index)
            ]
          }
          alt='productPhoto'
        />
        {this.props.product.gallery.length > 1 && (
          <div className={styles.photoSwitches}>
            <div
              onClick={() => {
                if (this.props.showPhoto.get(this.props.index) > 0) {
                  this.props.changePhoto(
                    this.props.index,
                    this.props.showPhoto.get(this.props.index) - 1
                  );
                }
              }}
            >
              <img src={PhotoSwitchLeftImg} alt='photoSwitchLeftImg' />
            </div>
            <div
              onClick={() => {
                if (
                  this.props.showPhoto.get(this.props.index) + 1 <
                  this.props.product.gallery.length
                ) {
                  this.props.changePhoto(
                    this.props.index,
                    this.props.showPhoto.get(this.props.index) + 1
                  );
                }
              }}
            >
              <img src={PhotoSwitchRightImg} alt='photoSwitchRightImg' />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ProductPhoto;
