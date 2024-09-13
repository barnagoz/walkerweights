import Admin from "@/../models/adminSchema";
import dbConnect from "@/lib/mongoose";
import { ObjectId } from "mongodb";

export default async function handler (req, res) {
	if (req.method === "POST") {
		const {email, accessid} = req.body;

		// Check for sufficient permissions
		await dbConnect();
		const admin = await Admin.findOne({_id: new ObjectId(accessid)});
		if (!admin || !admin.access_list.includes("admin-management")) {
			return res.status(403).json({success: false, message: "Insufficient permissions"});
		}

		// Check for missing fields
		if (!email) {
			return res.status(400).json({success: false, message: "Missing fields"});
		}

		// Delete admin
		try {
			const deletedAdmin = await Admin.findOneAndDelete({email: email});
			res.status(201).json({success: true, data: deletedAdmin});
		} catch (error) {
			res.status(400).json({success: false, error: error.message});
		}
	} else {
		res.status(400).json({success: false, message: "Invalid request method"});
	}
}