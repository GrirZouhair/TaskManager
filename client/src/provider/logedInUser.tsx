import React, { useState, createContext, useContext } from "react";

// Create a context with a specific type
interface LogedInContext {
  logedIn: string;
  setlogedIN: (value: string) => void;
}

const LogedIn = createContext<LogedInContext | null>(null);

function LogedInUser({ children }: { children: React.ReactNode }) {
  const [logedIn, setlogedIN] = useState<string>("");

  return (
    <LogedIn.Provider
      value={{
        logedIn,
        setlogedIN,
      }}
    >
      {children}
    </LogedIn.Provider>
  );
}

export const useLogedInContext = () => useContext(LogedIn);
export default LogedInUser;
