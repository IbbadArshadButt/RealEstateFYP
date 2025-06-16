import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { User, LoginCredentials, RegisterData, AuthResponse } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  register: (userData: RegisterData) => Promise<AuthResponse>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUserData: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, user is not authenticated');
        setLoading(false);
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      console.log('Found token, checking auth...');
      const userData = await authAPI.getCurrentUser();
      console.log('Current user data:', userData);
      
      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
        console.log('User authenticated:', { email: userData.email, role: userData.role });
      } else {
        // Clear auth state if no user data
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      // Clear auth state on error
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      console.log('Login attempt...');
      
      const response = await authAPI.login(credentials);
      console.log('Login response:', response);

      if (response.token && response.user) {
        // First set the token
        localStorage.setItem('token', response.token);
        
        // Then update the state
        setUser(response.user);
        setIsAuthenticated(true);
        
        // Wait for state to be updated
        await new Promise(resolve => setTimeout(resolve, 0));
        
        console.log('Authentication state updated:', { user: response.user, isAuthenticated: true });
      } else {
        console.error('Invalid login response:', response);
        throw new Error('Invalid login response');
      }

      return response;
    } catch (error) {
      console.error('Login failed:', error);
      // Ensure auth state is cleared on error
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      setLoading(true);
      console.log('Registration attempt...');
      const response = await authAPI.register(userData);
      console.log('Registration response:', response);
      
      if (response.token && response.user) {
        localStorage.setItem('token', response.token);
        setUser(response.user);
        setIsAuthenticated(true);
        console.log('Registration successful, auth state updated');
      }

      return response;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log('Logging out...');
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    console.log('User logged out, state cleared');
  };

  const updateUserData = (userData: User) => {
    setUser(userData);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    updateUserData,
  };

  console.log('Current auth state:', value);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 