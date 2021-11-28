import axios from "axios";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import Cookies from 'js-cookie'
type authContextType = {
  user: boolean;
  login: () => void;
  logout: () => void;
};

const authContextDefaultValues: authContextType = {
  user: null,

};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<boolean>(null);


  useEffect(() => checkUserLoggedIn(), []);


  const checkUserLoggedIn = async () => {


    try {
      const res = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {

        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      })


      if (res.data.user) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch (error: any) {
      console.log(error.message)
    }


  };


  const value = {
    user,

  };

  return (
    <>
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    </>
  );
}


