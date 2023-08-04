import React, { useEffect, useState } from "react";
import {addDoc, collection} from "firebase/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import {auth, db, storage} from "../firebase";
import { signOut } from "firebase/auth";
import { Button, Container, Form, Nav, Navbar, Image } from "react-bootstrap";

export default function PostPageAdd() {
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState("");
    const [user, loading] = useAuthState(auth);
    //   console.log(`useAuthState: user ${user}, loading ${loading}`)
    const [previewImage, setPreviewImage] = useState("")
    const navigate = useNavigate();

  async function addPost() {
    const imageReference  = ref(storage,`images/${image.name}`)
    const response = await uploadBytes (imageReference,image)
    const imageURL = await getDownloadURL(response.ref)
    // console.log(imageReference,response.ref,imageURL)
    await addDoc(collection(db,"posts"),{caption, image:imageURL});
    navigate("/")
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login")
  }, [navigate,user, loading]);

  return (
    <>
      <Navbar variant="light" bg="light">
        <Container>
          <Navbar.Brand href="/">Tinkergram</Navbar.Brand>
          <Nav>
            <Nav.Link href="/add">New Post</Nav.Link>
            <Nav.Link onClick={(e)=>signOut(auth)}>🚪</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <h1 style={{ marginBlock: "1rem" }}>Add Post</h1>
        <Form>
          <Form.Group className="mb-3" controlId="caption">
            <Form.Label>Caption</Form.Label>
            <Image
              src={previewImage}
              style={{
                display:"block",
                objectFit:"cover",
                width:"10rem",
                height:"10rem"}}
            />
            <Form.Control
              type="text"
              placeholder="Lovely day"
              value={caption}
              onChange={(text) => setCaption(text.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="image">
            {/* <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="https://zca.sg/img/1"
              value={image}
              onChange={(text) => setImage(text.target.value)}
            /> */}
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              placeholder="upload file"
              onChange={(e) => {
                const imageFile = e.target.files[0]
                const previewImage = URL.createObjectURL(imageFile)
                console.log(`imageFile ${imageFile}`)
                setImage(imageFile)
                setPreviewImage(previewImage)
              }}
            />
            <Form.Text className="text-muted">
              Make sure the url has a image type at the end: jpg, jpeg, png.
            </Form.Text>
          </Form.Group>
          <Button variant="primary" onClick={async (e) => addPost()}>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}