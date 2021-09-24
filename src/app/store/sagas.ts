import {
    take,
    put,
    all,
    takeEvery
} from 'redux-saga/effects';
import * as mutations from './mutations'
import uuid from 'uuid';
import Axios from 'axios';
import { Task } from '../models/state.models';
import { UpdateTaskReq } from '../models/forms.models';
import { history } from './history';

const url = "http://localhost:7777";

function* taskCreationSaga() {
    while(true) {
        const {groupId} = yield take(mutations.REQUEST_TASK_CREATION);
        const ownerId = `U1`;
        const taskId = uuid.v4();
        const updatedTask: Task = {
            id: taskId,
            owner: ownerId,
            group: groupId,
            isComplete: false,
            name: "New Task"
        }
        yield put(mutations.creatTask(taskId, groupId, ownerId))
        const { res } = yield Axios.post(url + `/task/new`, { task: updatedTask})
        return;
    }
}

function* taskModificationSaga() {
    while(true) {
        const task: UpdateTaskReq = yield take([
            mutations.SET_TASK_COMPLETE,
            mutations.SET_TASK_GROUP,
            mutations.SET_TASK_NAME
        ]);
        Axios.post(url + `/task/update`, { task: task})
    }
}

function* userAuthSaga() {
    while(true) {
        const {username, password} = yield take(mutations.REQUEST_AUTH_USER);
        try {
            const { data } = yield Axios.post(url + `/authenticate`, {username, password});
            if (!data) {
                throw new Error();
            }

            console.log('Authenitcated!', data);

            yield put(mutations.setState(data.state));
            yield put(mutations.processAuthicateUser(mutations.AUTHENTICATED));

            history.push('/dashboard');
        } catch (e) {
            console.log("Cannot authenticate");
            yield put(mutations.processAuthicateUser(mutations.NOT_AUTHENTICATED));
        }
    }
}

function* allSagas() {
    yield all([
        takeEvery(mutations.REQUEST_TASK_CREATION, taskCreationSaga),
        takeEvery(mutations.SET_TASK_COMPLETE, taskModificationSaga),
        takeEvery(mutations.SET_TASK_GROUP, taskModificationSaga),
        takeEvery(mutations.SET_TASK_NAME, taskModificationSaga),
        takeEvery(mutations.REQUEST_AUTH_USER, userAuthSaga)
    ])
}

export default allSagas;