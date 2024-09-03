import React, { useState } from "react";
import { getCartFromLocal, removeAllDataFromLocal } from "../utils/util";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Stack,
  Table,
  Accordion,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ThankYouPage from "./ThankYouPage";

export default function BillingPage(props) {
  const [cartData, setCartData] = useState(getCartFromLocal());
  // console.log("cartData", cartData);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();
  // const navigateToThankYouPage = () =>{
  //   navigate("/thankyou")
  // }

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "Billing First name is a required field.";
    if (!formData.lastName.trim())
      newErrors.lastName = "Billing Last name is a required field.";
    if (!formData.email.trim()) newErrors.email = "Email is a required field.";
    if (!formData.address1.trim())
      newErrors.address1 = "Address is a required field.";
    if (!formData.city.trim()) newErrors.city = "City is a required field.";
    if (!formData.state.trim()) newErrors.state = "State is a required field.";
    if (!formData.zip.trim()) newErrors.zip = "Zip code is a required field.";

    if (paymentMethod === "card") {
      if (!formData.cardNumber.trim())
        newErrors.cardNumber = "Card Number is required.";
      if (!formData.cardName.trim())
        newErrors.cardName = "Name on Card is required.";
      if (!formData.expiryDate.trim())
        newErrors.expiryDate = "Expiry Date is required.";
      if (!formData.cvv.trim()) newErrors.cvv = "CVV is required.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      if (paymentMethod === "card" || paymentMethod === "cashOnDelivery") {
        removeAllDataFromLocal()
        setCartData([]);
        navigate("/thankyou", {
          state: { billingDetails: formData },
        });
      } else {
        setErrors({ paymentMethod: "Please select a payment method." });
      }
    }
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  let grandTotal = 0;
  let grandTotalQuantity = 0;

  return (
    <div
      style={{ backgroundColor: "beige", minHeight: "100vh", padding: "20px" }}
    >
      <Container
        className="mb-5"
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <h5>Billing Details</h5>

              <Form.Group controlId="firstName" className="text-start mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Firstname"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  // (e)=>{setFormData({...formData, e.target.value})}
                  isInvalid={!!errors.firstName}
                />
              </Form.Group>

              <Form.Group controlId="lastName" className="text-start mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Lastname"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  isInvalid={!!errors.lastName}
                />
              </Form.Group>

              <Form.Group className="mb-3 text-start" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleInputChange}
                  isInvalid={!!errors.email}
                />
              </Form.Group>

              <Form.Group className="mb-3 text-start" controlId="address1">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  placeholder="1234 Main St"
                  value={formData.address1}
                  onChange={handleInputChange}
                  isInvalid={!!errors.address1}
                />
              </Form.Group>

              <Form.Group className="mb-3 text-start" controlId="address2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control
                  placeholder="Apartment, studio, or floor"
                  value={formData.address2}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Row className="mb-3 text-start">
                <Form.Group as={Col} controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    value={formData.city}
                    onChange={handleInputChange}
                    isInvalid={!!errors.city}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="state">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    value={formData.state}
                    onChange={handleInputChange}
                    isInvalid={!!errors.state}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="zip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    value={formData.zip}
                    onChange={handleInputChange}
                    isInvalid={!!errors.zip}
                  />
                </Form.Group>
              </Row>

              {Object.keys(errors).map((key) => (
                <p key={key} style={{ color: "red" }}>
                  {errors[key]}
                </p>
              ))}

              <div className="text-center mt-4">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={
                    Object.keys(validateForm()).length > 0 || !paymentMethod
                  }
                >
                  Place Your Order
                </Button>
              </div>
            </Form>{" "}
          </Col>

          <Col>
            <Stack>
              <Table>
                <thead>
                  <tr>
                    <th colSpan={2}>
                      <h5>Your Order</h5>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(cartData) &&
                    cartData?.map((cartItem, index) => {
                      grandTotal +=
                        Math.round(cartItem.price) * cartItem.quantity;
                      grandTotalQuantity += cartItem.quantity;
                      return (
                        <tr key={index}>
                          <td
                            style={{
                              textAlign: "start",
                              verticalAlign: "middle",
                            }}
                          >
                            {cartItem.productName} x {cartItem.quantity}
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
                      style={{
                        textAlign: "start",
                        verticalAlign: "middle",
                      }}
                    >
                      TotalQuantity
                    </th>
                    <td>{grandTotalQuantity}</td>
                  </tr>
                  <tr>
                    <th
                      style={{
                        textAlign: "start",
                        verticalAlign: "middle",
                      }}
                    >
                      Grand Total
                    </th>
                    <td>₹{grandTotal}</td>
                  </tr>

                  <tr>
                    <td
                      colSpan={2}
                      style={{ textAlign: "start", verticalAlign: "middle" }}
                    >
                      <Form.Check
                        inline
                        type="radio"
                        name="paymentMethod"
                        onChange={() => handlePaymentMethodChange("card")}
                        checked={paymentMethod === "card"}
                      />{" "}
                      <Form.Check.Label>Card</Form.Check.Label>
                      {paymentMethod === "card" && (
                        <div className="mt-3">
                          <Form.Group controlId="cardNumber" className="mb-3">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter your card number"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              isInvalid={!!errors.cardNumber}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.cardNumber}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group controlId="cardName" className="mb-3">
                            <Form.Label>Name on Card</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter the name on the card"
                              value={formData.cardName}
                              onChange={handleInputChange}
                              isInvalid={!!errors.cardName}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.cardName}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Row>
                            <Col>
                              <Form.Group
                                controlId="expiryDate"
                                className="mb-3"
                              >
                                <Form.Label>Expiry Date</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="MM/YY"
                                  value={formData.expiryDate}
                                  onChange={handleInputChange}
                                  isInvalid={!!errors.expiryDate}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.expiryDate}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group controlId="cvv" className="mb-3">
                                <Form.Label>CVV</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter CVV"
                                  value={formData.cvv}
                                  onChange={handleInputChange}
                                  isInvalid={!!errors.cvv}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.cvv}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                          </Row>
                        </div>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td
                      colSpan={2}
                      style={{ textAlign: "start", verticalAlign: "middle" }}
                    >
                      <Form.Check
                        inline
                        type="radio"
                        name="paymentMethod"
                        onChange={() =>
                          handlePaymentMethodChange("cashOnDelivery")
                        }
                        checked={paymentMethod === "cashOnDelivery"}
                      />{" "}
                      <Form.Check.Label>Cash on Delivery</Form.Check.Label>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Stack>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
