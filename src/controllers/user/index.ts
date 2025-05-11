import { getAllUsers } from "../../services/user/index"

export function getUsersHandler(): Promise<string> {
    return new Promise((res) => {
        const posts = getAllUsers()
        res(JSON.stringify(posts))
    })
  }