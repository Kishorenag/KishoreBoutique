import React, { useEffect, useState } from "react";
import Image from "react-bootstrap/esm/Image";
import Stack from "react-bootstrap/esm/Stack";
import { Col, Row } from "react-bootstrap";
import ProductCard from "../../components/ProductCard";

export default function Products(props) {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAllProducts(data);
      });
  }, []);

  return (
    <Stack
      direction="vertical" gap={5}
      style={{
        alignItems: "center",
        marginTop: 100,
      }}
    >
      <h1 ref={props.myRef} id="best_selling_products">
        Best Selling Products
      </h1>
      <Image
        src="https://websitedemos.net/organic-shop-02/wp-content/uploads/sites/465/2019/07/logo-leaf-new.png"
        width={100}
      />
      <Row
        lg={4}
        style={{
          marginBottom: 5,
        }}
      >
        {allProducts.map((product, index) => {
          return (
            <Col
              style={{
                marginBottom: 50,
                alignItems: "stretch",
                display: "flex",
              }}
            >
              <ProductCard
                id={product.id}
                imageUrl={product.image}
                category={product.category}
                productName={product.title}
                rating={product.rating.rate}
                price={product.price}
              />
            </Col>
          );
        })}
      </Row>
    </Stack>
  );
}

