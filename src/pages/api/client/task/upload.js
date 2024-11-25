import dbConnect from "@/lib/mongoose";
import { ObjectId } from "mongodb";
import Client from "@/../models/clientSchema";
import Task from "@/../models/taskSchema";
import FileSubmission from "@/../models/fileSubmissionSchema";

export default async function handler (req, res) {
	if (req.method === "POST") {
		const {client_id, session_token, task_id, file} = req.body;

		if (!client_id || !session_token || !task_id || !file) {
			return res.status(400).json({success: false, message: "Invalid request body"});
		}
		// Check for valid session token
		await dbConnect();
		const client = await Client.findOne({_id: new ObjectId(client_id)});
		if (!client || client.session_token !== session_token) {
			return res.status(403).json({success: false, message: "Invalid session token"});
		}

		// Find task
		const task = await Task.findOne({_id: new ObjectId(task_id)});
		if (!task) {
			return res.status(404).json({success: false, message: "Task not found"});
		}

		// Save upload
		const upload = new FileSubmission({
			file_url: file,
			submission_date: new Date(),
		});
		await upload.save();

		// Update task
		task.file_submission_id = upload._id;
		task.status = "Beküldve";
		await task.save();

		return res.status(200).json({success: true});
	} else {
		return res.status(405).json({success: false, message: "Method not allowed"});
	}
}