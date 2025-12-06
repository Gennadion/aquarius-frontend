"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface PeriodStoreContextType {
  period: string;
  setPeriod: (period: string) => void;
  resetPeriod: () => void;
}

const PeriodStoreContext = createContext<PeriodStoreContextType | undefined>(undefined);

const STORAGE_KEY = "aquarius-period";
const DEFAULT_PERIOD = "";

interface PeriodStoreProviderProps {
  children: ReactNode;
}

export function PeriodStoreProvider({ children }: PeriodStoreProviderProps) {
  const [period, setPeriodState] = useState<string>(DEFAULT_PERIOD);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPeriodState(stored);
      }
    } catch (error) {
      console.error("Error reading period from localStorage:", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save to localStorage whenever period changes
  useEffect(() => {
    if (isHydrated) {
      try {
        if (period) {
          window.localStorage.setItem(STORAGE_KEY, period);
        } else {
          window.localStorage.removeItem(STORAGE_KEY);
        }
      } catch (error) {
        console.error("Error saving period to localStorage:", error);
      }
    }
  }, [period, isHydrated]);

  const setPeriod = (newPeriod: string) => {
    setPeriodState(newPeriod);
  };

  const resetPeriod = () => {
    setPeriodState(DEFAULT_PERIOD);
  };

  return (
    <PeriodStoreContext.Provider value={{ period, setPeriod, resetPeriod }}>
      {children}
    </PeriodStoreContext.Provider>
  );
}

export function usePeriodStore() {
  const context = useContext(PeriodStoreContext);
  if (context === undefined) {
    throw new Error("usePeriodStore must be used within a PeriodStoreProvider");
  }
  return context;
}

