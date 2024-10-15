import { ResetPasswordEmail } from "@/emails/reset-password";
import sendEmail from "@/lib/email";
import dbConnect from "@/lib/mongoose";
import { render } from "@react-email/render";
import Admin from "@/../models/adminSchema";
import Client from "@/../models/clientSchema";

async function sendResetPassEmail (email, token, first_name, last_name) {
	const link = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password/${token}`;
	const html = await render(<ResetPasswordEmail first_name={first_name} last_name={last_name}
	                                              password_setup_link={link}/>, {pretty: true});
	const text = await render(<ResetPasswordEmail first_name={first_name} last_name={last_name}
	                                              password_setup_link={link}/>, {plainText: true});

	await sendEmail({
		to: email,
		subject: "Elfelejtett jelszó",
		html: html,
		text: text,
	});
}

export default async function handler (req, res) {
	if (req.method === "POST") {
		const {email} = req.body;

		// Check for missing fields
		if (!email) {
			return res.status(400).json({success: false, message: "Missing fields"});
		}

		try {
			await dbConnect();
			// check for admins with email
			const admin = await Admin.findOne({email: email});
			if (admin) {
				const random = Math.random().toString(36).substring(2, 17);
				admin.password_reset_token = random;
				await admin.save();
				// Send email
				await sendResetPassEmail(email, random, admin.first_name, admin.last_name);
				res.status(200).json({success: true});
				return
			}

			const client = await Client.findOne({email: email});
			if (client) {
				const random = Math.random().toString(36).substring(2, 17);
				client.password_reset_token = random;
				await client.save();
				// Send email
				await sendResetPassEmail(email, random, client.first_name, client.last_name);
				res.status(200).json({success: true});
				return
			}

			res.status(400).json({success: false, message: "No account found with this email"});
		} catch (error) {
			return res.status(400).json({success: false, error: error.message});
		}
	} else {
		res.status(400).json({success: false, message: "Invalid request method"});
	}
}