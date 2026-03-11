"use client"

import { useState, useRef } from "react"
import { updateMember } from "@/app/actions/memberActions"
import ImgAvatar from "@/components/ImgAvatar"
import { compressImage } from "@/lib/image/compressImage"
import { useTransition } from "react"

export default function EditMemberModal({ member, open, onClose }) {
	const [isPending, startTransition] = useTransition()
	const inputFile = useRef(null)
	const [name, setName] = useState(member.name)
	const [joinedAt, setJoinedAt] = useState(member.joined_at
		? new Date(member.joined_at).toISOString().split("T")[0]
		: "")
	const [avatar, setAvatar] = useState(null)
	const [preview, setPreview] = useState(
		member.avatar || "https://i.pravatar.cc/200"
	)
	if (!open) return null
	const handleResetAvatar = () => {
		setAvatar(null)

		setPreview(member.avatar || null)

		if (inputFile.current) {
			inputFile.current.value = null
		}

	}

	const handleFile = async (e) => {

		const file = e.target.files[0]

		if (!file) return

		const compressed = await compressImage(file)

		setAvatar(compressed)

		const url = URL.createObjectURL(file)

		setPreview(url)

	}
	const handleSubmit = async (e) => {
		e.preventDefault()

		const formData = new FormData()

		formData.append("id", member.id)
		formData.append("name", name)
		formData.append("joined_at", joinedAt)

		if (avatar) {
			formData.append("avatar", avatar)
		}

		startTransition(async () => {
			await updateMember(formData)
			onClose()
		})
	}

	const handleCancel = () => {
		if (preview) {
			URL.revokeObjectURL(preview)
			setPreview(member.avatar || "https://i.pravatar.cc/200")
		}

		onClose()
	}

	return (

		<div className="p-2" onClick={onClose}>

			<div onClick={(e) => e.stopPropagation()}>

				<h3>Edit Member</h3>

				<form onSubmit={handleSubmit}>

					<div>

						<label>Name</label>

						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							disabled={isPending}
						/>

					</div>

					<div>

						<label>Joined At</label>

						<input
							type="date"
							value={joinedAt}
							onChange={(e) => setJoinedAt(e.target.value)}
							required
							disabled={isPending}
						/>

					</div>

					<div>
						{preview &&
							<ImgAvatar
								src={preview}
								alt={member.name}
							/>
						}

					</div>

					<div>

						<label>Upload new avatar</label>

						<input
							type="file"
							accept="image/*"
							onChange={handleFile}
							ref={inputFile}
							disabled={isPending}
						/>

						<button disabled={isPending} type="button" className="btn btn-outline-primary" onClick={handleResetAvatar}>
							Reset
						</button>

					</div>

					<div>

						<button disabled={isPending} type="button" className="btn btn-primary" onClick={handleCancel}>
							Cancel
						</button>

						<button disabled={isPending} className="btn btn-primary">
							{isPending ? "Đang lưu..." : "Lưu"}
						</button>

					</div>

				</form>

			</div>

		</div>

	)

}