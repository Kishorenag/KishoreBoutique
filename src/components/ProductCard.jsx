import React, { useEffect, useState } from "react";
import { Button, Card, Stack } from "react-bootstrap";
import { getCartFromLocal, saveCartToLocal, toTitleCase } from "../utils/util";
import { useNavigate } from "react-router-dom";
import CartItemQuantity from "./CartItemQuantity";

export default function ProductCard(props) {
  let { id, imageUrl, category, productName, rating, price } = props;
  const navigate = useNavigate();

  const navigateTo = (id) => {
    navigate(`/products/${id}`);
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
    let existingItem = cartData.find((item) => item.id === id);

    let newCartData;

    if (existingItem) {
      newCartData = cartData.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      const newCartItemData = {
        id: id,
        image: imageUrl,
        productName: productName,
        price: price,
        quantity: 1,
      };
      newCartData = [...cartData, newCartItemData];
    }
    saveCartToLocal(newCartData);
    window.dispatchEvent(new Event("cartUpdated"));
  }

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
        src={imageUrl}
        style={{
          height: 300,
          objectFit: "contain",
          cursor: "pointer",
        }}
        onClick={() => navigateTo(id)}
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
            <Card.Title
              onClick={() => navigateTo(id)}
              style={{ cursor: "pointer" }}
            >
              {productName}
            </Card.Title>
          </div>
          <div>
            <Card.Text>{rating}</Card.Text>
            <Card.Text>₹ {Math.round(price)}</Card.Text>
            {quantity <= 0 ? (
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
