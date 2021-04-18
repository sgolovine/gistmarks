import React, { ReactNode } from "react"
import { createInstance, MatomoProvider } from "@datapunt/matomo-tracker-react"

export const instance = createInstance({
  urlBase: "https://stats.glvn.co",
  siteId: 4,
  heartBeat: {
    // optional, enabled by default
    active: true, // optional, default value: true
    seconds: 10, // optional, default value: `15
  },
  linkTracking: true,
})

export const AnalyticsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <MatomoProvider value={instance}>{children}</MatomoProvider>
}
