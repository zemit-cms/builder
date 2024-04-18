// Utilities
import { defineStore } from 'pinia'

export interface ISessionState {
  altKeyActivated: boolean,
  ctrlKeyActivated: boolean,
  shiftKeyActivated: boolean,
  settings: {
    opened: boolean,
  },
}

export const useSessionStore = defineStore<string, ISessionState>('session', {
  state: () => ({
    altKeyActivated: false,
    ctrlKeyActivated: false,
    shiftKeyActivated: false,
    settings: {
      opened: false,
    },
  }),
})
