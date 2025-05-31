import { userRoutes } from './user/index';
import { Route } from './types';

export const routes: Route[] = [
  ...userRoutes,
];