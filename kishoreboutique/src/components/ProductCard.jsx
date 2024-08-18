import React, { useEffect, useState } from "react";
import { Button, Card, Stack } from "react-bootstrap";
import { getCartFromLocal, saveCartToLocal, toTitleCase } from "../utils/util";
import { useNavigate } from "react-router-dom";
import CartItemQuantity from "./CartItemQuantity";

export default function ProductCard(props) {
  let { id, imageUrl, category, productName, rating, price } = props;
  const navigate = useNavigate();

  const navigateTo = (productId) => {
    navigate(`/products/${productId}`);
  };

  const [cartData, setCartData] = useState(getCartFromLocal());

  useEffect(() => {
    function getCartData() {
      const updatedCartData = getCartFromLocal();
      setCartData(updatedCartData);
    }

    window.addEventListener("cartUpdated", getCartData);
    return () => window.removeEventListener("cartUpdated", getCartData);
  }, []);

  const quantity = cartData?.filter((item) => item.id === id)[0]?.quantity || 0;

  function addToCart() {
    const newCartItemData = {
      id: id,
      image: imageUrl,
      productName: productName,
      price: price,
      quantity: 1,
    };
    const newCartData = [...cartData, newCartItemData];
    saveCartToLocal(newCartData)
  }

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={imageUrl}
        style={{
          height: 300,
          objectFit: "contain",
        }}
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
            <Card.Text>{toTitleCase(category)}</Card.Text>
            <Card.Title>{productName}</Card.Title>
          </div>
          <div>
            <Card.Text>{rating}</Card.Text>
            <Card.Text>₹ {price}</Card.Text>
            {quantity <= 0 || quantity === undefined ? (
              <Button variant="primary" onClick={addToCart}>
                Add to Cart
              </Button>
            ) : (
              <CartItemQuantity cartItemId={id} quantity={quantity} />
            )}
          </div>
        </Stack>
      </Card.Body>
    </Card>
  );
}

// artObjet = [
//   {
//     id: 1,
//     image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//     productName: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//     price: 109.95,
//     quantity: 19,
//   },
// ];

// apiObjet = {
//   id: 1,
//   title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//   price: 109.95,
//   image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
// };
