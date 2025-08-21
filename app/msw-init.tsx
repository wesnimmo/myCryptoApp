"use client";

import { useEffect } from "react";
import "../app/msw"; // relative path to your msw.ts

export function MSWInit() {
  useEffect(() => {
    // msw.ts will run its code automatically on import
  }, []);

  return null; // nothing to render
}
