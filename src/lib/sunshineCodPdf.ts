import { readFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb, type PDFPage, type PDFFont, type PDFImage } from "pdf-lib";

export type SunshineCodAttachment = {
  key: string;
  label: string;
  filename: string;
  content: Buffer;
  contentType: string;
};

export type SunshineCodPdfPayload = {
  applicationDate: string;
  companyName: string;
  owner: string;
  telephone: string;
  businessEmail: string;
  accountsPayableClerk: string;
  apEmail: string;
  mailingStreetAddress: string;
  mailingCity: string;
  mailingState: string;
  mailingZipCode: string;
  deliveryStreetAddress: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryZipCode: string;
  typeOfFuel: string;
  tankSize: string;
  boatTank: string;
  primaryActivityOfBusiness: string;
  yearsEstablished: string;
  tankRegistrationNumbers: string;
  individualApplicantDob: string;
  federalEmployeeIdNo: string;
  salesTaxExemptNo: string;
  printedName: string;
  authorizationDate: string;
  cardSubmissionMode: "details" | "uploads";
  nameOnCard: string;
  typeOfCard: string;
  cardNumber: string;
  bankNumber: string;
  expirationDate: string;
  driversLicenseNumber: string;
  signatureImage?: Buffer;
  paymentSignatureImage?: Buffer;
  supportingAttachments: SunshineCodAttachment[];
};

const LETTER_WIDTH = 612;
const LETTER_HEIGHT = 792;
const FORM_PATH = path.join(process.cwd(), "public", "sscodapp-blank-form.pdf");

function formatSlashDate(value: string, includeYear = true) {
  if (!value) return "";

  const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const [, year, month, day] = isoMatch;
    return includeYear ? `${month}/${day}/${year}` : `${month}/${day}/${year.slice(-2)}`;
  }

  return value;
}

function parseIsoDate(value: string) {
  const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!isoMatch) return null;
  const [, year, month, day] = isoMatch;
  return { year, month, day };
}

