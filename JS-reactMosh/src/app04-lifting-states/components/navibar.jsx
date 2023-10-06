import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Navbar from 'react-bootstrap/Navbar';

class Navibar extends Component {
  state = {};
  render() {
    const counters = this.props.counters.filter(c=>c.value >0).length
    return (
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">{counters} counter(s) with value more than 0</Navbar.Brand>
        </Container>
      </Navbar>
    );
  }
}

export default Navibar;
