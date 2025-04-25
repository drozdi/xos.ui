import { v4 as uuid } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

//icons = "reload collapse fullscreen close",

const def = {
  //className: PropTypes.string,
        //aspectFactor: PropTypes.number,
        //z: PropTypes.number,
        //title: PropTypes.string,
        //icons: PropTypes.string,
        //onFullscreen: PropTypes.func,
        //onCollapse: PropTypes.func,
        //onReload: PropTypes.func,
        //onClose: PropTypes.func,
        //resizable: PropTypes.bool,
        //draggable: PropTypes.bool,
        //wmGroup: PropTypes.string,
        //wmSort: PropTypes.number,
        parent: document.body,
        x: 'center',
        y: 'center',
        w: '50%',
        h: '50%',
        icons: "close",
};

export const useWindowManager = create(persist(
  (set, get) => ({
    focusedWindowId: null,
    windows: [],
    apps: {},
    
    // Window Manager API
    openWindow: (config) => {
      const id = uuid();
      const newWindow = {
        ...def,
        id,
        appId: config.appId,
        title: config.title,
        isMinimized: false,
        isMaximized: false,
        zIndex: get().windows.reduce((max, w) => Math.max(max, w.zIndex), 0) + 1,
        stateVersion: 0
      };

      set(state => ({
        windows: [...state.windows, newWindow],
        focusedWindowId: id
      }));

      return id;
    },

    
    closeWindow: (id) => {
      set(state => ({
        windows: state.windows.filter(w => w.id !== id),
        focusedWindowId: state.focusedWindowId === id ? null : state.focusedWindowId
      }));
    },
    
    focusWindow: (id) => set(state => ({
      windows: state.windows.map(w => ({
        ...w,
        zIndex: w.id === id ? Math.max(...state.windows.map(w => w.zIndex)) + 1 : w.zIndex
      }))
    })),
    
    // App Manager API
    registerApp: (appId, config) => set(state => ({
      apps: { ...state.apps, [appId]: config }
    }))
  }),
  { 
    name: 'window-storage',
    partialize: (state) => ({ windows: state.windows }),
    onRehydrateStorage: () => (state) => {
        //state?.windows.forEach(window => {
        //  eventBus.emit('windowRestored', { window });
       // });
    }
   }
))