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
        <div className="card__avatar">
          <ImgAvatar
            src={member.avatar}
            alt={member.name}
            classprop="card__img"
            width={250}
            height={250}
          />
        </div>

        <div className="card__detail">
          <h2 className="card__name">{member.name}</h2>
          <h4 className="card__nickname">{member.nickname}</h4>

          <p className="card__join">Ngày tham gia: {joinedDate}</p>

          <p className="card__attendance">
            Số buổi:{" "}
            {attendanceCount ? (
              <span className="badge">{attendanceCount}</span>
            ) : (
              <span className="badge badge--type01">0</span>
            )}
          </p>
        </div>
        {isAdmin && (
          <Link
            href={`/admin/members/${createMemberSlug(member.name, member.id)}`}
            className="button01 button01--type01"
          >
            Chi tiết
          </Link>
        )}
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
