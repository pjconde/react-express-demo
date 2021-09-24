import { createStore, applyMiddleware, combineReducers } from 'redux';
import { defaultState } from '../../server/defaultState';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas';
import * as mutations from './mutations';
import { Task, Group, User, Comment, Auth } from '../models/state.models';

const sagaMiddleWare = createSagaMiddleware();

export const store = createStore(
    combineReducers({
        session(userSession: Auth = defaultState.session || {}, action) {
            const {type, authenticated, session } = action;
            switch (type) {
                case mutations.SET_STATE:
                    return { ...userSession, id: action.state.session.id };
                case mutations.REQUEST_AUTH_USER:
                    return { ...userSession, authenticated: mutations.AUTHENTICATING };
                case mutations.PROCESSING_AUTH_USER:
                    return { ...userSession, authenticated };
                default:
                    return userSession;
            }
            return session;
        },
        tasks(tasks: Task[] = [], action) {
            switch(action.type) {
                case mutations.SET_STATE:
                    return action.state.tasks;
                case mutations.CREATE_TASK: 
                    return [...tasks, {
                        id: action.taskId,
                        name: "New Task",
                        group: action.groupId,
                        owner: action.ownerId,
                        isComplete: false
                    }];
                case mutations.SET_TASK_COMPLETE:
                    return tasks.map(task => {
                        return (task.id === action.taskId) ? 
                        {...task, isComplete: action.isComplete} 
                        : task
                    });
                case mutations.SET_TASK_GROUP:
                    return tasks.map(task => {
                        return (task.id === action.taskId) ? 
                        {...task, group: action.groupId} 
                        : task
                    });
                    case mutations.SET_TASK_NAME:
                        return tasks.map(task => {
                            return (task.id === action.taskId) ? 
                            {...task, name: action.name} 
                            : task
                        });
            }
            return tasks;
        },
        comments(comments: Comment[] = []) {
            return comments;
        },
        groups(groups: Group[] = defaultState.groups, action) {
            switch(action.type) {
                case mutations.SET_STATE:
                    return action.state.groups;
            }
            return groups;
        },
        users(users: User[] = []) {
            return users;
        }
    }),
    applyMiddleware(createLogger(), sagaMiddleWare)
)

sagaMiddleWare.run(rootSaga)