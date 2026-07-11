import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend("re_bK6a7jnD_FbegfjtYjMiY4CvhVaDmnifQ");

const safe = (value?: string) =>
  String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function POST(req: Request) {
  const body = await req.json();

  const {
    firstName,
    lastName,
    phone,
    email,
    company,
    website,
    brandType,
    adSituation,
    monthlyRevenue,
    channels,
    adBudget,
    urgency,
    message,
  } = body;

  const sentAt = new Date().toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });

  const fullName = `${safe(firstName)} ${safe(lastName)}`.trim();

  const details = [
    ["Full Name", fullName || "—"],
    ["Company", safe(company) || "—"],
    [
      "Website",
      website
        ? `<a href="${safe(website)}" style="color:#1C1C1C;text-decoration:underline;">${safe(
          website
        )}</a>`
        : "—",
    ],
    [
      "Email",
      email
        ? `<a href="mailto:${safe(email)}" style="color:#1C1C1C;text-decoration:none;">${safe(
          email
        )}</a>`
        : "—",
    ],
    [
      "Phone",
      phone
        ? `<a href="tel:${safe(phone)}" style="color:#1C1C1C;text-decoration:none;">${safe(
          phone
        )}</a>`
        : "—",
    ],
    ["Brand Type", safe(brandType) || "—"],
    ["Ads Situation", safe(adSituation) || "—"],
    ["Monthly Revenue", safe(monthlyRevenue) || "—"],
    ["Ad Budget", safe(adBudget) || "—"],
    ["Urgency", safe(urgency) || "—"],
  ];

  const rowsHtml = details
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:17px 28px;border-bottom:1px solid #EFEFE8;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td width="38%" valign="top" style="font-size:11px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:#9A9A92;">
                  ${label}
                </td>
                <td width="62%" valign="top" align="right" style="font-size:14px;font-weight:700;line-height:1.5;color:#1C1C1C;text-align:right;">
                  ${value}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `
    )
    .join("");

  const channelsHtml = Array.isArray(channels) && channels.length
    ? channels
      .map(
        (ch: string) => `
              <span style="display:inline-block;border:1px solid #DADDD0;background:#FAFAF5;color:#1C1C1C;border-radius:999px;padding:7px 14px;margin:0 6px 8px 0;font-size:12px;font-weight:700;">
                ${safe(ch)}
              </span>
            `
      )
      .join("")
    : `<span style="font-size:13px;color:#9A9A92;">—</span>`;

  try {
    await resend.emails.send({
      from: "PeptideScaling <noreply@peptidescaling.com>",
      to: "peptidescaling@gmail.com",
      subject: `New Lead: ${fullName || "New Lead"} — ${company || "No company"}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>New Lead — PeptideScaling</title>
</head>

<body style="margin:0;padding:0;background:#F5F4EB;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#F5F4EB;opacity:0;">
    New lead from ${fullName}${company ? ` at ${safe(company)}` : ""}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F5F4EB;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
    <tr>
      <td align="center" style="padding:36px 14px;">

        <table role="presentation" width="620" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:620px;border-collapse:separate;">
          
          <tr>
            <td style="background:#1C1C1C;padding:24px 30px;border-radius:18px 18px 0 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left" valign="middle">
                    <div style="font-size:21px;font-weight:500;color:#ffffff;line-height:1.2;">
                      Peptide<span style="color:#c6e805;font-weight:800;">Scaling</span>
                    </div>
                    <div style="font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#8A8A8A;margin-top:5px;">
                      Growth Marketing Agency
                    </div>
                  </td>

                  <td align="right" valign="middle" style="font-size:12px;color:#BDBDBD;white-space:nowrap;">
                    <div style="font-size:10px;font-weight:800;letter-spacing:1.4px;text-transform:uppercase;color:#c6e805;margin-bottom:6px;">
                      New Lead Received
                    </div>
                    ${safe(sentAt)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background:#ffffff;border-left:1px solid #EAEAE4;border-right:1px solid #EAEAE4;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ${rowsHtml}
              </table>
            </td>
          </tr>

          <tr>
            <td style="background:#ffffff;padding:22px 28px;border-left:1px solid #EAEAE4;border-right:1px solid #EAEAE4;border-bottom:1px solid #EFEFE8;">
              <div style="font-size:11px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:#9A9A92;margin-bottom:14px;">
                Channels Using
              </div>
              ${channelsHtml}
            </td>
          </tr>

          ${message && message.trim()
          ? `
          <tr>
            <td style="background:#ffffff;padding:22px 28px 28px;border-left:1px solid #EAEAE4;border-right:1px solid #EAEAE4;">
              <div style="font-size:11px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:#9A9A92;margin-bottom:12px;">
                Message from ${safe(firstName)}
              </div>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F7F7EF;border-left:4px solid #c6e805;">
                <tr>
                  <td style="padding:16px 18px;font-size:14px;line-height:1.7;color:#333333;">
                    ${safe(message)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          `
          : ""
        }

          <tr>
            <td align="center" style="background:#1C1C1C;padding:30px 30px;border-radius:0 0 18px 18px;">
              <a href="mailto:${safe(email)}?subject=Re%3A%20Your%20inquiry%20%E2%80%94%20PeptideScaling"
                 style="display:inline-block;background:#c6e805;color:#1C1C1C;font-size:13px;font-weight:800;padding:14px 38px;border-radius:999px;text-decoration:none;letter-spacing:0.4px;">
                Reply to ${safe(firstName) || "Lead"} &rarr;
              </a>

              <div style="margin-top:22px;padding-top:18px;border-top:1px solid rgba(255,255,255,0.08);font-size:11px;letter-spacing:1.4px;text-transform:uppercase;color:#777777;font-weight:600;">
                PeptideScaling &nbsp;&middot;&nbsp; Growth Marketing Agency
              </div>
            </td>
          </tr>

        </table>

        <table role="presentation" width="620" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:620px;">
          <tr>
            <td align="center" style="padding:18px 16px 0;">
              <p style="margin:0;text-align:center;color:#AAAAAA;font-size:11px;line-height:1.5;">
                Sent automatically from peptidescaling.com contact form
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>
      `, 
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}