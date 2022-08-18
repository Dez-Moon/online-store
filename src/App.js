import "./App.scss";
import Header from "./components/Header/Header";
import PLP from "./components/PLP/PLP";
import React from "react";
import PDP from "./components/PDP/PDP";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import OrderInfo from "./components/OrderInfo/OrderInfo";
import { connect } from "react-redux";
import { setSelectedCurrencyAC, cartUpdateAC } from "./state/app-reducer";

class App extends React.Component {
  componentDidMount() {
    if (!localStorage.getItem("selectedCurrency")) {
      localStorage.setItem("selectedCurrency", 0);
    } else
      this.props.setSelectedCurrencyAC(
        Number(localStorage.getItem("selectedCurrency"))
      );
    if (localStorage.getItem("cart")) {
      let cart = JSON.parse(localStorage.getItem("cart"));
      cart.forEach((product) => {
        product.selectedAttributes = new Map();
        product.attributsForLocalstorage.forEach((attribut) => {
          let a = attribut.split("-");
          product.selectedAttributes.set(a[0], a[1]);
        });
      });
      this.props.cartUpdateAC(cart);
    }
  }
  render() {
    return (
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/:category' element={<PLP />} />
          <Route path='/' element={<PLP />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order-info' element={<OrderInfo />} />
          <Route path={`/product/:id`} element={<PDP />} />
        </Routes>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, {
  setSelectedCurrencyAC,
  cartUpdateAC,
})(App);
