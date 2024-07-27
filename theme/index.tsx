// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import { darkColors, lightColors } from './colors';

export const toastColors = (colors) => {
    return {
        success: {
            bg: colors.background.nav,
            border: colors.success.main,
            t1_color: colors.success.dark,
            t2_color: colors.text.primary
        },
        error: {
            bg: colors.background.nav,
            border: colors.error.main,
            t1_color: colors.error.dark,
            t2_color: colors.text.primary
        },
        info: {
            bg: colors.background.nav,
            border: colors.info.main,
            t1_color: colors.info.dark,
            t2_color: colors.text.primary
        }
    }
}

export const ThemeContext = React.createContext({
    isDark: false,
    colors: darkColors,
    setScheme: (scheme) => { },
    toastColors: toastColors(darkColors)
});

export const ThemeProvider = (props) => {
    // Getting the device color theme, this will also work with react-native-web
    const colorScheme = Appearance.getColorScheme(); // Can be dark | light | no-preference

    /*
    * To enable changing the app theme dynamicly in the app (run-time)
    * we're gonna use useState so we can override the default device theme
    */
    const [isDark, setIsDark] = React.useState(colorScheme === "dark");

    // Listening to changes of device appearance while in run-time
    React.useEffect(() => {
        setIsDark(colorScheme === "dark");
    }, [colorScheme]);



    const defaultTheme = {
        isDark,
        // Chaning color schemes according to theme
        colors: isDark ? darkColors : lightColors,
        // Toast colors for the theme
        toastColors: toastColors(isDark ? darkColors : lightColors),
        // Overrides the isDark value will cause re-render inside the context.  
        setScheme: (scheme) => setIsDark(scheme === "dark"),
    };

    return (
        <ThemeContext.Provider value={defaultTheme}>
            {props.children}
        </ThemeContext.Provider>
    );
};

// Custom hook to get the theme object returns {isDark, colors, setScheme}
export const useTheme = () => React.useContext(ThemeContext);