import React from "react";
import styles from "./styles.module.scss";
import { connect } from "react-redux";
import { apolloClient } from "../..";
import { addProductToCartAC, setCategoriesAC } from "../../state/app-reducer";
import { GET_PRODUCTS, Get_Test } from "../../Сonstants for server requests/constants";
import ProductForPLP from "./components/ProductForPLP/ProductForPLP";
import { withRouter } from "../../HOC/HOC";
import { Navigate } from "react-router";

class PLP extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }
  componentDidMount() {
    this.props.categories.forEach((category) => {
      if (this.props.router.params.category === category.name) {
        apolloClient
          .query({
            query: GET_PRODUCTS(this.props.router.params.category),
          })
          .then((res) => {
            this.setState({
              products: res.data.category.products,
            });
          });
      }
    });
    apolloClient
          .query({
            query: Get_Test
          })
          .then((res) => {
            debugger
            this.setState({
              products: res.data.category.products,
            });
          });
      }
    
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props)
      this.props.categories.forEach((category) => {
        if (this.props.router.params.category === category.name) {
          apolloClient
            .query({
              query: GET_PRODUCTS(this.props.router.params.category),
            })
            .then((res) => {
              this.setState({
                products: res.data.category.products,
              });
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
