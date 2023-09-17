import { useEffect, useRef } from "react";

const useSkipFirstEffect = (callback, dependencies) => {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    } else {
      callback();
    }
  }, [callback, ...dependencies]);
};

export default useSkipFirstEffect;