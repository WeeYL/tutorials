import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {

  return (
    <>
      <Outlet context={{outletContext:"outletContext Here"}}/>
      <ul>
        <li>
          <Link to="/admin/about">about us</Link>
        </li>
        <li>
          <Link to="/admin/contact">contact us</Link>
        </li>
      </ul>
    </>
  );
};

export default AdminLayout;
