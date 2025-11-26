import { useCallback, useEffect, useState } from 'react';

const BREAKPOINT = {
  mobileMax: 639,
  tabletMax: 767,
};

type UseResponsiveValueParams<T> = {
  mobile: T;
  tablet?: T;
  desktop: T;
  throttleMs?: number;
};

export function useResponsiveValue<T>({
  mobile,
  tablet,
  desktop,
  throttleMs = 100,
}: UseResponsiveValueParams<T>) {
  const getValue = useCallback(() => {
    const width = window.innerWidth;

    if (width <= BREAKPOINT.mobileMax) {
      return mobile;
    }
    if (tablet !== undefined && width <= BREAKPOINT.tabletMax) {
      return tablet;
    }
    return desktop;
  }, [mobile, tablet, desktop]);

  const [value, setValue] = useState<T>(getValue);

  useEffect(() => {
    const calcValue = () => {
      setValue(getValue());
    };

    let timeoutId: number | null = null;

    const handleResize = () => {
      if (timeoutId !== null) {
        return;
      }

      timeoutId = window.setTimeout(() => {
        calcValue();
        timeoutId = null;
      }, throttleMs);
    };

    calcValue();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [getValue, throttleMs]);

  return value;
}
