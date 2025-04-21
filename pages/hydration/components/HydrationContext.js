import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a context for hydration
const HydrationContext = createContext();

const HYDRATION_HISTORY_KEY = 'hydration_history';

function getTodayDate() {
  return new Date().toISOString().split('T')[0];

  // temp for testing
  // const twoDaysAgo = new Date();
  // twoDaysAgo.setDate(twoDaysAgo.getDate() - 1);
  // const today = twoDaysAgo.toISOString().split('T')[0];
  // console.log(today);

  // return today;
}

function isWithinNDays(dateString, n) {
  const date = new Date(dateString);
  const today = new Date(getTodayDate());
  const diffTime = today - date; // difference in milliseconds
  const diffDays = diffTime / (1000 * 3600 * 24);
  return diffDays < n;
}

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

export async function updateHydrationHistory(currentHydration, hydrationGoal) {
  try {
    const today = getTodayDate();
    // Calculate percentage (clamping to 100 if necessary)
    const percentage = Math.min((currentHydration / hydrationGoal) * 100, 100);
    const storedHistory = await AsyncStorage.getItem(HYDRATION_HISTORY_KEY);
    let history = storedHistory ? JSON.parse(storedHistory) : {};

    console.log('History before update:', history); //testing

    // Update today’s hydration percentage.
    history[today] = percentage;

    // Filter out days older than 3 days.
    Object.keys(history).forEach((dateStr) => {
      if (!isWithinNDays(dateStr, 3)) {
        delete history[dateStr];
      }
    });

    await AsyncStorage.setItem(HYDRATION_HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error updating hydration history:', error);
  }
}

export async function getThreeDayHydrationAverage() {
  try {
    const storedHistory = await AsyncStorage.getItem(HYDRATION_HISTORY_KEY);
    console.log('Stored history string:', storedHistory);

    const history = storedHistory ? JSON.parse(storedHistory) : {};
    console.log('Parsed history object:', history);

    // Collect values from the past 3 days
    const percentages = Object.keys(history)
      .filter((dateStr) => isWithinNDays(dateStr, 3))
      .map((dateStr) => history[dateStr]);

    console.log('Valid percentages from the past 3 days:', percentages); //testing

    if (percentages.length === 0) return 0;

    // Calculate average percentage
    const sum = percentages.reduce((acc, cur) => acc + cur, 0);
    const average = sum / percentages.length;
    console.log('Calculated three-day hydration average:', average); //testing
    return average;
  } catch (error) {
    console.error('Error retrieving hydration history:', error);
    return 0;
  }
}
