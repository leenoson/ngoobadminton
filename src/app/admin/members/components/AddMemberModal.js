"use client"

import { addMember } from "@/app/actions/memberActions"
import { useRef, useState } from "react"
import { compressImage } from "@/lib/image/compressImage"
import ImgAvatar from "@/components/ImgAvatar"
import { useTransition } from "react"

export default function AddMemberModal({ open, onClose }) {
	const formRef = useRef()
	const [avatar, setAvatar] = useState(null)
	const [name, setName] = useState("")
	const [isPending, startTransition] = useTransition()

	if (!open) return null
	const handleFile = async (e) => {

		const file = e.target.files?.[0]
		if (!file) return

		const compressed = await compressImage(file)

		if (avatar?.preview) {
			URL.revokeObjectURL(avatar.preview)
		}

		const preview = URL.createObjectURL(compressed)

		setAvatar({
			file: compressed,
			preview
		})

	}
	const handleSubmit = async (formData) => {
		if (avatar?.file) {
			formData.set("avatar", avatar.file)
		}
		startTransition(async () => {
			await addMember(formData)
    })
		formRef.current.reset()
		setName("")
		setAvatar(null)
		onClose()
	}

	const handleClose = () => {
		formRef.current.reset()
		setName("")
		if (avatar) {
			URL.revokeObjectURL(avatar)
			setAvatar(null)
		}
		onClose()
	}
	return (

		<div >

			<div className="modal-dialog">

				<div className="modal-content">

					<div className="modal-header">

						<h5>Add Member</h5>

						<button onClick={handleClose} className="btn-close" />

					</div>

					<form
						ref={formRef}
						action={handleSubmit}
					>

						<div className="modal-body">

							<div className="mb-3">

								<label>Name</label>

								<input
									name="name"
									required
									className="form-control"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>

							</div>

							<div className="mb-3">

								<label>Joined Date</label>

								<input
									type="date"
									name="joined_at"
									required
									className="form-control"
								/>

							</div>

							<div className="mb-3">

								<label>Avatar</label>

								<input
									type="file"
									name="avatar"
									className="form-control"
									onChange={(e) => handleFile(e)}
									accept="image/*"
								/>
								{avatar &&
									<ImgAvatar
										src={avatar.preview}
										alt={name}
									/>
								}

							</div>

						</div>

						<div className="modal-footer">

							<button disabled={isPending} className="btn btn-primary">
								{isPending ? "Adding member..." : "Add Member"}
							</button>

						</div>

					</form>

				</div>

			</div>

		</div>

	)

}