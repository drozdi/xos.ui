import "@mdi/font/css/materialdesignicons.min.css";
import "@style";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import XOS from "./entites/core";

XOS.app(
	App,
	{
		smKey: "core",
	},
	createRoot(document.getElementById("root"))
);
