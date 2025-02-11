import {createContext, useContext} from "react";


export const  ThemeContext = createContext(null);

export function useThemeContext() {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error('useThemeContext must be used with a ThemeContext');
    }

    return context;
}