import React, { useEffect, useState } from "react";
import { getDealers, getProducts, placeOrder } from "../services/api";

function OrderForm() {
  const [dealerId, setDealerId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [dealers, setDealers] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoadingDealers, setIsLoadingDealers] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDealers() {
      try {
        const dealerList = await getDealers();
        setDealers(dealerList);

        if (dealerList.length > 0) {
          setDealerId(dealerList[0]._id);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoadingDealers(false);
      }
    }

    loadDealers();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = {
        dealer_id: dealerId,
        items: [{ product_id: productId, quantity: Number(quantity) }],
      };

      const res = await placeOrder(data);
      alert("Order placed: " + JSON.stringify(res));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Place Order</h3>

      <select
        value={dealerId}
        onChange={(e) => setDealerId(e.target.value)}
        disabled={isLoadingDealers || dealers.length === 0}
      >
        {dealers.length === 0 ? (
          <option value="">No dealers available</option>
        ) : (
          dealers.map((dealer) => (
            <option key={dealer._id} value={dealer._id}>
              {dealer.dealer_name}
            </option>
          ))
        )}
      </select>

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
        onChange={(e) => setQuantity(e.target.value)}
      />

      <button
        type="submit"
        disabled={
          isLoadingDealers ||
          isLoadingProducts ||
          dealers.length === 0 ||
          products.length === 0
        }
      >
        Submit
      </button>
      {error ? <p>{error}</p> : null}
    </form>
  );
}

export default OrderForm;