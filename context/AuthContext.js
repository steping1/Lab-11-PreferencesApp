import React, { createContext, useContext, useState, useEffect } from 'react'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('user').then(stored => {
      if (stored) {
        setUser(JSON.parse(stored)); 
      }
    });
  }, []); 

  useEffect(() => {
    if (user) {
      AsyncStorage.setItem('user', JSON.stringify(user)); 
    } else {
      AsyncStorage.removeItem('user'); 
    }
  }, [user]); 

  const login = (username) => setUser({ username });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext); 
  
  if (context === undefined) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  
  return context; 
}