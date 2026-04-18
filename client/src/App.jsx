import React, { useState } from "react";
import InventoryPage from "./pages/InventoryPage";
import OrdersPage from "./pages/OrdersPage";
import OrderForm from "./components/OrderForm";
import DealerManagementPage from "./pages/DealerManagementPage";
import ProductManagementPage from "./pages/ProductManagementPage";

const screens = {
  products: "Current Products",
  placeOrder: "Place Order",
  updateStock: "Update Stock",
  manageDealers: "Update or Add Dealer",
  manageProducts: "Update or Add Product Details",
};

function App() {
  const [activeScreen, setActiveScreen] = useState("products");

  function renderScreen() {
    switch (activeScreen) {
      case "products":
        return <OrdersPage />;
      case "placeOrder":
        return <OrderForm />;
      case "updateStock":
        return <InventoryPage />;
      case "manageDealers":
        return <DealerManagementPage />;
      case "manageProducts":
        return <ProductManagementPage />;
      default:
        return <OrdersPage />;
    }
  }

  return (
    <div>
      <h1>WAMS System</h1>

      <nav>
        {Object.entries(screens).map(([key, label]) => (
          <button key={key} type="button" onClick={() => setActiveScreen(key)}>
            {label}
          </button>
        ))}
      </nav>

      <section>
        <h2>{screens[activeScreen]}</h2>
        {renderScreen()}
      </section>
    </div>
  );
}

export default App;