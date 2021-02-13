import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/register",
    name: "Register",
    meta: { title: 'Registrace' },
    component: () =>
      import("../views/Register.vue")
  },{
    path: "/login",
    name: "Login",
    meta: { title: 'Přihlášení' },
    component: () =>
      import("../views/Login.vue")
  },{
    path: "/materials",
    name: "Materials",
    meta: { title: 'Studentské materiály' },
    component: () =>
      import("../views/Materials.vue")
  },{
    path: "/teachers",
    name: "Teachers",
    meta: { title: 'Přehled učitelů' },
    component: () =>
      import("../views/Teachers.vue")
  },{
    path: "/Subjects",
    name: "Subjects",
    meta: { title: 'Přehled předmětů' },
    component: () =>
      import("../views/Subjects.vue")
  },{
    path: "/discord",
    name: "Discord",
    meta: { title: 'Přehled diskord serverů' },
    component: () =>
      import("../views/Discord.vue")
  },{
    path: "/discord/verification",
    name: "DiscordVerification",
    meta: { title: 'Discord verifikace' },
    component: () =>
      import("../views/Discord-verification.vue")
  },{
    path: "/training",
    name: "Training",
    meta: { title: 'Terénování' },
    component: () =>
      import("../views/Training.vue")
  },{
    path: "/admin/users",
    name: "Users",
    meta: { title: 'Administrace - uživatelé' },
    component: () =>
      import("../views/Users.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

function patchRouterMethod (router, methodName)
{
    router['old' + methodName] = router[methodName]
    router[methodName] = async function (location)
    {
        return router['old' + methodName](location).catch((error) =>
        {
            if (error.name === 'NavigationDuplicated')
            {
                return this.currentRoute
            }
            throw error
        })
    }
}

patchRouterMethod(router, 'push')
patchRouterMethod(router, 'replace')

router.beforeEach((to, from, next) => {
  if(localStorage.token == null && to.fullPath !== "/register" && to.fullPath !== "/login")
    next("/login")
  else if(localStorage.token != null && (to.fullPath === "/register" || to.fullPath === "/login"))
    next("")
  next();
});

const DEFAULT_TITLE = 'Studentský portál VŠE';
router.afterEach((to) => {
    Vue.nextTick(() => {
        document.title = to.meta.title || DEFAULT_TITLE;
    });
});
export default router;