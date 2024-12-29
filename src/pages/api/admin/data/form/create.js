import dbConnect from "@/lib/mongoose";
import { ObjectId } from "mongodb";
import Admin from "@/../models/adminSchema";
import Form from "@/../models/formSchema";

export default async function handler (req, res) {
	if (req.method === "POST") {
		const {accessid, title, description, questions} = req.body;

		// Check for fields
		if (!accessid || !title || !description || !questions) {
			return res.status(401).json({success: false, message: "Missing fields"});
		}

		// Check for sufficient permissions
		await dbConnect();
		const admin = await Admin.findOne({_id: new ObjectId(accessid)});
		if (!admin || !admin.access_list.includes("form-list")) {
			return res.status(403).json({success: false, message: "Insufficient permissions"});
		}

		// Create form
		try {
			const form = new Form({
				title,
				description,
				fields: questions
			});
			await form.save();

			res.status(201).json({success: true, data: form});
		} catch (error) {
			res.status(500).json({success: false, error: error.message});
		}
	} else {
		res.status(400).json({success: false, message: "Invalid request method"});
	}
}