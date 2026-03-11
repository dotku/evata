import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const { image, filename } = await request.json();

    if (!image || !filename) {
      return NextResponse.json(
        { error: "Image data and filename are required" },
        { status: 400 }
      );
    }

    // Sanitize filename
    const safeName = filename.replace(/[^a-zA-Z0-9-_]/g, "");
    const filePath = path.join(
      process.cwd(),
      "public",
      "products",
      `${safeName}.png`
    );

    const buffer = Buffer.from(image, "base64");
    await writeFile(filePath, buffer);

    return NextResponse.json({
      path: `/products/${safeName}.png`,
      size: buffer.length,
    });
  } catch (error) {
    console.error("Image save error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to save image",
      },
      { status: 500 }
    );
  }
}
