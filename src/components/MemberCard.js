"use client"

import { useState } from "react"
import Link from "next/link"
import EditMemberModal from "../app/admin/members/components/EditMemberModal"
import DeleteMemberModal from "../app/admin/members/components/DeleteMemberModal"
import ImgAvatar from "@/components/ImgAvatar"
import { createMemberSlug } from "@/lib/slugify"
import ButtonEditMember from "./ButtonEditMember"
import ButtonDeleteMember from "./ButtonDeleteMember"

export default function MemberCard({ member, isAdmin }) {
  // const [selectedMember, setSelectedMember] = useState(null)
  // const [deletingMember, setDeletingMember] = useState(null)
  const attendanceCount = member?.attendance_count ?? 0

  const joinedDate = member?.joined_at
    ? new Date(member?.joined_at).toLocaleDateString("vi-VN")
    : "N/A"

  return (
    <>
      <div className="card">
        <div className="card__avatar">
          <ImgAvatar
            src={member?.avatar}
            alt={member?.name}
            classprop="card__img"
            width={250}
            height={250}
          />
        </div>

        <div className="card__body">
          <h2 className="card__name">{member?.name}</h2>
          <h4 className="card__nickname">
            {member?.nickname || "Chưa có nickname"}
          </h4>

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
          <div className="card__footer">
            <Link
              href={`/admin/members/${createMemberSlug(member?.name, member?.id)}`}
              className="button01 button01--type01"
            >
              Chi tiết
            </Link>
            <div className="card__control">
              <ButtonDeleteMember member={member} />
              <ButtonEditMember member={member} />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
