
import { createContext, useContext } from "react";

export const XSidebarContext = createContext({
  isMini: false, 
  isOpen: false
});

export function useXSidebarContext () {
  return useContext(XSidebarContext);
}