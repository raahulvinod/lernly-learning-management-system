import React, {
  createContext,
  useContext,
  ReactNode,
  ReactElement,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

type OpenContextType = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const OpenContext = createContext<OpenContextType | undefined>(
  undefined
);

export function useOpen() {
  const context = useContext(OpenContext);
  if (!context) {
    throw new Error('useOpen must be used within an OpenProvider');
  }
  return context;
}

type OpenProviderProps = {
  children: ReactNode;
};

export function OpenProvider({ children }: OpenProviderProps): ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <OpenContext.Provider value={{ setOpen }}>{children}</OpenContext.Provider>
  );
}
