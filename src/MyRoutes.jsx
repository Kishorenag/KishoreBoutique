import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProductView from "./pages/product/ProductView";
import CartPage from "./pages/CartPage";
import BillingPage from "./pages/BillingPage";
import ThankYouPage from "./pages/ThankYouPage";
import ErrorPage from "./pages/ErrorPage";

export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/products/:id" element={<ProductView />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/billing" element={<BillingPage />} />
      <Route path="/thankyou" element={<ThankYouPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
