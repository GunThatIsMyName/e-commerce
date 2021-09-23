import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Footer, Navbar, Sidebar } from ".";
import {
  AboutPages,
  CartPage,
  CheckoutPage,
  ErrorPage,
  HomePage,
  ProductsPage,
  SingleProductPage,
} from "../pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/about" component={AboutPages} />
        <Route exact path="/cart" component={CartPage} />
        <Route exact path="/products" component={ProductsPage} />
        <Route exact path="/products/:id" component={SingleProductPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route exact path="*" component={ErrorPage} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
