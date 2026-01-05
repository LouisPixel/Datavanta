import React from 'react';
import { DataPoint, Project } from '@/interfaces/data';
import type { toast as ToastType } from 'sonner';

export const createProject = (
    newProject: { name: string; description: string; },
    pastedData: string,
    projects: Project[],
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>,
    updateUserProjects: (projects: Project[]) => void,
    COLORS: string[],
    sessionUserId: string | undefined
) => {
    if (!sessionUserId) {
        throw new Error('User ID is required to create a project');
    }

    // TypeScript now knows sessionUserId is string after the check
    const userId: string = sessionUserId;

    const newPoints: DataPoint[] = [];
    let parsedHeaders: string[] = [];
    let parsedRows: string[][] = [];

    if (pastedData.trim()) {
        const lines = pastedData.trim().split(/\r\n|\n|\r/);
        parsedHeaders = lines[0].split(/\t|,/);
        parsedRows = lines.slice(1).map(line => line.split(/\t|,/));

        const autoLabelIndex = parsedHeaders.findIndex(h => h.toLowerCase().includes('label'));
        const autoValueIndex = parsedHeaders.findIndex(h => h.toLowerCase().includes('value'));

        if (autoLabelIndex !== -1 && autoValueIndex !== -1) {
            for (let i = 0; i < parsedRows.length; i++) {
                const values = parsedRows[i];
                if (values.length > Math.max(autoLabelIndex, autoValueIndex)) {
                    const label = values[autoLabelIndex].trim();
                    const value = parseFloat(values[autoValueIndex].trim());

                    if (label && !isNaN(value)) {
                        newPoints.push({ id: crypto.randomUUID(), label, value });
                    }
                }
            }
        }
    }

    const project: Project = {
        id: crypto.randomUUID(),
        name: newProject.name,
        description: newProject.description,
        data: newPoints,
        chartType: 'line',
        chartColor: COLORS[0],
        chartColor2: COLORS[1] || COLORS[0],
        backgroundColor: '#ffffff',
        gridColor: '#e5e7eb',
        textColor: '#000000',
        chartHeight: 400, // Default height in pixels
        chartWidth: 1170, // Default width in pixels
        lastModified: new Date().toLocaleDateString(),
        userId: userId,
    };
    const updatedProjects = [...projects, project];
    setProjects(updatedProjects);
    updateUserProjects(updatedProjects);
    return project;
};

export const deleteProject = (
    id: string,
    projects: Project[],
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>,
    updateUserProjects: (projects: Project[]) => void,
    selectedProject: Project | null,
    setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>
) => {
    const updatedProjects = projects.filter((p) => p.id !== id);
    setProjects(updatedProjects);
    updateUserProjects(updatedProjects);
    if (selectedProject?.id === id) {
        setSelectedProject(null);
    }
};

export const addDataPoint = (
    projectId: string,
    dataPoint: Omit<DataPoint, 'id'>,
    projects: Project[],
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>,
    updateUserProjects: (projects: Project[]) => void,
    selectedProject: Project | null,
    setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>
) => {
    if (!projectId || !dataPoint) {
        console.error('Invalid projectId or dataPoint');
        return;
    }

    const updatedProjects = projects.map(p => {
        if (p.id === projectId) {
            const existingDataIndex = p.data.findIndex(d => d.label === dataPoint.label);
            if (existingDataIndex > -1) {
                // Update existing data point
                const updatedData = [...p.data];
                updatedData[existingDataIndex] = {
                    ...updatedData[existingDataIndex],
                    value: dataPoint.value,
                    value2: dataPoint.value2 !== undefined ? dataPoint.value2 : updatedData[existingDataIndex].value2,
                };
                return { ...p, data: updatedData };
            } else {
                // Add new data point
                return { ...p, data: [...p.data, { ...dataPoint, id: crypto.randomUUID() }] };
            }
        }
        return p;
    });
    
    setProjects(updatedProjects);
    updateUserProjects(updatedProjects);
    
    if (selectedProject && selectedProject.id === projectId) {
        const updatedProject = updatedProjects.find(p => p.id === projectId);
        if (updatedProject) {
            setSelectedProject(updatedProject);
        }
    }
};

export const updateChartType = (
    projectId: string,
    chartType: Project['chartType'],
    projects: Project[],
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>,
    updateUserProjects: (projects: Project[]) => void,
    selectedProject: Project | null,
    setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>
) => {
    const updatedProjects = projects.map((p) => {
        if (p.id === projectId) {
            return { ...p, chartType };
        }
        return p;
    });
    setProjects(updatedProjects);
    updateUserProjects(updatedProjects);
    if (selectedProject && selectedProject.id === projectId) {
        const updatedProject = updatedProjects.find((p) => p.id === projectId);
        if (updatedProject) {
            setSelectedProject(updatedProject);
        }
    }
};

export const updateProjectStyling = (
    projectId: string,
    styleUpdate: Partial<Pick<Project, 'chartColor' | 'chartColor2' | 'backgroundColor' | 'gridColor' | 'textColor' | 'chartHeight' | 'chartWidth' | 'showXAxis' | 'showYAxis' | 'xAxisLabel' | 'yAxisLabel' | 'yAxisMin' | 'yAxisMax' | 'showLabels'>>,
    projects: Project[],
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>,
    updateUserProjects: (projects: Project[]) => void,
    selectedProject: Project | null,
    setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>
) => {
    const updatedProjects = projects.map((p) => {
        if (p.id === projectId) {
            return { ...p, ...styleUpdate };
        }
        return p;
    });
    setProjects(updatedProjects);
    updateUserProjects(updatedProjects);
    if (selectedProject && selectedProject.id === projectId) {
        const updatedProject = updatedProjects.find((p) => p.id === projectId);
        if (updatedProject) {
            setSelectedProject(updatedProject);
        }
    }
};

