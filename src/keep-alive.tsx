import React, { createContext, useState } from 'react';

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

export default KeepAlive;
