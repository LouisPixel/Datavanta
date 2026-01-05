import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { PlusCircle, BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, AreaChart as AreaChartIcon, Trash2, Edit, Save, X, Settings as SettingsIcon, Palette, Grid, Type, PanelLeft, User, TrendingUp, BarChart2, ArrowLeft, Database, Import, Activity } from 'lucide-react';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataPoint, Project, DashboardProps } from '@/interfaces/data';
import { useTheme } from '@/components/theme';
import { Sidebar } from '@/components/Sidebar';
import { createProject, deleteProject, addDataPoint, updateChartType, updateProjectStyling, updateProjectDetails, addMultipleDataPoints, handlePasteData, removeDataPoint, updateDataPointColor } from '@/utils/project-management';
import { 
  BarChart, 
  BarChartHorizontal,
  LineChart, 
  LineDotsChart,
  LineStepChart,
  PieChart,
  DonutChart, 
  AreaChart,
  AreaStepChart,
  AreaGradientChart,
  StackedBarChart, 
  StackedAreaChart, 
  StackedLineChart,
  StackedLineDotsChart,
  RadialChart,
  RadarChart,
  RadarLinesChart,
  RadarDotsChart
} from '@/components/charts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const COLORS = ['#9B99FE', '#2BC8B7', '#FFC107', '#FF5722', '#673AB7'];

interface ChartCategory {
    name: string;
    charts: Array<{ type: Project['chartType']; label: string; icon: React.ElementType }>;
}

const chartCategories: ChartCategory[] = [
    {
        name: 'Bar Charts',
        charts: [
            { type: 'bar', label: 'Vertical Bar', icon: BarChart3 },
            { type: 'bar-horizontal', label: 'Horizontal Bar', icon: BarChart2 },
            { type: 'stacked-bar', label: 'Stacked Bar', icon: BarChart3 },
        ],
    },
    {
        name: 'Line Charts',
        charts: [
            { type: 'line', label: 'Linear', icon: LineChartIcon },
            { type: 'line-dots', label: 'With Dots', icon: TrendingUp },
            { type: 'line-step', label: 'Step', icon: LineChartIcon },
            { type: 'stacked-line', label: 'Stacked Line', icon: LineChartIcon },
            { type: 'stacked-line-dots', label: 'Stacked Line with Dots', icon: LineChartIcon },
        ],
    },
    {
        name: 'Area Charts',
        charts: [
            { type: 'area', label: 'Linear', icon: AreaChartIcon },
            { type: 'area-step', label: 'Step', icon: AreaChartIcon },
            { type: 'area-gradient', label: 'Gradient', icon: AreaChartIcon },
            { type: 'stacked-area', label: 'Stacked Area', icon: AreaChartIcon },
        ],
    },
    {
        name: 'Pie Charts',
        charts: [
            { type: 'pie', label: 'Pie Chart', icon: PieChartIcon },
            { type: 'donut', label: 'Donut Chart', icon: PieChartIcon },
        ],
    },
    {
        name: 'Radar Charts',
        charts: [
            { type: 'radar', label: 'Radar', icon: Activity },
            { type: 'radar-lines', label: 'Radar Lines', icon: Activity },
            { type: 'radar-dots', label: 'Radar Dots', icon: Activity },
        ],
    },
    {
        name: 'Radial Charts',
        charts: [
            { type: 'radial', label: 'Radial Bar', icon: PieChartIcon },
        ],
    },
];

const isStackedChart = (chartType: Project['chartType']): boolean => {
    return ['stacked-bar', 'stacked-area', 'stacked-line', 'stacked-line-dots'].includes(chartType);
};


type ChartDataItem = {
    label: string;
    value: number;
    value2?: number;
    color?: string;
};

