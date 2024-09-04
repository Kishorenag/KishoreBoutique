import React from "react";
import { Button } from "react-bootstrap";
import { getCartFromLocal, saveCartToLocal } from "../utils/util";

export default function CartItemQuantity({ cartItemId, quantity }) {
  const productId = parseInt(cartItemId);

  function updateCart(newQuantity) {
    let cartData = getCartFromLocal();

    if (newQuantity > 0) {
      cartData = cartData.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    } else {
      cartData = cartData.filter((item) => item.id !== productId);
    }

    saveCartToLocal(cartData);
    window.dispatchEvent(new Event("cartUpdated"));
  }

  const handleIncrement = () => {
    updateCart(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity === 1) {
      updateCart(0);
    } else {
      updateCart(quantity - 1);
    }
  };

  return (
    <div className="cart-item-quantity">
      <Button onClick={handleDecrement}>-</Button>
      <span> {quantity} </span>
      <Button onClick={handleIncrement}>+</Button>
    </div>
  );
}
