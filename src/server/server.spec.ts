import { addNewtask, updateTask } from "./server";


async function checkServer() {
    await addNewtask({
        name: "New Task",
        id: "123456",
        group: "G1",
        owner: "U1",
        isComplete: false
    });

    await updateTask({
        name: "New Task - Updated",
        id: "123456",
        group: "G1",
        owner: "U1",
        isComplete: false
    })
}

checkServer();
