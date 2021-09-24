import uuid from 'uuid';
import md5 from 'md5';
import { connectDB} from './connect-db';
import { User, Task, Group } from '../app/models/state.models';

const authenticateTokens = [];

async function assembleUserState(user: User) {
    const db = await connectDB();

    const tasks: Task[] = await db.collection(`tasks`).find({owner: user.id}).toArray();
    const groups: Group[] = await await db.collection(`groups`).find({owner: user.id}).toArray();

    return {
        tasks,
        groups,
        session: {authenticated: `AUTHENTICATED`, id: user.id}
    }
}

export const authenticationRoute = (app: any) => {
    app.post(`/authenticate`, async (req: any, res: any) => {
        const {username, password} = req.body;
        const db = await connectDB();
        const collection = db.collection(`users`);
        const user = await collection.findOne({name:username});

        if (!user) {
            return res.status(500).send('User not found');
        }

        const hash = md5(password);
        const passwordMatch = hash === user.passwordHash;

        if (!passwordMatch) {
            return res.status(500).send('Password incorrect');
        }

        const token = uuid.v4();
        authenticateTokens.push({
            token,
            userId: user.id
        })

        const state = await assembleUserState(user);
        res.send({token, state});
    });
}