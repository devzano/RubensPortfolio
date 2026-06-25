import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  buildSunshineAttachmentLabel,
  createSunshineCodSubmissionPdf,
  type SunshineCodAttachment,
} from "@/lib/sunshineCodPdf";

const MAX_ATTACHMENT_BYTES = Math.floor(1.5 * 1024 * 1024);
const MAX_TOTAL_ATTACHMENT_BYTES = 3 * 1024 * 1024;

type FeedbackPayload = {
  appName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
  htmlMessage?: string;
  subject?: string;
  recipient?: string;
};

const isNonEmpty = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const toText = (value: FormDataEntryValue | null) =>
  typeof value === "string" ? value : "";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export async function POST(request: Request) {
  const { EMAIL_USER, EMAIL_COD_USER, EMAIL_APP_PASSWORD } = process.env;

  if (!EMAIL_USER || !EMAIL_APP_PASSWORD) {
    return NextResponse.json(
      {
        error: "Mail service is not configured.",
        debug: {
          EMAIL_USER: Boolean(EMAIL_USER),
          EMAIL_APP_PASSWORD: Boolean(EMAIL_APP_PASSWORD),
          EMAIL_COD_USER: Boolean(EMAIL_COD_USER),
        },
      },
      { status: 500 }
    );
  }

  let payload: FeedbackPayload;
  const attachments: {
    filename: string;
    content: Buffer;
    contentType: string;
  }[] = [];
  let multipartFormData: FormData | null = null;
  const multipartFiles: SunshineCodAttachment[] = [];
  let totalAttachmentBytes = 0;

  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    multipartFormData = formData;
    payload = {
      appName: toText(formData.get("appName")),
      firstName: toText(formData.get("firstName")),
      lastName: toText(formData.get("lastName")),
      email: toText(formData.get("email")),
      message: toText(formData.get("message")),
      htmlMessage: toText(formData.get("htmlMessage")),
      subject: toText(formData.get("subject")),
      recipient: toText(formData.get("recipient")),
    };

    for (const [key, value] of formData.entries()) {
      if (!(value instanceof File) || value.size === 0) continue;
      if (value.size > MAX_ATTACHMENT_BYTES) {
        return NextResponse.json(
          {
            error: `Attachment "${value.name || key}" is too large. Maximum file size is 1.5 MB.`,
            debug: {
              file: value.name || key,
              sizeBytes: value.size,
              maxFileBytes: MAX_ATTACHMENT_BYTES,
            },
          },
          { status: 400 }
        );
      }

      totalAttachmentBytes += value.size;
      if (totalAttachmentBytes > MAX_TOTAL_ATTACHMENT_BYTES) {
        return NextResponse.json(
          {
            error: "Attachments are too large to send by email. Combined uploads must stay under 3 MB.",
            debug: {
              totalAttachmentBytes,
              maxTotalAttachmentBytes: MAX_TOTAL_ATTACHMENT_BYTES,
            },
          },
          { status: 400 }
        );
      }

      const arrayBuffer = await value.arrayBuffer();
      const record = {
        key,
        label: buildSunshineAttachmentLabel(key),
        filename: value.name || `${key}.bin`,
        content: Buffer.from(arrayBuffer),
        contentType: value.type || "application/octet-stream",
      };
      multipartFiles.push(record);
      attachments.push({
        filename: record.filename,
        content: record.content,
        contentType: record.contentType,
      });
    }
  } else {
    try {
      payload = (await request.json()) as FeedbackPayload;
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }
  }

  const { appName, firstName, lastName, email, message, htmlMessage, subject, recipient } = payload;

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
  const trimmedHtmlMessage = isNonEmpty(htmlMessage) ? htmlMessage.trim() : "";
  const isSunshineCodSubmission =
    multipartFormData?.get("submission_type") === "sunshine_cod_pdf";

  let finalTextBody = [
    `First Name: ${trimmedFirstName.trim()}`,
    `Last Name: ${trimmedLastName.trim()}`,
    `Email: ${trimmedEmail.trim()}`,
    "",
    "Message:",
    trimmedMessage.trim(),
  ].join("\n");
  let finalHtmlBody = trimmedHtmlMessage || undefined;

  if (isSunshineCodSubmission && multipartFormData) {
    const cardSubmissionMode =
      multipartFormData.get("card_submission_mode") === "details" ? "details" : "uploads";
    const signatureAttachment = multipartFiles.find((file) => file.key === "signature_image");
    const paymentSignatureAttachment = multipartFiles.find((file) => file.key === "payment_signature_image");
    const supportingAttachments = multipartFiles.filter(
      (file) => file.key !== "signature_image" && file.key !== "payment_signature_image"
    );
    try {
      const compiledPdf = await createSunshineCodSubmissionPdf({
        applicationDate: toText(multipartFormData.get("date")),
        companyName: toText(multipartFormData.get("company_name")),
        owner: toText(multipartFormData.get("owner")),
        telephone: toText(multipartFormData.get("telephone")),
        businessEmail: toText(multipartFormData.get("business_email")),
        accountsPayableClerk: toText(multipartFormData.get("accounts_payable_clerk")),
        apEmail: toText(multipartFormData.get("ap_email")) || toText(multipartFormData.get("business_email")),
        mailingStreetAddress: toText(multipartFormData.get("mailing_street_address")),
        mailingCity: toText(multipartFormData.get("mailing_city")),
        mailingState: toText(multipartFormData.get("mailing_state")),
        mailingZipCode: toText(multipartFormData.get("mailing_zip_code")),
        deliveryStreetAddress: toText(multipartFormData.get("delivery_street_address")),
        deliveryCity: toText(multipartFormData.get("delivery_city")),
        deliveryState: toText(multipartFormData.get("delivery_state")),
        deliveryZipCode: toText(multipartFormData.get("delivery_zip_code")),
        typeOfFuel: toText(multipartFormData.get("type_of_fuel")),
        tankSize: toText(multipartFormData.get("tank_size")),
        boatTank: toText(multipartFormData.get("boat_tank")),
        primaryActivityOfBusiness: toText(multipartFormData.get("primary_activity_of_business")),
        yearsEstablished: toText(multipartFormData.get("years_established")),
        tankRegistrationNumbers: toText(multipartFormData.get("tank_registration_numbers")),
        individualApplicantDob: toText(multipartFormData.get("individual_applicant_dob")),
        federalEmployeeIdNo: toText(multipartFormData.get("federal_employee_id_no")),
        salesTaxExemptNo: toText(multipartFormData.get("sales_tax_exempt_no")),
        printedName: toText(multipartFormData.get("printed_name")),
        authorizationDate: toText(multipartFormData.get("authorization_date")),
        cardSubmissionMode,
        nameOnCard: toText(multipartFormData.get("name_on_card")),
        typeOfCard: toText(multipartFormData.get("type_of_card")),
        cardNumber: toText(multipartFormData.get("card_number")),
        bankNumber: toText(multipartFormData.get("bank_number")),
        expirationDate: toText(multipartFormData.get("expiration_date")),
        driversLicenseNumber: toText(multipartFormData.get("drivers_license_number")),
        signatureImage: signatureAttachment?.content,
        paymentSignatureImage: paymentSignatureAttachment?.content,
        supportingAttachments,
      });

      attachments.length = 0;
      attachments.push({
        filename: `Sunshine-COD-Application-${toText(multipartFormData.get("date")) || "submission"}.pdf`,
        content: compiledPdf,
        contentType: "application/pdf",
      });

      finalTextBody = [
        "A completed Sunshine COD application package is attached as a PDF.",
        "DMV history remains manual review required.",
        "",
        `Company Name: ${toText(multipartFormData.get("company_name"))}`,
        `Owner: ${toText(multipartFormData.get("owner"))}`,
        `Date: ${toText(multipartFormData.get("date"))}`,
      ].join("\n");

      finalHtmlBody = [
        "<div style=\"font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#1f1c16;\">",
        "<h2>Sunshine COD Application</h2>",
        "<p>A completed application package is attached as a PDF.</p>",
        "<p><strong>DMV history:</strong> Manual review required.</p>",
        "<p>",
        `<strong>Company Name:</strong> ${escapeHtml(toText(multipartFormData.get("company_name")))}<br />`,
        `<strong>Owner:</strong> ${escapeHtml(toText(multipartFormData.get("owner")))}<br />`,
        `<strong>Date:</strong> ${escapeHtml(toText(multipartFormData.get("date")))}`,
        "</p>",
        "</div>",
      ].join("");
    } catch (error) {
      const message =
        error instanceof Error && error.message.trim().length > 0
          ? error.message.trim()
          : "Unable to generate Sunshine COD application PDF";
      return NextResponse.json(
        {
          error: "Unable to prepare the application package right now.",
          debug: { message },
        },
        { status: 500 }
      );
    }
  }

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
      text: finalTextBody,
      html: finalHtmlBody,
      attachments,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error && error.message.trim().length > 0
        ? error.message.trim()
        : "Unknown mailer error";
    const errorCode =
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof (error as { code?: unknown }).code === "string"
        ? (error as { code: string }).code
        : null;

    return NextResponse.json(
      {
        error: "Unable to send feedback right now.",
        debug: {
          message,
          code: errorCode,
        },
      },
      { status: 500 }
    );
  }
}
