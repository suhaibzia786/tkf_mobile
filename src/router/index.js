import {createRouter, createWebHistory} from 'vue-router'
import {checkIfUserIsAuthenticated} from "@/utils/checkIfUserIsAuthenticated";
// lazy loading of pages
const AppLayout = () => import('../layouts/AppLayout.vue');
const AuthLayout = () => import('../layouts/AuthLayout.vue');
const BlankLayout = () => import('../layouts/BlankLayout.vue');
const Login = () => import('../views/Login.vue');
const Dashboard = () => import('../views/Dashboard.vue');
const IssueList = () => import('../views/IssueList/IssueList.vue');
const IssueDetail = () => import('../views/IssueList/IssueDetail.vue');
const IssueTracking = () => import('../views/IssueList/IssueTracking.vue');
const Attendance = () => import('../views/Attendance/Attendance.vue');
const Profile = () => import('../views/Profile.vue');
const NotFound = () => import('../views/NotFound.vue');
const LocationSetup = () => import('../views/LocationSetup.vue');

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: AuthLayout,
            children: [
                {
                    path: '/login',
                    name: 'login',
                    props: true,
                    component: Login
                },
                {
                    path: '/user/attendance',
                    name: 'user-attendance',
                    meta: {requiresAuth: true},
                    props: true,
                    component: LocationSetup
                },
            ]
        },
        {
            path: "/",
            component: AppLayout,
            children: [
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    meta: {requiresAuth: true},
                    props: true,
                    component: Dashboard
                },
                {
                    path: '/issue/list',
                    name: 'issue-list',
                    meta: {requiresAuth: true},
                    props: true,
                    component: IssueList
                },
                {
                    path: '/issue/detailing/:data_id/:session_id/:user_id/:data_type/:issue_type/:issue_title',
                    name: 'issue-detailing',
                    meta: {requiresAuth: true},
                    props: true,
                    component: IssueDetail
                },
                {
                    path: '/issue/tracking/:data_id/:session_id/:user_id/:data_type/:issue_type/:issue_title',
                    name: 'issue-tracking',
                    meta: {requiresAuth: true},
                    props: true,
                    component: IssueTracking
                },
                {
                    path: '/user/profile',
                    name: 'user-profile',
                    meta: {requiresAuth: true},
                    props: true,
                    component: Profile
                },
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = checkIfUserIsAuthenticated(); // Implement your authentication logic here

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        // The route requires authentication
        if (!isAuthenticated) {
            // User is not authenticated, redirect to log in or unauthorized page
            next('/login'); // or next('/unauthorized')
        } else {
            // User is authenticated, proceed with navigation
            next();
        }
    } else {
        // The route does not require authentication, proceed with navigation
        next();
    }
});

export default router
