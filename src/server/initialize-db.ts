import { connectDB } from "./connect-db";
import { defaultState } from "./defaultState";

async function initializeDB() {
    let db = await connectDB();
    const user = await db.collection(`users`).findOne({id: "U1"});
    if (!user) {
        for (let [collectionName, values] of Object.entries(defaultState)) {
            if (collectionName === "sessions") continue;
            let collection = db.collection(collectionName);
            await collection.insertMany(values);
        }
    }
}

initializeDB();