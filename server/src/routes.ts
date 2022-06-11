import express from 'express'
import nodemailer from 'nodemailer'
import { prisma } from './prisma'

export const routes = express.Router()

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "1124e546b64a8c",
      pass: "c4bd70e62c64cc"
    }
  });


routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body

    const feedback = await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot,
        }
    })

    await transport.sendMail({
        from: 'Equipe Feedback <oi@feedback.com>',
        to: 'Thiago Pereira <pereira.tp.thiago@gmail.com>',
        subject: 'Novo feedback',
        html: [
            `<div styles="font-family: sans-serif; font-size: 16px; color: #111;">`,
            `<p>Novo feedback do tipo ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
            `<p>Screenshot: ${screenshot}</p>` ,
            `</div>`
        ].join('\n')
    })

    return res.status(201).json({ data:feedback })
})