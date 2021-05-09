import { AppAction } from "~/model/Context"
import { ViewState, ActionTypes } from "./types"

const initialState: ViewState = {
  allBookmarks: {},
  bookmarks: {},
  categories: [],
  activeCategories: [],
  searchTerm: "",
  errorTitle: "",
  errorMessage: "",
  showError: false,
  gistId: "",
}

export function reducer(
  state: ViewState = initialState,
  action: AppAction<ActionTypes>
): ViewState {
  switch (action.type) {
    default:
      return state
  }
}
