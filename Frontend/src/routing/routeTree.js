import {createRootRoute} from "@tanstack/react-router";
import RootLayout from "../RootLayout.jsx";
import { authRoute } from "./auth.route.js";
import { dashboardRoute } from "./dashboard.route.js";
import { homepageRoute } from "./homepage.route.js";

export const rootRoute = createRootRoute({
  component: RootLayout,
});

export default rootRoute;

export const routeTree  = rootRoute.addChildren([ 
    authRoute, 
    dashboardRoute, 
    homepageRoute
])

