import React, { useState } from "react";
import { updateStock } from "../services/api";

function InventoryPage() {
  const [productId, setProductId] = useState("");
  const [qty, setQty] = useState("");

  const handleUpdate = async () => {
    const res = await updateStock({
      product_id: productId,
      qty: Number(qty),
    });

    alert("Stock Updated");
  };

  return (
    <div>
      <h2>Inventory Management</h2>

      <input
        placeholder="Product ID"
        onChange={(e) => setProductId(e.target.value)}
      />

      <input
        placeholder="Quantity"
        onChange={(e) => setQty(e.target.value)}
      />

      <button onClick={handleUpdate}>Update Stock</button>
    </div>
  );
}

export default InventoryPage;