import { Setting, SettingManager } from "../../shared/lib";
import config from "./config";

const settingManager = new SettingManager({
	CONFIG: config,
	APP: Setting({}, {}, "HKEY_APPLICATION"),
	LAYOUT: Setting({}, {}, "HKEY_LAYOUT"),
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
			},
		},
		{},
		"HKEY_WINDOWS"
	),
	FORM: Setting({}, {}, "WIN_FORM"),
	TABLE: Setting({}, {}, "WIN_TABLE"),
});

export default settingManager;
