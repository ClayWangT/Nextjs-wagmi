import {init, RematchDispatch, RematchRootState, RematchStore} from '@rematch/core'
import loading, { ExtraModelsFromLoading } from '@rematch/loading'
import updated, { ExtraModelsFromUpdated } from '@rematch/updated'
import persist from '@rematch/persist'
import storage from 'redux-persist/lib/storage'
import immerPlugin from '@rematch/immer'
import { models, RootModel } from './models'
import checkIsMounted from "./utils/checkIsMounted";

type FullModel = ExtraModelsFromLoading<RootModel> &
  ExtraModelsFromUpdated<RootModel>;

const KEY_OF_STORE = 'test-redux-store';

export const getStore = () => {
  if (!checkIsMounted()) {
    return init<RootModel, FullModel>({
      models,
    });
  }
  // @ts-ignore
  if(window[KEY_OF_STORE]){// @ts-ignore
    return window[KEY_OF_STORE] as RematchStore<RootModel, FullModel>
  }

  const store =  init<RootModel, FullModel>({
    models,
    plugins: [
      updated(),
      loading(),
      persist({
        key: 'persist-storage',
        storage,
        blacklist: [],
      }),
      immerPlugin(),
    ],
  })
  // @ts-ignore
  window[KEY_OF_STORE] = store;
  return store;
}

export type Store = ReturnType<typeof getStore>
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel, FullModel>
