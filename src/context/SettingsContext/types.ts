export interface ISettingsContext {
  // Dictates if we should open a link in a new tab
  openInNewTab: boolean
  // Checks if we have unsaved changes
  unsavedChanges: boolean
  // Dictates if we show a sorted list or not
  showSortedList: boolean
  // Show the dark theme
  isDark: boolean
  // First run - used for showing intro modal
  firstRun: boolean

  setOpenNewTab: (newValue: boolean) => void
  setUnsavedChanges: (newValue: boolean) => void
  setSortedList: (newValue: boolean) => void
  setIsDark: (darkTheme: boolean) => void
  setFirstRun: () => void
}

export type SettingsState = Pick<
  ISettingsContext,
  "openInNewTab" | "unsavedChanges" | "showSortedList" | "isDark" | "firstRun"
>

export type ActionTypes =
  | "SET_OPEN_NEW_TAB"
  | "SET_SHOW_SORTED_LIST"
  | "SET_UNSAVED_CHANGES"
  | "SET_THEME"
  | "SET_FIRST_RUN"
