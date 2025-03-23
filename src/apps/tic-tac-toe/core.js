import { lazy } from "react";
import appsManager from "../../entites/core/apps-manager";

appsManager.register("apps/tic-tac-toe/app", {
	pathName: "tic-tac-toe-app",
	wmGroup: "tic-tac-toe-app",
	component: lazy(() => import("./app")),
	wmSort: 1,
});
