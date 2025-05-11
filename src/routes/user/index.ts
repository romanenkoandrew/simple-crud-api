import { createUserHandler, getUsersHandler } from "../../controllers/user/index"

export const userRoutes = [
  { method: 'GET', path: '/users', handler: getUsersHandler },
  { method: 'POST', path: '/users', handler: createUserHandler },
];