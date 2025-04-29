import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { parameterize } from "../../shared/utils/request";
import { windowManager } from '../window-system/window-manager';

const getName = (appName) => {
  return appName.displayName || appName;
}
const genPath = (conf) => {
  return parameterize(conf.pathName || "", conf);
}

export const useAppManager = create(
  persist(
    (set, get) => ({
      apps: {}, // Зарегистрированные приложения
	    runs: {}, // Запущенные приложения

      id: 0, // Идентификатор приложения
	    activeApp: null, // Активное приложение

      get(appName) {
        const name = getName(appName);
        return get().apps[name];
      },

      register(appName, conf = {}) {
        const name = getName(appName);
        set(state => ({
          apps: { ...state.apps, [name]: conf }
        }));
      },

      // Метод регистрации приложения
      registerApp: (appConfig) => {
        const defaultConfig = {
          minSize: { width: 400, height: 300 },
          maxSize: { width: 2000, height: 2000 },
          icon: '🖥️',
          canMultiple: false,
          ...appConfig
        };
        
        set(state => ({
          apps: {
            ...state.apps,
            [appConfig.id]: defaultConfig
          }
        }));
        
      },
      
      // Метод запуска приложения
      launchApp: async (appId, options = {}) => {
        const app = get().apps[appId];
        if (!app) throw new Error(`App ${appId} not registered`);
        
        // Проверка на возможность множественного запуска
        if (!app.canMultiple) {
          const existing = windowManager.getWindows().find(w => w.appId === appId);
          if (existing) {
            windowManager.focus(existing.id);
            return existing.id;
          }
        }
        
        // Динамическая загрузка компонента
        const Component = await app.loader();
        
        // Создание окна
        const windowId = windowManager.open({
          appId,
          title: app.title,
          minSize: app.minSize,
          maxSize: app.maxSize,
          icon: app.icon,
          content: <AppContainer appId={appId} component={Component} />
        });
        
        // Обновление истории
        set(state => ({
          runs: [...state.runs.filter(id => id !== appId), appId]
        }));
        
        return windowId;
      },
      
      // Восстановление сессии
      restoreSession: async () => {
        const savedWindows = windowManager.getWindows();
        for (const window of savedWindows) {
          if (get().apps[window.appId]) {
            await get().launchApp(window.appId, {
              skipHistory: true,
              windowState: window
            });
          }
        }
      }
    }),
    {
      name: 'app-manager',
      partialize: (state) => ({ runs: state.runs })
    }
  )
);
