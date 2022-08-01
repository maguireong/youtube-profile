import { useLayoutEffect, useState } from "react";

export function useWindowWidth(): number {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  if (size[0] === undefined)
    throw new Error("Window width cannot be undefined");
  return size[0];
}
