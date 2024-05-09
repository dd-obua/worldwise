import { PropTypes } from "prop-types";
import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const inititalState = { user: null, isAuthenticated: false };

const reducer = function (state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };

    case "logout":
      return inititalState;

    default:
      throw new Error("Unknown action.");
  }
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthProvider = function ({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    inititalState
  );

  const login = function (email, password) {
    email === FAKE_USER.email &&
      password === FAKE_USER.password &&
      dispatch({ type: "login", payload: FAKE_USER });
  };

  const logout = function () {
    dispatch({ type: "logout" });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = function () {
  const val = useContext(AuthContext);
  if (val === undefined)
    throw new Error("AuthContext was used outside the AuthProvider");
  return val;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export { AuthProvider, useAuth };
