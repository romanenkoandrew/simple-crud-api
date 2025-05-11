import { getUsersHandler } from "../controllers/user/index"

export const routes: Record<
  string,
  Record<string, () => Promise<string>>
> = {
  '/users': {
    GET: getUsersHandler
  }
};