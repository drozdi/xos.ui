import { createContext, useContext } from "react";

export const XLayoutContext = createContext(null);

export function useXLayoutContext () {
  const context = useContext(XLayoutContext);

  /*if (!context) {
    throw new Error("XLayoutContext should be used within the XLayoutContext provider!");
  }*/

  return context;
}