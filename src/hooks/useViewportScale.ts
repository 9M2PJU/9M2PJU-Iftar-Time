import { useEffect, useState } from 'react';

/**
 * Computes a scale factor so the designed content fits within the current viewport
 * without needing scroll, based on a virtual base width/height.
 */
export function useViewportScale(baseWidth = 390, baseHeight = 780) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      if (!vw || !vh) {
        setScale(1);
        return;
      }

      const scaleX = vw / baseWidth;
      const scaleY = vh / baseHeight;

      // Never upscale above 1, only scale down when needed
      const nextScale = Math.min(scaleX, scaleY, 1);
      setScale(nextScale);
    };

    update();
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);

    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, [baseWidth, baseHeight]);

  return scale;
}

