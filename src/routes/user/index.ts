import { createUserHandler, getUsersHandler, getUserByIdHandler } from "../../controllers/user/index"

export const userRoutes = [
  { method: 'GET', path: '/users', handler: getUsersHandler },
  { method: 'POST', path: '/users', handler: createUserHandler },
  { method: 'GET', path: '/users/:id', handler: getUserByIdHandler },
];