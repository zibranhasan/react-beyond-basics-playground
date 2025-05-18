import React, {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
} from "react";

export type TThemeContext = {
  dark: boolean;
  setDark: Dispatch<React.SetStateAction<boolean>>;
};

export const ThemeContext = createContext<TThemeContext | undefined>(undefined);

export type TThemeProviderProps = {
  children: ReactNode;
};

const ThemeProvider = ({ children }: TThemeProviderProps) => {
  const [dark, setDark] = useState(false);

  const values = {
    dark,
    setDark,
  };

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};
export default ThemeProvider;
