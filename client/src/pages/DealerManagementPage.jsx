import React, { useEffect, useState } from "react";
import { addDealer, getDealers, updateDealer } from "../services/api";

function emptyDealerForm() {
  return {
    dealer_name: "",
    contact: "",
    address: "",
    email: "",
  };
}

function DealerManagementPage() {
  const [dealers, setDealers] = useState([]);
  const [selectedDealerId, setSelectedDealerId] = useState("");
  const [form, setForm] = useState(emptyDealerForm());
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadDealers() {
    try {
      const data = await getDealers();
      setDealers(data);

      if (!selectedDealerId && data.length > 0) {
        const first = data[0];
        setSelectedDealerId(first._id);
        setForm({
          dealer_name: first.dealer_name || "",
          contact: first.contact || "",
          address: first.address || "",
          email: first.email || "",
        });
      }
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadDealers();
  }, []);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function onSelectDealer(e) {
    const id = e.target.value;
    setSelectedDealerId(id);
    const dealer = dealers.find((d) => d._id === id);

    if (dealer) {
      setForm({
        dealer_name: dealer.dealer_name || "",
        contact: dealer.contact || "",
        address: dealer.address || "",
        email: dealer.email || "",
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
      const created = await addDealer(form);
      setMessage("Dealer added successfully");
      await loadDealers();
      setSelectedDealerId(created._id);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!selectedDealerId) {
      setError("Please select a dealer to update");
      return;
    }

    try {
      await updateDealer(selectedDealerId, form);
      setMessage("Dealer updated successfully");
      await loadDealers();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h2>Update or Add Dealer</h2>

      <div>
        <label>Select Dealer</label>
        <select value={selectedDealerId} onChange={onSelectDealer}>
          <option value="">Select dealer</option>
          {dealers.map((dealer) => (
            <option key={dealer._id} value={dealer._id}>
              {dealer.dealer_name}
            </option>
          ))}
        </select>
      </div>

      <form>
        <input
          name="dealer_name"
          placeholder="Dealer name"
          value={form.dealer_name}
          onChange={onChange}
        />
        <input
          name="contact"
          placeholder="Contact"
          value={form.contact}
          onChange={onChange}
        />
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={onChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
        />

        <button type="button" onClick={handleAdd}>Add Dealer</button>
        <button type="button" onClick={handleUpdate}>Update Dealer</button>
      </form>

      {message ? <p>{message}</p> : null}
      {error ? <p>{error}</p> : null}
    </div>
  );
}

export default DealerManagementPage;
