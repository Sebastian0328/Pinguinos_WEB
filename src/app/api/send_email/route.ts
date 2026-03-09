import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name } = body;

    if (!email) {
      return NextResponse.json({ error: "Falta el email" }, { status: 400 });
    }

    // Configuración del transporte (Tu Gmail de Pingüinos)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'pinguinos.i.d@gmail.com',
        pass: 'tfvgnpleqqwrtoky', // Tu contraseña de aplicación
      },
    });

    // Diseño Century Gothic Oficial de Pingüinos
    const htmlBody = `
      <div style="margin:0; padding:0; background-color:#F4F7F9; font-family: 'Century Gothic', AppleGothic, sans-serif;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; margin:20px auto; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <tr>
            <td align="center" style="padding: 40px 20px; background-color: #ffffff;">
              <img src="https://i.ibb.co/qM0mNxCM/logo.png" alt="Pingüinos" width="170" style="display:block;">
            </td>
          </tr>
          <tr>
            <td style="padding: 0 45px; text-align: center;">
              <h1 style="color:#111f5e; font-size:28px; font-weight:normal; margin:0 0 15px 0;">¡Hola, ${name}! 🐧</h1>
              <p style="color:#4B5563; font-size:16px; line-height:1.5; margin:0 0 25px 0;">
                En <b>Pingüinos</b>, el agua es el inicio de una gran historia de confianza y aprendizaje. Estamos emocionados de que formes parte de nuestra comunidad.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 45px;">
              <div style="background-color:#fee20f; border-radius: 12px; padding: 25px; text-align: center;">
                <p style="margin:0; color:#111f5e; font-size:16px; font-weight:bold;">INGLÉS + NATACIÓN 🏊‍♂️🇬🇧</p>
                <p style="margin:8px 0 0; color:#111f5e; font-size:14px;">Potenciamos el desarrollo cognitivo y físico en un solo lugar.</p>
              </div>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 40px 45px;">
              <a href="https://pinguinos-web.vercel.app/" style="background-color:#00c0e8; color:#ffffff; padding:18px 35px; text-decoration:none; border-radius:50px; font-weight:bold; font-size:16px; display:inline-block;">DESCUBRE MÁS</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 35px 45px; background-color:#111f5e; text-align: center;">
              <span style="color:#fee20f; font-weight:bold; font-size:14px;">PINGÜINOS</span>
              <p style="color:#ffffff; font-size:10px; opacity: 0.6; margin-top:10px;">© 2026 Pingüinos. Todos los derechos reservados.</p>
            </td>
          </tr>
        </table>
      </div>
    `;

    await transporter.sendMail({
      from: '"Mundo Pingüinos" <pinguinos.i.d@gmail.com>',
      to: email,
      subject: `¡Bienvenido a Pingüinos, ${name}! 🐧`,
      html: htmlBody,
    });

    return NextResponse.json({ success: true, message: "Email enviado" });

  } catch (error: any) {
    console.error("Error en API de email:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}