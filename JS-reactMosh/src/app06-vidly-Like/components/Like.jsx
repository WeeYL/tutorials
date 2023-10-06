import React, { Component } from "react";

class Like extends Component {

  render() {

    let classes = this.props.liked? "fa fa-heart": "fa fa-heart-o"
    return (
        <i onClick={this.props.onClick} className={classes} aria-hidden="true"></i>
    )
  }
}

export default Like;
