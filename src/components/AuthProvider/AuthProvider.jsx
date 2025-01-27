import React, { createContext } from "react";
import PropTypes from "prop-types";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  return (
    <div>
      <authContext.Provider value="hello">{children}</authContext.Provider>
    </div>
  );
};

AuthProvider.propTypes = {};

export default AuthProvider;
