export interface TaskItem {
    id: string;
    title: string;
    description?: string | null;
    isCompleted: boolean;
    lastTimeModified: string;
}