import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  guardianContacts: GuardianContact[];
  isAuthenticated: boolean;
}

interface GuardianContact {
  id: string;
  name: string;
  phone: string;
  email: string;
  relationship: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User>) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth on load
    const savedUser = localStorage.getItem('safetyApp_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    const mockUser: User = {
      id: '1',
      name: 'Sarah Johnson',
      email: email,
      phone: '+1 (555) 123-4567',
      guardianContacts: [
        {
          id: '1',
          name: 'John Johnson',
          phone: '+1 (555) 987-6543',
          email: 'john@example.com',
          relationship: 'Husband'
        },
        {
          id: '2',
          name: 'Emily Johnson',
          phone: '+1 (555) 456-7890',
          email: 'emily@example.com',
          relationship: 'Sister'
        }
      ],
      isAuthenticated: true
    };

    setUser(mockUser);
    localStorage.setItem('safetyApp_user', JSON.stringify(mockUser));
    setIsLoading(false);
    return true;
  };

  const register = async (userData: Partial<User>): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      guardianContacts: [],
      isAuthenticated: true
    };

    setUser(newUser);
    localStorage.setItem('safetyApp_user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('safetyApp_user');
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('safetyApp_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateProfile,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export type { User, GuardianContact };