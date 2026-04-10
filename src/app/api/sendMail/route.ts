import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type FeedbackPayload = {
  appName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
};

const isNonEmpty = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

export async function POST(request: Request) {
  const { EMAIL_USER, EMAIL_APP_PASSWORD } = process.env;

  if (!EMAIL_USER || !EMAIL_APP_PASSWORD) {
    return NextResponse.json(
      { error: "Mail service is not configured." },
      { status: 500 }
    );
  }

  let payload: FeedbackPayload;

  try {
    payload = (await request.json()) as FeedbackPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { appName, firstName, lastName, email, message } = payload;

  if (![appName, firstName, lastName, email, message].every(isNonEmpty)) {
    return NextResponse.json(
      { error: "All feedback fields are required." },
      { status: 400 }
    );
  }

  const trimmedAppName = appName as string;
  const trimmedFirstName = firstName as string;
  const trimmedLastName = lastName as string;
  const trimmedEmail = email as string;
  const trimmedMessage = message as string;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: EMAIL_USER,
      to: EMAIL_USER,
      replyTo: trimmedEmail,
      subject: `Feedback for ${trimmedAppName.trim()} App`,
      text: [
        `First Name: ${trimmedFirstName.trim()}`,
        `Last Name: ${trimmedLastName.trim()}`,
        `Email: ${trimmedEmail.trim()}`,
        "",
        "Message:",
        trimmedMessage.trim(),
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to send feedback right now." },
      { status: 500 }
    );
  }
}
