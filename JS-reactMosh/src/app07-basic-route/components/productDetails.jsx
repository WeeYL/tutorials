import React, { Component } from "react";
import { useParams } from "react-router-dom";


function ProductDetails () {
  const {id} = useParams()
  console.log({id})
  return (
    <div>
      <h1>Product Details - {id}</h1>
      <button >Save</button>
    </div>
  );
}

export default ProductDetails;
