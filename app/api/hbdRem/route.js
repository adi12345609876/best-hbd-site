import connectMongoDb from "@/libs/mongoDB";
import hbdRem from "@/models/HbdRem";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, dob } = await request.json();
  await connectMongoDb();
  await hbdRem.create({ name, dob });
  return NextResponse.json(
    { message: "Created HBD reminder" },
    { status: 201 }
  );
}
export async function GET() {
  await connectMongoDb();
  const hbdRems = await hbdRem.find();
  return NextResponse.json({ hbdRems });
}
export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get("id");
  await connectMongoDb();
  await hbdRem.findByIdAndDelete(id);
  return NextResponse.json({ message: "deleted rem", id: id }, { status: 200 });
}
