// src/users/emailService.ts
import { transporter } from '../config/mailer';
import { env } from '../config/env';

export const sendVerificationCode = async (email: string, code: string) => {
    const mailOptions = {
        from: env.mailer.user,
        to: email,
        subject: 'Password Reset Verification Code',
        text:
            `Your verification code is: ${code}`,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent');
    } catch (error) {
        console.log('Error sending email', error);
    }
}
