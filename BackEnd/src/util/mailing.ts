import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER as string,
        pass: process.env.EMAIL_PASSWORD as string,
    },
});

async function sendEmail(
    to: string,
    subject: string,
    html: string
): Promise<void> {
    const mailOptions = {
        from: process.env.EMAIL_USER as string,
        to,
        subject,
        html,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
}

export { sendEmail };