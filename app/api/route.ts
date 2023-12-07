import { NextResponse } from "next/server";
import { getOverallStats } from "../lib/stats";

export async function POST(req: Request) {
  const data = await req.formData();
  const input = data.get("inputValue")?.toString();
  if (!input) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  const stats = input
    .trim()
    .split("\n")
    .map((line) => line.trim().split(/\s+/))
    .filter((line) => {
      const day = parseInt(line[0]);
      return line.length == 7 && day >= 1 && day <= 25;
    });

  const overall = await getOverallStats();

  console.log({ stats, overall });

  return Response.json({ message: "Data received successfully" });
}
