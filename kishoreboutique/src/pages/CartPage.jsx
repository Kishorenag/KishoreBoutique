import React, { useEffect, useState } from "react";
import { Button, Container, Image, Stack, Table } from "react-bootstrap";
import {
  getCartFromLocal,
  initialCartData,
  saveCartToLocal,
} from "../utils/util";
import CartItemQuantity from "../components/CartItemQuantity";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cartData, setCartData] = useState(getCartFromLocal());
  const navigate = useNavigate();

  const navigateTo = (id) => {
    navigate(`/products/${id}`);
  };
  const navigateToBilling = () => {
    navigate("/billing");
  };

  useEffect(() => {
    async function fetchAndSaveCartData() {
      try {
        const updatedCartData = await saveCartToLocal();
        setCartData(updatedCartData);
      } catch (error) {
        console.error("Error updating cart data:", error);
      }
    }
    if (cartData?.length <= 0) {
      fetchAndSaveCartData();
    }

    function getCartData() {
      const updatedCartData = getCartFromLocal();
      setCartData(updatedCartData);
    }

    window.addEventListener("cartUpdated", getCartData);
    return () => window.removeEventListener("cartUpdated", getCartData);
  }, [cartData]);

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
                      <Image
                        src={cartItem.image}
                        thumbnail
                        width={100}
                        onClick={() => navigateTo(cartItem.id)}
                        style={{ cursor: "pointer" }}
                      />
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
                {grandTotalQuantity}
              </td>
              <td
                style={{
                  textAlign: "end",
                }}
              >
                ₹{grandTotal}
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
                  {grandTotalQuantity}
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
                  {grandTotal}
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
