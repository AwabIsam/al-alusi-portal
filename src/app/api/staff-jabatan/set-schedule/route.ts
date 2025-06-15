import { authorized } from "@/utils/functions/auth";
import { createClient } from "@/utils/supabase-connection/server";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplatePhase3 } from "@/components/EmailP3";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
	try {
		const user = await authorized("staff_jabatan");

		if (!user) {
			return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
		}

		const { application_id, testiv_date } = await req.json();
		if (!application_id || !testiv_date) {
			return NextResponse.json({ msg: "Missing fields" }, { status: 400 });
		}

		const supabase = await createClient();
		const now = new Date().toISOString();

		const { data: application, error: applicationError } = await supabase
			.from("application")
			.select("emailcontact, father_information, mother_information, student_information")
			.eq("id", application_id)
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
				testiv_date,
				phase_status: "4",
				last_updated: now,
			})
			.eq("id", application_id);

		if (error) throw error;

		await resend.emails.send({
					from: 'SIRAJ Al-Alusi <onboarding@resend.dev>',
					to: [application.emailcontact],
					subject: 'SIRAJ Al-Alusi: Application is accepted.',
					react: React.createElement(EmailTemplatePhase3, {fathername: father.name, mothername: mother.name, studentname: student.name, testDate: testiv_date}),
				});

		return NextResponse.json({ msg: "Phase 3 schedule set (moved to Phase 4)" }, { status: 200 });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ msg: "Unable to set schedule" }, { status: 500 });
	}
}
