import React, { createContext, useContext, useState } from 'react';

// Create a context for hydration
const HydrationContext = createContext();

// Hydration provider component
export const HydrationProvider = ({ children }) => {
  const [currentHydration, setCurrentHydration] = useState(0);
  const [hydrationGoal, setHydrationGoal] = useState(2000); // Example goal in mL

  return (
    <HydrationContext.Provider
      value={{
        currentHydration,
        setCurrentHydration,
        hydrationGoal,
        setHydrationGoal,
      }}
    >
      {children}
    </HydrationContext.Provider>
  );
};

// Custom hook to access hydration context
export const useHydration = () => {
  return useContext(HydrationContext);
};
