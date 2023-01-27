import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./style.css";
import App from "./App.vue";
import Home from "./pages/Home.vue";
import Agents from "./pages/Agents.vue";
import Maps from "./pages/Maps.vue";
import Weapons from "./pages/Weapons.vue";
import Tiers from "./pages/Tiers.vue";
import Peripherals from "./pages/Peripherals.vue";
import NotFound from "./pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/agents", component: Agents },
    { path: "/maps", component: Maps },
    { path: "/weapons", component: Weapons },
    { path: "/tiers", component: Tiers },
    { path: "/peripherals", component: Peripherals },
    { path: "/:pathMatch(.*)*", component: NotFound },
  ],
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

createApp(App).use(router).mount("#app");
