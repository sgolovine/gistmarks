export interface ILayoutContext {
  // Sidebar
  sidebarOpen: boolean
  openSidebar: () => void
  closeSidebar: () => void

  // Create Panel
  createPanelOpen: boolean
  openCreatePanel: () => void
  closeCreatePanel: () => void

  // Edit Panel
  editPanelOpen: boolean
  openEditPanel: () => void
  closeEditPanel: () => void

  // Settings Panel
  settingsPanelOpen: boolean
  openSettingsPanel: () => void
  closeSettingsPanel: () => void
}

export type ActionTypes =
  | "TOGGLE_SIDEBAR"
  | "TOGGLE_CREATE"
  | "TOGGLE_EDIT"
  | "TOGGLE_SETTINGS"

export type LayoutState = Pick<
  ILayoutContext,
  "createPanelOpen" | "editPanelOpen" | "sidebarOpen" | "settingsPanelOpen"
>
