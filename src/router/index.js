import { createRouter, createWebHistory } from 'vue-router';

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
    path: "/comment/create/:id",
    name: "create-comment",
    component: () => import("@/views/detail/CreateCommentView")
  },
  {
    path: "/comment/edit/:id",
    name: "edit-comment",
    component: () => import("@/views/detail/EditCommentView")
  },
  {
    path: "/lookup",
    name: "lookup-main",
    component: () => import("@/views/LookupView")
  },
  {
    path: "/archive",
    name: "archive-main",
    component: () => import("@/views/ArchiveView")
  },
  {
    path: "/single/:id",
    name: "single-detail",
    component: () => import("@/views/detail/SingleView")
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/NotFoundView")
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

export default router;