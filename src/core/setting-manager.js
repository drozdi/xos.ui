import { Setting, SettingManager } from '../lib';
import config from './config';

const settingManager = new SettingManager({
	CONFIG: config,
	APP: Setting({}, {}, 'HKEY_APPLICATION'),
	LAYOUT: Setting({}, {}, 'HKEY_LAYOUT'),
	MODAL: Setting({}, {}, 'HKEY_MODAL'),
	WINDOW: Setting({}, {}, 'HKEY_WINDOWS'),
});

export default settingManager;
