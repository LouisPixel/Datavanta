"use client";

export const useTheme = () => {
    // Default to light theme since theme switching is not used
    const theme: 'light' | 'dark' = 'light';

    const toggleTheme = () => {
        // No-op since theme switching is disabled
    };

    const getThemeClasses = () => {
        // Always return light theme classes
        return {
            bg: 'bg-background',
            text: 'text-foreground',
            border: 'border-border',
            hoverBg: 'hover:bg-gray-100',
            activeBg: 'active:bg-gray-200',
            ring: 'focus:ring-blue-500',
            fill: 'fill-gray-900',
            stroke: 'stroke-gray-900',
            buttonPrimary: 'bg-blue-500 hover:bg-blue-600 text-white',
        };
    };

    return { theme, toggleTheme, getThemeClasses };
};
