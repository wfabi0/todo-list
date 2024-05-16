import { existsSync, readFileSync } from "fs";
import { NextResponse } from "next/server";
import { join, normalize } from "path";

export async function GET(
  request: Request,
  { params }: { params: { img: string } }
) {
  const { img } = params;
  const baseDir = join(process.cwd(), "public/statics");
  const filePath = normalize(join(baseDir, img));
  if (!filePath.startsWith(baseDir)) {
    return NextResponse.json({ message: "Invalid path." }, { status: 400 });
  }
  if (!existsSync(filePath)) {
    return NextResponse.json({ message: "Image not found." }, { status: 404 });
  }
  const fileContent = readFileSync(filePath);
  return new NextResponse(fileContent, {
    headers: {},
    status: 200,
  });
}
