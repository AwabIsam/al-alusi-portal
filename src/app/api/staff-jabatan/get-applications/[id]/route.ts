import { authorized } from "@/utils/functions/auth";
import { createClient } from "@/utils/supabase-connection/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const user = await authorized("staff_jabatan");

		if (!user) return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });

		const { id } = await params;

		if (!id) return NextResponse.json({ msg: "ID not found" }, { status: 400 });

		const supabase = await createClient();

		const { data: application, error: getApplicationError } = await supabase.from("application").select().eq("id", id).limit(1).single();

		if (getApplicationError) throw getApplicationError;

		const { data: father, error: insertFatherError } = await supabase
			.from("father")
			.select()
			.eq("id", application.father_information)
			.limit(1)
			.single();

		if (insertFatherError) throw insertFatherError;

		const { data: mother, error: insertMotherError } = await supabase
			.from("mother")
			.select()
			.eq("id", application.mother_information)
			.limit(1)
			.single();

		if (insertMotherError) throw insertMotherError;

		const { data: student, error: insertStudentError } = await supabase
			.from("student")
			.select()
			.eq("id", application.student_information)
			.limit(1)
			.single();

		if (insertStudentError) throw insertStudentError;

		return NextResponse.json({ father, mother, student, emailcontact: application.emailcontact });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ msg: "Unexpected error occurred" }, { status: 500 });
	}
}
