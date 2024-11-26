"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { StudentRoutes } from '../modules/student/student.route';
const user_route_1 = require("../modules/user/user.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.UserRotues,
    },
    // {
    //   path: '/students',
    //   route: StudentRoutes,
    // },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
