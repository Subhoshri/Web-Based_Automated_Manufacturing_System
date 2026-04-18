const BASE_URL = "http://localhost:5000";

async function readResponseBody(res) {
  const contentType = res.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return res.json();
  }

  return res.text();
}

export const placeOrder = async (data) => {
  const res = await fetch(`${BASE_URL}/order/place`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const body = await readResponseBody(res);

  if (!res.ok) {
    throw new Error(body?.error || body || "Failed to place order");
  }

  return body;
};

export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/product`);
  const body = await readResponseBody(res);

  if (!res.ok) {
    throw new Error(body?.error || body || "Failed to load products");
  }

  return body;
};

export const getDealers = async () => {
  const res = await fetch(`${BASE_URL}/dealer`);
  const body = await readResponseBody(res);

  if (!res.ok) {
    throw new Error(body?.error || body || "Failed to load dealers");
  }

  return body;
};

export const addDealer = async (data) => {
  const res = await fetch(`${BASE_URL}/dealer/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const body = await readResponseBody(res);

  if (!res.ok) {
    throw new Error(body?.error || body || "Failed to add dealer");
  }

  return body;
};

export const updateDealer = async (dealerId, data) => {
  const res = await fetch(`${BASE_URL}/dealer/${dealerId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const body = await readResponseBody(res);

  if (!res.ok) {
    throw new Error(body?.error || body || "Failed to update dealer");
  }

  return body;
};

export const addProduct = async (data) => {
  const res = await fetch(`${BASE_URL}/product/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const body = await readResponseBody(res);

  if (!res.ok) {
    throw new Error(body?.error || body || "Failed to add product");
  }

  return body;
};

export const updateProduct = async (productId, data) => {
  const res = await fetch(`${BASE_URL}/product/${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const body = await readResponseBody(res);

  if (!res.ok) {
    throw new Error(body?.error || body || "Failed to update product" );
  }

  return body;
};

export const updateStock = async (data) => {
  const res = await fetch(`${BASE_URL}/product/update-stock`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const body = await readResponseBody(res);

  if (!res.ok) {
    throw new Error(body?.error || body || "Failed to update stock");
  }

  return body;
};