export const updateProjectDetails = (
    projectId: string,
    update: Partial<Pick<Project, 'name' | 'description'>>,
    projects: Project[],
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>,
    updateUserProjects: (projects: Project[]) => void,
    selectedProject: Project | null,
    setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>
) => {
    const updatedProjects = projects.map((p) => {
        if (p.id === projectId) {
            return { ...p, ...update };
        }
        return p;
    });
    setProjects(updatedProjects);
    updateUserProjects(updatedProjects);
    if (selectedProject && selectedProject.id === projectId) {
        const updatedProject = updatedProjects.find((p) => p.id === projectId);
        if (updatedProject) {
            setSelectedProject(updatedProject);
        }
    }
};

export const addMultipleDataPoints = (
    projectId: string,
    newPoints: DataPoint[],
    projects: Project[],
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>,
    updateUserProjects: (projects: Project[]) => void,
    selectedProject: Project | null,
    setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>
) => {
    if (!projectId || newPoints.length === 0) {
        console.error('Invalid projectId or empty newPoints array');
        return;
    }

    const updatedProjects = projects.map(p => {
        if (p.id === projectId) {
            // Check if newPoints are updates to existing data points or truly new ones
            const existingDataPointIds = new Set(p.data.map(d => d.id));
            const hasExistingIds = newPoints.some(newPoint => existingDataPointIds.has(newPoint.id));

            if (hasExistingIds) {
                // If newPoints contain existing IDs, assume it's an update and replace the data array
                return { ...p, data: newPoints };
            } else {
                // Otherwise, append the new data points
                return { ...p, data: [...p.data, ...newPoints] };
            }
        }
        return p;
    });

    setProjects(updatedProjects);
    updateUserProjects(updatedProjects);

    if (selectedProject && selectedProject.id === projectId) {
        const updatedProject = updatedProjects.find(p => p.id === projectId);
        if (updatedProject) {
            setSelectedProject(updatedProject);
        }
    }
};

export const handlePasteData = (
    pastedData: string,
    setParsedPastedHeaders: React.Dispatch<React.SetStateAction<{ id: string; name: string; }[]>>,
    setParsedPastedRows: React.Dispatch<React.SetStateAction<{ id: string; cells: string[]; }[]>>,
    setLabelColumnIndex: React.Dispatch<React.SetStateAction<number | null>>,
    setValueColumnIndex: React.Dispatch<React.SetStateAction<number | null>>,
    setShowPasteDataModal: React.Dispatch<React.SetStateAction<boolean>>,
    setPastedData: React.Dispatch<React.SetStateAction<string>>,
    toast: typeof ToastType
) => {
    if (!pastedData.trim()) {
        toast.error("No data to paste.");
        return;
    }

    const lines = pastedData.trim().split(/\r\n|\n|\r/);
    const headers = lines[0].split(/\t|,/).map(h => ({ id: crypto.randomUUID(), name: h }));
    const rows = lines.slice(1).map(line => ({ id: crypto.randomUUID(), cells: line.split(/\t|,/) }));

    setParsedPastedHeaders(headers);
    setParsedPastedRows(rows);
    setLabelColumnIndex(null);
    setValueColumnIndex(null);
    setShowPasteDataModal(true); // Open modal to show preview and mapping
    setPastedData(''); // Clear pasted data after processing
};

export const removeDataPoint = (
    projectId: string,
    dataPointId: string,
    projects: Project[],
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>,
    updateUserProjects: (projects: Project[]) => void,
    selectedProject: Project | null,
    setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>
) => {
    const updatedProjects = projects.map((p) => {
        if (p.id === projectId) {
            return { ...p, data: p.data.filter((d) => d.id !== dataPointId) };
        }
        return p;
    });
    setProjects(updatedProjects);
    updateUserProjects(updatedProjects);
    if (selectedProject && selectedProject.id === projectId) {
        const updatedProject = updatedProjects.find((p) => p.id === projectId);
        if (updatedProject) {
            setSelectedProject(updatedProject);
        }
    }
};

export const updateDataPointColor = (
    projectId: string,
    dataPointId: string,
    color: string,
    projects: Project[],
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>,
    updateUserProjects: (projects: Project[]) => void,
    selectedProject: Project | null,
    setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>,
    valueKey: 'value' | 'value2' = 'value'
) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project || (project.chartType !== 'pie' && project.chartType !== 'donut')) {
        return; // Only allow color changes for pie and donut charts
    }

    const updatedProjects = projects.map((p) => {
        if (p.id === projectId) {
            return {
                ...p,
                data: p.data.map((d) =>
                    d.id === dataPointId
                        ? { ...d, [valueKey === 'value' ? 'color' : 'color2']: color } // Update color or color2
                        : d
                ),
            };
        }
        return p;
    });
    setProjects(updatedProjects);
    updateUserProjects(updatedProjects);
    if (selectedProject && selectedProject.id === projectId) {
        const updatedProject = updatedProjects.find((p) => p.id === projectId);
        if (updatedProject) {
            setSelectedProject(updatedProject);
        }
    }
};

