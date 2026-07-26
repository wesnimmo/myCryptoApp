import { useState, useEffect } from 'react';

function getStorageValue<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') {
    // SSR-safe: localStorage is not available
    return defaultValue;
  }
  const raw = localStorage.getItem(key);
  if (raw === null) return defaultValue;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return defaultValue;
  }
}

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>, boolean] {
  const [value, setValue] = useState<T>(defaultValue);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Load from localStorage after hydration
    setValue(getStorageValue(key, defaultValue));
    setIsReady(true);
  }, [key, defaultValue]);

  useEffect(() => {
    if (isReady) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value, isReady]);

  //Local storage syncing issue:
  // Return isReady here only so caller can avoid rendering until synced but outside TanStack will handle all api isLoading states
  return [value, setValue, isReady];
}
