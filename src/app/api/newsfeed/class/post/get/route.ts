import { authorized } from "@/utils/functions/auth";
import { createClient } from "@/utils/supabase-connection/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		
		const supabase = await createClient();

		const { searchParams } = new URL(req.nextUrl);
		const className = searchParams.get("class");
		const sort = searchParams.get("sort") || "desc"; // default: latest first

		let query = supabase
			.from("class_posts")
			.select()
			.eq("status","approved")
			.order("created_at", { ascending: sort === "asc" });

		if (className) {
			query = query.eq("class", className);
		}

		const { data, error } = await query;

		if (error) throw error;
		return NextResponse.json(data);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ msg: "Unexpected error occurred" }, { status: 500 });
	}
}
