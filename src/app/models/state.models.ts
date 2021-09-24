export interface appState {
    users: User[],
    groups: Group[],
    tasks: Task[],
    comments: Comment[]
    session: Auth
}

export interface User {
    id: string,
    name: string,
    passwordHash: string
}

export interface Group {
    name: string,
    id: string,
    owner: string
}

export interface Task {
    name: string,
    id: string,
    group: string,
    owner: string,
    isComplete: boolean
}

export interface Comment {
    owner: string,
    id: string,
    task: string,
    content: string
}

export interface Auth {
    authenticated: boolean
}