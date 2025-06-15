"use client";

import React, { useEffect } from "react";
import { CircleNotch, Notches, X } from "@phosphor-icons/react";
import { useState } from "react";
import Input from "@/components/ui/input";
import Button from "./Button";
import { apiFetch } from "@/utils/functions/fetch";

//defaultValue
const phases = ["Phase 1", "Phase 2", "Phase 3", "Phase 4"];

interface Application {
	father: {
		name: string;
		phone_number: string;
		race: string;
		nationality: string;
		occupation: string;
		income: string;
		home_address: string;
		office_address: string;
		office_phone_number: string;
	};
	mother: {
		name: string;
		phone_number: string;
		race: string;
		nationality: string;
		occupation: string;
		income: string;
		home_address: string;
		office_address: string;
		office_phone_number: string;
	};
	student: {
		requested_class: string;
		requested_year: string;
		requested_school: string;
		name: string;
		birth_cert_number: string;
		ic_number: string;
		gender: string;
		nationality: string;
		date_of_birth: string;
		place_of_birth: string;
		kindergarten_name: string;
		primary_school_name: string;
		primary_school_session: string;
	};

	emailcontact: string;
}

export default function ModalP2({ applicationId, onClose }: { applicationId: string; onClose: () => void }) {
	const [application, setApplication] = useState<Application>();

	useEffect(() => {
		document.body.style.overflow = "hidden";

		async function getApplication() {
			try {
				const application: Application = await apiFetch(`/api/staff-jabatan/get-applications/${applicationId}`);

				setApplication(application);
			} catch (err) {
				console.error("Failed to fetch application:", err);
				alert("An error occurred while fetching the application.");
			}
		}

		getApplication();

		return () => {
			document.body.style.overflow = "auto";
		};
	}, []);

	async function moveToPhase3() {
		try {
			const moveToPhase3 = await apiFetch(`/api/staff-jabatan/move-phase3/`, {
				method: "POST",
				body: JSON.stringify({ application_id: applicationId }),
			});

			onClose();
		} catch (err) {
			console.error("Failed to fetch application:", err);
			alert("An error occurred while fetching the application.");
		}
	}

	async function rejectApplication() {
		try {
			await apiFetch(`/api/staff-jabatan/reject-application/${applicationId}`, {
				method: "PATCH",
			});

			onClose();
		} catch (error) {
			console.error(error);
			alert("Unexpected Error Occurred");
		}
	}

	return (
		<div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
			<div className="bg-white w-full max-h-[calc(100vh-4rem)] max-w-6xl rounded-xl p-2 relative space-y-2">
				<button type="button" onClick={onClose} className="block ml-auto cursor-pointer">
					<X size="18" weight="bold" className="text-black" />
				</button>

				{/* CODE INSIDE HERE */}
				<div className="flex flex-row w-full h-fit items-stretch justify-stretch gap-3">
					{/* SIDEBAR */}
					<div className="flex flex-col gap-4 border border-gray-200 rounded-md p-4 w-1/5 max-h-190 overflow-y-auto">
						<div>
							<strong>Student Application</strong>
						</div>

						<div className="space-y-4">
							{phases.map((phase, index) => {
								return (
									<div key={phase} className="flex items-center gap-2 cursor-pointer group">
										<Notches
											weight="bold"
											size={22}
											className={`${index === 0 ? "text-blue-500" : index === 1 ? "text-[#FDD660]" : "border-gray-400"}`}
										/>

										<span className={`font-semibold`}>{phase}</span>
									</div>
								);
							})}
						</div>
					</div>

					{/* MAIN CONTENT */}
					<div className="flex flex-col justify-start border border-gray-200 rounded-md p-4 w-4/5 max-h-[34rem] overflow-y-auto">
						<div className="flex flex-col items-center w-full gap-4 p-3">
							<form className="space-y-6 p-3 w-full">
								{/* Requested Info */}
								<div>
									<label className="block text-sm font-medium mb-1">Email Contact</label>
									<Input
										readOnly
										type="text"
										defaultValue={application?.emailcontact || ""}
										className="w-full px-3 py-2 rounded-md"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium mb-1">Requested Class</label>
										<Input
											readOnly
											type="text"
											defaultValue={application?.student.requested_class || ""}
											className="w-full px-3 py-2 rounded-md"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium mb-1">For Year</label>
										<Input
											readOnly
											type="text"
											defaultValue={application?.student.requested_year || ""}
											className="w-full px-3 py-2 rounded-md"
										/>
									</div>
								</div>

								{/* Section Heading */}
								<h2 className="text-center font-semibold text-sm">Father/Guardian Information</h2>

								{/* Guardian Info */}
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium mb-1">Father/Guardian Name</label>
										<Input
											readOnly
											type="text"
											defaultValue={application?.father.name || ""}
											className="w-full px-3 py-2 rounded-md"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium mb-1">Requested School</label>
										<Input
											readOnly
											type="text"
											defaultValue={application?.student.requested_school || ""}
											className="w-full px-3 py-2 rounded-md"
										/>
									</div>

									<div>
										<label className="block text-sm font-medium mb-1">Phone Number</label>
										<Input
											readOnly
											type="text"
											defaultValue={application?.father.phone_number || ""}
											className="w-full px-3 py-2 rounded-md"
										/>
									</div>

									<div>
										<label className="block text-sm font-medium mb-1">Race</label>
										<Input
											readOnly
											type="text"
											defaultValue={application?.father.race || ""}
											className="w-full px-3 py-2 rounded-md"
										/>
									</div>

									<div>
										<label className="block text-sm font-medium mb-1">Nationality</label>
										<Input
											readOnly
											type="text"
											defaultValue={application?.father.nationality || ""}
											className="w-full px-3 py-2 rounded-md"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium mb-1">Occupation</label>
										<Input
											readOnly
											type="text"
											defaultValue={application?.father.occupation || ""}
											className="w-full px-3 py-2 rounded-md"
										/>
									</div>

									<div>
										<label className="block text-sm font-medium mb-1">Income</label>
										<Input
											readOnly
											type="text"
											defaultValue={application?.father.income || ""}
											className="w-full px-3 py-2 rounded-md"
										/>
									</div>

									<div>
										<label className="block text-sm font-medium mb-1">Office Phone Number</label>
										<Input
											readOnly
											type="text"
											defaultValue={application?.father.office_phone_number || ""}
											className="w-full px-3 py-2 rounded-md"
										/>
									</div>
								</div>

								{/* Addresses */}
								<div className="space-y-4">
									<div>
										<label className="block text-sm font-medium mb-1">Office Address</label>
										<Input
											type="text"
											defaultValue={application?.father.office_address || ""}
											className="w-full px-3 py-2 rounded-md"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium mb-1">Home Address</label>
										<Input
											type="text"
											defaultValue={application?.father.home_address || ""}
											className="w-full px-3 py-2 rounded-md"
										/>
									</div>
								</div>

								{/* Section Heading */}
								<h2 className="text-center font-semibold text-sm">Mother/Guardian Information</h2>

								{/* Mother Info */}
								<div>
									<label className="block text-sm font-medium mb-1">Mother/Guardian Name</label>
									<Input
										readOnly
										type="text"
										defaultValue={application?.mother.name || ""}
										className="w-full px-3 py-2 rounded-md"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium mb-1">Phone Number</label>
										<Input
											readOnly
											type="text"
											defaultValue={application?.mother.phone_number || ""}
											className="w-full px-3 py-2 rounded-md"
										/>
									</div>

									<div>
										<label className="block text-sm font-medium mb-1">Race</label>
										<Input
											readOnly
											type="text"
											defaultValue={application?.mother.race || ""}
											className="w-full px-3 py-2 rounded-md"
										/>
									</div>

									<div>
										<label className="block text-sm font-medium mb-1">Nationality</label>
										<Input
											readOnly
											type="text"
											defaultValue={application?.mother.nationality || ""}
											className="w-full px-3 py-2 rounded-md"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium mb-1">Occupation</label>
										<Input
											readOnly
											type="text"
											defaultValue={application?.mother.occupation || ""}
											className="w-full px-3 py-2 rounded-md"
										/>
									</div>

									<div>
										<label className="block text-sm font-medium mb-1">Income</label>
										<Input
											readOnly
											type="text"
											defaultValue={application?.mother.income || ""}
											className="w-full px-3 py-2 rounded-md"
										/>
									</div>

									<div>
										<label className="block text-sm font-medium mb-1">Office Phone Number</label>
										<Input
											readOnly
											type="text"
											defaultValue={application?.mother.office_phone_number || ""}
											className="w-full px-3 py-2 rounded-md"
										/>
									</div>
								</div>

								{/* Addresses */}
								<div className="space-y-4">
									<div>
										<label className="block text-sm font-medium mb-1">Office Address</label>
										<Input
											type="text"
											defaultValue={application?.mother.office_address || ""}
											className="w-full px-3 py-2 rounded-md"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium mb-1">Home Address</label>
										<Input
											type="text"
											defaultValue={application?.mother.home_address || ""}
											className="w-full px-3 py-2 rounded-md"
										/>
									</div>
								</div>

								{/* Section Heading */}
								<h2 className="text-center font-semibold text-sm">Student Details</h2>

								{/* Student Info */}
								<div>
									<label className="block text-sm font-medium mb-1">Student Name</label>
									<Input
										readOnly
										type="text"
										defaultValue={application?.student.name || ""}
										className="w-full px-3 py-2 rounded-md"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium mb-1">Birth Certificate Number</label>
										<Input
											readOnly
											type="text"
											defaultValue={application?.student.birth_cert_number || ""}
											className="w-full px-3 py-2 rounded-md"
										/>
									</div>

									<div>
										<label className="block text-sm font-medium mb-1">IC Number</label>
										<Input
											readOnly
											type="text"
											defaultValue={application?.student.ic_number || ""}
											className="w-full px-3 py-2 rounded-md"
										/>
									</div>

									<div>
										<label className="block text-sm font-medium mb-1">Gender</label>
										<Input
											readOnly
											type="text"
											defaultValue={application?.student.gender || ""}
											className="w-full px-3 py-2 rounded-md"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium mb-1">Nationality</label>
										<Input
											readOnly
											type="text"
											defaultValue={application?.student.nationality || ""}
											className="w-full px-3 py-2 rounded-md"
										/>
									</div>

									<div>
										<label className="block text-sm font-medium mb-1">Date of Birth</label>
										<Input
											readOnly
											type="text"
											defaultValue={application?.student.date_of_birth || ""}
											className="w-full px-3 py-2 rounded-md"
										/>
									</div>

									<div>
										<label className="block text-sm font-medium mb-1">Place of Birth</label>
										<Input
											readOnly
											type="text"
											defaultValue={application?.student.place_of_birth || ""}
											className="w-full px-3 py-2 rounded-md"
										/>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium mb-1">Kindergarten Name</label>
									<Input
										readOnly
										type="text"
										defaultValue={application?.student.kindergarten_name || ""}
										className="w-full px-3 py-2 rounded-md"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium mb-1">Primary School Name</label>
									<Input
										readOnly
										type="text"
										defaultValue={application?.student.primary_school_name || ""}
										className="w-full px-3 py-2 rounded-md"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium mb-1">Primary School Session</label>
									<Input
										readOnly
										type="text"
										defaultValue={application?.student.primary_school_session || ""}
										className="w-full px-3 py-2 rounded-md"
									/>
								</div>
							</form>
						</div>
					</div>
				</div>

				<div className="flex flex-row justify-end-safe gap-4">
					<Button onClick={moveToPhase3} text="Move to Phase 3" color="dark-blue" />
					<Button onClick={rejectApplication} text="Reject" color="danger" />
				</div>
				{/* CODE INSIDE HERE */}
			</div>
		</div>
	);
}
