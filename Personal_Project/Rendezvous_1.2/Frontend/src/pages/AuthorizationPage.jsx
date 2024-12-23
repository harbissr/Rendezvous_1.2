import React from "react";
import AuthForm from "../components/AuthForm";

const AuthorizationPage = ({setIsAuthenticated}) => {
  return (
    <div className="authorization-page">
      <AuthForm setIsAuthenticated={setIsAuthenticated} />
    </div>
  );
};

export default AuthorizationPage;