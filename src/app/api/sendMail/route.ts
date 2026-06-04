import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type FeedbackPayload = {
  appName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
  subject?: string;
  recipient?: string;
};

const isNonEmpty = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const toText = (value: FormDataEntryValue | null) =>
  typeof value === "string" ? value : "";

export async function POST(request: Request) {
  const { EMAIL_USER, EMAIL_APP_PASSWORD } = process.env;

  if (!EMAIL_USER || !EMAIL_APP_PASSWORD) {
    return NextResponse.json(
      { error: "Mail service is not configured." },
      { status: 500 }
    );
  }

  let payload: FeedbackPayload;
  const attachments: {
    filename: string;
    content: Buffer;
    contentType: string;
  }[] = [];

  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    payload = {
      appName: toText(formData.get("appName")),
      firstName: toText(formData.get("firstName")),
      lastName: toText(formData.get("lastName")),
      email: toText(formData.get("email")),
      message: toText(formData.get("message")),
      subject: toText(formData.get("subject")),
      recipient: toText(formData.get("recipient")),
    };

    for (const [key, value] of formData.entries()) {
      if (!(value instanceof File) || value.size === 0) continue;
      const arrayBuffer = await value.arrayBuffer();
      attachments.push({
        filename: value.name || `${key}.bin`,
        content: Buffer.from(arrayBuffer),
        contentType: value.type || "application/octet-stream",
      });
    }
  } else {
    try {
      payload = (await request.json()) as FeedbackPayload;
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }
  }

  const { appName, firstName, lastName, email, message, subject, recipient } = payload;

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
  const trimmedSubject = isNonEmpty(subject)
    ? subject.trim()
    : `Feedback for ${trimmedAppName.trim()} App`;
  const trimmedRecipient = isNonEmpty(recipient)
    ? recipient.trim()
    : EMAIL_USER;

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
      to: trimmedRecipient,
      replyTo: trimmedEmail,
      subject: trimmedSubject,
      text: [
        `First Name: ${trimmedFirstName.trim()}`,
        `Last Name: ${trimmedLastName.trim()}`,
        `Email: ${trimmedEmail.trim()}`,
        "",
        "Message:",
        trimmedMessage.trim(),
      ].join("\n"),
      attachments,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to send feedback right now." },
      { status: 500 }
    );
  }
}
