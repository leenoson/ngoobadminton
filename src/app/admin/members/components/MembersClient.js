"use client"

import { useState } from "react"
import AddMemberModal from "./AddMemberModal"

export default function MembersClient() {

	const [open, setOpen] = useState(false)

	return (

		<>

			<div>

				<h2>Members</h2>

				<button className="btn btn-sm btn-primary" onClick={() => setOpen(true)}>
					+ Add Member
				</button>

			</div>

			<AddMemberModal
				open={open}
				onClose={() => setOpen(false)}
			/>

		</>

	)

}