"use client"

import MediaItem from "./MediaItem"
import { useState } from "react"
import GalleryActionsBar from "./GalleryActionsBar"
import DeleteMediaModal from "./DeleteMediaModal"

function MediaListClient({ media }) {
  const [selectedIds, setSelectedIds] = useState([])
  const [modalIds, setModalIds] = useState(null)

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  const selectAll = () => setSelectedIds(media.map((m) => m.id))
  const clearAll = () => setSelectedIds([])

  const openDeleteModal = (ids) => setModalIds(ids)
  const closeModal = () => setModalIds(null)

  const handleAfterDelete = () => {
    setSelectedIds((prev) => prev.filter((id) => !modalIds.includes(id)))
    clearAll()
  }

  if (!media) return

  return (
    <>
      <GalleryActionsBar
        total={media.length}
        selectedCount={selectedIds.length}
        onSelectAll={selectAll}
        onClear={clearAll}
        onDelete={() => openDeleteModal(selectedIds)}
      />

      <ul className="gallery">
        {media.map((item) => (
          <MediaItem
            key={item.id}
            item={item}
            selected={selectedIds.includes(item.id)}
            onToggle={toggleSelect}
            onDelete={() => openDeleteModal([item.id])}
          />
        ))}
      </ul>

      {modalIds && (
        <DeleteMediaModal
          ids={modalIds}
          onClose={closeModal}
          onSuccess={handleAfterDelete}
        />
      )}
    </>
  )
}

export default MediaListClient
