import { collectionsReducer } from "./modules/collections"
import { combineReducers, createStore } from "redux"
import { AppAction, AppState } from "~/model/Redux"

const rootReducer = combineReducers<AppState>({
  collections: collectionsReducer,
})

const initialState: AppState = {
  collections: {},
}

export const store = createStore(
  rootReducer,
  initialState,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
)
