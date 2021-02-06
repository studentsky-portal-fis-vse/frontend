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
    component: () =>
      import("../views/Register.vue")
  },{
    path: "/login",
    name: "Login",
    component: () =>
      import("../views/Login.vue")
  },{
    path: "/materials",
    name: "Materials",
    component: () =>
      import("../views/Materials.vue")
  },{
    path: "/teachers",
    name: "Teachers",
    component: () =>
      import("../views/Teachers.vue")
  },{
    path: "/Subjects",
    name: "Subjects",
    component: () =>
      import("../views/Subjects.vue")
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

export default router;