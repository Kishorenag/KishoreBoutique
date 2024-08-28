import React, { useEffect, useState } from "react";
import { Button, Card, Container, Image, Stack } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  getCartFromLocal,
  saveCartToLocal,
  toTitleCase,
} from "../../utils/util";
import CartItemQuantity from "../../components/CartItemQuantity";

export default function ProductView() {
  const [product, setProduct] = useState({});
  const [cartData, setCartData] = useState(getCartFromLocal());
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  useEffect(() => {
    function getCartData() {
      const updatedCartData = getCartFromLocal();
      setCartData(updatedCartData);
    }

    window.addEventListener("cartUpdated", getCartData);
    return () => window.removeEventListener("cartUpdated", getCartData);
  }, []);

  const productId = parseInt(id);

  const quantity =
    cartData.find((item) => item.id === productId)?.quantity || 0;

  function addToCart() {
    let existingItem = cartData.find((item) => item.id === productId);

    let newCartData;

    if (existingItem) {
      newCartData = cartData.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      const newCartItemData = {
        id: productId,
        image: product.image,
        productName: product.title,
        price: product.price,
        quantity: 1,
      };
      newCartData = [...cartData, newCartItemData];
    }

    saveCartToLocal(newCartData);

    window.dispatchEvent(new Event("cartUpdated"));
  }

  return (
    <>
      <div
        className=" pt-5 pb-5 "
        style={{
          backgroundColor: "rgba(223, 207, 237, 0.47)",
        }}
      >
        <Container className="mb-4">
          <Stack direction="horizontal" gap={5}>
            <Image
              src={product.image}
              className="p-2"
              style={{ height: 500, width: 1400, objectFit: "contain" }}
            />
            <Stack direction="vertical" gap={2} className="mt-5 mb-2 ml-3">
              <h1 style={{ textAlign: "start" }}>{product?.title}</h1>
              <p style={{ textAlign: "start" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo
                tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo
                tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              </p>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h3>₹{product?.price}</h3>
                <span>+ Free Shipping</span>
              </div>
              {quantity > 0 ? (
                <CartItemQuantity cartItemId={id} quantity={quantity} />
              ) : (
                <Button variant="primary" onClick={addToCart}>
                  Add to Cart
                </Button>
              )}
            </Stack>
          </Stack>
        </Container>
      </div>
    </>
  );
}
