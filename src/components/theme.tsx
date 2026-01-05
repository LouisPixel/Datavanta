"use client";

import { useTheme as useNextTheme } from 'next-themes';

// No longer creating a separate context here

export const useTheme = () => {
    const { theme, setTheme } = useNextTheme();

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const getThemeClasses = () => {
        const isDark = theme === 'dark';
        return {
            bg: 'bg-background',
            text: 'text-foreground',
            border: 'border-border',
            hoverBg: isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100',
            activeBg: isDark ? 'active:bg-gray-600' : 'active:bg-gray-200',
            ring: 'focus:ring-blue-500',
            fill: isDark ? 'fill-gray-100' : 'fill-gray-900',
            stroke: isDark ? 'stroke-gray-100' : 'stroke-gray-900',
            buttonPrimary: isDark ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white',
        };
    };

    return { theme: theme as 'light' | 'dark', toggleTheme, getThemeClasses };
};

// Custom ThemeProvider is no longer needed as next-themes provides it globally
