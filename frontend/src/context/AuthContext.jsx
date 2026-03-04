import { createContext,useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{

  const stored = JSON.parse(localStorage.getItem("userInfo"));

  const [user,setUser] = useState(
    stored ? stored.user : null   // ⭐ FIX
  );

  return (
    <AuthContext.Provider value={{user,setUser}}>
      {children}
    </AuthContext.Provider>
  );
};