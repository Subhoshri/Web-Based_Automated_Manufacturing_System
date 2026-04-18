import React, { useState } from "react";
import { placeOrder } from "../services/api";

function OrderForm() {
  const [dealerId, setDealerId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      dealer_id: dealerId,
      items: [{ product_id: productId, quantity: Number(quantity) }],
    };

    const res = await placeOrder(data);
    alert("Order placed: " + JSON.stringify(res));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Place Order</h3>

      <input
        placeholder="Dealer ID"
        onChange={(e) => setDealerId(e.target.value)}
      />

      <input
        placeholder="Product ID"
        onChange={(e) => setProductId(e.target.value)}
      />

      <input
        placeholder="Quantity"
        onChange={(e) => setQuantity(e.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
  );
}

export default OrderForm;