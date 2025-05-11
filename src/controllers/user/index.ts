import { IncomingMessage, ServerResponse } from "node:http"
import { UserWithoutId } from "../../models/user"
import { createUser, getAllUsers } from "../../services/user/index"
import { parseRequestBody } from "../../utils"

export const getUsersHandler = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    const users = getAllUsers()
    res.statusCode = 200
    res.end(JSON.stringify(users))
}

export const createUserHandler = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    const body = await parseRequestBody<UserWithoutId>(req)

    const { username, age, hobbies } = body

    if (!username || !age || !hobbies) {
        res.statusCode = 400
        res.end(JSON.stringify({ error: 'Missing title or content' }))
    }

    const user = createUser({ username, age, hobbies });
    res.statusCode = 201;
    res.end(JSON.stringify(user));
}