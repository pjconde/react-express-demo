import { Group, Task } from "./state.models";

export interface DashboardProps {
    groups: Group[]
}

export interface TaskListProps {
    groupName: string,
    groupId: string,
    tasks: Task[],
    createNewTask: (groupId: string) => void
}

export interface TaskDetailProps {
    id: string,
    comments: Comment[],
    task: Task,
    isComplete: boolean,
    groups: Group[],
    setTaskCompletion: (id: string, isComplete: boolean) => void,
    setTaskGroup: (e: React.ChangeEvent<HTMLSelectElement>) => void
    setTaskName: (e: React.ChangeEvent<HTMLInputElement>) => void
}