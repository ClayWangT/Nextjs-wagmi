import { createModel } from '@rematch/core'
import { RootModel } from '.'

export interface ProjectState {
  isMounted: boolean
}

export const project = createModel<RootModel>()({
  state: {
    isMounted: false,
  } as ProjectState,
  reducers: {
    setIsMounted(state, isMounted: boolean) {
      state.isMounted = isMounted;
      return state;
    }
  },
})