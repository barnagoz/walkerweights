import Client from "@/../models/clientSchema";
import ClientPasswordSetup from "@/emails/client-password";
import sendEmail from "@/lib/email";
import dbConnect from "@/lib/mongoose";
import { render } from '@react-email/render';

export default async function handler (req, res) {
	if (req.method === "POST") {
		const {
			company_name,
			email,
			phone,
			first_name,
			last_name,
			energeticInvestmentSince2011,
			energeticInvestmentWhen,
			energeticInvestmentType,
			energeticInvestmentAmount,
			registerMessage
		} = req.body;

		// Check for missing fields
		if (!company_name || !email || !phone || !first_name || !last_name) {
			return res.status(400).json({success: false, message: "Missing fields"});
		}

		const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

		const energeticInvestment = {
			since2021: energeticInvestmentSince2011,
			when: energeticInvestmentWhen || "",
			type: energeticInvestmentType || "",
			amount: energeticInvestmentAmount || ""
		};

		// Create new client
		await dbConnect();
		const newClient = new Client({
			company_name,
			email,
			phone,
			first_name,
			last_name,
			energeticInvestment,
			registerMessage: registerMessage || "",
			password_reset_token: resetToken
		});
		try {
			await newClient.save();

			const link = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/password-setup/${resetToken}`;
			const html = await render(<ClientPasswordSetup first_name={first_name} last_name={last_name}
			                                               password_setup_link={link}/>, {pretty: true});
			const text = await render(<ClientPasswordSetup first_name={first_name} last_name={last_name}
			                                               password_setup_link={link}/>, {plainText: true});

			await sendEmail({
				to: email,
				subject: "Köszönjük a kitöltést!",
				html: html,
				text: text,
			});
			res.status(201).json({success: true, data: newClient});
		} catch (error) {
			console.log(error)
			res.status(400).json({success: false, error: error.message});
		}
	} else {
		res.status(400).json({success: false, message: "Invalid request method"});
	}
}