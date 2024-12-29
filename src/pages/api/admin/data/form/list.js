import Admin from "@/../models/adminSchema";
import Form from "@/../models/formSchema";
import Task from "@/../models/taskSchema";
import dbConnect from "@/lib/mongoose";
import { ObjectId } from "mongodb";

export default async function handler (req, res) {
	if (req.method === "POST") {
		const {accessid} = req.body;

		// Check for fields
		if (!accessid) {
			return res.status(401).json({success: false, message: "Missing fields"});
		}

		// Check for sufficient permissions
		await dbConnect();
		const admin = await Admin.findOne({_id: new ObjectId(accessid)});
		if (!admin || !admin.access_list.includes("form-list")) {
			return res.status(403).json({success: false, message: "Insufficient permissions"});
		}

		// Get all forms
		try {
			const forms = await Form.find();

			// check usages of forms and add to object
			const formsWithUsages = await Promise.all(forms.map(async (form) => {
				const usages = await Task.find({form_id: form._id});
				return {
					...form.toObject(),
					usages: usages.length
				};
			}));

			res.status(200).json({success: true, data: formsWithUsages});
		} catch (error) {
			res.status(500).json({success: false, error: error.message});
		}
	} else {
		res.status(400).json({success: false, message: "Invalid request method"});
	}
}