import axios from "axios";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import Cookies from 'js-cookie'
type authContextType = {
  user: Object | null;
  errors: any[];
  login: (email: string, password: string) => number | null;
  signup: (email: string, password: string) => number | null;
  logout: () => void;

};

const authContextDefaultValues: authContextType = {
  user: null,
  errors: [],
  login: () => null,
  signup: () => null,
  logout: () => { },
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<object | null>(null);
  const [errors, setErrors] = useState<any[]>([])

  useEffect(() => checkUserLoggedIn(), []);


  const checkUserLoggedIn = async () => {


    try {
      const res = await axios.get('/api/users/currentuser', {
        withCredentials: true,

      })


      if (res.data.user) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch (err: any) {
      setErrors(err.response.data.errors)
    }
  };



  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post('/api/users/signin', {
        headers: { 'Content-Type': 'application/json' },
        email,
        password

      })

      setUser(res.data.user)


      return res.status
    } catch (err: any) {
      setErrors(err.response.data.errors)
    }



  }


  const signup = async (email: string, password: string) => {
    try {
      const res = await axios.post('/api/users/signup', {
        headers: { 'Content-Type': 'application/json' },
        email,
        password

      })

      setUser(res.data.user)
      return res.status
    } catch (err: any) {
      setErrors(err.response.data.errors)
    }



  }



  const logout = async () => {
    try {
      const res = await axios.post('/api/users/signout', {
        withCredentials: true,
      })
      setUser(null);
    } catch (err: any) {
      setErrors(err.response.data.errors)
    }
  }

  const value = {
    user,
    login,
    logout,
    signup,
    errors
  };

  return (
    <>
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    </>
  );
}


