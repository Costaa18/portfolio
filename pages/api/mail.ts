import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

type Data = {
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === "POST") {
        const { name, email, message }: { name: string; email: string; message: string } = req.body;

        const msg = `Name: ${name}\r\n Email: ${email}\r\n Message: ${message}`;
        const data = {
            to: process.env.MAIL_TO as string,
            from: process.env.MAIL_FROM as string,
            subject: `${name.toUpperCase()} sent you a message from Portfolio`,
            text: `Email => ${email}`,
            html: msg.replace(/\r\n/g, "<br>"),
        };

        try {
            const [response] = await sgMail.send(data);
            if (response.statusCode === 202 || response.statusCode === 200) {
                res.status(200).json({ message: "Your message was sent successfully." });
            } else {
                res.status(500).json({ message: "SendGrid accepted the request but email delivery failed." });
            }
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ message: `Error sending email: ${err.message}` });
        }
    } else {
        res.status(405).json({ message: "Method not allowed." });
    }
}
