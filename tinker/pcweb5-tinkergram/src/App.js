import {Container, Image, Nav, Navbar, Row} from "react-bootstrap"
import { useEffect, useState } from "react";
import {API, POSTS} from "./constants"
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function ImageSquare({ post }) {
  const { image, id } = post;

  return (
    <Link
      to={`${API}/post/${id}`}
      style={{
        width: "18rem",
        marginLeft: "1rem",
        marginTop: "2rem",
      }}
    >
      <Image
        src={image}
        style={{
          objectFit: "cover",
          width: "18rem",
          height: "18rem",
        }}
      />
    </Link>
  );
}


function App() {
  const[posts, setPosts] = useState([])
  async function getAllPosts() {
    try {
      const response = await axios.get(API + POSTS);
      const posts = response.data;
      setPosts(posts);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  const ImagesRow = () => {
    const post={ id: 5, caption: 'hello', image: 'https://zca.sg/img/2' }
     return posts.map((post, index) => <ImageSquare key={index} post={post} />);
     
  };
  
  return (
    <>
      <Navbar variant="light" bg="light">
      <Container>
        <Navbar.Brand href="/">Tinkergram</Navbar.Brand>
        <Nav>
          <Nav.Link href="/add">New Post</Nav.Link>
        </Nav>
      </Container>
    </Navbar>

     <Container>
        <Row>
          <ImagesRow />
        </Row>
      </Container>

    </>
  )

}

export default App;

