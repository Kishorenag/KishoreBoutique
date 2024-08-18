import React, { useEffect, useState } from 'react'
import { Button, Card, Stack } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toTitleCase } from '../../utils/util';

export default function ProductView() {
  const [product, setProduct] = useState([]);
  const {id} = useParams()


  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProduct(data);
      });
  }, []);

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={product?.image}
        style={{
          height: 300,
          objectFit: "contain",
        }}
      />
      <Card.Body>
        <Stack direction="vertical" style={{
            justifyContent: "space-between",
            height: "100%"
        }}>
          <div>
            <Card.Text>{product ? toTitleCase(product?.category) : ""}</Card.Text>
            <Card.Title>{product?.productName}</Card.Title>
          </div>
          <div>
            <Card.Text>{product?.rating?.rate}</Card.Text>
            <Card.Text>₹ {product?.price}</Card.Text>
            <Button variant="primary">Add to Cart</Button>
          </div>
        </Stack>
      </Card.Body>
    </Card>
  )
}
