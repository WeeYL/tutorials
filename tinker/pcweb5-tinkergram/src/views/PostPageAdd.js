import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ADD, API } from "../constants";

export default function PostPageAdd() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  return (
    <Container>
      <Navbar.Brand href="/">Tinkergram</Navbar.Brand>

      <h1 style={{ marginBlock: "1rem" }}>Add Post</h1>
      <Form>
        <Form.Group className="mb-3" controlId="caption">
          <Form.Label>Caption</Form.Label>
          <Form.Control
            type="text"
            placeholder="Lovely day"
            value={caption}
            onChange={(text) => setCaption(text.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="https://zca.sg/img/1"
            value={image}
            onChange={(image) => setImage(image.target.value)}
          />
          <Form.Text className="text-muted">
            Make sure the url has a image type at the end: jpg, jpeg, png.
          </Form.Text>
        </Form.Group>
        <Button
          variant="primary"
          onClick={async (e) => {
            const post = { image, caption };
            try {
              await axios.post(API + ADD, post);
              navigate("/");
            } catch (error) {
              console.error(error.message);
            }
          }}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
}
