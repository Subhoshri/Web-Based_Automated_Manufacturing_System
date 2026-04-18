import React from "react";
import DealerDashboard from "./pages/DealerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import InventoryPage from "./pages/InventoryPage";
import OrdersPage from "./pages/OrdersPage";

function App() {
  return (
    <div>
      <h1>WAMS System</h1>
      <DealerDashboard />
      <AdminDashboard />
      <InventoryPage />
      <OrdersPage />
    </div>
  );
}

export default App;