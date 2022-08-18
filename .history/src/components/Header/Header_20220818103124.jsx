import React from "react";
import styles from "./styles.module.scss";
import { apolloClient } from "../..";
import { connect } from "react-redux";
import {
  setSelectedPageAC,
  setSelectedCurrencyAC,
  setCategoriesAC,
} from "../../state/app-reducer";
import { withRouter } from "../../HOC/HOC";
import Categories from "./components/Categories/Categories";
import RightBlockInHeader from "./components/RightBlockInHeader/RightBlockInHeader";
import {
  GET_CATEGORIES_AND_CURRENCY,
  Get_Test,
} from "../../Сonstants for server requests/constants";
import Logo from "../../assets/logo.svg";
import { Navigate } from "react-router";
import { getCategories } from "../../Сonstants for server requests/con";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMode: false,
      cartOverlayIsOpen: false,
      currencies: [],
      selectedCurrency: { symbol: "", label: "" },
      scrollHeight: 0,
      pathname: null,
    };
  }

  componentDidMount() {
    const categories = getCategories;
    debugger;
    this.props.setCategoriesAC(categories);

    apolloClient
      .query({
        query: GET_CATEGORIES_AND_CURRENCY,
      })
      .then((res) => {
        this.setState({
          currencies: res.data.currencies,
          selectedCurrency: {
            symbol: res.data.currencies[this.props.selectedCurrency].symbol,
            label: res.data.currencies[this.props.selectedCurrency].label,
          },
        });
        res.data.categories.forEach((category) => {
          const selectedCategory = this.props.router.location.pathname.slice(1);
          if (
            this.props.router.location.pathname === "/" ||
            selectedCategory !== category.name
          ) {
            this.props.setSelectedPageAC(res.data.categories[0].name);
          } else {
            this.props.setSelectedPageAC(category.name);
          }
        });
      });
    this.setState({ pathname: this.props.router.location.pathname });
    apolloClient
      .query({
        query: Get_Test,
      })
      .then((res) => {
        debugger;
        this.setState({
          selectedCurrency: {
            symbol: res.data.currencies[this.props.selectedCurrency].symbol,
            label: res.data.currencies[this.props.selectedCurrency].label,
          },
        });
      });
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      apolloClient
        .query({
          query: GET_CATEGORIES_AND_CURRENCY,
        })
        .then((res) => {
          this.setState({
            selectedCurrency: {
              symbol: res.data.currencies[this.props.selectedCurrency].symbol,
              label: res.data.currencies[this.props.selectedCurrency].label,
            },
          });
        });
    }
    if (this.state.pathname !== this.props.router.location.pathname) {
      this.setState({ pathname: this.props.router.location.pathname });
      this.cartOverlayClose();
    }
  }
  showСurrencies() {
    if (this.state.selectedMode) this.setState({ selectedMode: false });
    else {
      this.cartOverlayClose();
      this.setState({ selectedMode: true });
    }
  }
  cartOverlayOpen() {
    this.setState({ selectedMode: false });
    this.setState({ cartOverlayIsOpen: true });
    this.setState({ scrollHeight: window.scrollY });
    setTimeout(() => {
      document.body.style.position = "fixed";
      document.body.style.top = `-${this.state.scrollHeight}px`;
    }, 0);
  }
  cartOverlayClose() {
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, this.state.scrollHeight);
    this.setState({ cartOverlayIsOpen: false, scrollHeight: 0 });
  }
  setCartOverlayState() {
    if (this.state.cartOverlayIsOpen) {
      this.cartOverlayClose();
    } else {
      this.cartOverlayOpen();
    }
  }
  render() {
    if (
      this.props.router.location.pathname === "/" &&
      this.props.selectedPage
    ) {
      return <Navigate to={`/${this.props.selectedPage}`} />;
    }
    if (
      (this.props.router.location.pathname === "/cart" ||
        this.props.router.location.pathname === "/order-info") &&
      this.state.cartOverlayIsOpen
    ) {
      this.setState({ cartOverlayIsOpen: false });
    }
    let countProductsInCart = 0;
    this.props.cart.forEach(
      (product) => (countProductsInCart += product.count)
    );
    if (countProductsInCart === 0 && this.state.cartOverlayIsOpen) {
      this.cartOverlayClose();
    }
    return (
      <header>
        <div className={styles.header}>
          <div className={styles.categories}>
            {this.props.categories.map((category) => (
              <Categories
                key={category.name}
                category={category}
                selectedPage={this.props.selectedPage}
                setSelectedPageAC={this.props.setSelectedPageAC}
              />
            ))}
          </div>
          <img src={Logo} alt='logo' className={styles.logo} />
          <RightBlockInHeader
            countProductsInCart={countProductsInCart}
            cartOverlayIsOpen={this.state.cartOverlayIsOpen}
            showСurrencies={this.showСurrencies.bind(this)}
            selectedCurrency={this.state.selectedCurrency}
            setSelectedCurrencyAC={this.props.setSelectedCurrencyAC}
            selectedMode={this.state.selectedMode}
            currencies={this.state.currencies}
            setCartOverlayState={this.setCartOverlayState.bind(this)}
            cartOverlayClose={this.cartOverlayClose.bind(this)}
            disabled={
              this.props.router.location.pathname === "/cart" ||
              this.props.router.location.pathname === "/order-info"
            }
          />
          <div className={styles.headerBackground}></div>
        </div>
        {this.state.cartOverlayIsOpen && (
          <div
            className={styles.backgroundAtCartOverlayOpen}
            onClick={() => this.cartOverlayClose()}
          ></div>
        )}
      </header>
    );
  }
}
let mapStateToProps = (state) => {
  return {
    selectedPage: state.app.selectedPage,
    selectedCurrency: state.app.selectedCurrency,
    categories: state.app.categories,
    cart: state.app.cart,
  };
};

export default connect(mapStateToProps, {
  setSelectedPageAC,
  setSelectedCurrencyAC,
  setCategoriesAC,
})(withRouter(Header));