const renderChart = ({ project, chartRef, chartData, valueFormatter }: { project: Project; chartRef: React.RefObject<HTMLDivElement>; chartData: ChartDataItem[]; valueFormatter: (number: number) => string }) => {
    const chartHeight = project.chartHeight || 400;
    const chartWidth = project.chartWidth || 1170;
    const showLegend = project.showLegend ?? false;
    const legendLabel = project.legendLabel || 'Value';
    const legendLabel2 = project.legendLabel2 || 'Value 2';
    const showXAxis = project.showXAxis !== false;
    const showYAxis = project.showYAxis !== false;
    const xAxisLabel = project.xAxisLabel;
    const yAxisLabel = project.yAxisLabel;
    const yAxisMin = project.yAxisMin;
    const yAxisMax = project.yAxisMax;
    const showLabels = project.showLabels ?? false;
    
    return (
        <div ref={chartRef} style={{ width: `${chartWidth}px`, height: `${chartHeight}px` }}>
            {(() => {
                switch (project.chartType) {
                    case 'bar':
                        return <BarChart data={chartData as ({ label: string; value: number; })[]} categories={['value']} index="label" colors={[project.chartColor]} chartColor={project.chartColor} backgroundColor={project.backgroundColor} gridColor={project.gridColor} textColor={project.textColor} valueFormatter={valueFormatter} showLegend={showLegend} legendLabel={legendLabel} showXAxis={showXAxis} showYAxis={showYAxis} xAxisLabel={xAxisLabel} yAxisLabel={yAxisLabel} yAxisMin={yAxisMin} yAxisMax={yAxisMax} showLabels={showLabels} mt="h-full" />;
                    case 'bar-horizontal':
                        return <BarChartHorizontal data={chartData as ({ label: string; value: number; })[]} categories={['value']} index="label" colors={[project.chartColor]} chartColor={project.chartColor} backgroundColor={project.backgroundColor} gridColor={project.gridColor} textColor={project.textColor} valueFormatter={valueFormatter} showLegend={showLegend} legendLabel={legendLabel} showXAxis={showXAxis} showYAxis={showYAxis} xAxisLabel={xAxisLabel} yAxisLabel={yAxisLabel} yAxisMin={yAxisMin} yAxisMax={yAxisMax} showLabels={showLabels} mt="h-full" />;
                    case 'stacked-bar':
                        return <StackedBarChart data={chartData as ({ label: string; value: number; value2: number; })[]} categories={['value', 'value2']} index="label" colors={[project.chartColor, project.chartColor2 || COLORS[1]]} chartColor={project.chartColor} chartColor2={project.chartColor2 || COLORS[1]} backgroundColor={project.backgroundColor} gridColor={project.gridColor} textColor={project.textColor} valueFormatter={valueFormatter} showLegend={showLegend} legendLabel={legendLabel} legendLabel2={legendLabel2} showXAxis={showXAxis} showYAxis={showYAxis} xAxisLabel={xAxisLabel} yAxisLabel={yAxisLabel} yAxisMin={yAxisMin} yAxisMax={yAxisMax} showLabels={showLabels} mt="h-full" />;
                    case 'line':
                        return <LineChart data={chartData as ({ label: string; value: number; })[]} categories={['value']} index="label" colors={[project.chartColor]} chartColor={project.chartColor} backgroundColor={project.backgroundColor} gridColor={project.gridColor} textColor={project.textColor} valueFormatter={valueFormatter} showLegend={showLegend} legendLabel={legendLabel} showXAxis={showXAxis} showYAxis={showYAxis} xAxisLabel={xAxisLabel} yAxisLabel={yAxisLabel} yAxisMin={yAxisMin} yAxisMax={yAxisMax} showLabels={showLabels} mt="h-full" />;
                    case 'line-dots':
                        return <LineDotsChart data={chartData as ({ label: string; value: number; })[]} categories={['value']} index="label" colors={[project.chartColor]} chartColor={project.chartColor} backgroundColor={project.backgroundColor} gridColor={project.gridColor} textColor={project.textColor} valueFormatter={valueFormatter} showLegend={showLegend} legendLabel={legendLabel} showXAxis={showXAxis} showYAxis={showYAxis} xAxisLabel={xAxisLabel} yAxisLabel={yAxisLabel} yAxisMin={yAxisMin} yAxisMax={yAxisMax} showLabels={showLabels} mt="h-full" />;
                    case 'line-step':
                        return <LineStepChart data={chartData as ({ label: string; value: number; })[]} categories={['value']} index="label" colors={[project.chartColor]} chartColor={project.chartColor} backgroundColor={project.backgroundColor} gridColor={project.gridColor} textColor={project.textColor} valueFormatter={valueFormatter} showLegend={showLegend} legendLabel={legendLabel} showXAxis={showXAxis} showYAxis={showYAxis} xAxisLabel={xAxisLabel} yAxisLabel={yAxisLabel} yAxisMin={yAxisMin} yAxisMax={yAxisMax} showLabels={showLabels} mt="h-full" />;
                    case 'stacked-line':
                        return <StackedLineChart data={chartData as ({ label: string; value: number; value2: number; })[]} categories={['value', 'value2']} index="label" colors={[project.chartColor, project.chartColor2 || COLORS[1]]} chartColor={project.chartColor} chartColor2={project.chartColor2 || COLORS[1]} backgroundColor={project.backgroundColor} gridColor={project.gridColor} textColor={project.textColor} valueFormatter={valueFormatter} showLegend={showLegend} legendLabel={legendLabel} legendLabel2={legendLabel2} showXAxis={showXAxis} showYAxis={showYAxis} xAxisLabel={xAxisLabel} yAxisLabel={yAxisLabel} yAxisMin={yAxisMin} yAxisMax={yAxisMax} showLabels={showLabels} mt="h-full" />;
                    case 'stacked-line-dots':
                        return <StackedLineDotsChart data={chartData as ({ label: string; value: number; value2: number; })[]} categories={['value', 'value2']} index="label" colors={[project.chartColor, project.chartColor2 || COLORS[1]]} chartColor={project.chartColor} chartColor2={project.chartColor2 || COLORS[1]} backgroundColor={project.backgroundColor} gridColor={project.gridColor} textColor={project.textColor} valueFormatter={valueFormatter} showLegend={showLegend} legendLabel={legendLabel} legendLabel2={legendLabel2} showXAxis={showXAxis} showYAxis={showYAxis} xAxisLabel={xAxisLabel} yAxisLabel={yAxisLabel} yAxisMin={yAxisMin} yAxisMax={yAxisMax} showLabels={showLabels} mt="h-full" />;
                    case 'area':
                        return <AreaChart data={chartData as ({ label: string; value: number; })[]} categories={['value']} index="label" colors={[project.chartColor]} chartColor={project.chartColor} backgroundColor={project.backgroundColor} gridColor={project.gridColor} textColor={project.textColor} valueFormatter={valueFormatter} showLegend={showLegend} legendLabel={legendLabel} showXAxis={showXAxis} showYAxis={showYAxis} xAxisLabel={xAxisLabel} yAxisLabel={yAxisLabel} yAxisMin={yAxisMin} yAxisMax={yAxisMax} showLabels={showLabels} mt="h-full" />;
                    case 'area-step':
                        return <AreaStepChart data={chartData as ({ label: string; value: number; })[]} categories={['value']} index="label" colors={[project.chartColor]} chartColor={project.chartColor} backgroundColor={project.backgroundColor} gridColor={project.gridColor} textColor={project.textColor} valueFormatter={valueFormatter} showLegend={showLegend} legendLabel={legendLabel} showXAxis={showXAxis} showYAxis={showYAxis} xAxisLabel={xAxisLabel} yAxisLabel={yAxisLabel} yAxisMin={yAxisMin} yAxisMax={yAxisMax} showLabels={showLabels} mt="h-full" />;
                    case 'area-gradient':
                        return <AreaGradientChart data={chartData as ({ label: string; value: number; })[]} categories={['value']} index="label" colors={[project.chartColor]} chartColor={project.chartColor} backgroundColor={project.backgroundColor} gridColor={project.gridColor} textColor={project.textColor} valueFormatter={valueFormatter} showLegend={showLegend} legendLabel={legendLabel} showXAxis={showXAxis} showYAxis={showYAxis} xAxisLabel={xAxisLabel} yAxisLabel={yAxisLabel} yAxisMin={yAxisMin} yAxisMax={yAxisMax} showLabels={showLabels} mt="h-full" />;
                    case 'stacked-area':
                        return <StackedAreaChart data={chartData as ({ label: string; value: number; value2: number; })[]} categories={['value', 'value2']} index="label" colors={[project.chartColor, project.chartColor2 || COLORS[1]]} chartColor={project.chartColor} chartColor2={project.chartColor2 || COLORS[1]} backgroundColor={project.backgroundColor} gridColor={project.gridColor} textColor={project.textColor} valueFormatter={valueFormatter} showLegend={showLegend} legendLabel={legendLabel} legendLabel2={legendLabel2} showXAxis={showXAxis} showYAxis={showYAxis} xAxisLabel={xAxisLabel} yAxisLabel={yAxisLabel} yAxisMin={yAxisMin} yAxisMax={yAxisMax} showLabels={showLabels} mt="h-full" />;
                    case 'pie':
                        return <PieChart data={chartData as ({ label: string; value: number; })[]} category="value" index="label" colors={[project.chartColor]} chartColor={project.chartColor} backgroundColor={project.backgroundColor} textColor={project.textColor} valueFormatter={valueFormatter} showLegend={showLegend} legendLabel={legendLabel} mt="h-full" />;
                    case 'donut':
                        return <DonutChart data={chartData as ({ label: string; value: number; })[]} category="value" index="label" colors={[project.chartColor]} chartColor={project.chartColor} backgroundColor={project.backgroundColor} textColor={project.textColor} valueFormatter={valueFormatter} showLegend={showLegend} legendLabel={legendLabel} mt="h-full" />;
                    case 'radial':
                        return <RadialChart data={chartData as ({ label: string; value: number; })[]} category="value" index="label" colors={[project.chartColor]} chartColor={project.chartColor} backgroundColor={project.backgroundColor} gridColor={project.gridColor} textColor={project.textColor} valueFormatter={valueFormatter} showLegend={showLegend} legendLabel={legendLabel} mt="h-full" />;
                    case 'radar':
                        return <RadarChart data={chartData as ({ label: string; value: number; })[]} categories={['value']} index="label" colors={[project.chartColor]} chartColor={project.chartColor} backgroundColor={project.backgroundColor} gridColor={project.gridColor} textColor={project.textColor} valueFormatter={valueFormatter} showLegend={showLegend} legendLabel={legendLabel} mt="h-full" />;
                    case 'radar-lines':
                        return <RadarLinesChart data={chartData as ({ label: string; value: number; })[]} categories={['value']} index="label" colors={[project.chartColor]} chartColor={project.chartColor} backgroundColor={project.backgroundColor} gridColor={project.gridColor} textColor={project.textColor} valueFormatter={valueFormatter} showLegend={showLegend} legendLabel={legendLabel} mt="h-full" />;
                    case 'radar-dots':
                        return <RadarDotsChart data={chartData as ({ label: string; value: number; })[]} categories={['value']} index="label" colors={[project.chartColor]} chartColor={project.chartColor} backgroundColor={project.backgroundColor} gridColor={project.gridColor} textColor={project.textColor} valueFormatter={valueFormatter} showLegend={showLegend} legendLabel={legendLabel} mt="h-full" />;
                    default:
                        return <p className="text-gray-500">Select a chart type</p>;
                }
            })()}
        </div>
    );
};

const Settings = React.memo(() => {
    const { getThemeClasses } = useTheme();
    const themeClasses = getThemeClasses();

    return (
        <Card className={`${themeClasses.bg} border ${themeClasses.border} rounded-lg shadow-md p-6 mb-6`}>
            <CardHeader>
                <CardTitle className={themeClasses.text}>Settings</CardTitle>
                <CardDescription className={themeClasses.text}>Manage application settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
            </CardContent>
        </Card>
    );
});
Settings.displayName = 'Settings';

