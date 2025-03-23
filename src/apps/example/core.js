import { lazy } from "react";
import appsManager from "../../entites/core/apps-manager";

appsManager.register("apps/example/app", {
	pathName: "example-app",
	wmGroup: "example-app",
	component: lazy(() => import("./app")),
	wmSort: 1,
});
