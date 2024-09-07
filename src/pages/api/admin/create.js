import Admin from "@/../models/adminSchema";
import dbConnect from "@/lib/mongoose";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";

export default async function handler (req, res) {
	if (req.method === "POST") {
		const {email, password, first_name, last_name, access_list, accessid} = req.body;

		console.log(email, password, first_name, last_name, access_list, accessid);

		// Check for sufficient permissions
		await dbConnect();
		const admin = await Admin.findOne({_id: new ObjectId(accessid)});
		if (!admin || !admin.access_list.includes("admin-management")) {
			return res.status(403).json({success: false, message: "Insufficient permissions"});
		}

		// Check for missing fields
		if (!email || !password || !first_name || !last_name || !access_list) {
			return res.status(400).json({success: false, message: "Missing fields"});
		}

		// Create new admin
		// TODO: setup email verification and let users set their own passwords
		const newAdmin = new Admin({
			email,
			password: bcrypt.hashSync(password, 10),
			first_name,
			last_name,
			access_list,
		});
		try {
			await newAdmin.save();
			res.status(201).json({success: true, data: newAdmin});
		} catch (error) {
			res.status(400).json({success: false, error: error.message});
		}
	} else {
		res.status(400).json({success: false, message: "Invalid request method"});
	}
}