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
      <div className="">
        <ImgAvatar
          src={member.avatar}
          alt={member.name}
          classprop=""
          width={200}
          height={200}
        />

        <div className="">
          <h5 className="">{member.name}</h5>
          <h6 className="">{member.nickname}</h6>

          <p className="">Tham gia: {joinedDate}</p>

          <p className="">{attendanceCount} buổi tham gia</p>
          {isAdmin && (
            <Link
              href={`/admin/members/${createMemberSlug(member.name, member.id)}`}
              className=""
            >
              Chi tiết
            </Link>
          )}
        </div>
        {isAdmin && (
          <>
            <div className="">
              <button className="" onClick={() => setSelectedMember(member)}>
                Sửa
              </button>

              <button className="" onClick={() => setDeletingMember(member)}>
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
