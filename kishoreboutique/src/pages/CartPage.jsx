import React, { useEffect, useState } from "react";
import { Container, Image, Stack, Table } from "react-bootstrap";
import {
  getCartFromLocal,
  initialCartData,
  saveCartToLocal,
} from "../utils/util";
import CartItemQuantity from "../components/CartItemQuantity";

export default function CartPage() {
  const [cartData, setCartData] = useState(getCartFromLocal());

  useEffect(() => {
    async function fetchAndSaveCartData() {
      try {
        const updatedCartData = await saveCartToLocal(initialCartData);
        setCartData(updatedCartData);
      } catch (error) {
        console.error("Error updating cart data:", error);
      }
    }
    if (cartData?.length <= 0) {
      // setCartData(saveCartToLocal(initialCartData));
      fetchAndSaveCartData();
    }

    function getCartData() {
      const updatedCartData = getCartFromLocal();
      setCartData(updatedCartData);
    }

    window.addEventListener("cartUpdated", getCartData);
    return () => window.removeEventListener("cartUpdated", getCartData);
  }, []);

  let grandTotal = 0;
  let grandTotalQuantity = 0;

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
            {Array.isArray(cartData) &&
              cartData?.map((cartItem, index) => {
                grandTotal += Math.round(cartItem.price) * cartItem.quantity;
                grandTotalQuantity += cartItem.quantity;
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <Image src={cartItem.image} thumbnail width={100} />
                    </td>
                    <td style={{ textAlign: "start", verticalAlign: "middle" }}>
                      {cartItem.productName}
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
                        cartItemId={cartItem.id}
                        quantity={cartItem.quantity}
                      />
                    </td>
                    <td
                      style={{
                        textAlign: "end",
                        verticalAlign: "middle",
                      }}
                    >
                      {Math.round(cartItem.price) * cartItem.quantity}
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
                {grandTotalQuantity}
              </td>
              <td
                style={{
                  textAlign: "end",
                }}
              >
                {grandTotal}
              </td>
            </tr>
          </tbody>
        </Table>
      </Stack>
    </Container>
  );
}


