import React, { useEffect, useState } from "react";
import { Button, Container, Image, Stack, Table } from "react-bootstrap";
import {
  getCartFromLocal,
  initialCartData,
  saveCartToLocal,
} from "../utils/util";
import CartItemQuantity from "../components/CartItemQuantity";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function CartPage() {
  const navigate = useNavigate();

  const navigateTo = (id) => {
    navigate(`/products/${id}`);
  };
  const navigateToBilling = () => {
    navigate("/billing");
  };

  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();

  return (
    <Container className="mb-5">
      <Stack
        direction="vertical"
        style={{
          alignItems: "start",
        }}
      >
        <h1>Cart</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(cartItems) &&
              cartItems?.map((cartItem, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <Image
                        src={cartItem.image}
                        width={100}
                        thumbnail
                        onClick={() => navigateTo(cartItem.id)}
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                    <td style={{ textAlign: "start", verticalAlign: "middle" }}>
                      {cartItem.title}
                    </td>
                    <td
                      style={{
                        textAlign: "end",
                        verticalAlign: "middle",
                      }}
                    >
                      {Math.round(cartItem.price)}
                    </td>
                    <td
                      style={{
                        textAlign: "end",
                        verticalAlign: "middle",
                      }}
                    >
                      <CartItemQuantity
                      product={cartItem}
                      />
                    </td>
                    <td
                      style={{
                        textAlign: "end",
                        verticalAlign: "middle",
                      }}
                    >
                     ₹{Math.round(cartItem.price) * cartItem.quantity}
                    </td>
                  </tr>
                );
              })}

            <tr>
              <th
                colSpan={4}
                style={{
                  textAlign: "center",
                }}
              >
                Grand Total
              </th>
              <td
                style={{
                  textAlign: "end",
                }}
              >
                {totalQuantity}
              </td>
              <td
                style={{
                  textAlign: "end",
                }}
              >
                ₹{Math.round(totalPrice)}
              </td>
            </tr>
          </tbody>
        </Table>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Table striped bordered hover style={{ width: "50%" }}>
            <thead>
              <tr>
                <th
                  colSpan={4}
                  style={{
                    textAlign: "center",
                  }}
                >
                  Cart total
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colSpan={2}
                  style={{
                    textAlign: "center",
                  }}
                >
                  Total Quantity
                </td>
                <td
                  style={{
                    textAlign: "end",
                  }}
                >
                  {totalQuantity}
                </td>
              </tr>
              <tr>
                <td
                  colSpan={2}
                  style={{
                    textAlign: "center",
                  }}
                >
                  Grand Total
                </td>
                <td
                  style={{
                    textAlign: "end",
                  }}
                >
                  {Math.round(totalPrice)}
                </td>
              </tr>
              <tr>
                <td colSpan={4} style={{ alignItems: "center" }}>
                  <Button style={{ width: "100%" }} onClick={() => navigateToBilling()}>PROCEED TO CHECKOUT</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Stack>
    </Container>
  );
}
