import { useState, useEffect } from "react";

const MIN_DESKTOP_WIDTH = 1024;

const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleResize = () => setScreenWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenWidth >= MIN_DESKTOP_WIDTH;
};

export default useScreenWidth;
