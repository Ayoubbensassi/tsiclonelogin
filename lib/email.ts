import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export async function sendWelcomeEmail(email: string, name: string, userType: string) {
    const subject = 'Bienvenue sur Réseau TSI! 🎉';

    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🌳 Réseau TSI</h1>
            <h2>Bienvenue ${name}!</h2>
          </div>
          <div class="content">
            <p>Bonjour ${name},</p>
            <p>Nous sommes ravis de vous accueillir sur <strong>Réseau TSI</strong>!</p>
            <p>Votre compte ${userType === 'company' ? 'Structure' : 'Intervenant'} a été créé avec succès.</p>
            <p>Vous pouvez maintenant vous connecter et commencer à utiliser notre plateforme.</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login" class="button">
              Se connecter
            </a>
            <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
            <p>Cordialement,<br>L'équipe Réseau TSI</p>
          </div>
        </div>
      </body>
    </html>
  `;

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject,
        html,
    });
}