export const DatavantaDashboard: React.FC<DashboardProps> = ({
    user,
    isLoading,
    isAuthenticated,
    onSignOut,
}) => {
    const { getThemeClasses } = useTheme();
    const themeClasses = useMemo(() => getThemeClasses(), [getThemeClasses]);

    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isViewingProject, setIsViewingProject] = useState(false);
    const [newProject, setNewProject] = useState({ name: '', description: '' });
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editProjectDetails, setEditProjectDetails] = useState({ name: '', description: '' });
    const [showEditModal, setShowEditModal] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [pastedData, setPastedData] = useState('');
    const [parsedPastedHeaders, setParsedPastedHeaders] = useState<({ id: string; name: string; })[]>([]);
    const [parsedPastedRows, setParsedPastedRows] = useState<({ id: string; cells: string[]; })[]>([]);
    const [labelColumnIndex, setLabelColumnIndex] = useState<number | null>(null);
    const [valueColumnIndex, setValueColumnIndex] = useState<number | null>(null);
    const [value2ColumnIndex, setValue2ColumnIndex] = useState<number | null>(null);
    const [showPasteDataModal, setShowPasteDataModal] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [previousBackgroundColor, setPreviousBackgroundColor] = useState<string>('#ffffff');

    const chartRef = useRef<HTMLDivElement>(null);

    const sessionUserId = user?.id || user?.email || 'anonymous';

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const storedProjects = localStorage.getItem(`datavanta-projects-${sessionUserId}`);
        if (storedProjects) {
            const parsedProjects = JSON.parse(storedProjects);
            // Migrate existing projects to include chartHeight, chartWidth, showLegend, and legend labels if missing
            const migratedProjects = parsedProjects.map((project: Project) => ({
                ...project,
                chartHeight: project.chartHeight || 400,
                chartWidth: project.chartWidth || 1170,
                showLegend: project.showLegend ?? false,
                legendLabel: project.legendLabel || 'Value',
                legendLabel2: project.legendLabel2 || 'Value 2',
            }));
            setProjects(migratedProjects);
        }
    }, [sessionUserId]);

    // Store the previous background color when a project is selected
    useEffect(() => {
        if (selectedProject && selectedProject.backgroundColor !== 'transparent') {
            setPreviousBackgroundColor(selectedProject.backgroundColor);
        }
    }, [selectedProject]);

    const updateUserProjects = useCallback((updatedProjects: Project[]) => {
        localStorage.setItem(`datavanta-projects-${sessionUserId}`, JSON.stringify(updatedProjects));
    }, [sessionUserId]);

    const onCreateProject = useCallback(() => {
        const project = createProject(
            newProject,
            pastedData,
            projects,
            setProjects,
            updateUserProjects,
            COLORS,
            sessionUserId
        );
        setSelectedProject(project);
        setIsViewingProject(true);
        setNewProject({ name: '', description: '' });
        setPastedData('');
        setShowCreateModal(false);
        toast.success(`Project '${newProject.name}' created.`);
    }, [newProject, pastedData, projects, setProjects, updateUserProjects, sessionUserId]);

    const onDeleteProject = useCallback((id: string) => {
        deleteProject(id, projects, setProjects, updateUserProjects, selectedProject, setSelectedProject);
        toast.info('Project deleted.');
    }, [projects, setProjects, updateUserProjects, selectedProject]);

    const onAddDataPoint = useCallback((projectId: string, dataPoint: Omit<DataPoint, 'id'>) => {
        addDataPoint(projectId, dataPoint, projects, setProjects, updateUserProjects, selectedProject, setSelectedProject);
        toast.success('Data point added.');
    }, [projects, setProjects, updateUserProjects, selectedProject]);

    const onUpdateDataPoint = useCallback((projectId: string, dataPointId: string, updatedFields: Partial<DataPoint>) => {
        const updatedProjects = projects.map(p => {
            if (p.id === projectId) {
                return {
                    ...p,
                    data: p.data.map(dp => dp.id === dataPointId ? { ...dp, ...updatedFields } : dp)
                };
            }
            return p;
        });
        setProjects(updatedProjects);
        updateUserProjects(updatedProjects);
        if (selectedProject && selectedProject.id === projectId) {
            setSelectedProject(updatedProjects.find(p => p.id === projectId) || null);
        }
    }, [projects, setProjects, updateUserProjects, selectedProject]);


    const onUpdateChartType = useCallback((projectId: string, chartType: Project['chartType']) => {
        updateChartType(projectId, chartType, projects, setProjects, updateUserProjects, selectedProject, setSelectedProject);
        toast.success('Chart type updated.');
    }, [projects, setProjects, updateUserProjects, selectedProject]);

    const onUpdateProjectStyling = useCallback((projectId: string, styleUpdate: Partial<Pick<Project, 'chartColor' | 'chartColor2' | 'backgroundColor' | 'gridColor' | 'textColor' | 'chartHeight' | 'chartWidth' | 'showLegend' | 'legendLabel' | 'legendLabel2' | 'showXAxis' | 'showYAxis' | 'xAxisLabel' | 'yAxisLabel' | 'yAxisMin' | 'yAxisMax' | 'showLabels'>>) => {
        updateProjectStyling(projectId, styleUpdate, projects, setProjects, updateUserProjects, selectedProject, setSelectedProject);
    }, [projects, setProjects, updateUserProjects, selectedProject]);

    const onUpdateProjectDetails = useCallback(() => {
        if (selectedProject) {
            updateProjectDetails(selectedProject.id, editProjectDetails, projects, setProjects, updateUserProjects, selectedProject, setSelectedProject);
            setShowEditModal(false);
            toast.success('Project details updated.');
        }
    }, [selectedProject, editProjectDetails, projects, setProjects, updateUserProjects]);

    const onAddMultipleDataPoints = useCallback((projectId: string, newPoints: DataPoint[]) => {
        addMultipleDataPoints(projectId, newPoints, projects, setProjects, updateUserProjects, selectedProject, setSelectedProject);
        toast.success(`${newPoints.length} data points added.`);
    }, [projects, setProjects, updateUserProjects, selectedProject]);

    const onHandlePasteData = useCallback(() => {
        handlePasteData(pastedData, setParsedPastedHeaders, setParsedPastedRows, setLabelColumnIndex, setValueColumnIndex, setShowPasteDataModal, setPastedData, toast);
    }, [pastedData]);

    const onRemoveDataPoint = useCallback((projectId: string, dataPointId: string) => {
        removeDataPoint(projectId, dataPointId, projects, setProjects, updateUserProjects, selectedProject, setSelectedProject);
        toast.info('Data point removed.');
    }, [projects, setProjects, updateUserProjects, selectedProject]);

    const onUpdateDataPointColor = useCallback((projectId: string, dataPointId: string, color: string) => {
        updateDataPointColor(projectId, dataPointId, color, projects, setProjects, updateUserProjects, selectedProject, setSelectedProject);
        toast.success('Data point color updated.');
    }, [projects, setProjects, updateUserProjects, selectedProject]);

    const handleExportChart = useCallback(async (format: 'pdf' | 'png' | 'jpeg') => {
        if (!chartRef.current || !selectedProject) {
            toast.error("No chart to export or no project selected.");
            return;
        }

        setIsExporting(true);
        toast.info("Exporting chart...");

        try {
            const canvas = await html2canvas(chartRef.current, {
                useCORS: true,
                backgroundColor: selectedProject.backgroundColor,
                width: chartRef.current.offsetWidth,
                height: chartRef.current.offsetHeight,
            });
            const imgData = canvas.toDataURL(`image/${format}`);

            if (format === 'pdf') {
                const pdf = new jsPDF({
                    orientation: 'landscape',
                    unit: 'pt',
                    format: 'a4',
                });
                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save(`${selectedProject.name}-chart.${format}`);
            } else {
                const link = document.createElement('a');
                link.href = imgData;
                link.download = `${selectedProject.name}-chart.${format}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

            toast.success(`Chart exported successfully as ${format.toUpperCase()}!`);
        } catch (error) {
            console.error("Error exporting chart:", error);
            toast.error("Failed to export chart.");
        } finally {
            setIsExporting(false);
        }
    }, [chartRef, selectedProject]);

    const handlePasteSubmit = useCallback(() => {
        if (labelColumnIndex === null || valueColumnIndex === null || !selectedProject) {
            toast.error("Please select both label and value columns.");
            return;
        }

        const newPoints: DataPoint[] = [];

        for (let i = 0; i < parsedPastedRows.length; i++) {
            const row = parsedPastedRows[i];
            const values = row.cells;
            if (values.length > Math.max(labelColumnIndex, valueColumnIndex)) {
                const label = values[labelColumnIndex].trim();
                const value = parseFloat(values[valueColumnIndex].trim());
                const value2 = value2ColumnIndex !== null ? parseFloat(values[value2ColumnIndex].trim()) : undefined;

                if (label && !isNaN(value)) {
                    const existingDataPoint = selectedProject.data.find(d => d.label === label);
                    if (existingDataPoint) {
                        // Update existing data point
                        newPoints.push({
                            ...existingDataPoint,
                            value: value,
                            value2: value2 !== undefined ? value2 : existingDataPoint.value2,
                        });
                    } else {
                        // Add new data point
                        newPoints.push({ id: crypto.randomUUID(), label, value, value2 });
                    }
                }
            }
        }

        if (newPoints.length > 0) {
            onAddMultipleDataPoints(selectedProject.id, newPoints);
            setShowPasteDataModal(false);
            setPastedData('');
            setParsedPastedHeaders([]);
            setParsedPastedRows([]);
            setLabelColumnIndex(null);
            setValueColumnIndex(null);
            setValue2ColumnIndex(null);
        } else {
            toast.error("No valid data points found in the pasted data.");
        }
    }, [labelColumnIndex, valueColumnIndex, value2ColumnIndex, selectedProject, parsedPastedRows, onAddMultipleDataPoints]);

    const filteredProjects = useMemo(() => {
        if (!sessionUserId) return [];
        return projects.filter(project => project.userId === sessionUserId);
    }, [projects, sessionUserId]);

    const userInfo = useMemo(() => ({
        displayName: user?.name || 'Guest',
        displayEmail: user?.email || 'guest@example.com',
    }), [user]);

    const dashboardSignOut = useCallback(async () => {
        if (onSignOut) {
            await onSignOut();
        }
    }, [onSignOut]);

    // Move chart-related hooks to component level to avoid conditional hook calls
    const valueFormatter = useMemo(() => (number: number) => `${Intl.NumberFormat("us").format(number).toString()}`, []);
    
    const chartData = useMemo(() => {
        if (!selectedProject) return [];
        return selectedProject.data.map((d, index) => ({
            label: d.label,
            value: d.value,
            value2: d.value2,
            color: d.color || COLORS[index % COLORS.length],
        }));
    }, [selectedProject]);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!isAuthenticated) {
        // Assuming a signIn function is passed or globally available
        return (
            <div className={`min-h-screen flex items-center justify-center ${themeClasses.bg} ${themeClasses.text}`}>
                <Card className={`${themeClasses.bg} border ${themeClasses.border} shadow-lg`}>
                    <CardHeader>
                        <CardTitle className={themeClasses.text}>Access Denied</CardTitle>
                        <CardDescription className={themeClasses.text}>Please sign in to view the dashboard.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => { /* signIn() */ }} className={`w-full ${themeClasses.buttonPrimary}`}>Sign In</Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <TooltipProvider>
            {mounted ? (
                <div className="min-h-screen flex bg-background text-foreground">
                    {/* Sidebar */}
                    <Sidebar
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        setSelectedProject={setSelectedProject}
                        setShowSettings={setShowSettings}
                        setIsViewingProject={setIsViewingProject}
                    />

                    <div className="flex-1 flex flex-col overflow-hidden">
                        {/* Header */}
                        <header className={`flex items-center justify-between h-16 px-4 border-b ${themeClasses.border} ${themeClasses.bg}`}>
                            <Button
                                variant="ghost"
                                onClick={() => setSidebarOpen(true)}
                                className={`lg:hidden ${themeClasses.text} hover:${themeClasses.hoverBg}`}
                            >
                                <PanelLeft size={20} />
                            </Button>
                            <h1 className={`text-xl font-semibold ${themeClasses.text}`}>Datavanta Dashboard</h1>
                            <div className="flex items-center space-x-4">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className={`relative h-8 w-8 rounded-full ${themeClasses.text} hover:${themeClasses.hoverBg}`}
                                        >
                                            <User size={20} />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className={`w-56 ${themeClasses.bg} border ${themeClasses.border} rounded-md shadow-lg ${themeClasses.text}`} align="end" forceMount>
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none">{userInfo.displayName}</p>
                                                <p className="text-xs leading-none text-muted-foreground">{userInfo.displayEmail}</p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator className={themeClasses.border} />
                                        <DropdownMenuItem onClick={dashboardSignOut} className={`hover:${themeClasses.hoverBg} cursor-pointer`}>
                                            Log out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </header>

                        {/* Main content */}
                        <main className={`flex-1 overflow-x-hidden overflow-y-auto p-6 ${themeClasses.bg} ${themeClasses.text}`}>
                            {isViewingProject && selectedProject ? (
                                /* Project Editor View */
                                <div className="min-h-full">
                                    {/* Header with Go Back Button */}
                                    <div className="flex items-center justify-between mb-6">
                                        <h1 className={`text-3xl font-bold ${themeClasses.text}`}>{selectedProject.name}</h1>
                                        <Button
                                            onClick={() => {
                                                setIsViewingProject(false);
                                                setSelectedProject(null);
                                            }}
                                            variant="outline"
                                            className={`${themeClasses.text} hover:${themeClasses.hoverBg} border ${themeClasses.border}`}
                                        >
                                            <ArrowLeft size={16} className="mr-2" />
                                            Go Back
                                        </Button>
                                    </div>

                                    {/* Export Chart Button */}
                                    <div className="mb-4">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    disabled={isExporting}
                                                    className="bg-green-600 text-white hover:bg-green-700"
                                                >
                                                    {isExporting ? 'Exporting...' : 'Export Chart'}
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem onClick={() => handleExportChart('pdf')}>Export as PDF</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleExportChart('png')}>Export as PNG</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleExportChart('jpeg')}>Export as JPG</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    {/* Chart Display */}
                                    {renderChart({ project: selectedProject, chartRef, chartData, valueFormatter })}

                                    {/* Project Configuration */}
                                    <Card className={`${themeClasses.bg} border ${themeClasses.border} rounded-lg shadow-md mt-6`}>
                                        <CardHeader className="pb-4">
                                            <CardTitle className={`text-xl font-semibold ${themeClasses.text}`}>Project Configuration</CardTitle>
                                            <CardDescription className={themeClasses.text}>Customize your chart settings and data</CardDescription>
                                        </CardHeader>
                                        <CardContent className="px-0 pb-6">
                                            <Tabs defaultValue="chart" className="w-full">
                                                <TabsList className={`mx-6 mb-6 ${themeClasses.bg} border ${themeClasses.border} rounded-lg p-1`}>
                                                    <TabsTrigger value="chart" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                                                        <BarChart3 size={16} className="mr-2" />
                                                        Chart Type
                                                    </TabsTrigger>
                                                    <TabsTrigger value="styling" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                                                        <Palette size={16} className="mr-2" />
                                                        Styling
                                                    </TabsTrigger>
                                                    <TabsTrigger value="data" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                                                        <Database size={16} className="mr-2" />
                                                        Data Points
                                                    </TabsTrigger>
                                                    <TabsTrigger value="import" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                                                        <Import size={16} className="mr-2" />
                                                        Import Data
                                                    </TabsTrigger>
                                                </TabsList>

                                                {/* Chart Type Tab */}
                                                <TabsContent value="chart" className="px-6 space-y-6 mt-0">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="chartType" className={`text-base font-medium ${themeClasses.text}`}>Chart Type</Label>
                                                        <p className={`text-sm ${themeClasses.text} opacity-70`}>Choose the visualization type for your data</p>
                                                        <Select
                                                            value={selectedProject.chartType}
                                                            onValueChange={(value: Project['chartType']) => onUpdateChartType(selectedProject.id, value)}
                                                        >
                                                            <SelectTrigger className={`w-full max-w-md ${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border} h-11`}>
                                                                <SelectValue placeholder="Select a chart type" />
                                                            </SelectTrigger>
                                                            <SelectContent className={`${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border}`}>
                                                                {chartCategories.map(category => (
                                                                    <React.Fragment key={category.name}>
                                                                        <DropdownMenuLabel className="px-2 py-1.5 text-sm font-semibold text-gray-500 uppercase">{category.name}</DropdownMenuLabel>
                                                                        <DropdownMenuSeparator className={themeClasses.border} />
                                                                        {category.charts.map(chart => (
                                                                            <SelectItem key={chart.type} value={chart.type} className={`cursor-pointer hover:${themeClasses.hoverBg}`}>
                                                                                <div className="flex items-center">
                                                                                    {chart.icon && React.createElement(chart.icon, { size: 16, className: "mr-2" })}
                                                                                    {chart.label}
                                                                                </div>
                                                                            </SelectItem>
                                                                        ))}
                                                                    </React.Fragment>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </TabsContent>

                                                {/* Styling Tab */}
                                                <TabsContent value="styling" className="px-6 space-y-8 mt-0">
                                                    {/* Colors Section */}
                                                    <div className="space-y-6">
                                                        <div>
                                                            <h3 className={`text-lg font-semibold mb-2 ${themeClasses.text}`}>Colors</h3>
                                                            <p className={`text-sm ${themeClasses.text} opacity-70 mb-4`}>Customize the color scheme of your chart</p>
                                                        </div>
                                                        
                                                        {/* Color Inputs - Horizontal Layout */}
                                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                            {/* Chart Color */}
                                                            <div className="space-y-3">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="h-4 w-4 rounded" style={{ backgroundColor: selectedProject.chartColor }}></div>
                                                                    <Label htmlFor="chartColor" className={`text-sm font-medium ${themeClasses.text}`}>Chart Color</Label>
                                                                </div>
                                                                <Input
                                                                    id="chartColor"
                                                                    type="color"
                                                                    value={selectedProject.chartColor}
                                                                    onChange={(e) => onUpdateProjectStyling(selectedProject.id, { chartColor: e.target.value })}
                                                                    className={`w-full h-12 cursor-pointer ${themeClasses.bg} border ${themeClasses.border} rounded-lg`}
                                                                />
                                                                <Input
                                                                    type="text"
                                                                    placeholder="#000000"
                                                                    value={selectedProject.chartColor}
                                                                    onChange={(e) => {
                                                                        const hexValue = e.target.value;
                                                                        // Allow valid hex input (including partial while typing)
                                                                        if (/^#[0-9A-Fa-f]{0,6}$/.test(hexValue) || hexValue === '') {
                                                                            onUpdateProjectStyling(selectedProject.id, { chartColor: hexValue || '#000000' });
                                                                        }
                                                                    }}
                                                                    className={`w-full ${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border} rounded-lg text-sm`}
                                                                    maxLength={7}
                                                                />
                                                            </div>

                                                            {/* Secondary Chart Color (if stacked) */}
                                                            {isStackedChart(selectedProject.chartType) && (
                                                                <div className="space-y-3">
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="h-4 w-4 rounded" style={{ backgroundColor: selectedProject.chartColor2 || COLORS[1] }}></div>
                                                                        <Label htmlFor="chartColor2" className={`text-sm font-medium ${themeClasses.text}`}>Chart Color 2</Label>
                                                                    </div>
                                                                    <Input
                                                                        id="chartColor2"
                                                                        type="color"
                                                                        value={selectedProject.chartColor2 || COLORS[1]}
                                                                        onChange={(e) => onUpdateProjectStyling(selectedProject.id, { chartColor2: e.target.value })}
                                                                        className={`w-full h-12 cursor-pointer ${themeClasses.bg} border ${themeClasses.border} rounded-lg`}
                                                                    />
                                                                    <Input
                                                                        type="text"
                                                                        placeholder="#000000"
                                                                        value={selectedProject.chartColor2 || COLORS[1]}
                                                                        onChange={(e) => {
                                                                            const hexValue = e.target.value;
                                                                            // Allow valid hex input (including partial while typing)
                                                                            if (/^#[0-9A-Fa-f]{0,6}$/.test(hexValue) || hexValue === '') {
                                                                                onUpdateProjectStyling(selectedProject.id, { chartColor2: hexValue || COLORS[1] });
                                                                            }
                                                                        }}
                                                                        className={`w-full ${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border} rounded-lg text-sm`}
                                                                        maxLength={7}
                                                                    />
                                                                </div>
                                                            )}

                                                            {/* Background Color */}
                                                            <div className="space-y-3">
                                                                <div className="flex items-center gap-2">
                                                                    <Label htmlFor="backgroundColor" className={`text-sm font-medium ${themeClasses.text}`}>Background</Label>
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Input
                                                                        id="backgroundColor"
                                                                        type="color"
                                                                        value={selectedProject.backgroundColor === 'transparent' ? '#ffffff' : selectedProject.backgroundColor}
                                                                        onChange={(e) => {
                                                                            setPreviousBackgroundColor(e.target.value);
                                                                            onUpdateProjectStyling(selectedProject.id, { backgroundColor: e.target.value });
                                                                        }}
                                                                        disabled={selectedProject.backgroundColor === 'transparent'}
                                                                        className={`w-full h-12 cursor-pointer ${themeClasses.bg} border ${themeClasses.border} rounded-lg disabled:opacity-50 disabled:cursor-not-allowed`}
                                                                    />
                                                                    <Input
                                                                        type="text"
                                                                        placeholder="#000000"
                                                                        value={selectedProject.backgroundColor === 'transparent' ? '' : selectedProject.backgroundColor}
                                                                        onChange={(e) => {
                                                                            const hexValue = e.target.value;
                                                                            // Allow valid hex input (including partial while typing)
                                                                            if (/^#[0-9A-Fa-f]{0,6}$/.test(hexValue) || hexValue === '') {
                                                                                if (hexValue === '') {
                                                                                    // Don't update if empty, keep current value
                                                                                    return;
                                                                                }
                                                                                setPreviousBackgroundColor(hexValue);
                                                                                onUpdateProjectStyling(selectedProject.id, { backgroundColor: hexValue });
                                                                            }
                                                                        }}
                                                                        disabled={selectedProject.backgroundColor === 'transparent'}
                                                                        className={`w-full ${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border} rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed`}
                                                                        maxLength={7}
                                                                    />
                                                                    <div className="flex items-center gap-2">
                                                                        <Switch
                                                                            id="transparentBg"
                                                                            checked={selectedProject.backgroundColor === 'transparent'}
                                                                            onCheckedChange={(checked) => {
                                                                                if (checked) {
                                                                                    if (selectedProject.backgroundColor !== 'transparent') {
                                                                                        setPreviousBackgroundColor(selectedProject.backgroundColor);
                                                                                    }
                                                                                    onUpdateProjectStyling(selectedProject.id, { backgroundColor: 'transparent' });
                                                                                } else {
                                                                                    onUpdateProjectStyling(selectedProject.id, { backgroundColor: previousBackgroundColor });
                                                                                }
                                                                            }}
                                                                        />
                                                                        <Label htmlFor="transparentBg" className={`text-xs ${themeClasses.text} cursor-pointer`}>
                                                                            Transparent
                                                                        </Label>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Text Color */}
                                                            <div className="space-y-3">
                                                                <div className="flex items-center gap-2">
                                                                    <Type size={16} className={themeClasses.text} />
                                                                    <Label htmlFor="textColor" className={`text-sm font-medium ${themeClasses.text}`}>Text Color</Label>
                                                                </div>
                                                                <Input
                                                                    id="textColor"
                                                                    type="color"
                                                                    value={selectedProject.textColor}
                                                                    onChange={(e) => onUpdateProjectStyling(selectedProject.id, { textColor: e.target.value })}
                                                                    className={`w-full h-12 cursor-pointer ${themeClasses.bg} border ${themeClasses.border} rounded-lg`}
                                                                />
                                                                <Input
                                                                    type="text"
                                                                    placeholder="#000000"
                                                                    value={selectedProject.textColor}
                                                                    onChange={(e) => {
                                                                        const hexValue = e.target.value;
                                                                        // Allow valid hex input (including partial while typing)
                                                                        if (/^#[0-9A-Fa-f]{0,6}$/.test(hexValue) || hexValue === '') {
                                                                            onUpdateProjectStyling(selectedProject.id, { textColor: hexValue || '#000000' });
                                                                        }
                                                                    }}
                                                                    className={`w-full ${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border} rounded-lg text-sm`}
                                                                    maxLength={7}
                                                                />
                                                            </div>

                                                            {/* Grid Color */}
                                                            <div className="space-y-3">
                                                                <div className="flex items-center gap-2">
                                                                    <Grid size={16} className={themeClasses.text} />
                                                                    <Label htmlFor="gridColor" className={`text-sm font-medium ${themeClasses.text}`}>Grid Color</Label>
                                                                </div>
                                                                <Input
                                                                    id="gridColor"
                                                                    type="color"
                                                                    value={selectedProject.gridColor}
                                                                    onChange={(e) => onUpdateProjectStyling(selectedProject.id, { gridColor: e.target.value })}
                                                                    className={`w-full h-12 cursor-pointer ${themeClasses.bg} border ${themeClasses.border} rounded-lg`}
                                                                />
                                                                <Input
                                                                    type="text"
                                                                    placeholder="#000000"
                                                                    value={selectedProject.gridColor}
                                                                    onChange={(e) => {
                                                                        const hexValue = e.target.value;
                                                                        // Allow valid hex input (including partial while typing)
                                                                        if (/^#[0-9A-Fa-f]{0,6}$/.test(hexValue) || hexValue === '') {
                                                                            onUpdateProjectStyling(selectedProject.id, { gridColor: hexValue || '#000000' });
                                                                        }
                                                                    }}
                                                                    className={`w-full ${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border} rounded-lg text-sm`}
                                                                    maxLength={7}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="border-t border-border"></div>

                                                    {/* Labels Section */}
                                                    <div className="space-y-6">
                                                        <div>
                                                            <h3 className={`text-lg font-semibold mb-2 ${themeClasses.text}`}>Data Labels</h3>
                                                            <p className={`text-sm ${themeClasses.text} opacity-70 mb-4`}>Show value labels on data points</p>
                                                        </div>
                                                        
                                                        <div className="space-y-4">
                                                            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30">
                                                                <div className="space-y-0.5">
                                                                    <Label htmlFor="showLabels" className={`text-sm font-medium ${themeClasses.text} cursor-pointer`}>Show Labels</Label>
                                                                    <p className={`text-xs ${themeClasses.text} opacity-60`}>Display value labels next to data points</p>
                                                                </div>
                                                                <Switch
                                                                    id="showLabels"
                                                                    checked={selectedProject.showLabels ?? false}
                                                                    onCheckedChange={(checked) => {
                                                                        onUpdateProjectStyling(selectedProject.id, { showLabels: checked });
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="border-t border-border"></div>

                                                    {/* Axes Section */}
                                                    <div className="space-y-6">
                                                        <div>
                                                            <h3 className={`text-lg font-semibold mb-2 ${themeClasses.text}`}>Axes</h3>
                                                            <p className={`text-sm ${themeClasses.text} opacity-70 mb-4`}>Configure chart axes visibility and range</p>
                                                        </div>
                                                        
                                                        <div className="space-y-4">
                                                            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30">
                                                                <div className="space-y-0.5">
                                                                    <Label htmlFor="showXAxis" className={`text-sm font-medium ${themeClasses.text} cursor-pointer`}>Show X-Axis</Label>
                                                                    <p className={`text-xs ${themeClasses.text} opacity-60`}>Display the X-axis on the chart</p>
                                                                </div>
                                                                <Switch
                                                                    id="showXAxis"
                                                                    checked={selectedProject.showXAxis !== false}
                                                                    onCheckedChange={(checked) => {
                                                                        onUpdateProjectStyling(selectedProject.id, { showXAxis: checked });
                                                                    }}
                                                                />
                                                            </div>

                                                            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30">
                                                                <div className="space-y-0.5">
                                                                    <Label htmlFor="showYAxis" className={`text-sm font-medium ${themeClasses.text} cursor-pointer`}>Show Y-Axis</Label>
                                                                    <p className={`text-xs ${themeClasses.text} opacity-60`}>Display the Y-axis on the chart</p>
                                                                </div>
                                                                <Switch
                                                                    id="showYAxis"
                                                                    checked={selectedProject.showYAxis !== false}
                                                                    onCheckedChange={(checked) => {
                                                                        onUpdateProjectStyling(selectedProject.id, { showYAxis: checked });
                                                                    }}
                                                                />
                                                            </div>

                                                            {/* Axis Labels */}
                                                            <div className="p-4 rounded-lg border border-border bg-muted/30">
                                                                <div className="space-y-4">
                                                                    <div>
                                                                        <Label className={`text-sm font-medium ${themeClasses.text}`}>Axis Labels</Label>
                                                                        <p className={`text-xs ${themeClasses.text} opacity-60 mb-3`}>Add custom labels for the X and Y axes</p>
                                                                    </div>
                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                        <div className="space-y-2">
                                                                            <Label htmlFor="xAxisLabel" className={`text-sm font-medium ${themeClasses.text}`}>X-Axis Label</Label>
                                                                            <Input
                                                                                id="xAxisLabel"
                                                                                type="text"
                                                                                placeholder="e.g., Time, Category"
                                                                                value={selectedProject.xAxisLabel || ''}
                                                                                onChange={(e) => {
                                                                                    onUpdateProjectStyling(selectedProject.id, { xAxisLabel: e.target.value || undefined });
                                                                                }}
                                                                                className={`w-full ${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border}`}
                                                                            />
                                                                            <p className={`text-xs ${themeClasses.text} opacity-60`}>Label displayed below the X-axis</p>
                                                                        </div>
                                                                        <div className="space-y-2">
                                                                            <Label htmlFor="yAxisLabel" className={`text-sm font-medium ${themeClasses.text}`}>Y-Axis Label</Label>
                                                                            <Input
                                                                                id="yAxisLabel"
                                                                                type="text"
                                                                                placeholder="e.g., Value, Amount"
                                                                                value={selectedProject.yAxisLabel || ''}
                                                                                onChange={(e) => {
                                                                                    onUpdateProjectStyling(selectedProject.id, { yAxisLabel: e.target.value || undefined });
                                                                                }}
                                                                                className={`w-full ${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border}`}
                                                                            />
                                                                            <p className={`text-xs ${themeClasses.text} opacity-60`}>Label displayed next to the Y-axis</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {selectedProject.showYAxis !== false && (
                                                                <div className="space-y-4 pl-4 border-l-2 border-border">
                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                        <div className="space-y-2">
                                                                            <Label htmlFor="yAxisMin" className={`text-sm font-medium ${themeClasses.text}`}>Y-Axis Minimum</Label>
                                                                            <Input
                                                                                id="yAxisMin"
                                                                                type="number"
                                                                                placeholder="Auto"
                                                                                value={selectedProject.yAxisMin !== undefined ? selectedProject.yAxisMin : ''}
                                                                                onChange={(e) => {
                                                                                    const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
                                                                                    onUpdateProjectStyling(selectedProject.id, { yAxisMin: value });
                                                                                }}
                                                                                className={`w-full ${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border}`}
                                                                            />
                                                                        </div>
                                                                        <div className="space-y-2">
                                                                            <Label htmlFor="yAxisMax" className={`text-sm font-medium ${themeClasses.text}`}>Y-Axis Maximum</Label>
                                                                            <Input
                                                                                id="yAxisMax"
                                                                                type="number"
                                                                                placeholder="Auto"
                                                                                value={selectedProject.yAxisMax !== undefined ? selectedProject.yAxisMax : ''}
                                                                                onChange={(e) => {
                                                                                    const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
                                                                                    onUpdateProjectStyling(selectedProject.id, { yAxisMax: value });
                                                                                }}
                                                                                className={`w-full ${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border}`}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="border-t border-border"></div>

                                                    {/* Legend Section */}
                                                    <div className="space-y-6">
                                                        <div>
                                                            <h3 className={`text-lg font-semibold mb-2 ${themeClasses.text}`}>Legend</h3>
                                                            <p className={`text-sm ${themeClasses.text} opacity-70 mb-4`}>Configure chart legend settings</p>
                                                        </div>
                                                        
                                                        <div className="space-y-4">
                                                            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30">
                                                                <div className="space-y-0.5">
                                                                    <Label htmlFor="showLegend" className={`text-sm font-medium ${themeClasses.text} cursor-pointer`}>Show Legend</Label>
                                                                    <p className={`text-xs ${themeClasses.text} opacity-60`}>Display legend on the chart</p>
                                                                </div>
                                                                <Switch
                                                                    id="showLegend"
                                                                    checked={selectedProject.showLegend ?? false}
                                                                    onCheckedChange={(checked) => {
                                                                        onUpdateProjectStyling(selectedProject.id, { showLegend: checked });
                                                                    }}
                                                                />
                                                            </div>

                                                            {selectedProject.showLegend && (
                                                                <div className="space-y-4 pl-4 border-l-2 border-border">
                                                                    <div className="space-y-2">
                                                                        <Label htmlFor="legendLabel" className={`text-sm font-medium ${themeClasses.text}`}>Primary Legend Label</Label>
                                                                        <Input
                                                                            id="legendLabel"
                                                                            type="text"
                                                                            placeholder="Value"
                                                                            value={selectedProject.legendLabel || ''}
                                                                            onChange={(e) => onUpdateProjectStyling(selectedProject.id, { legendLabel: e.target.value })}
                                                                            className={`max-w-xs ${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border}`}
                                                                        />
                                                                    </div>
                                                                    {isStackedChart(selectedProject.chartType) && (
                                                                        <div className="space-y-2">
                                                                            <Label htmlFor="legendLabel2" className={`text-sm font-medium ${themeClasses.text}`}>Secondary Legend Label</Label>
                                                                            <Input
                                                                                id="legendLabel2"
                                                                                type="text"
                                                                                placeholder="Value 2"
                                                                                value={selectedProject.legendLabel2 || ''}
                                                                                onChange={(e) => onUpdateProjectStyling(selectedProject.id, { legendLabel2: e.target.value })}
                                                                                className={`max-w-xs ${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border}`}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Data Point Colors Section - Only for Pie and Donut Charts */}
                                                    {(selectedProject.chartType === 'pie' || selectedProject.chartType === 'donut') && (
                                                        <>
                                                            <div className="border-t border-border"></div>
                                                            <div className="space-y-6">
                                                                <div>
                                                                    <h3 className={`text-lg font-semibold mb-2 ${themeClasses.text}`}>Data Point Colors</h3>
                                                                    <p className={`text-sm ${themeClasses.text} opacity-70 mb-4`}>Customize the color of each data point in your chart</p>
                                                                </div>
                                                                
                                                                <div className="space-y-3">
                                                                    {selectedProject.data.map((dataPoint, index) => (
                                                                        <div key={dataPoint.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
                                                                            <div className="flex items-center gap-3 flex-1">
                                                                                <div 
                                                                                    className="w-4 h-4 rounded border border-border"
                                                                                    style={{ backgroundColor: dataPoint.color || COLORS[index % COLORS.length] }}
                                                                />
                                                                                <Label className={`text-sm font-medium ${themeClasses.text}`}>{dataPoint.label}</Label>
                                                                            </div>
                                                                            <Input
                                                                                type="color"
                                                                                value={dataPoint.color || COLORS[index % COLORS.length]}
                                                                                onChange={(e) => onUpdateDataPointColor(selectedProject.id, dataPoint.id, e.target.value)}
                                                                                className={`${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border} w-16 h-10 cursor-pointer`}
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}

                                                    <div className="border-t border-border"></div>

                                                    {/* Dimensions Section */}
                                                    <div className="space-y-6">
                                                        <div>
                                                            <h3 className={`text-lg font-semibold mb-2 ${themeClasses.text}`}>Dimensions</h3>
                                                            <p className={`text-sm ${themeClasses.text} opacity-70 mb-4`}>Adjust the size of your chart</p>
                                                        </div>
                                                        
                                                        <div className="space-y-6">
                                                            <div className="space-y-3">
                                                                <div className="flex items-center justify-between">
                                                                    <Label htmlFor="chartWidth" className={`text-sm font-medium ${themeClasses.text}`}>Chart Width</Label>
                                                                    <span className={`text-sm font-medium ${themeClasses.text}`}>{selectedProject.chartWidth || 1170}px</span>
                                                                </div>
                                                                <Slider
                                                                    id="chartWidth"
                                                                    min={300}
                                                                    max={1170}
                                                                    step={10}
                                                                    value={[selectedProject.chartWidth || 1170]}
                                                                    onValueChange={(value) => onUpdateProjectStyling(selectedProject.id, { chartWidth: value[0] })}
                                                                    className="w-full"
                                                                />
                                                            </div>

                                                            <div className="space-y-3">
                                                                <div className="flex items-center justify-between">
                                                                    <Label htmlFor="chartHeight" className={`text-sm font-medium ${themeClasses.text}`}>Chart Height</Label>
                                                                    <span className={`text-sm font-medium ${themeClasses.text}`}>{selectedProject.chartHeight || 400}px</span>
                                                                </div>
                                                                <Slider
                                                                    id="chartHeight"
                                                                    min={200}
                                                                    max={800}
                                                                    step={10}
                                                                    value={[selectedProject.chartHeight || 400]}
                                                                    onValueChange={(value) => onUpdateProjectStyling(selectedProject.id, { chartHeight: value[0] })}
                                                                    className="w-full"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TabsContent>

                                                {/* Data Points Tab */}
                                                <TabsContent value="data" className="px-6 space-y-6 mt-0">
                                                    <div>
                                                        <h3 className={`text-lg font-semibold mb-2 ${themeClasses.text}`}>Data Points</h3>
                                                        <p className={`text-sm ${themeClasses.text} opacity-70 mb-6`}>Manage individual data points in your chart</p>
                                                    </div>

                                                    {/* Add Data Point Form */}
                                                    <div className="p-4 rounded-lg border border-border bg-muted/30 space-y-3">
                                                        <Label className={`text-sm font-medium ${themeClasses.text}`}>Add New Data Point</Label>
                                                        <div className="flex gap-2">
                                                            <Input
                                                                id="newDataLabel"
                                                                placeholder="Label"
                                                                className={`flex-1 ${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border}`}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === 'Enter') {
                                                                        const labelInput = document.getElementById('newDataLabel') as HTMLInputElement;
                                                                        const valueInput = document.getElementById('newDataValue') as HTMLInputElement;
                                                                        const value2Input = document.getElementById('newDataValue2') as HTMLInputElement;

                                                                        if (labelInput && valueInput) {
                                                                            const label = labelInput.value;
                                                                            const value = parseFloat(valueInput.value);
                                                                            const value2 = value2Input ? parseFloat(value2Input.value) : undefined;
                                                                            if (label && !isNaN(value)) {
                                                                                onAddDataPoint(selectedProject.id, { label, value, value2 });
                                                                                labelInput.value = '';
                                                                                valueInput.value = '';
                                                                                if (value2Input) value2Input.value = '';
                                                                            } else {
                                                                                toast.error("Please enter a valid label and value.");
                                                                            }
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                            <Input
                                                                id="newDataValue"
                                                                type="number"
                                                                placeholder="Value"
                                                                className={`flex-1 ${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border}`}
                                                            />
                                                            {isStackedChart(selectedProject.chartType) && (
                                                                <Input
                                                                    id="newDataValue2"
                                                                    type="number"
                                                                    placeholder="Value 2"
                                                                    className={`flex-1 ${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border}`}
                                                                />
                                                            )}
                                                            <Button
                                                                onClick={() => {
                                                                    const labelInput = document.getElementById('newDataLabel') as HTMLInputElement;
                                                                    const valueInput = document.getElementById('newDataValue') as HTMLInputElement;
                                                                    const value2Input = document.getElementById('newDataValue2') as HTMLInputElement;

                                                                    if (labelInput && valueInput) {
                                                                        const label = labelInput.value;
                                                                        const value = parseFloat(valueInput.value);
                                                                        const value2 = value2Input ? parseFloat(value2Input.value) : undefined;
                                                                        if (label && !isNaN(value)) {
                                                                            onAddDataPoint(selectedProject.id, { label, value, value2 });
                                                                            labelInput.value = '';
                                                                            valueInput.value = '';
                                                                            if (value2Input) value2Input.value = '';
                                                                        } else {
                                                                            toast.error("Please enter a valid label and value.");
                                                                        }
                                                                    }
                                                                }}
                                                            >
                                                                <PlusCircle size={16} className="mr-2" />Add
                                                            </Button>
                                                        </div>
                                                    </div>

                                                    {/* Existing Data Points */}
                                                    <div className="space-y-3">
                                                        <Label className={`text-sm font-medium ${themeClasses.text}`}>Existing Data Points ({selectedProject.data.length})</Label>
                                                        <div className="space-y-2 max-h-96 overflow-y-auto">
                                                            {selectedProject.data.length === 0 ? (
                                                                <div className="text-center py-8 text-muted-foreground">
                                                                    <Database size={48} className="mx-auto mb-2 opacity-50" />
                                                                    <p>No data points yet. Add one above to get started.</p>
                                                                </div>
                                                            ) : (
                                                                selectedProject.data.map((dataPoint, index) => (
                                                                    <div key={dataPoint.id} className={`flex items-center gap-2 p-3 rounded-lg border border-border ${themeClasses.hoverBg} transition-colors`}>
                                                                        <Input
                                                                            type="text"
                                                                            value={dataPoint.label}
                                                                            onChange={(e) => {
                                                                                onUpdateDataPoint(selectedProject.id, dataPoint.id, { label: e.target.value });
                                                                            }}
                                                                            placeholder="Label"
                                                                            className={`flex-1 ${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border}`}
                                                                        />
                                                                        <Input
                                                                            type="number"
                                                                            value={dataPoint.value}
                                                                            onChange={(e) => {
                                                                                onUpdateDataPoint(selectedProject.id, dataPoint.id, { value: parseFloat(e.target.value) });
                                                                            }}
                                                                            placeholder="Value"
                                                                            className={`flex-1 ${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border}`}
                                                                        />
                                                                        {isStackedChart(selectedProject.chartType) && (
                                                                            <Input
                                                                                type="number"
                                                                                value={dataPoint.value2 || ''}
                                                                                onChange={(e) => {
                                                                                    onUpdateDataPoint(selectedProject.id, dataPoint.id, { value2: parseFloat(e.target.value) });
                                                                                }}
                                                                                placeholder="Value 2"
                                                                                className={`flex-1 ${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border}`}
                                                                            />
                                                                        )}
                                                                        {(selectedProject.chartType === 'pie' || selectedProject.chartType === 'donut') && (
                                                                            <Input
                                                                                type="color"
                                                                                value={dataPoint.color || COLORS[index % COLORS.length]}
                                                                                onChange={(e) => onUpdateDataPointColor(selectedProject.id, dataPoint.id, e.target.value)}
                                                                                className={`${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border} w-16 h-10 cursor-pointer`}
                                                                            />
                                                                        )}
                                                                        <Button
                                                                            variant="destructive"
                                                                            size="sm"
                                                                            onClick={() => onRemoveDataPoint(selectedProject.id, dataPoint.id)}
                                                                            className="shrink-0"
                                                                        >
                                                                            <X size={16} />
                                                                        </Button>
                                                                    </div>
                                                                ))
                                                            )}
                                                        </div>
                                                    </div>
                                                </TabsContent>

                                                {/* Import Data Tab */}
                                                <TabsContent value="import" className="px-6 space-y-6 mt-0">
                                                    <div>
                                                        <h3 className={`text-lg font-semibold mb-2 ${themeClasses.text}`}>Import Data</h3>
                                                        <p className={`text-sm ${themeClasses.text} opacity-70 mb-6`}>Paste data from spreadsheets or other sources to quickly add multiple data points</p>
                                                    </div>

                                                    <div className="space-y-4">
                                                        <div className="space-y-2">
                                                            <Label className={`text-sm font-medium ${themeClasses.text}`}>Paste Data</Label>
                                                            <p className={`text-xs ${themeClasses.text} opacity-60`}>Supports tab-separated or comma-separated values (e.g., Label\tValue or Label,Value)</p>
                                                        </div>
                                                        <Textarea
                                                            placeholder="Example:&#10;January    100&#10;February   150&#10;March      120"
                                                            value={pastedData}
                                                            onChange={(e) => setPastedData(e.target.value)}
                                                            rows={8}
                                                            className={`${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border} font-mono text-sm`}
                                                        />
                                                        <Button 
                                                            onClick={onHandlePasteData}
                                                            className="w-full sm:w-auto"
                                                            size="lg"
                                                        >
                                                            <Save size={16} className="mr-2" />
                                                            Parse and Add Data
                                                        </Button>
                                                    </div>
                                                </TabsContent>
                                            </Tabs>
                                        </CardContent>
                                    </Card>
                                </div>
                            ) : showSettings ? (
                                <Settings />
                            ) : (
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {filteredProjects.length === 0 ? (
                                        <>
                                            {/* Create New Project Card */}
                                            <Card
                                                className={`flex flex-col items-center justify-center p-6 border-2 border-dashed ${themeClasses.border} rounded-lg shadow-sm hover:${themeClasses.hoverBg} cursor-pointer ${themeClasses.text}`}
                                                onClick={() => setShowCreateModal(true)}
                                            >
                                                <PlusCircle size={32} className="mb-3" />
                                                <CardTitle className={`text-lg font-semibold ${themeClasses.text}`}>Create New Project</CardTitle>
                                            </Card>
                                            <div className="col-span-full text-center py-10">
                                                <p className={`text-xl font-semibold ${themeClasses.text}`}>No projects yet! Start creating graphs to visualize your data.</p>
                                                <Button onClick={() => setShowCreateModal(true)} className={`mt-4 ${themeClasses.buttonPrimary}`}>
                                                    Create Your First Project
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {/* Create New Project Card */}
                                            <Card
                                                className={`flex flex-col items-center justify-center p-6 border-2 border-dashed ${themeClasses.border} rounded-lg shadow-sm hover:${themeClasses.hoverBg} cursor-pointer ${themeClasses.text}`}
                                                onClick={() => setShowCreateModal(true)}
                                            >
                                                <PlusCircle size={32} className="mb-3" />
                                                <CardTitle className={`text-lg font-semibold ${themeClasses.text}`}>Create New Project</CardTitle>
                                            </Card>
                                            {filteredProjects.map((project) => (
                                                <Card
                                                    key={project.id}
                                                    className={`${themeClasses.bg} border ${themeClasses.border} rounded-lg shadow-md cursor-pointer hover:${themeClasses.hoverBg} ${selectedProject?.id === project.id ? themeClasses.activeBg + ' ring-2 ' + themeClasses.ring : ''}`}
                                                    onClick={() => {
                                                        setSelectedProject(project);
                                                        setIsViewingProject(true);
                                                    }}
                                                >
                                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                        <CardTitle className={`text-lg font-semibold ${themeClasses.text}`}>{project.name}</CardTitle>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button
                                                                    variant="ghost"
                                                                    className={`h-8 w-8 p-0 ${themeClasses.text} hover:${themeClasses.hoverBg}`}
                                                                    onClick={(e) => e.stopPropagation()} // Prevent card click when opening dropdown
                                                                >
                                                                    <SettingsIcon className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent className={`w-56 ${themeClasses.bg} border ${themeClasses.border} rounded-md shadow-lg ${themeClasses.text}`} align="end" forceMount>
                                                                <DropdownMenuItem
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setSelectedProject(project);
                                                                        setEditProjectDetails({ name: project.name, description: project.description });
                                                                        setShowEditModal(true);
                                                                    }}
                                                                    className={`hover:${themeClasses.hoverBg} cursor-pointer`}
                                                                >
                                                                    <Edit size={16} className="mr-2" /> Edit Details
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        onDeleteProject(project.id);
                                                                    }}
                                                                    className={`hover:${themeClasses.hoverBg} cursor-pointer text-red-600`}
                                                                >
                                                                    <Trash2 size={16} className="mr-2" /> Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <p className={`text-sm ${themeClasses.text}`}>{project.description}</p>
                                                        <p className="text-xs text-muted-foreground mt-2">Last Modified: {project.lastModified}</p>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </>
                                    )}
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            ) : (
                <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
                    <p>Loading...</p>
                </div>
            )}

            {/* Create Project Modal */}
            <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
                <DialogContent className={`${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border} rounded-lg shadow-lg`}>
                    <DialogHeader>
                        <DialogTitle className={themeClasses.text}>Create New Project</DialogTitle>
                        <DialogDescription className={themeClasses.text}>Enter details for your new data visualization project.</DialogDescription>
                    </DialogHeader>
                    <div className={`grid gap-4 py-4 ${themeClasses.bg} ${themeClasses.text}`}>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className={`text-right ${themeClasses.text}`}>Name</Label>
                            <Input
                                id="name"
                                value={newProject.name}
                                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                                className={`col-span-3 ${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border}`}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className={`text-right ${themeClasses.text}`}>Description</Label>
                            <Textarea
                                id="description"
                                value={newProject.description}
                                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                className={`col-span-3 ${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border}`}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="pasteDataInitial" className={`text-right ${themeClasses.text}`}>Paste Data</Label>
                            <Textarea
                                id="pasteDataInitial"
                                placeholder="Optional: Paste tab-separated or comma-separated data here"
                                value={pastedData}
                                onChange={(e) => setPastedData(e.target.value)}
                                rows={5}
                                className={`col-span-3 ${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border}`}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowCreateModal(false)} className={`${themeClasses.text} hover:${themeClasses.hoverBg} border ${themeClasses.border}`}>Cancel</Button>
                        <Button onClick={onCreateProject} className="bg-blue-500 text-white hover:bg-blue-600">Create Project</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Project Modal */}
            <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
                <DialogContent className={`${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border} rounded-lg shadow-lg`}>
                    <DialogHeader>
                        <DialogTitle className={themeClasses.text}>Edit Project Details</DialogTitle>
                        <DialogDescription className={themeClasses.text}>Modify the name and description of your project.</DialogDescription>
                    </DialogHeader>
                    <div className={`grid gap-4 py-4 ${themeClasses.bg} ${themeClasses.text}`}>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="editName" className={`text-right ${themeClasses.text}`}>Name</Label>
                            <Input
                                id="editName"
                                value={editProjectDetails.name}
                                onChange={(e) => setEditProjectDetails({ ...editProjectDetails, name: e.target.value })}
                                className={`col-span-3 ${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border}`}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="editDescription" className={`text-right ${themeClasses.text}`}>Description</Label>
                            <Textarea
                                id="editDescription"
                                value={editProjectDetails.description}
                                onChange={(e) => setEditProjectDetails({ ...editProjectDetails, description: e.target.value })}
                                className={`col-span-3 ${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border}`}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowEditModal(false)} className={`${themeClasses.text} hover:${themeClasses.hoverBg} border ${themeClasses.border}`}>Cancel</Button>
                        <Button onClick={onUpdateProjectDetails} className="bg-blue-500 text-white hover:bg-blue-600">Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Paste Data Configuration Modal */}
            <Dialog open={showPasteDataModal} onOpenChange={setShowPasteDataModal}>
                <DialogContent className={`${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border} rounded-lg shadow-lg max-w-2xl`}>
                    <DialogHeader>
                        <DialogTitle className={themeClasses.text}>Configure Pasted Data</DialogTitle>
                        <DialogDescription className={themeClasses.text}>Select which columns correspond to your data labels and values.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="overflow-x-auto mb-4">
                            <table className={`min-w-full divide-y ${themeClasses.border}`}>
                                <thead>
                                    <tr>
                                        {parsedPastedHeaders.map((header, index) => (
                                            <th key={index} className={`px-4 py-2 text-left text-xs font-medium ${themeClasses.text} uppercase tracking-wider border-b ${themeClasses.border}`}>
                                                {header.name}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className={`divide-y ${themeClasses.border}`}>
                                    {parsedPastedRows.slice(0, 5).map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {row.cells.map((cell, cellIndex) => (
                                                <td key={cellIndex} className={`px-4 py-2 whitespace-nowrap text-sm ${themeClasses.text}`}>
                                                    {cell}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <Label htmlFor="labelColumn" className={themeClasses.text}>Label Column</Label>
                                <Select
                                    onValueChange={(value) => setLabelColumnIndex(parseInt(value))}
                                    value={labelColumnIndex !== null ? String(labelColumnIndex) : ''}
                                >
                                    <SelectTrigger className={`w-full ${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border}`}>
                                        <SelectValue placeholder="Select label column" />
                                    </SelectTrigger>
                                    <SelectContent className={`${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border}`}>
                                        {parsedPastedHeaders.map((header, index) => (
                                            <SelectItem key={index} value={String(index)}>{header.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="valueColumn" className={themeClasses.text}>Value Column</Label>
                                <Select
                                    onValueChange={(value) => setValueColumnIndex(parseInt(value))}
                                    value={valueColumnIndex !== null ? String(valueColumnIndex) : ''}
                                >
                                    <SelectTrigger className={`w-full ${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border}`}>
                                        <SelectValue placeholder="Select value column" />
                                    </SelectTrigger>
                                    <SelectContent className={`${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border}`}>
                                        {parsedPastedHeaders.map((header, index) => (
                                            <SelectItem key={index} value={String(index)}>{header.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            {isStackedChart(selectedProject?.chartType || 'line') && (
                                <div>
                                    <Label htmlFor="value2Column" className={themeClasses.text}>Value 2 Column (Optional)</Label>
                                    <Select
                                        onValueChange={(value) => setValue2ColumnIndex(parseInt(value))}
                                        value={value2ColumnIndex !== null ? String(value2ColumnIndex) : ''}
                                    >
                                        <SelectTrigger className={`w-full ${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border}`}>
                                            <SelectValue placeholder="Select value 2 column" />
                                        </SelectTrigger>
                                    <SelectContent className={`${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border}`}>
                                            {parsedPastedHeaders.map((header, index) => (
                                                <SelectItem key={index} value={String(index)}>{header.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowPasteDataModal(false)} className={`${themeClasses.text} hover:${themeClasses.hoverBg} border ${themeClasses.border}`}>Cancel</Button>
                        <Button onClick={handlePasteSubmit} className="bg-blue-500 text-white hover:bg-blue-600">Add Data Points</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </TooltipProvider>
    );
};
