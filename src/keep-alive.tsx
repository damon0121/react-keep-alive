import React, { createContext, useContext, useState } from 'react';
import { matchPath, useLocation, useOutlet } from 'react-router-dom';

type KeepElementType = React.RefObject<{ [key: string]: React.ReactNode }>;

interface KeepAliveContextType {
  keepElements: KeepElementType;
  needKeepAlivePaths: string[];
  clearKeepElements: () => void;
  clearKeepElementByPath: (path: string) => void;
}

export const KeepAliveContext = createContext<KeepAliveContextType>({
  keepElements: { current: {} },
  needKeepAlivePaths: [],
  clearKeepElements: () => {},
  clearKeepElementByPath: (path: string) => {},
});

const KeepAlive: React.FC<{
  children: React.ReactNode;
  needKeepAlivePaths: string[];
}> = ({ children, needKeepAlivePaths }) => {
  const keepElements = React.useRef<{ [key: string]: React.ReactNode }>({});
  const [, forceUpdate] = useState([]);
  const value = {
    keepElements,
    needKeepAlivePaths,
    clearKeepElements: () => {
      keepElements.current = {};
      forceUpdate([]);
    },
    clearKeepElementByPath: (path: string) => {
      delete keepElements.current[path];
      forceUpdate([]);
    },
  };

  return (
    <KeepAliveContext.Provider value={value}>
      {children}
    </KeepAliveContext.Provider>
  );
};

export const KeepAliveOutlet = () => {
  const { keepElements, needKeepAlivePaths } = useContext(KeepAliveContext);
  const location = useLocation();
  const outlet = useOutlet();
  const needKeep = needKeepAlivePaths.some((path) =>
    matchPath(path, location.pathname)
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
            hidden={!matchPath(pathname, location.pathname)}
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

export default KeepAlive;
