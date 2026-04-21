import React, { useEffect, useState } from "react";
import { getProducts } from "../services/api";

function OrdersPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>Available Products</h2>

      {error ? <p>{error}</p> : null}

      {products.map((p) => (
        <div key={p._id}>
          <p>{p.prod_name} - Stock: {p.stock_quantity}</p>
        </div>
      ))}
    </div>
  );
}

export default OrdersPage;