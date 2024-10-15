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
			registerMessage,
			client_id,
			session_token
		} = req.body;

		// Check for missing fields
		if (!company_name || !email || !phone || !first_name || !last_name || !client_id) {
			res.status(400).json({success: false, message: "Missing fields"});
			return;
		}

		// Check for valid session token
		await dbConnect();
		const client = await Client.findById(client_id);
		if (!client || client.session_token !== session_token) {
			res.status(403).json({success: false, message: "Invalid session token"});
			return;
		}

		// Update client
		try {
			await dbConnect();
			const updatedClient = await Client.findOneAndUpdate({_id: client_id}, {
				company_name,
				email,
				phone,
				first_name,
				last_name,
				energeticInvestmentSince2011: energeticInvestmentSince2011 || false,
				energeticInvestmentWhen: energeticInvestmentWhen || "",
				energeticInvestmentType: energeticInvestmentType || "",
				energeticInvestmentAmount: energeticInvestmentAmount || "",
				registerMessage: registerMessage || "",
			}, {new: true});

			res.status(201).json({success: true, data: updatedClient});
		} catch (error) {
			console.log(error)
			res.status(400).json({success: false, error: error.message});
		}
	} else {
		res.status(400).json({success: false, message: "Invalid request method"});
	}
}