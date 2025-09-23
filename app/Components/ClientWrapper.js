"use client";

import { useState, useEffect } from "react";
import Loader from "../Components/Preloader";

export default function ClientWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? <Loader /> : children}
    </>
  );
}
