export interface DataPoint {
    id: string;
    label: string;
    value: number;
    value2?: number; // Added for stacked charts
    color?: string; // Optional color for the data point
}

export interface Project {
    id: string;
    userId: string;
    name: string;
    description: string;
    data: DataPoint[];
    chartType: 'bar' | 'bar-horizontal' | 'line' | 'line-dots' | 'line-step' | 'pie' | 'donut' | 'area' | 'area-step' | 'area-gradient' | 'stacked-bar' | 'stacked-area' | 'stacked-line' | 'stacked-line-dots' | 'radial' | 'radar' | 'radar-lines' | 'radar-dots' | 'scatter' | 'heatmap';
    chartColor: string;
    chartColor2?: string;
    backgroundColor: string;
    gridColor: string;
    textColor: string;
    chartHeight: number; // Height in pixels
    chartWidth: number; // Width in pixels
    showLegend?: boolean; // Show/hide legend
    legendLabel?: string; // Custom legend label
    legendLabel2?: string; // Custom legend label for second value in stacked charts
    showXAxis?: boolean; // Show/hide X axis
    showYAxis?: boolean; // Show/hide Y axis
    xAxisLabel?: string; // Label for X axis
    yAxisLabel?: string; // Label for Y axis
    yAxisMin?: number; // Minimum value for Y axis
    yAxisMax?: number; // Maximum value for Y axis
    showLabels?: boolean; // Show/hide data point labels
    lastModified: string;
}

export interface DashboardProps {
    onSignOut?: () => void;
    user?: { // Add the user prop here
        id: string;
        name?: string | null;
        email?: string | null;
        emailVerified?: boolean | null;
        image?: string | null;
        createdAt: Date;
        updatedAt: Date;
    };
    isLoading: boolean;
    isAuthenticated: boolean;
}
