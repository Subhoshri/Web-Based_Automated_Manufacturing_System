import React, { useEffect, useState } from "react";
import { getProducts, updateStock } from "../services/api";

function InventoryPage() {
  const [productId, setProductId] = useState("");
  const [qty, setQty] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const productList = await getProducts();
        setProducts(productList);

        if (productList.length > 0) {
          setProductId(productList[0]._id);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoadingProducts(false);
      }
    }

    loadProducts();
  }, []);

  const handleUpdate = async () => {
    setError("");

    try {
      await updateStock({
        product_id: productId,
        qty: Number(qty),
      });

      alert("Stock Updated");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Inventory Management</h2>

      <select
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        disabled={isLoadingProducts || products.length === 0}
      >
        {products.length === 0 ? (
          <option value="">No products available</option>
        ) : (
          products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.prod_name}
            </option>
          ))
        )}
      </select>

      <input
        placeholder="Quantity"
        onChange={(e) => setQty(e.target.value)}
      />

      <button onClick={handleUpdate} disabled={isLoadingProducts || products.length === 0}>
        Update Stock
      </button>
      {error ? <p>{error}</p> : null}
    </div>
  );
}

export default InventoryPage;