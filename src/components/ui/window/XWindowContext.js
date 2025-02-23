import { createContext, useContext } from "react";

export const XWindowContext = createContext({
  width: 0,
  height: 0
});

export function useXWindowContext () {
  return useContext(XWindowContext);
}