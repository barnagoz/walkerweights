import Admin from "@/../models/adminSchema";
import dbConnect from "@/lib/mongoose";
import { ObjectId } from "mongodb";

export default async function handler (req, res) {
	if (req.method === "POST") {
		const {email, access_list, accessid} = req.body;

		// Check for sufficient permissions
		await dbConnect();
		const admin = await Admin.findOne({_id: new ObjectId(accessid)});
		if (!admin || !admin.access_list.includes("admin-management")) {
			return res.status(403).json({success: false, message: "Insufficient permissions"});
		}

		// Check for missing fields
		if (!email || !access_list) {
			return res.status(400).json({success: false, message: "Missing fields"});
		}

		// Update admin
		try {
			const admin = await Admin.findOne({email: email});
			admin.access_list = access_list;
			await admin.save();
			res.status(201).json({success: true, data: admin});
		} catch (error) {
			res.status(500).json({success: false, error: error.message});
		}
	} else {
		res.status(400).json({success: false, message: "Invalid request method"});
	}
}