import { Icons } from "@/components/Icons"

export default function GalleryActionsBar({
  total,
  selectedCount,
  onSelectAll,
  onClear,
  onDelete,
}) {
  return (
    <div className="gallery-actions">
      <span className="gallery-actions__text">
        Đã chọn: {selectedCount}/{total}
      </span>

      <div className="gallery-actions__controls">
        <button
          onClick={onSelectAll}
          className="button01"
          disabled={selectedCount === total}
        >
          <Icons.CheckAll />
          Chọn tất cả
        </button>

        <button
          onClick={onClear}
          className="button01 button01--cancel"
          disabled={!selectedCount}
        >
          <Icons.UnCheckAll />
          Bỏ chọn {selectedCount === total ? "tất cả" : `${selectedCount} file`}
        </button>

        <button
          onClick={onDelete}
          className="button01 button01--cancel"
          disabled={!selectedCount}
        >
          <Icons.Delete />
          Xóa {selectedCount === total ? "tất cả" : `${selectedCount} file`}
        </button>
      </div>
    </div>
  )
}
