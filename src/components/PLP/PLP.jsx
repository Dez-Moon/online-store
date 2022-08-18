import React from "react";
import styles from "./styles.module.scss";
import { connect } from "react-redux";
import { addProductToCartAC, setCategoriesAC } from "../../state/app-reducer";
import ProductForPLP from "./components/ProductForPLP/ProductForPLP";
import { withRouter } from "../../HOC/HOC";
import { Navigate } from "react-router";
import { getProducts } from "../../Сonstants for server requests/con";

class PLP extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }
  componentDidMount() {
    this.props.categories.forEach((category) => {
      if (this.props.router.params.category === category.name) {
        const categories = JSON.parse(getProducts);
        categories.forEach((category) => {
          if (category.name === this.props.router.params.category) {
            this.setState({
              products: category.products,
            });
          }
        });
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props)
      this.props.categories.forEach((category) => {
        if (this.props.router.params.category === category.name) {
          const categories = JSON.parse(getProducts);
          debugger;
          categories.forEach((category) => {
            if (category.name === this.props.router.params.category) {
              this.setState({
                products: category.products,
              });
            }
          });
        }
      });
  }
  render() {
    const selectedCategory = this.props.router.location.pathname.slice(1);
    if (
      this.props.router.location.pathname === "/" &&
      this.props.selectedPage
    ) {
      return <Navigate to={`/${this.props.categories[0].name}`} />;
    } else if (
      this.props.categories.length !== 0 &&
      selectedCategory !== this.props.selectedPage
    ) {
      let path = null;
      this.props.categories.forEach((category) => {
        if (selectedCategory === category.name) {
          path = category.name;
        }
      });
      if (!path) {
        return <Navigate to={`/${this.props.categories[0].name}`} />;
      }
    }
    return (
      <div className={styles.PLP}>
        <h1>
          {this.props.selectedPage && this.props.selectedPage.toUpperCase()}
        </h1>
        <div>
          <div className={styles.gridContainer}>
            {this.state.products.map((product) => (
              <ProductForPLP
                product={product}
                key={product.name}
                selectedCurrency={this.props.selectedCurrency}
                id={product.id}
                addProductToCartAC={this.props.addProductToCartAC}
                setSelectedPageAC={this.props.setSelectedPageAC}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    selectedPage: state.app.selectedPage,
    selectedCurrency: state.app.selectedCurrency,
    categories: state.app.categories,
  };
};
export default connect(mapStateToProps, {
  addProductToCartAC,
  setCategoriesAC,
})(withRouter(PLP));
