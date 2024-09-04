import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/esm/Stack";
import Image from "react-bootstrap/Image";
import Products from "./product";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
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
              src="https://websitedemos.net/organic-shop-02/wp-content/uploads/sites/465/2021/03/organic-products-hero.png"
              className="p-2"
            />
            <Stack
              direction="vertical"
              gap={2}
              className="mt-5 mb-2 ml-3"
              style={{
                justifyContent: "space-evenly",
                alignItems: "start",
              }}
            >
              <Image
                src="https://websitedemos.net/organic-shop-02/wp-content/uploads/sites/465/2019/07/logo-leaf-new.png"
                width={100}
              />
              <h5>Best Quality Products</h5>
              <h1>Join The Organic Movement!</h1>
              <p style={{ textAlign: "start" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis, pulvinar dapibus.
              </p>
              <Button variant="primary" size="lg" style={{ width: 200 }} onClick={()=>handleClick()}>
                {" "}
                <FontAwesomeIcon icon={faShoppingCart} /> Shop Now
              </Button>
            </Stack>
          </Stack>
        </Container>
      </div>
      <Container>
        <Products myRef={ref} />
      </Container>
    </>
  );
}
