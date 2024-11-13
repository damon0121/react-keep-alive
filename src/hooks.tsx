import { useContext, useEffect, useState } from "react";
import { matchPath, useLocation, useOutlet } from "react-router";
import { KeepAliveContext } from "./keep-alive";

export const useKeepAliveOutlet = () => {
  const { keepElements, needKeepAlivePaths } = useContext(KeepAliveContext);
  const location = useLocation();
  const outlet = useOutlet();
  const needKeep = needKeepAlivePaths.some(
    (path) => location.pathname === path
  );

  if (needKeep && keepElements.current) {
    keepElements.current[location.pathname] = outlet;
  }
  return (
    <>
      {Object.entries(keepElements.current || {}).map(([pathname, element]) => {
        return (
          <div
            className='keep-alive-container'
            key={pathname}
            id={pathname}
            hidden={!matchPath(location.pathname, pathname)}
          >
            {element}
          </div>
        );
      })}
      <div className='keep-alive-container' key={'nokeep'} hidden={needKeep}>
        {!needKeep && outlet}
      </div>
    </>
  );
};

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