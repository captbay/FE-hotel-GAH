"use client";
import { useEffect, useState } from "react";

const withHydration = (WrappedComponent) => {
  return () => {
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
      // Wait till Next.js rehydration completes
      setIsHydrated(true);
    }, []);

    return (
      <>
        {isHydrated ? (
          <div>
            <WrappedComponent />
          </div>
        ) : null}
      </>
    );
  };
};

export default withHydration;
