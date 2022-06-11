import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "1124e546b64a8c",
      pass: "c4bd70e62c64cc"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail ({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedback <oi@feedback.com>',
            to: 'Thiago Pereira <pereira.tp.thiago@gmail.com>',
            subject,
            html: body,
        })
    }
}