import React, { useEffect, useState } from "react";
import { addProduct, getProducts, updateProduct } from "../services/api";

function emptyProductForm() {
  return {
    prod_name: "",
    category: "",
    unit_price: "",
    stock_quantity: "",
  };
}

function ProductManagementPage() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [form, setForm] = useState(emptyProductForm());
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data);

      if (!selectedProductId && data.length > 0) {
        const first = data[0];
        setSelectedProductId(first._id);
        setForm({
          prod_name: first.prod_name || "",
          category: first.category || "",
          unit_price: first.unit_price ?? "",
          stock_quantity: first.stock_quantity ?? "",
        });
      }
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function onSelectProduct(e) {
    const id = e.target.value;
    setSelectedProductId(id);
    const product = products.find((p) => p._id === id);

    if (product) {
      setForm({
        prod_name: product.prod_name || "",
        category: product.category || "",
        unit_price: product.unit_price ?? "",
        stock_quantity: product.stock_quantity ?? "",
      });
    }

    setMessage("");
    setError("");
  }

  async function handleAdd(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const payload = {
        ...form,
        unit_price: Number(form.unit_price),
        stock_quantity: Number(form.stock_quantity),
      };

      const created = await addProduct(payload);
      setMessage("Product added successfully");
      await loadProducts();
      setSelectedProductId(created._id);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!selectedProductId) {
      setError("Please select a product to update");
      return;
    }

    try {
      const payload = {
        ...form,
        unit_price: Number(form.unit_price),
        stock_quantity: Number(form.stock_quantity),
      };

      await updateProduct(selectedProductId, payload);
      setMessage("Product updated successfully");
      await loadProducts();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h2>Update or Add Product Details</h2>

      <div>
        <label>Select Product</label>
        <select value={selectedProductId} onChange={onSelectProduct}>
          <option value="">Select product</option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.prod_name}
            </option>
          ))}
        </select>
      </div>

      <form>
        <input
          name="prod_name"
          placeholder="Product name"
          value={form.prod_name}
          onChange={onChange}
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={onChange}
        />
        <input
          name="unit_price"
          placeholder="Unit price"
          value={form.unit_price}
          onChange={onChange}
        />
        <input
          name="stock_quantity"
          placeholder="Stock quantity"
          value={form.stock_quantity}
          onChange={onChange}
        />

        <button type="button" onClick={handleAdd}>Add Product</button>
        <button type="button" onClick={handleUpdate}>Update Product</button>
      </form>

      {message ? <p>{message}</p> : null}
      {error ? <p>{error}</p> : null}
    </div>
  );
}

export default ProductManagementPage;
