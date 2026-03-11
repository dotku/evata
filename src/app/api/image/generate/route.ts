import { NextRequest, NextResponse } from "next/server";
import { generateImage } from "ai";
import { createGateway } from "@ai-sdk/gateway";

const gateway = createGateway({
  apiKey: process.env.EVATA_API_KEY!,
  baseURL: "https://ai-gateway.vercel.sh/v1/ai",
});

export async function POST(request: NextRequest) {
  try {
    const { prompt, size = "1024x1024" } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const { image } = await generateImage({
      model: gateway.image("openai/gpt-image-1"),
      prompt,
      size: size as "1024x1024" | "1024x1792" | "1792x1024",
    });

    return NextResponse.json({
      image: image.base64,
      mimeType: "image/png",
    });
  } catch (error) {
    console.error("Image generation error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate image",
      },
      { status: 500 }
    );
  }
}
