import { lazy } from "react";
import appsManager from "../../entites/core/apps-manager";

appsManager.register("apps/calculator/app", {
	component: lazy(() => import("./app")),
	pathName: "calculator-app",
	wmGroup: "calculator-app",
	wmSort: 1,
});
