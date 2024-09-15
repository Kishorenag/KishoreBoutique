import React, { useEffect, useState } from "react";
import { Button, Card, Container, Image, Stack } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  getCartFromLocal,
  saveCartToLocal,
  toTitleCase,
} from "../../utils/util";
import CartItemQuantity from "../../components/CartItemQuantity";
import { API_URL } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../redux/CartSlice";

export default function ProductView() {
  const [product, setProduct] = useState({});
  const cartItems = useSelector((state) => state.cart.items);
  const { id } = useParams();
  const productId = parseInt(id);
  const quantity = cartItems?.filter(item => item.id == productId)[0]?.quantity | 0

  useEffect(() => {
    fetch(API_URL + `/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const dispatch = useDispatch();


  const handleAddItem = (item) => {
    dispatch(addItemToCart(item));
  };

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
                <CartItemQuantity product={product} />
              ) : (
                <Button variant="primary" onClick={()=>handleAddItem(product)}>
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
