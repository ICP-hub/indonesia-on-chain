import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthClient } from "@dfinity/auth-client";
import {
  createActor as createActorBackend,
  idlFactory
} from '../../../../declarations/backend_canister/index';
import { createActor as createActorBackendContent } from '../../../../declarations/backend_content_canister/index';
import { Actor, HttpAgent } from "@dfinity/agent";

const AuthContext = createContext();

const defaultOptions = {
  createOptions: {
    idleOptions: {
      idleTimeout: 1000 * 60 * 30, // set to 30 minutes
      disableDefaultIdleCallback: true, // disable the default reload behavior
    },
  },
  loginOptionsIcp: {
    identityProvider:
      process.env.DFX_NETWORK === "ic"
        ? "https://identity.ic0.app/#authorize"
        : `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943`,
  },
  loginOptionsnfid: {
    identityProvider:
      process.env.DFX_NETWORK === "ic"
        ? `https://nfid.one/authenticate/?applicationName=my-ic-app#authorize`
        : `https://nfid.one/authenticate/?applicationName=my-ic-app#authorize`
  },
};

export const useAuthClient = (options = defaultOptions) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authClient, setAuthClient] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const [actor, setActor] = useState(null);
  const [contentActor, setContentActor] = useState(null);

  useEffect(() => {
    // Initialize AuthClient
    AuthClient.create(options.createOptions).then((client) => {
      setAuthClient(client);
    });
  }, []);

  useEffect(() => {
    if (authClient) {
      updateClient(authClient);
    }
  }, [authClient]);

  const login = (val) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (authClient.isAuthenticated() && !(await authClient.getIdentity().getPrincipal().isAnonymous())) {
          updateClient(authClient);
          resolve(authClient);
        } else {
          const opt = val === "Icp" ? "loginOptionsIcp" : "loginOptionsnfid";
          authClient.login({
            ...options[opt],
            onError: (error) => reject(error),
            onSuccess: () => {
              updateClient(authClient);
              resolve(authClient);
            },
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const updateClient = async (client) => {
    const isAuthenticated = await client.isAuthenticated();
    setIsAuthenticated(isAuthenticated);
    const identity = client.getIdentity();
    setIdentity(identity);
    const principal = identity.getPrincipal();
    setPrincipal(principal);
    setAuthClient(client);
    setupActors(identity);
  };

  const setupActors = (identity) => {
    const agent = new HttpAgent({ identity });
    const canisterId = process.env.BACKEND_CANISTER_CANISTER_ID || process.env.CANISTER_ID_BACKEND_CANISTER;
    const contentCanisterId = process.env.BACKEND_CONTENT_CANISTER_CANISTER_ID || process.env.CANISTER_ID_BACKEND_CONTENT_CANISTER;
    
    const backendActor = createActorBackend(canisterId, { agentOptions: { identity } });
    const contentActor = createActorBackendContent(contentCanisterId, { agentOptions: { identity } });
    
    setActor(backendActor);
    setContentActor(contentActor);
  };

  const logout = async () => {
    await authClient?.logout();
    setIsAuthenticated(false);
    setIdentity(null);
    setPrincipal(null);
    setAuthClient(null);
    setActor(null);
    setContentActor(null);
  };

  const reloadLogin = async () => {
    try {
      if (authClient.isAuthenticated() && !(await authClient.getIdentity().getPrincipal().isAnonymous())) {
        updateClient(authClient);
        return authClient;
      }
    } catch (error) {
      console.error("Error reloading login:", error);
    }
    return null;
  };

  return {
    isAuthenticated,
    login,
    logout,
    updateClient,
    authClient,
    identity,
    principal,
    actor,
    contentActor,
    reloadLogin,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthClient();


  if (!auth.authClient || !auth.actor || !auth.contentActor) {
    
    return null;
  }

  return (
    <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
