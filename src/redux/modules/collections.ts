import { omitKey } from "~/helpers"
import { NewCollection } from "~/model/Collection"
import { AppAction, AppState } from "~/model/Redux"

export type CollectionState = {
  [collectionId: string]: NewCollection
}

export const addCollection = (collection: NewCollection) => {
  return {
    type: "ADD_COLLECTION",
    payload: collection,
  }
}

export const editCollection = (collection: NewCollection) => {
  return {
    type: "EDIT_COLLECTION",
    payload: collection,
  }
}

export const removeCollection = (id: string) => {
  return {
    type: "REMOVE_COLLECTION",
    payload: id,
  }
}

export const collectionsReducer = (
  state: CollectionState = {},
  action: AppAction
): CollectionState => {
  switch (action.type) {
    case "ADD_COLLECTION":
    case "EDIT_COLLECTION": {
      return {
        ...state,
        [action.payload.guid]: action.payload,
      }
    }
    case "REMOVE_COLLECTION": {
      const newState = omitKey(action.payload, state)
      return newState
    }
    default:
      return state
  }
}

export const getAllCollections = (state: AppState) => state.collections

export const getCollection = (id: string, state: AppState) =>
  state.collections[id]
