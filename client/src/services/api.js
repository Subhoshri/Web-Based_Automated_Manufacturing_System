const BASE_URL = "http://localhost:5000";

export const placeOrder = async (data) => {
  const res = await fetch(`${BASE_URL}/order/place`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/product`);
  return res.json();
};

export const updateStock = async (data) => {
  const res = await fetch(`${BASE_URL}/product/update-stock`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};