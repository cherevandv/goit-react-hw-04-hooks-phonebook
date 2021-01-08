import { useState, useEffect } from 'react';

export default function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    const data = window.localStorage.getItem(key);
    const parsedData = JSON.parse(data);
    return data === null || parsedData.length === 0
      ? [...initialValue]
      : parsedData;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
