import React, { useContext } from "react"
import { SettingsContext } from "~/context"
import { SwitchItem } from "./SwitchItem"

export const ViewSettings = () => {
  const settingsContext = useContext(SettingsContext)
  return (
    <>
      <SwitchItem
        label="Sort by Category"
        value={settingsContext.showSortedList}
        onToggle={() =>
          settingsContext.setSortedList(!settingsContext.showSortedList)
        }
      />
      <SwitchItem
        label="Open Links in New Tab"
        value={settingsContext.openInNewTab}
        onToggle={() =>
          settingsContext.setOpenNewTab(!settingsContext.openInNewTab)
        }
      />
      <SwitchItem
        label="Dark Theme"
        value={settingsContext.isDark}
        onToggle={() => settingsContext.setIsDark(!settingsContext.isDark)}
      />
    </>
  )
}
