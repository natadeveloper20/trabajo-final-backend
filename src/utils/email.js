const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Crear el transportador (usando Mailtrap u otro servicio configurado en .env)
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_PORT == 465, // true para puerto 465, false para otros
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: `"ProjectHub" <${process.env.EMAIL_USER}>`,

        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
