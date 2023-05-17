import { useEffect, useRef } from 'react';

export default function useEventListener(eventType, callback, element, isActive) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!isActive) return;
    const handler = (e) => callbackRef.current(e);
    element = element || window;
    element.addEventListener(eventType, handler, { passive: true });

    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element, isActive]);
}
