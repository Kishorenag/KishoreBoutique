import React from "react";
import { Container, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export default function ThankYouPage() {
  const location = useLocation();
  const { billingDetails } = location.state || {};

  let grandTotal = 0;

  return (
    <Container className="mt-5">
      <h1>Thank You for Your Purchase!</h1>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Table
          style={{
            width: 100,
          }}
        >
          <tbody>
            <tr>
              <h3>Billing Details</h3>
            </tr>
            <tr>
              <td>
                {billingDetails.firstName} {billingDetails.lastName}
              </td>
            </tr>

            <tr>
              <td>{billingDetails.email}</td>
            </tr>
            <tr>
              <td>{billingDetails.address1}</td>
            </tr>
            {billingDetails.address2 && (
              <tr>
                <td>{billingDetails.address2}</td>
              </tr>
            )}
            <tr>
              <td>{billingDetails.city}</td>
            </tr>
            <tr>
              <td>{billingDetails.state}</td>
            </tr>
            <tr>
              <td>{billingDetails.zip}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Container>
  );
}
