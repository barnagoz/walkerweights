import nodemailer from 'nodemailer';

export default async function sendEmail ({to, subject, html, text}) {
	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_SERVER,
		port: process.env.EMAIL_PORT,
		secure: false,
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	const options = {
		from: process.env.EMAIL_FROM,
		to: to,
		subject: subject,
		html: html,
		text: text,
	};

	await transporter.sendMail(options);
}