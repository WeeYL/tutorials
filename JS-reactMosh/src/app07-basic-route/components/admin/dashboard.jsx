import React from "react";
import { useOutletContext } from "react-router-dom";

const Dashboard = () => {
  const { outletContext } = useOutletContext();
  return (
    <div>
      <h1>Admin Dashboard {outletContext}</h1>
    </div>
  );
};

export default Dashboard;
