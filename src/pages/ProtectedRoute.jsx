import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthcontext";
import { useEffect } from "react";
import { PropTypes } from "prop-types";

const ProtectedRoute = function ({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      !isAuthenticated && navigate("/");
    },
    [isAuthenticated, navigate]
  );
  return isAuthenticated ? children : null;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoute;
