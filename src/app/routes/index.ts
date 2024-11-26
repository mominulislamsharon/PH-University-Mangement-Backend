import {Router} from 'express'
// import { StudentRoutes } from '../modules/student/student.route';
import { UserRotues } from '../modules/user/user.route';
import { StudentRoutes } from '../modules/student/student.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRotues,
  },
  // {
  //   path: '/students',
  //   route: StudentRoutes,
  // },
]


moduleRoutes.forEach(route => router.use(route.path, route.route))


export default router;