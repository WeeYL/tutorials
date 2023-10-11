import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/admin/dashboard";
import AdminLayout from "../components/adminLayout";
import About from "../components/admin/about";
import Contact from "../components/admin/contact";

const AdminRoute = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
};

export default AdminRoute;
