import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/contract/kasko",
    name: "KASKONew",
    component: () => import("../components/contracts/kasko/item.vue"),
  },

  {
    path: "/contract/safeCarAccident",
    name: "safeCarAccidentNew",
    component: () => import("../components/contracts/safeCarAccident/item.vue"),
  },
  {
    path: "/contract/safeCarAccident/:contractId",
    name: "safeCarAccidentContract",
    component: () => import("../components/contracts/safeCarAccident/item.vue"),
    props: true,
  },
  {
    path: "/journal/safeCarAccident",
    name: "safeCarAccidentJournal",
    component: () => import("../components/journals/safeCarAccident/item.vue"),
  },
  {
    path: "/journal/safeCarAccident/print/:id",
    name: "safeCarAccidentPrint",
    component: () => import("../components/journals/safeCarAccident/print.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
