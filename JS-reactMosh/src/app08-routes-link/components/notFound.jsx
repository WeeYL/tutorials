import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/", {state:"location state from notFound"});
      // navigate("-1"); // go back one page
    }, 2000);
  }, []);

  return <h1>Not Found</h1>;
};

export default NotFound;
