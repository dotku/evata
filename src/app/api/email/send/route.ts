import { NextRequest, NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY!;
const SENDER_EMAIL = "info@unincore.us";
const SENDER_NAME = "Evata";

export async function POST(request: NextRequest) {
  try {
    const { recipients, subject, htmlContent, senderName } =
      await request.json();

    if (!recipients?.length || !subject || !htmlContent) {
      return NextResponse.json(
        { error: "Recipients, subject, and content are required" },
        { status: 400 }
      );
    }

    const results: { email: string; success: boolean; error?: string }[] = [];

    // Send emails in batches (Brevo supports up to 50 recipients per call)
    const batchSize = 50;
    for (let i = 0; i < recipients.length; i += batchSize) {
      const batch = recipients.slice(i, i + batchSize);
      const to = batch.map((r: { email: string; name?: string }) => ({
        email: r.email,
        name: r.name || r.email,
      }));

      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": BREVO_API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          sender: { name: senderName || SENDER_NAME, email: SENDER_EMAIL },
          to,
          subject,
          htmlContent,
        }),
      });

      if (response.ok) {
        batch.forEach((r: { email: string }) =>
          results.push({ email: r.email, success: true })
        );
      } else {
        const errorData = await response.json();
        batch.forEach((r: { email: string }) =>
          results.push({
            email: r.email,
            success: false,
            error: errorData.message,
          })
        );
      }
    }

    const sent = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success).length;

    return NextResponse.json({ sent, failed, results });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
