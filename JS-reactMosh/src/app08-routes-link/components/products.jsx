import React from "react";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams({n:3})
  const num = searchParams.get('n')
  
  const products = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
    { id: 3, name: "Product 3" }
  ]

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <a href={`/products/${product.id}`}>{product.name}</a>
          </li>
        ))}
      </ul>
      <h2>Search product</h2>
      <input type="number" value={num} onChange={(e)=>setSearchParams({n:e.target.value})}/>
    </div>
  )
  
}
 
export default Products;

