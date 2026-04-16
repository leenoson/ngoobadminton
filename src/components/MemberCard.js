"use client"

import Link from "next/link"
import ImgAvatar from "@/components/ImgAvatar"
import { createMemberUrl } from "@/lib/slugify"
import ButtonEditMember from "./ButtonEditMember"
import ButtonDeleteMember from "./ButtonDeleteMember"
import ButtonRipple from "./ButtonRipple"

export default function MemberCard({ member, isAdmin }) {
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
            <ButtonRipple
              href={`/admin/members/${createMemberUrl(member.id)}`}
              className="button01 button01--info"
            >
              Chi tiết
            </ButtonRipple>
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
