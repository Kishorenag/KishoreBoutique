import React, { useEffect, useState } from "react";
import { Button, Card, Stack } from "react-bootstrap";
import { getCartFromLocal, saveCartToLocal, toTitleCase } from "../utils/util";
import { useNavigate } from "react-router-dom";
import CartItemQuantity from "./CartItemQuantity";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../redux/CartSlice";

export default function ProductCard({product}) {
  // let { id, imageUrl, category, productName, rating, price } = props;
  const navigate = useNavigate();

  const navigateTo = (id) => {
    navigate(`/products/${id}`);
  };

  const cartItems = useSelector((state) => state.cart.items);
  const quantity = cartItems?.filter(item => item.id == product.id)[0]?.quantity | 0

  const dispatch = useDispatch();


  const handleAddItem = (item) => {
    dispatch(addItemToCart(item));
  };

  return (
    <Card
      style={{
        width: "18rem",
        border: "none",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Card.Img
        variant="top"
        src={product.image}
        style={{
          height: 300,
          objectFit: "contain",
          cursor: "pointer",
        }}
        onClick={() => navigateTo(product.id)}
      />
      <Card.Body>
        <Stack
          direction="vertical"
          style={{
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div>
            <Card.Text>{toTitleCase(product.category)}</Card.Text>
            <Card.Title
              onClick={() => navigateTo(product.id)}
              style={{ cursor: "pointer" }}
            >
              {product.title}
            </Card.Title>
          </div>
          <div>
            <Card.Text>{product.rating.rate}</Card.Text>
            <Card.Text>₹ {Math.round(product.price)}</Card.Text>
            { quantity <= 0 ? (
              <Button variant="primary" onClick={()=>handleAddItem(product)}>
                Add to Cart
              </Button>
            ) : (
              <CartItemQuantity
              product={product}
               />
            )}
          </div>
        </Stack>
      </Card.Body>
    </Card>
  );
}