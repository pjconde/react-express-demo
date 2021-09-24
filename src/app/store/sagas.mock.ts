import {
    take,
    put,
    all,
    takeEvery
} from 'redux-saga/effects';

import * as mutations from './mutations'
import uuid from 'uuid';

function* taskCreationSaga() {
    while(true) {
        const {groupId} = yield take(mutations.REQUEST_TASK_CREATION);
        const ownerId = `U1`;
        const taskId = uuid.v4();
        yield put(mutations.creatTask(taskId, groupId, ownerId))
        console.log("Got group ID", groupId);
        return;
    }
}

function* allSagas() {
    yield all([
        takeEvery(mutations.REQUEST_TASK_CREATION, taskCreationSaga)
    ])
}

export default allSagas;

