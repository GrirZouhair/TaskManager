import React from "react";

const LogedIn = React.createContext();

function LogedInUser({ children }: any) {
  const [logedIn, setlogedIN] = React.useState<String>("");
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

export const useLogedInContext = () => React.useContext(LogedIn);
export default LogedInUser;
