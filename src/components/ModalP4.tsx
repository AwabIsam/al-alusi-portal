"use client";

import { useState } from "react";
import { Notches, X } from "@phosphor-icons/react";
import Input from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import Button from "./Button";
import { apiFetch } from "@/utils/functions/fetch";

export default function ModalP2({ applicationId, onClose }: { applicationId: string; onClose: () => void }) {
	const [testMark, setTestMark] = useState<string>("0");
	const [date, setDate] = useState<Date | undefined>(new Date());

	async function confirmDate() {
		if (parseInt(testMark) < 40) return alert("Test mark is too low. Please reject the application.");

		try {
			await apiFetch("/api/staff-jabatan/approve-application", {
				method: "POST",
				body: JSON.stringify({
					application_id: applicationId,
					invitation_date: date,
					testiv_mark: testMark,
				}),
			});

			onClose();
		} catch (error) {
			console.error(error);
			alert("Unexpected Error Occurred");
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
			<div className="bg-white w-full h-162 max-w-6xl rounded-xl p-2 relative space-y-2">
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
							{["Phase 1", "Phase 2", "Phase 3", "Phase 4"].map((phase, index) => {
								return (
									<div key={phase} className="flex items-center gap-2 cursor-pointer group">
										<Notches
											weight="bold"
											size={22}
											className={`${
												index === 0
													? "text-blue-500"
													: index === 1
													? "text-[#FDD660]"
													: index === 2
													? "text-[#AF52DE]"
													: index === 3
													? "text-[#FF2D55]"
													: "border-gray-400"
											}`}
										/>

										<span className={`font-semibold`}>{phase}</span>
									</div>
								);
							})}
						</div>
					</div>

					{/* MAIN CONTENT */}
					<div className="flex flex-col justify-start gap-2 border border-gray-200 rounded-md p-4 w-4/5 max-h-190 overflow-y-auto">
						<div>
							<label className="block text-sm font-medium mb-1">Test Mark</label>
							<Input
								type="number"
								placeholder="Enter Test Mark"
								max={100}
								maxLength={3}
								min={0}
								value={testMark}
								onChange={(e) => setTestMark(e.target.value)}
								className="w-full px-3 py-2 rounded-md"
							/>
						</div>

						<div>
							<strong>School & Visit Date</strong>
						</div>
						<div className="flex flex-col flex-wrap items-start gap-2 @md:flex-row">
							<Calendar
								disabled={parseInt(testMark) < 40}
								mode="single"
								selected={date}
								onSelect={setDate}
								className="rounded-md border flex flex-row justify-center shadow-sm w-full"
							/>
						</div>
					</div>
				</div>
				<div className="flex flex-row justify-end-safe gap-4">
					<Button onClick={confirmDate} text="Confirm Date" color="dark-blue" />
					<Button onClick={rejectApplication} text="Reject" color="danger" />
				</div>
				{/* CODE INSIDE HERE */}
			</div>
		</div>
	);
}
