import React, { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import {
  addCartItem,
  getCartFromLocal,
  removeCartItem,
  removeFromCart,
  saveCartToLocal,
} from "../utils/util";

export default function CartItemQuantity(props) {
  const { cartItemId, quantity } = props;

  useEffect(() => {
    if (quantity <= 0) {
      removeFromCart(cartItemId, quantity);
    }
  }, [quantity,cartItemId]);

  return (
    <Stack
      direction="horizontal"
      style={{
        justifyContent: "space-around",
      }}
    >
      <Button onClick={() => removeCartItem(cartItemId)}>-</Button>
      <span>{quantity}</span>{" "}
      <Button onClick={() => addCartItem(cartItemId)}>+</Button>
    </Stack>
  );
}
