import { authorized } from "@/utils/functions/auth";
import { createClient } from "@/utils/supabase-connection/server";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplatePhase2Reject } from "@/components/EmailP2Reject";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);


export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const user = await authorized("staff_jabatan");
		if (!user) {
			return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
		}

		const { id } = await params;


		if (!id) {
			return NextResponse.json({ msg: "Missing fields" }, { status: 400 });
		}

		const supabase = await createClient();
		const now = new Date().toISOString();

		const { data: application, error: applicationError } = await supabase
			.from("application")
			.select("emailcontact, father_information, mother_information, student_information")
			.eq("id", id)
			.single();

		if (applicationError) throw applicationError;

		const { data: father, error: fatherError } = await supabase
			.from("father")
			.select("name")
			.eq("id", application.father_information)
			.single();

		if (fatherError) throw fatherError;

		const { data: mother, error: motherError } = await supabase
			.from("mother")
			.select("name")
			.eq("id", application.mother_information)
			.single();

		if (motherError) throw motherError;

		const { data: student, error: studentError } = await supabase
			.from("student")
			.select("name")
			.eq("id", application.student_information)
			.single();

		if (studentError) throw studentError;

		const { error } = await supabase
			.from("application")
			.update({
				is_reviewed: true,
				reviewed_by: user.id,
				reviewed_at: now,
				phase_status: "rejected",
				last_updated: now,
			})
			.eq("id", id);

		if (error) throw error;

		await resend.emails.send({
			from: 'SIRAJ Al-Alusi <onboarding@resend.dev>',
			to: [application.emailcontact],
			subject: 'SIRAJ Al-Alusi: Application is rejected.',
			react: React.createElement(EmailTemplatePhase2Reject, {fathername: father.name, mothername: mother.name, studentname: student.name}),
		});

		return NextResponse.json({ msg: "Application rejected" }, { status: 200 });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ msg: "Unable to reject application" }, { status: 500 });
	}
}
