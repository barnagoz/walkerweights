import Admin from "@/../models/adminSchema";
import dbConnect from "@/lib/mongoose";
import { ObjectId } from "mongodb";
import { render } from '@react-email/render';
import AdminPasswordSetup from "@/emails/admin-password";
import sendEmail from "@/lib/email";

export async function sendPasswordEmail (email, token, first_name, last_name) {
	const link = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/admin-password-setup/${token}`;
	const html = await render(<AdminPasswordSetup first_name={first_name} last_name={last_name} password_setup_link={link} />, {pretty: true});
	const text = await render(<AdminPasswordSetup first_name={first_name} last_name={last_name} password_setup_link={link} />, {plainText: true});

	await sendEmail({
		to: email,
		subject: "Adminisztrátor jelszó beállítása",
		html: html,
		text: text,
	});
}

export default async function handler (req, res) {
	if (req.method === "POST") {
		const {email, accessid, first_name, last_name} = req.body;

		// Check for sufficient permissions
		await dbConnect();
		const admin = await Admin.findOne({_id: new ObjectId(accessid)});
		if (!admin || !admin.access_list.includes("admin-management")) {
			return res.status(403).json({success: false, message: "Insufficient permissions"});
		}

		// Check for missing fields
		if (!email || !first_name || !last_name) {
			return res.status(401).json({success: false, message: "Missing fields"});
		}

		try {
			const resetAdmin = await Admin.findOne({email: email});
			const random = Math.random().toString(36).substring(2,17);
			resetAdmin.password_reset_token = random
			await resetAdmin.save();
			// Send email
			await sendPasswordEmail(email, random, first_name, last_name);
			res.status(201).json({success: true});
		} catch (error) {
			res.status(500).json({success: false, error: error.message});
		}
	} else {
		res.status(400).json({success: false, message: "Invalid request method"});
	}
}