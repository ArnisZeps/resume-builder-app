import { useEffect, useRef, useCallback } from 'react';
import { UseFormWatch } from 'react-hook-form';

export function useDebouncedFormSync<T extends Record<string, unknown>>(
  watch: UseFormWatch<T>,
  onSync: (values: T) => void,
  delay: number = 300,
  enabled: boolean = true
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstRender = useRef(true);

  const debouncedSync = useCallback((values: T) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onSync(values);
    }, delay);
  }, [onSync, delay]);

  useEffect(() => {
    if (!enabled) {
      isFirstRender.current = true;
      return;
    }

    const subscription = watch((values) => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      
      debouncedSync(values as T);
    });

    return () => {
      subscription.unsubscribe();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [watch, debouncedSync, enabled]);
}
