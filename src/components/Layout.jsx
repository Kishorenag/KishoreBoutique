import React from "react";
import MyRoutes from "../MyRoutes";
import Header from "./Header";
import Footer from "./Footer";
import Container from "react-bootstrap/esm/Container";
import Stack from "react-bootstrap/esm/Stack";
import Image from "react-bootstrap/esm/Image";

export default function Layout() {
  return (
    <Stack direction="vertical" >
      <Header />
      <Image
        src="https://websitedemos.net/organic-shop-02/wp-content/uploads/sites/465/2019/06/leaves-free-img.png"
        width={400}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          zIndex: -1,
          filter: "grayscale(100%) brightness(120%)",
        }}
      />
      <MyRoutes />
      <Footer />
    </Stack>
  );
}
