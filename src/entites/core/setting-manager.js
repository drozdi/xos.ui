import { Setting, SettingManager } from "../lib";
import config from "./config";

const settingManager = new SettingManager({
	CONFIG: config,
	APP: Setting({}, {}, "HKEY_APPLICATION"),
	LAYOUT: Setting(
		{
			left: {
				width: 300,
				open: true,
				mini: true,
			},
			right: {
				width: 300,
				open: true,
				mini: true,
			},
		},
		{},
		"HKEY_LAYOUT"
	),
	MODAL: Setting({}, {}, "HKEY_MODAL"),
	WINDOW: Setting(
		{
			position: {
				top: 50,
				left: 50,
				width: 300,
				height: 300,
				zIndex: 100,
			},
			state: {
				isFullscreen: false,
				isCollapse: false,
				active: false,
				def: true,
			},
		},
		{},
		"HKEY_WINDOWS"
	),
	FORM: Setting({}, {}, "WIN_FORM"),
	TABLE: Setting({}, {}, "WIN_TABLE"),
});

export default settingManager;
