import { useState, useEffect } from "react"

export function useTabs(tabs = [], defaultId) {
  const [activeId, setActiveId] = useState(() => {
    return defaultId || tabs[0]?.id || null
  })

  useEffect(() => {
    if (!tabs.length) return

    const exists = tabs.some((t) => t.id === activeId)

    const handleSetActiveTab = () => {
      setActiveId(tabs[0].id)
    }
    if (!exists) {
      handleSetActiveTab()
    }
  }, [tabs, activeId])

  const activeTab = tabs.find((tab) => tab.id === activeId)

  return {
    activeId,
    activeTab,
    isActive: (id) => id === activeId,
    selectTab: (id) => setActiveId(id),
  }
}
