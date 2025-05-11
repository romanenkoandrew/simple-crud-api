import { IncomingMessage, ServerResponse } from "node:http"
import { UserWithoutId } from "../../models/user"
import { createUser, getAllUsers, getUserById } from "../../services/user/index"
import { parseRequestBody } from "../../utils"

export type HandlerData = {
    req: IncomingMessage
    res: ServerResponse
    params?: Record<string, string>
}

export const getUsersHandler = async (data: HandlerData): Promise<void> => {
    const { res } = data
    const users = getAllUsers()
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify(users))
}

export const createUserHandler = async (data: HandlerData): Promise<void> => {
    const { req, res } = data
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

export const getUserByIdHandler = async (data: HandlerData): Promise<void> => {
    const { req, res, params } = data
    res.setHeader('Content-Type', 'application/json')

    if (!params || !params.id) {
        res.statusCode = 400
        res.end(JSON.stringify({error: 'Invalid user id'}))
        return
    }

    const user = getUserById(params.id)

    if (user) {
        res.statusCode = 200
        res.end(JSON.stringify(user))
        return
    }

    res.statusCode = 404
    res.end(JSON.stringify({error: 'User not found'}))
}