import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const SearchProduct = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const query = searchParams.get("query");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/products/similar/${query}`
        );
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [query]);

  return (
    <section>
      <h1>Search Product {query}</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
        </div>
      ))}
    </section>
  );
};

export default SearchProduct;
