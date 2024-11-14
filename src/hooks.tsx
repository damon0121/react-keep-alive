import { useContext, useEffect, useState } from "react";
import { matchPath, useLocation, useOutlet } from "react-router";
import { KeepAliveContext } from "./keep-alive";

export function useOnBack(onBack?: () => void) {
  const location = useLocation();
  const [pathname] = useState(location.pathname);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (mounted && pathname === location.pathname) {
      onBack?.();
    }
  }, [location.pathname]);
}

export const useKeepAliveTargetPaths = (targetPaths: string[]) => {
  const { clearKeepElementByPath } = useContext(KeepAliveContext);
  const location = useLocation();
  const [pathname] = useState(location.pathname);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (mounted && pathname !== location.pathname) {
      const matched = targetPaths.some((path) => {
        const match = matchPath(path, location.pathname);
        return match;
      });
      if (!matched) {
        clearKeepElementByPath(pathname);
      }
    }
  }, [location.pathname]);
};