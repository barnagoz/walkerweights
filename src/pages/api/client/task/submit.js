import { ObjectId } from "mongodb";
import dbConnect from "@/lib/mongoose";
import Client from "../../../../../models/client-schema";
import Task from "../../../../../models/task-schema";
import FormSubmission from "../../../../../models/form-submission-schema";

export default async function handler (req, res) {
	if (req.method === "POST") {
		const {client_id, session_token, task_id, answers} = req.body;

		// Check for fields
		if (!client_id || !session_token || !task_id || !answers) {
			return res.status(400).json({success: false, message: "Missing fields"});
		}

		try {
			// Check for valid session token
			await dbConnect();
			const client = await
				Client.findOne({_id: new ObjectId(client_id)});
			if (!client || client.session_token !== session_token) {
				return res.status(403).json({success: false, message: "Invalid session token"});
			}

			// Save answers
			const submission = new FormSubmission({
				answers,
			});
			await submission.save();

			// Update task
			const task = await Task.findOne({_id: new ObjectId(task_id)});
			task.form_submission_id = submission._id;
			task.status = "Beküldve";
			await task.save();

			// Send success
			res.status(200).json({success: true, data: task});
		} catch (error) {
			res.status(400).json({success: false, error: error.message});
		}
	} else {
		res.status(400).json({success: false, message: "Invalid request method"});
	}
}