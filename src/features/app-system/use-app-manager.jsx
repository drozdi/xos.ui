import { v4 as uuid } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import settingManager from "../../entites/core/setting-manager";
import { parameterize } from "../../shared/utils/request";
import { AppProvider } from "../app";
import { App } from "../app/lib/App";
import { windowManager } from '../window-system/window-manager';


const getName = (appName) => appName.displayName || appName;
const genPath = (conf) => parameterize(conf.pathName || "", conf);
const get$App = (instance) => instance?.props?.app || instance;
const genId = () => `app-${uuid()}`;
const createRoot = () => {
  const container = document.createElement("div");
  document.body.prepend(container);
  return createRoot(container);
};

const mountRoot = (app) => {
    try {
      app = get$App(app);
      if (!app.root) {
        app.root = createRoot();
      }
      app.root.render(app.element);
    } catch (error) {
      console.error("Error mounting app:", error);
      throw error;
    }
  };

  const unMountRoot = (app) => {
		try {
			const container = app.root?._internalRoot.containerInfo;
			app.root?.unmount();
			if (container) {
				container.remove();
			}
		} catch (error) {
			console.error("Error unmounting app:", error);
			throw error;
		}
	};


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
      // Метод регистрации приложения
      register(appName, conf = {}) {
        const name = getName(appName);
        set(state => ({
          apps: { ...state.apps, [name]: conf }
        }));
      },

      constApp(conf, pathName = null) {
        const $app = new App(conf);
        $app.pathName = conf.pathName;
        
        $app.on("activated", () => {
          set({ activeApp: pathName });
        });
    
        $app.on("deactivated", () => {
          if (get().activeApp === pathName) {
            set({ activeApp: null });
          }
        });
    
        $app.on("close", () => {
          get().removeApp($app);
          get().unMountRoot($app);
        });
    
        return $app;
      },

      providerApp(Component, { app, ...conf }) {
        return (app.element = (
          <AppProvider app={app}>
            <Component {...conf} />
          </AppProvider>
        ));
      },

      buildApp(Component, _conf = {}, mount = true) {
        try {
          const { apps, providerApp, constApp } = get();
          const appConfig = apps[getName(Component)] || {};
          const { pathName, ...conf } = { ...appConfig, ..._conf };
    
          const processedComponent = {
            component: Component,
            ...appConfig,
          }.component;
    
          const generatedPath = genPath({ pathName, ...conf });
    
          if (!generatedPath) {
            return providerApp(processedComponent, {
              app: constApp({ smKey: _conf.smKey }),
              ...conf
            });
          }
    
          if (!get().runs[generatedPath]) {
            const newApp = providerApp(processedComponent, {
              app: constApp({ smKey: _conf.smKey }, generatedPath),
              ...conf
            });
            
            set(state => ({
              runs: { ...state.runs, [generatedPath]: newApp }
            }));
    
            mount && mountRoot(get().runs[generatedPath]);
          } else {
            get$App(get().runs[generatedPath])?.active();
          }
    
          return get().runs[generatedPath];
        } catch (error) {
          console.error("Error building app:", error);
          throw error;
        }
      },

      createApp(Component, conf = {}, save = true) {
        try {
          conf.smKey = conf.smKey ?? this.genId();
          const $app = this.get$App(this.buildApp(Component, conf));
          if ($app.smKey === conf.smKey && save) {
            let runs = settingManager.APP.get("run", []);
            runs.push($app.smKey);
            settingManager.APP.set($app.smKey, {
              id: this.id,
              conf: conf,
              smKey: $app.smKey,
              appName: this.getName(Component),
            });
            settingManager.APP.set("run", runs);
          }
        } catch (error) {
          console.error("Error creating app:", error);
          throw error;
        }
      },
      removeApp($app) {
        try {
          $app = this.get$App($app);
          let smKey = $app.smKey;
          let pathName = $app.pathName;
          let runs = settingManager.APP.get("run", []);
          runs = runs.filter((val) => val != smKey);
          settingManager.APP.remove(smKey);
          settingManager.APP.set("run", runs);
          delete this.runs[pathName];
        } catch (error) {
          console.error("Error removing app:", error);
          throw error;
        }
      },
      reloadApps() {
        try {
          let runs = settingManager.APP.get("run", []);
          runs.forEach((smKey) => {
            let info = settingManager.APP.get(smKey, {
              id: 0,
              conf: {},
              smKey: smKey,
              appName: "",
            });
            this.id = Math.max(info.id, this.id);
            let Component = info.appName;
            this.buildApp(Component, info.conf);
          });
        } catch (error) {
          console.error("Error reloading apps:", error);
          throw error;
        }
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
