"use client"

import { useState } from "react"
import EditMemberModal from "./EditMemberModal"
import DeleteMemberModal from "./DeleteMemberModal"
import ImgAvatar from "@/components/ImgAvatar"
import Link from "next/link"
import { createMemberSlug } from "@/lib/slugify"
import CardSkeleton from "@/components/Skeleton"
export default function MemberCard({ member, isAdmin }) {
  const [selectedMember, setSelectedMember] = useState(null)
  const [deletingMember, setDeletingMember] = useState(null)
  const attendanceCount = member.attendance_count ?? 0

  const joinedDate = member.joined_at
    ? new Date(member.joined_at).toLocaleDateString("vi-VN")
    : "N/A"

  return (
    <>
      <div className="card shadow-sm">
        <ImgAvatar
          src={member.avatar}
          alt={member.name}
          classprop="card-img-top"
        />

        <div className="card-body text-center">
          <h5 className="card-title mb-2">{member.name}</h5>

          <p className="text-muted mb-1">Tham gia: {joinedDate}</p>

          <p className="mb-0">{attendanceCount} buổi tham gia</p>
          {isAdmin && (
            <Link
              href={`/admin/members/${createMemberSlug(member.name, member.id)}`}
              className="btn btn-primary mt-2"
            >
              Chi tiết
            </Link>
          )}
        </div>
        {isAdmin && (
          <>
            <div className="card-footer d-flex justify-content-between">
              <button
                className="btn btn-primary"
                onClick={() => setSelectedMember(member)}
              >
                Sửa
              </button>

              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => setDeletingMember(member)}
              >
                Xóa
              </button>
            </div>

            {selectedMember && (
              <EditMemberModal
                member={selectedMember}
                onClose={() => setSelectedMember(null)}
              />
            )}

            {deletingMember && (
              <DeleteMemberModal
                member={deletingMember}
                onClose={() => setDeletingMember(null)}
              />
            )}
          </>
        )}
      </div>
    </>
  )
}
