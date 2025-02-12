import Admin from "../../../../../models/admin-schema";
import Client from "../../../../../models/client-schema";
import dbConnect from "@/lib/mongoose";
import { ObjectId } from "mongodb";
import Task from "../../../../../models/task-schema";
import FileSubmission from "../../../../../models/file-submission-schema";
import FormSubmission from "../../../../../models/form-submission-schema";
import Form from "../../../../../models/form-schema";

export default async function handler (req, res) {
	if (req.method === "POST") {
		const {clientid, accessid, getTasks} = req.body;

		// Check for fields
		if (!clientid || !accessid) {
			return res.status(401).json({success: false, message: "Missing fields"});
		}

		// Check for sufficient permissions
		await dbConnect();
		const admin = await Admin.findOne({_id: new ObjectId(accessid)});
		if (!admin || !admin.access_list.includes("client-list")) {
			return res.status(403).json({success: false, message: "Insufficient permissions"});
		}

		// Get client data
		try {
			let clients = await Client.findById(clientid);

			if (getTasks) {
				// Get client tasks
				clients = clients.toObject();
				clients.tasks = await Task.find({
					client_id: clientid,
				}).lean();

				for (let task of clients.tasks) {
					if (task.file_submission_id) {
						const fileSubmission = await FileSubmission.findById(task.file_submission_id).lean();
						task.file_submission = fileSubmission || null;
					}
					if (task.form_submission_id) {
						const formSubmission = await FormSubmission.findById(task.form_submission_id).lean();
						task.form_submission = formSubmission || null;
					}
					if (task.form_id) {
						const form = await Form.findById(task.form_id).lean();
						task.form = form || null;
					}
				}
			}

			res.status(200).json({success: true, data: clients});
		} catch (error) {
			res.status(500).json({success: false, error: error.message});
		}
	} else {
		res.status(400).json({success: false, message: "Invalid request method"});
	}
}