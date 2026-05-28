import { Route, Routes } from "react-router";
import Home from "./pages/Home.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import AddProperty from "./pages/AddProperty.tsx";
import MyProperties from "./pages/MyProperties.tsx";
import EditProperty from "./pages/EditProperty.tsx";
import PropertyDetails from "./pages/PropertyDetails.tsx";
import MyBookings from "./pages/MyBookings.tsx";
import Admin from "./pages/Admin.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import { PublicRoute } from "./components/PublicRoute.tsx";
import { AdminRoute } from "./components/AdminRoute.tsx";
import Layout from "./components/layout/Layout.tsx";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="/my-properties" element={<MyProperties />} />
          <Route path="/edit-property/:id" element={<EditProperty />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
          <Route path="/bookings" element={<MyBookings />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
