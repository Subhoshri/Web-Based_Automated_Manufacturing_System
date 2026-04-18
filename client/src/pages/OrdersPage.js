import React, { useEffect, useState } from "react";
import { getProducts } from "../services/api";

function OrdersPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getProducts();
      setProducts(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>Available Products</h2>

      {products.map((p) => (
        <div key={p._id}>
          <p>{p.prod_name} - Stock: {p.stock_quantity}</p>
        </div>
      ))}
    </div>
  );
}

export default OrdersPage;