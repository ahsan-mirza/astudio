import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User,Product } from '../type';

// Define the type for your context
interface AppContextProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

// Define the type for your state
interface AppState {
User:User[]
Products:Product[]
}

// Create the context
const AppContext = createContext<AppContextProps | undefined>(undefined);

// Create a provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({ User:[], Products:[] });

  return <AppContext.Provider value={{ state, setState }}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
