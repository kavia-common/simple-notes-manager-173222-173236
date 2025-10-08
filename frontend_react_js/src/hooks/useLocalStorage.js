import { useEffect, useRef, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * useLocalStorage - Persist React state to localStorage with JSON serialization.
 * @param {string} key localStorage key
 * @param {any} initialValue default value if not found
 * @returns {[any, Function]} value and setter
 */
export default function useLocalStorage(key, initialValue) {
  const isFirst = useRef(true);
  const [state, setState] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw != null ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    try {
      const raw = JSON.stringify(state);
      window.localStorage.setItem(key, raw);
    } catch {
      // ignore
    }
  }, [key, state]);

  return [state, setState];
}
