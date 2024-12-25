"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { StudentRoutes } from '../modules/student/student.route';
const user_route_1 = require("../modules/user/user.route");
const student_route_1 = require("../modules/student/student.route");
const academicSemester_Route_1 = require("../modules/academicSemester/academicSemester.Route");
const academicFaculty_route_1 = require("../modules/academicFaculty/academicFaculty.route");
const academicDepartment_route_1 = require("../modules/academicDepartment/academicDepartment.route");
const faculty_route_1 = require("../modules/Faculty/faculty.route");
const admin_route_1 = require("../modules/Admin/admin.route");
const course_Route_1 = require("../modules/Course/course.Route");
const semesterRegistration_route_1 = require("../modules/semesterRegistration/semesterRegistration.route");
const OfferedCourse_route_1 = require("../modules/OfferedCourse/OfferedCourse.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const enrolledCourse_route_1 = require("../modules/EnrolledCourse/enrolledCourse.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.UserRotues,
    },
    {
        path: '/students',
        route: student_route_1.StudentRoutes,
    },
    {
        path: '/faculties',
        route: faculty_route_1.FacultyRoutes,
    },
    {
        path: '/admins',
        route: admin_route_1.AdminRoutes,
    },
    {
        path: '/academic-semesters',
        route: academicSemester_Route_1.AcademicSemesterRoutes,
    },
    {
        path: '/academic-faculties',
        route: academicFaculty_route_1.AcademicFacultyRoutes,
    },
    {
        path: '/academic-departments',
        route: academicDepartment_route_1.AcademicDepartmentRoutes,
    },
    {
        path: '/courses',
        route: course_Route_1.CourseRoutes,
    },
    {
        path: '/semester-registrations',
        route: semesterRegistration_route_1.semesterRegistrationRoutes,
    },
    {
        path: '/offered-courses',
        route: OfferedCourse_route_1.offeredCourseRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/enrolled-courses',
        route: enrolledCourse_route_1.EnrolledRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
