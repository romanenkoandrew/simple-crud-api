import { User, UserWithoutId } from "../../models/user/index"
import { generateUUID } from "../../utils"


const users: User[] = []

export const getAllUsers = () => {
    return users
}

export const createUser = (user: UserWithoutId): User => {
    const id = generateUUID()
    const newUser = { id, ...user }
    users.push(newUser)
    return newUser
}