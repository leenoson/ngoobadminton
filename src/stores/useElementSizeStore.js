// stores/useElementSizeStore.js
import { create } from "zustand"

export const useElementSizeStore = create((set) => ({
  sizes: {},

  setSize: (key, size) =>
    set((state) => ({
      sizes: {
        ...state.sizes,
        [key]: size,
      },
    })),

  getSize: (key) => (state) => state.sizes[key],
}))
