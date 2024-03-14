import { useState, useEffect } from "react";

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState(null);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;

      if (scrollY < 50) {
        setScrollDirection(null);
        return;
      }

      setScrollDirection(scrollY > lastScrollY ? "down" : "up");
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    const onScroll = () => window.requestAnimationFrame(updateScrollDirection);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDirection]);

  return scrollDirection;
};

export default useScrollDirection;
