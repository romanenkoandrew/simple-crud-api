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

export const getUserById = (id: string): User | undefined => {
    return users.find(el => el.id === id)
}

export const removeUser = (id: string): boolean => {
    const index = users.findIndex(user => user.id === id)

    if (index !== -1) {
        users.splice(index, 1)
        return true
    }

    return false
}