function sanitize(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function fitFontSize(font: PDFFont, text: string, width: number, maxSize: number, minSize = 7) {
  let size = maxSize;
  while (size > minSize && font.widthOfTextAtSize(text, size) > width) {
    size -= 0.5;
  }
  return size;
}

function drawLineText(page: PDFPage, font: PDFFont, text: string, x: number, y: number, width: number, maxSize = 12) {
  const value = sanitize(text);
  if (!value) return;

  const size = fitFontSize(font, value, width, maxSize);
  page.drawText(value, {
    x,
    y,
    size,
    font,
    color: rgb(0.08, 0.08, 0.08),
  });
}

function drawDateParts(
  page: PDFPage,
  font: PDFFont,
  value: string,
  coords: { monthX: number; dayX: number; yearX: number; y: number }
) {
  const parsed = parseIsoDate(value);
  if (!parsed) {
    drawLineText(page, font, value, coords.monthX, coords.y, 92, 11);
    return;
  }

  page.drawText(parsed.month, {
    x: coords.monthX,
    y: coords.y,
    size: 12,
    font,
    color: rgb(0.08, 0.08, 0.08),
  });
  page.drawText(parsed.day, {
    x: coords.dayX,
    y: coords.y,
    size: 12,
    font,
    color: rgb(0.08, 0.08, 0.08),
  });
  page.drawText(parsed.year, {
    x: coords.yearX,
    y: coords.y,
    size: 12,
    font,
    color: rgb(0.08, 0.08, 0.08),
  });
}

function attachmentLabelFor(key: string) {
  switch (key) {
    case "sales_tax_certificate":
      return "Sales Tax Exemption Certificate";
    case "drivers_license_image":
      return "Driver's License";
    case "credit_card_front":
      return "Credit Card Front";
    case "credit_card_back":
      return "Credit Card Back";
    default:
      return key.replace(/_/g, " ");
  }
}

async function drawSignature(page: PDFPage, pdf: PDFDocument, signatureImage: Buffer, x: number, y: number, width: number, height: number) {
  const png = await pdf.embedPng(signatureImage);
  const scaled = png.scale(1);
  const scale = Math.min(width / scaled.width, height / scaled.height);
  const finalWidth = scaled.width * scale;
  const finalHeight = scaled.height * scale;

  page.drawImage(png, {
    x,
    y,
    width: finalWidth,
    height: finalHeight,
    opacity: 0.96,
  });
  page.drawImage(png, {
    x: x + 0.35,
    y,
    width: finalWidth,
    height: finalHeight,
    opacity: 0.55,
  });
}

function drawAttachmentTitle(page: PDFPage, font: PDFFont, label: string, filename: string) {
  page.drawText(label, {
    x: 36,
    y: LETTER_HEIGHT - 46,
    size: 20,
    font,
    color: rgb(0.08, 0.08, 0.08),
  });
  page.drawText(filename, {
    x: 36,
    y: LETTER_HEIGHT - 68,
    size: 10,
    font,
    color: rgb(0.34, 0.34, 0.34),
  });
}

async function addImageAttachmentPages(pdf: PDFDocument, font: PDFFont, attachment: SunshineCodAttachment) {
  const page = pdf.addPage([LETTER_WIDTH, LETTER_HEIGHT]);
  drawAttachmentTitle(page, font, attachment.label, attachment.filename);

  let image: PDFImage;
  if (attachment.contentType.includes("png")) {
    image = await pdf.embedPng(attachment.content);
  } else {
    image = await pdf.embedJpg(attachment.content);
  }

  const bounds = image.scale(1);
  const maxWidth = LETTER_WIDTH - 72;
  const maxHeight = LETTER_HEIGHT - 132;
  const scale = Math.min(maxWidth / bounds.width, maxHeight / bounds.height);
  const width = bounds.width * scale;
  const height = bounds.height * scale;

  page.drawImage(image, {
    x: (LETTER_WIDTH - width) / 2,
    y: 40 + (maxHeight - height) / 2,
    width,
    height,
  });
}

async function addPdfAttachmentPages(pdf: PDFDocument, font: PDFFont, attachment: SunshineCodAttachment) {
  const cover = pdf.addPage([LETTER_WIDTH, LETTER_HEIGHT]);
  drawAttachmentTitle(cover, font, attachment.label, attachment.filename);
  cover.drawText("Attached PDF follows on the next page.", {
    x: 36,
    y: LETTER_HEIGHT - 110,
    size: 12,
    font,
    color: rgb(0.34, 0.34, 0.34),
  });

  const source = await PDFDocument.load(attachment.content);
  const pages = await pdf.copyPages(source, source.getPageIndices());
  for (const importedPage of pages) {
    pdf.addPage(importedPage);
  }
}

export async function createSunshineCodSubmissionPdf(payload: SunshineCodPdfPayload) {
  const blankBytes = await readFile(FORM_PATH);
  const pdf = await PDFDocument.load(blankBytes);
  pdf.setTitle("Sunshine COD Application");
  pdf.setSubject("Sunshine COD Application Submission");
  pdf.setAuthor("rubenmanzano.com");
  pdf.setCreator("Rubens Portfolio");
  pdf.setProducer("Rubens Portfolio");
  const page = pdf.getPages()[0];
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdf.embedFont(StandardFonts.HelveticaBold);

  drawLineText(page, font, payload.companyName, 98, 697, 225);
  drawLineText(page, font, payload.owner, 382, 697, 178);
  drawLineText(page, font, formatSlashDate(payload.applicationDate), 474, 722, 94);

  drawLineText(page, font, payload.telephone, 74, 670, 258);
  drawLineText(page, font, payload.businessEmail, 377, 670, 178, 11);
  drawLineText(page, font, payload.accountsPayableClerk, 137, 642, 192);
  drawLineText(page, font, payload.apEmail, 377, 642, 178, 11);

  drawLineText(page, font, payload.mailingStreetAddress, 98, 610, 184);
  drawLineText(page, font, payload.mailingCity, 286, 610, 92);
  drawLineText(page, font, payload.mailingState, 383, 610, 56);
  drawLineText(page, font, payload.mailingZipCode, 446, 610, 122);

  drawLineText(page, font, payload.deliveryStreetAddress, 102, 577, 180, 11);
  drawLineText(page, font, payload.deliveryCity, 286, 577, 92, 11);
  drawLineText(page, font, payload.deliveryState, 383, 577, 56,  11);
  drawLineText(page, font, payload.deliveryZipCode, 446, 577, 122, 11);

  drawLineText(page, font, payload.typeOfFuel, 79, 542, 145);
  drawLineText(page, font, payload.tankSize, 282, 542, 122);
  drawLineText(page, font, payload.boatTank, 470, 542, 102);

  drawLineText(page, font, payload.primaryActivityOfBusiness, 155, 516, 205);
  drawLineText(page, font, payload.yearsEstablished, 473, 516, 68);
  drawLineText(page, font, payload.tankRegistrationNumbers, 137, 488, 218);
  drawDateParts(page, font, payload.individualApplicantDob, {
    monthX: 506,
    dayX: 531,
    yearX: 552,
    y: 489,
  });
  drawLineText(page, font, payload.federalEmployeeIdNo, 133, 461, 155);
  drawLineText(page, font, payload.salesTaxExemptNo, 406, 461, 140);

  if (payload.signatureImage) {
    await drawSignature(page, pdf, payload.signatureImage, 122, 329, 172, 30);
  }
  drawLineText(page, boldFont, payload.printedName || payload.owner, 121, 304, 180, 11.5);
  drawLineText(page, font, formatSlashDate(payload.authorizationDate || payload.applicationDate), 395, 340, 92);
  drawLineText(page, font, formatSlashDate(payload.authorizationDate || payload.applicationDate), 395, 304, 92);

  if (payload.cardSubmissionMode === "details") {
    drawLineText(page, font, payload.nameOnCard, 85, 231, 176);
    drawLineText(page, font, payload.typeOfCard, 369, 231, 164);
    drawLineText(page, font, payload.cardNumber, 82, 206, 200);
    drawLineText(page, font, payload.bankNumber, 405, 206, 84);
    drawLineText(page, font, payload.expirationDate, 92, 181, 126);
    drawLineText(page, font, payload.driversLicenseNumber, 112, 156, 243);
    if (payload.paymentSignatureImage) {
      await drawSignature(page, pdf, payload.paymentSignatureImage, 174, 120, 204, 30);
    } else if (payload.signatureImage) {
      await drawSignature(page, pdf, payload.signatureImage, 174, 120, 204, 30);
    }
  }

  for (const attachment of payload.supportingAttachments) {
    if (attachment.contentType === "application/pdf" || attachment.filename.toLowerCase().endsWith(".pdf")) {
      await addPdfAttachmentPages(pdf, font, attachment);
      continue;
    }

    if (attachment.contentType.startsWith("image/")) {
      await addImageAttachmentPages(pdf, font, attachment);
    }
  }

  return Buffer.from(await pdf.save());
}

export function buildSunshineAttachmentLabel(key: string) {
  return attachmentLabelFor(key);
}
