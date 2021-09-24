import { appState } from "../app/models/state.models";
import md5 from "md5";

export const defaultState: appState = {
    users: [
        {
            id: "U1",
            name: "Dev",
            passwordHash: md5("password")
        },
        {
            id: "U2",
            name: "C. Eeyo",
            passwordHash: md5("5stripes")
        }
    ],
    groups: [
        {
            name: "To Do", 
            id: "G1",
            owner: "U1"
        },
        {
            name: "Doing", 
            id: "G2",
            owner: "U1"
        },
        {
            name: "Done", 
            id: "G3",
            owner: "U1"
        }
    ],
    tasks: [
        {
            name: "Do tests",
            id: "T1",
            group: "G1",
            owner: "U1",
            isComplete: false
        },
        {
            name: "Do refactor",
            id: "T2",
            group: "G1",
            owner: "U1",
            isComplete: false
        },
        {
            name: "Meet with CTO",
            id: "T3",
            group: "G3",
            owner: "U1",
            isComplete: true
        },
        {
            name: "Lunch",
            id: "T4",
            group: "G2",
            owner: "U1",
            isComplete: true
        },
    ],
    comments: [
        {
            owner: "U1",
            id: "C1",
            task: "T1",
            content: "Great work"
        }
    ],
    session: {
        authenticated: false
    }
}