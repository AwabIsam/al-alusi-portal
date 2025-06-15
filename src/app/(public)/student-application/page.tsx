"use client";

import React, { useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/ui/input";
import { apiFetch } from "@/utils/functions/fetch";
import { classroomOptions } from "@/constants";

interface Form {
	requested_class: string;
	for_year: string;
	requested_school: string;
	email_contact: string;
	father_name: string;
	father_phone: string;
	father_race: string;
	father_nationality: string;
	father_occupation: string;
	father_income: string;
	father_office: string;
	father_office_phone: string;
	father_home_address: string;
	mother_name: string;
	mother_phone: string;
	mother_race: string;
	mother_nationality: string;
	mother_occupation: string;
	mother_income: string;
	mother_office: string;
	mother_office_phone: string;
	mother_home_address: string;
	student_name: string;
	birth_cert_no: string;
	ic_number: string;
	gender: string;
	nationality: string;
	date_of_birth: string;
	place_of_birth: string;
	kindergarten: string;
	primary_school: string;
	primary_session: string;
}

export default function AdmissionFormPage() {
	const [form, setForm] = useState<Form>({
		requested_class: "",
		for_year: "",
		requested_school: "",
		email_contact: "",
		father_name: "",
		father_phone: "",
		father_race: "",
		father_nationality: "",
		father_occupation: "",
		father_income: "",
		father_office: "",
		father_office_phone: "",
		father_home_address: "",
		mother_name: "",
		mother_phone: "",
		mother_race: "",
		mother_nationality: "",
		mother_occupation: "",
		mother_income: "",
		mother_office: "",
		mother_office_phone: "",
		mother_home_address: "",
		student_name: "",
		birth_cert_no: "",
		ic_number: "",
		gender: "",
		nationality: "",
		date_of_birth: "",
		place_of_birth: "",
		kindergarten: "",
		primary_school: "",
		primary_session: "",
	});

	const [submitted, setSubmitted] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async () => {
		setErrorMsg("");

		if (Object.entries(form).find(([key, value]) => value.length <= 0)) return setErrorMsg("All inputs must be filled");

		try {
			const data = await apiFetch("/api/student-application/create", {
				method: "POST",
				body: JSON.stringify(form),
			});

			setSubmitted(true);
		} catch (error) {
			console.error("Submit Error:", error);
			setErrorMsg("Unexpected error occurred.");
		}
	};

	if (submitted) {
		return (
			<main className="flex justify-center items-center h-[60vh]">
				<div className="bg-white border border-gray-200 px-6 py-8 rounded-lg shadow text-center space-y-4">
					<p className="font-semibold text-lg">Your application has been submitted!</p>
					<Button onClick={() => setSubmitted(false)} color="dark-blue" text="Done" />
				</div>
			</main>
		);
	}

	const renderInput = (label: string, name: keyof Form, type = "text") => (
		<div className="flex flex-col">
			<label className="font-medium mb-1">{label}</label>
			<Input name={name} value={form[name]} onChange={handleChange} type={type} />
		</div>
	);

	return (
		<main className="max-w-4xl mx-auto p-6 my-8 bg-white border border-gray-200 rounded-lg space-y-6">
			<h2 className="text-center font-bold text-2xl">SIRAJ Al-Alusi Application Form</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label className="block font-semibold mb-1">Classroom</label>
					<select
						value={form.requested_class}
						onChange={(e) => setForm((x) => ({ ...x, requested_class: e.target.value }))}
						className="w-full border rounded-sm px-3 py-1.5"
					>
						{classroomOptions.map((cls) => (
							<option key={cls} value={cls}>
								{cls}
							</option>
						))}
					</select>
				</div>
				{renderInput("For Year", "for_year")}
				{renderInput("Requested School", "requested_school")}
				{renderInput("Email Contact", "email_contact")}
			</div>

			<fieldset className="border-t pt-6">
				<legend className="text-center font-semibold text-lg">Father/Guardian Information</legend>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
					{renderInput("Name", "father_name")}
					{renderInput("Phone Number", "father_phone")}
					{renderInput("Race", "father_race")}
					{renderInput("Nationality", "father_nationality")}
					{renderInput("Income", "father_income")}
					{renderInput("Occupation", "father_occupation")}
					{renderInput("Office Address", "father_office")}
					{renderInput("Office Phone Number", "father_office_phone")}
					{renderInput("Home Address", "father_home_address")}
				</div>
			</fieldset>

			<fieldset className="border-t pt-6">
				<legend className="text-center font-semibold text-lg">Mother/Guardian Information</legend>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
					{renderInput("Name", "mother_name")}
					{renderInput("Phone Number", "mother_phone")}
					{renderInput("Race", "mother_race")}
					{renderInput("Nationality", "mother_nationality")}
					{renderInput("Income", "mother_income")}
					{renderInput("Occupation", "mother_occupation")}
					{renderInput("Office Address", "mother_office")}
					{renderInput("Office Phone Number", "mother_office_phone")}
					{renderInput("Home Address", "mother_home_address")}
				</div>
			</fieldset>

			<fieldset className="border-t pt-6">
				<legend className="text-center font-semibold text-lg">Student Details</legend>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
					{renderInput("Student Name", "student_name")}
					{renderInput("Birth Certificate Number", "birth_cert_no")}
					{renderInput("IC Number", "ic_number")}
					{renderInput("Gender", "gender")}
					{renderInput("Nationality", "nationality")}
					{renderInput("Date of Birth", "date_of_birth", "date")}
					{renderInput("Place of Birth", "place_of_birth")}
					{renderInput("Kindergarten Name", "kindergarten")}
					{renderInput("Primary School Name", "primary_school")}
					{renderInput("Primary School Session", "primary_session")}
				</div>
			</fieldset>

			{errorMsg && <div className="bg-red-100 text-red-700 border border-red-200 p-2 rounded text-sm text-center">{errorMsg}</div>}

			<div className="text-right flex justify-end">
				<Button onClick={handleSubmit} color="dark-blue" text="Submit" />
			</div>
		</main>
	);
}
