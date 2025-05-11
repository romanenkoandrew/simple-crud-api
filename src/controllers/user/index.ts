import { IncomingMessage, ServerResponse } from "node:http"
import { UserWithoutId } from "../../models/user"
import { createUser, getAllUsers } from "../../services/user/index"
import { parseRequestBody } from "../../utils"

export const getUsersHandler = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    const users = getAllUsers()
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify(users))
}

export const createUserHandler = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    const body = await parseRequestBody<UserWithoutId>(req)
    res.setHeader('Content-Type', 'application/json')

    const { username, age, hobbies } = body

    if (!username || !age || !hobbies) {
        res.statusCode = 400
        res.end(JSON.stringify({ error: 'Missing required fields' }))
        return
    }

    if (
        typeof username !== 'string' 
        || typeof age !== 'number' 
        || !Array.isArray(hobbies)
        || !hobbies.every(el => typeof el === 'string')
    ) {
        res.statusCode = 400
        res.end(JSON.stringify({ error: 'Invalid required field type' }))
        return
    }

    const user = createUser({ username, age, hobbies })
    res.statusCode = 201
    res.end(JSON.stringify(user))
}