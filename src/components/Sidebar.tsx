import React from 'react';
import Image from 'next/image';
import { BarChart3, Settings, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoImage from '@/assets/images/datavanta logo.png';
import { useTheme } from '@/components/theme'; // Assuming theme.tsx is in the same components directory
import { Project } from '@/interfaces/data';

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>;
    setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
    setIsViewingProject?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = ({
    sidebarOpen,
    setSidebarOpen,
    setSelectedProject,
    setShowSettings,
    setIsViewingProject
}) => {
    const { getThemeClasses } = useTheme();
    const themeClasses = getThemeClasses();

    return (
        <div className={`fixed inset-y-0 left-0 z-50 w-64 ${themeClasses.bg} border-r ${themeClasses.border} transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
            <div className={`flex items-center justify-between h-16 px-4 border-b ${themeClasses.border}`}>
                <div className="flex items-center space-x-3">
                    <div>
                        <Image src={logoImage} alt="Datavanta logo" className="h-16 m:h-auto w-auto" />
                    </div>
                </div>
                <Button
                    onClick={() => setSidebarOpen(false)}
                    variant="ghost"
                    className={`lg:hidden ${themeClasses.text} hover:${themeClasses.hoverBg}`}
                >
                    <X size={20} />
                </Button>
            </div>
            
            <nav className="mt-8 px-4 space-y-2">
                <div className={`${themeClasses.text} text-xs uppercase tracking-wider font-semibold mb-4`}>
                    Navigation
                </div>
                <Button
                    onClick={() => {
                        setSelectedProject(null);
                        setShowSettings(false);
                        setIsViewingProject?.(false);
                        setSidebarOpen(false);
                    }}
                    variant="ghost"
                    className={`w-full justify-start ${themeClasses.text} hover:${themeClasses.hoverBg} hover:${themeClasses.text}`}
                >
                    <BarChart3 size={18} className="mr-3" />
                    <span>Dashboard</span>
                </Button>
                <Button 
                    onClick={() => {
                        setShowSettings(true);
                        setIsViewingProject?.(false);
                        setSidebarOpen(false);
                    }}
                    variant="ghost" 
                    className={`w-full justify-start ${themeClasses.text} hover:${themeClasses.hoverBg} hover:${themeClasses.text}`}
                >
                    <Settings size={18} className="mr-3" />
                    <span>Settings</span>
                </Button>
            </nav>

        </div>
    );
};





