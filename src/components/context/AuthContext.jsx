import { createContext, useContext, useEffect, useState } from 'react';
import { onUserStateChange, login, logout } from '../../firebase';

const AuthContext = createContext();

export function AuthContextProvider({children}) {
  const [user, setUser] = useState(null);

    useEffect(() => {
        onUserStateChange(user => {
          setUser(user)
        })
      }, []);

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    return useContext(AuthContext)
}