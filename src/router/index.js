import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: "/",
    component: () => import("@/views/HomeView")
  },
  {
    path: "/reviews",
    name: "review-main",
    component: () => import("@/views/ReviewView")
  },
  {
    path: "/review/:id",
    name: "review-detail",
    component: () => import("@/views/detail/ReviewView")
  },
  {
    path: "/lectures",
    name: "lecture-main",
    component: () => import("@/views/LectureView")
  },
  {
    path: "/lecture/:id",
    name: "lecture-detail",
    component: () => import("@/views/detail/LectureView")
  },
  {
    path: "/lookup",
    name: "lookup-main",
    component: () => import("@/views/LookupView")
  },
  {
    path: "/singles",
    name: "single-main",
    component: () => import("@/views/SingleView")
  },
  {
    path: "/single/:id",
    name: "single-detail",
    component: () => import("@/views/detail/SingleView")
  },
  {
    path: "/*",
    component: () => import("@/views/NotFoundView")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;