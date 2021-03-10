import { CollectionState } from "~/redux/modues/collections"

export type AppAction = {
  type: string
  payload: any
}

export type AppState = {
  collections: CollectionState
}
