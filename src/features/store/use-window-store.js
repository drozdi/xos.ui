import { v4 as uuid } from 'uuid'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

//icons = "reload collapse fullscreen close",

const defProps = {
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
}

export const useWindowStore = create(persist(
  (set, get) => ({
    windows: [],
    apps: {},
    
    // Window Manager API
    openWindow: (config) => {
      const id = uuid()
      set(state => ({
        windows: [...state.windows, {
          id,
          appId: config.appId,
          title: config.title,
          position: { x: 100, y: 100 },
          size: config.size || { width: 600, height: 400 },
          isMinimized: false,
          isMaximized: false,
          zIndex: Math.max(...state.windows.map(w => w.zIndex), 0) + 1
        }]
      }))
      return id
    },
    
    closeWindow: (id) => set(state => ({
      windows: state.windows.filter(w => w.id !== id)
    })),
    
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
  { name: 'window-storage' }
))