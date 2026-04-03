"use client"

import { useTabs } from "@/hooks/useTabs"
import clsx from "clsx"

export default function TabsSection() {
  const tabs = [
    { id: "t1", label: "Tab 1", content: "Content 1" },
    { id: "t2", label: "Tab 2", content: "Content 2" },
    { id: "t3", label: "Tab 3", content: "Content 3" },
  ]

  const { activeId, activeTab, isActive, selectTab } = useTabs(tabs, "t1")

  const handleActiveTab = (id) => {
    console.log(activeId)
    selectTab(id)
  }

  return (
    <div className="tab">
      <div className="tab__label">
        {tabs.map((tab) => (
          <div
            className={clsx(`tab__title`, {
              "is-active": isActive(tab.id),
            })}
            key={tab.id}
            onClick={() => handleActiveTab(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="tab__contents">
        {activeTab?.content && (
          <div key={activeTab.id} className="is-show">
            {activeTab.content}
          </div>
        )}
      </div>
    </div>
  )
}
