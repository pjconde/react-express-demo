export const REQUEST_TASK_CREATION = `REQUEST_TASK_CREATION`;
export const CREATE_TASK = `CREATE_TASK`;
export const SET_TASK_COMPLETE = `SET_TASK_COMPLETE`;
export const SET_TASK_GROUP = `SET_TASK_GROUP`;
export const SET_TASK_NAME = `SET_TASK_NAME`;
export const REQUEST_AUTH_USER = `REQUEST_AUTH_USER`;
export const PROCESSING_AUTH_USER = `PROCESS_AUTH_USER`;
export const AUTHENTICATING = `AUTHENTICATING`;
export const AUTHENTICATED = `AUTHENTICATED`;
export const NOT_AUTHENTICATED = `NOT_AUTHENTICATED`;
export const SET_STATE = `SET_STATE`;

export const requestTaskCreation = (groupId: string) => ({
    type: REQUEST_TASK_CREATION,
    groupId
});

export const creatTask = (taskId: string, groupId: string, ownerId: string) => ({
    type: CREATE_TASK,
    taskId,
    groupId,
    ownerId
})

export const setTaskCompletion = (id: string, isComplete: boolean) => ({
    type: SET_TASK_COMPLETE,
    taskId: id,
    isComplete
})

export const setTaskGroup = (id: string, groupId: string) => ({
    type: SET_TASK_GROUP,
    taskId: id,
    groupId
})

export const setTaskName = (id: string, name: string) => ({
    type: SET_TASK_NAME,
    taskId: id,
    name
})

export const requestAuthUser = (username: string, password: string) => ({
    type: REQUEST_AUTH_USER,
    username,
    password
})

export const processAuthicateUser = (status = AUTHENTICATING, session = null) => ({
    type: PROCESSING_AUTH_USER,
    session,
    authenticated: status
})

export const setState = (state = {}) => ({
    type: SET_STATE,
    state
})