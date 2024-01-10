import React, { ReactNode } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { config } from "../config";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  return (
    <Auth0Provider
      domain={ config.AUTH_DOMAIN }
      clientId={ config.AUTH_CLIENT_ID }
      authorizationParams={{
        redirect_uri: config.AUTH_REDIRECT_URI,
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
