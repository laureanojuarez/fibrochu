import { createContext, useContext, useEffect, useState } from "react";
import LoadingPage from "../pages/LoadingPage";
import { supabase } from "../supabase/client";

const SessionContext = createContext({
  session: null,
});

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStateListener = supabase.auth.onAuthStateChange((_, session) => {
      console.log("Auth state changed:", session);
      setSession(session);
      setIsLoading(false);
    });

    return () => {
      authStateListener.data.subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider value={{ session }}>
      {isLoading ? <LoadingPage /> : children}
    </SessionContext.Provider>
  );
};
