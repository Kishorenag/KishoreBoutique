import React from "react";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faFontAwesome,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <>
      <style type="text/css">
        {`
            .footer{
            position: absolute;
            bottom: 0;
            background-color: red;
          }
        `}
      </style>
      <Navbar
        className="bg-body-secondary fixed-bottom pt-2 pb-2"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container>
            <div className="text-white">
              Copyright © 2024 | Kishore Boutique
            </div>
            <Stack className="ms-auto" direction="horizontal" gap={3}>
              <FontAwesomeIcon icon={faFacebook} color="white" />
              <FontAwesomeIcon icon={faTwitter} color="white" />
              <FontAwesomeIcon icon={faInstagram} color="white" />
              <FontAwesomeIcon icon={faYoutube} color="white" />
            </Stack>
        </Container>
      </Navbar>
    </>
  );
}
