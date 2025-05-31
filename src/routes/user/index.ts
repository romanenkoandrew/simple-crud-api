import { 
  createUserHandler,
  getUsersHandler,
  getUserByIdHandler,
  removeUserHandler,
  updateUserHandler
} from "../../controllers/user/index"

export const userRoutes = [
  { method: 'GET', path: '/users', handler: getUsersHandler },
  { method: 'POST', path: '/users', handler: createUserHandler },
  { method: 'GET', path: '/users/:id', handler: getUserByIdHandler },
  { method: 'PATCH', path: '/users/:id', handler: updateUserHandler },
  { method: 'DELETE', path: '/users/:id', handler: removeUserHandler },
];