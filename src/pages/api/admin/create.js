import Admin from "@/../models/adminSchema";
import dbConnect from "@/lib/mongoose";
import { sendPasswordEmail } from "@/pages/api/admin/password-email";
import { ObjectId } from "mongodb";

export default async function handler (req, res) {
	if (req.method === "POST") {
		const {email, first_name, last_name, access_list, accessid} = req.body;

		// Check for sufficient permissions
		await dbConnect();
		const admin = await Admin.findOne({_id: new ObjectId(accessid)});
		if (!admin || !admin.access_list.includes("admin-management")) {
			return res.status(403).json({success: false, message: "Insufficient permissions"});
		}

		// Check for missing fields
		if (!email || !first_name || !last_name || !access_list) {
			return res.status(401).json({success: false, message: "Missing fields"});
		}

		// Create new admin
		const random = Math.random().toString(36).substring(2,17);
		const newAdmin = new Admin({
			email,
			password_reset_token: random,
			first_name,
			last_name,
			access_list,
		});
		try {
			await newAdmin.save();
			await sendPasswordEmail(email, random, first_name, last_name);
			res.status(201).json({success: true, data: newAdmin});
		} catch (error) {
			console.log(error)
			res.status(500).json({success: false, error: error.message});
		}
	} else {
		res.status(400).json({success: false, message: "Invalid request method"});
	}
}