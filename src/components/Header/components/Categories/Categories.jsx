import React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

class Categories extends React.Component {
  render() {
    const isChecked =
      this.props.selectedPage === this.props.category.name
        ? styles.selected
        : "";
    if (this.props.selectedPage)
      return (
        <Link to={`/${this.props.category.name}`}>
          <div
            onClick={() => {
              this.props.setSelectedPageAC(this.props.category.name);
            }}
            className={isChecked}
          >
            <span>{this.props.category.name.toUpperCase()}</span>
          </div>
        </Link>
      );
  }
}

export default Categories;
