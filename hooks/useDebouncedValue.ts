import { useEffect, useState } from 'react';

export function useDebouncedValue<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    // clearTimeout() only gets called if user types another
    // ...character before the 300ms time limit...otherwise it does NOT
    // ...get called
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
