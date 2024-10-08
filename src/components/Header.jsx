import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { getCartFromLocal, setTotalCartBadge } from "../utils/util";
import { useSelector } from "react-redux";

export default function Header() {
  const navigate = useNavigate();

  const navigateTo = (url) => {
    navigate(url);
  };

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <Navbar expand="lg" className="bg-body-tertiary mt-2 mb-2">
      <Container>
        <Stack
          direction="horizontal"
          style={{ justifyContent: "space-around", width: "100%" }}
        >
          <Stack direction="horizontal">
            <Navbar.Brand
              onClick={() => navigateTo("/")}
              style={{ cursor: "pointer" }}
            >
              Kishore Boutique
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto"></Nav>
            </Navbar.Collapse>
          </Stack>
          <Stack
            direction="horizontal"
            className="ms-auto"
            style={{ justifyContent: "end" }}
          >
            <Button
              onClick={() => navigateTo("/cart")}
              style={{
                position: "relative",
              }}
            >
              <FontAwesomeIcon icon={faBasketShopping} />
              <span
                style={{ position: "absolute", top: 0 }}
                className="start-100 translate-middle badge rounded-pill bg-danger"
              >
                {totalQuantity}
                <span className="visually-hidden">unread messages</span>
              </span>
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Navbar>
  );
}
