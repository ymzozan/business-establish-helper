import { NextRequest, NextResponse } from "next/server";

// Email notification via Resend
async function sendEmail(to: string, subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.startsWith("re_your")) {
    console.log("[Email] Skipping - API key not configured");
    return null;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const result = await resend.emails.send({
    from: "Kuyumcu Otomasyon <onboarding@resend.dev>",
    to,
    subject,
    html,
  });

  return result;
}

export async function POST(request: NextRequest) {
  try {
    const { type, applicationId, to, data } = await request.json();

    switch (type) {
      case "application_received": {
        // Send confirmation to applicant
        await sendEmail(
          to,
          "Başvurunuz Alındı - Kuyumcu Otomasyon",
          `
          <h2>Başvurunuz başarıyla alındı!</h2>
          <p>Sayın ${data.firstName} ${data.lastName},</p>
          <p>Başvurunuz tarafımıza ulaşmıştır. En kısa sürede sizinle iletişime geçeceğiz.</p>
          <p><strong>Başvuru No:</strong> ${applicationId}</p>
          <br>
          <p>Kuyumcu Otomasyon Ekibi</p>
          `
        );
        break;
      }
      case "status_update": {
        await sendEmail(
          to,
          "Başvuru Durumu Güncellendi - Kuyumcu Otomasyon",
          `
          <h2>Başvuru durumunuz güncellendi</h2>
          <p>Sayın ${data.firstName} ${data.lastName},</p>
          <p>Başvurunuzun durumu <strong>${data.newStatus}</strong> olarak güncellenmiştir.</p>
          <p><strong>Başvuru No:</strong> ${applicationId}</p>
          <br>
          <p>Kuyumcu Otomasyon Ekibi</p>
          `
        );
        break;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Notification error:", error);
    return NextResponse.json(
      { error: "Notification failed" },
      { status: 500 }
    );
  }
}
