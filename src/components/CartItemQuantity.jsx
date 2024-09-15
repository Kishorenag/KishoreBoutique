import React from "react";
import { Button } from "react-bootstrap";
import { getCartFromLocal, saveCartToLocal } from "../utils/util";
import { addItemToCart, removeItemFromCart } from "../redux/CartSlice";
import { useDispatch, useSelector } from "react-redux";

export default function CartItemQuantity({ product }) {
  const cartItems = useSelector((state) => state.cart.items);
  const quantity = cartItems?.filter(item => item?.id == product?.id)[0]?.quantity

  const dispatch = useDispatch();


  const handleAddItem = (item) => {
    dispatch(addItemToCart(item));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
  };


  return (
    <div className="cart-item-quantity">
      <Button onClick={()=>handleRemoveItem(product.id)}>-</Button>
      <span> {quantity} </span>
      <Button onClick={()=>handleAddItem(product)}>+</Button>
    </div>
  );
}
