"use client"

import { useState } from "react"
import AddMemberModal from "./AddMemberModal"

export default function AddMemberButton() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="mb-2">
			<button
				className="btn btn-primary"
				onClick={() => setIsOpen(true)}
				>
				+Thêm NGOO
			</button>
			<AddMemberModal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
			/>
		</div>
	)
}