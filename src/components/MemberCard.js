"use client"

import { useState } from "react"
import EditMemberModal from "../app/admin/members/components/EditMemberModal"
import DeleteMemberModal from "../app/admin/members/components/DeleteMemberModal"
import ImgAvatar from "@/components/ImgAvatar"
import Link from "next/link"
import { createMemberSlug } from "@/lib/slugify"

export default function MemberCard({ member, isAdmin }) {
  const [selectedMember, setSelectedMember] = useState(null)
  const [deletingMember, setDeletingMember] = useState(null)
  const attendanceCount = member.attendance_count ?? 0

  const joinedDate = member.joined_at
    ? new Date(member.joined_at).toLocaleDateString("vi-VN")
    : "N/A"

  return (
    <>
      <div className="card">
        <ImgAvatar
          src={member.avatar}
          alt={member.name}
          classprop="card__avatar"
          width={200}
          height={200}
        />

        <div className="card__detail">
          <h5 className="card__name">{member.name}</h5>
          <h6 className="card__nickname">{member.nickname}</h6>

          <p className="card__join">Ngày vào: {joinedDate}</p>

          <p className="card__attendance">{attendanceCount} buổi tham gia</p>
          {isAdmin && (
            <Link
              href={`/admin/members/${createMemberSlug(member.name, member.id)}`}
              className="card__link"
            >
              Chi tiết
            </Link>
          )}
        </div>
        {isAdmin && (
          <>
            <div className="card__control">
              <button
                className="button01"
                onClick={() => setSelectedMember(member)}
              >
                Sửa
              </button>

              <button
                className="button01"
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
