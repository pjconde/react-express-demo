import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Task } from '../app/models/state.models';
import { connectDB } from './connect-db';
import { UpdateTaskReq } from '../app/models/forms.models';
import './initialize-db';
import { authenticationRoute } from './authenticate';

const port = 7777;
const app = express();

function logger() {
    console.log('Server listening on port...', port)
}

app.listen(port, logger);

app.use(
    cors(),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json()
);

authenticationRoute(app);

export async function addNewtask(task: Task) {
    const db = await connectDB();
    const collection = db.collection(`tasks`);
    await collection.insertOne(task);
}

export async function updateTask(updatedTask: UpdateTaskReq) {
    const db = await connectDB();
    const collection = db.collection(`tasks`);
    const id = updatedTask.taskId;
    if (updatedTask.name) {
        await collection.updateOne(
            {id}, 
            {$set: {name : updatedTask.name}}
        )
    }
    if (updatedTask.groupId) {
        await collection.updateOne(
            {id}, 
            {$set: {group : updatedTask.groupId}}
        )
    }
    if (updatedTask.isComplete !== undefined) {
        await collection.updateOne(
            {id}, 
            {$set: {isComplete : updatedTask.isComplete}}
        )
    }
}

app.post('/task/new', async (req, res) => {
    const task: Task = req.body.task;
    await addNewtask(task);
    res.status(200).send();
});

app.post('/task/update', async (req, res) => {
    const task: UpdateTaskReq = req.body.task;
    await updateTask(task);
    res.status(200).send();
});